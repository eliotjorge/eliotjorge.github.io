---
title: "ESP32: cómo programarlo y controlar un LED desde una web con slider"
description: "Guía completa para programar el ESP32, opciones online y ejemplo práctico creando una web en el propio microcontrolador para controlar el brillo de un LED con slider y botón."
date: 2026-04-15
image: "https://github.com/user-attachments/assets/ed4e2c35-8f26-45c1-a5d7-b4f9ef46aa44"
categories: [electronica,iot,programacion]
tags: [esp32,arduino,iot,microcontroladores,webserver,pwm]
faq:
  - question: "¿Dónde se aloja la página web del ESP32?"
    answer: "La web se aloja directamente en la memoria del ESP32, que actúa como servidor web. Se accede a través de su dirección IP en la red local."
  - question: "¿Se puede programar el ESP32 sin instalar nada?"
    answer: "Sí, existen plataformas online como Wokwi que permiten simular y programar el ESP32 desde el navegador, aunque para subir código real al dispositivo puedes usar herramientas como ESP Web Tools."
  - question: "¿Cómo se controla el brillo de un LED con ESP32?"
    answer: "Se utiliza PWM (modulación por ancho de pulso), ajustando el duty cycle para variar la intensidad del LED."
  - question: "¿Qué lenguaje se usa para programar el ESP32?"
    answer: "Principalmente C/C++ usando el entorno Arduino o ESP-IDF, aunque también se puede usar MicroPython o JavaScript en algunos entornos."
---

## ESP32: primeras notas y por qué engancha 🔌

El **ESP32** es uno de esos microcontroladores que cuando pruebas, ya no quieres soltar. Tiene WiFi, Bluetooth, potencia de sobra y un precio ridículo para todo lo que ofrece.

En mi caso, lo interesante no es solo encender LEDs, sino que **puede servir páginas web**. Es decir, puedes crear interfaces sin apps externas, directamente accesibles desde el navegador.

<div style="text-align: center;">
 <img src="https://media.giphy.com/media/DUO9dc3yDLXHO/giphy.gif" alt="microcontrolador funcionando" width="300" />
</div>

---

## Cómo programar un ESP32 🧠

### Opción 1: Arduino IDE (la más directa)

Es la forma más común:

1. Instalas Arduino IDE
2. Añades soporte ESP32
3. Conectas por USB
4. Subes el código

El flujo es muy parecido a Arduino clásico.

---

### Opción 2: ESP-IDF (más profesional)

Framework oficial. Más potente, pero también más complejo.

* Mejor control del hardware
* Más cercano a bajo nivel
* Curva de aprendizaje más alta

---

### Opción 3: MicroPython 🐍

Si vienes de Python, esto es bastante cómodo:

* Código más limpio
* Ideal para prototipos
* Menos eficiente que C++

---

### Opciones online 🌐

Aquí es donde se pone interesante.

#### 🧪 Simulación: Wokwi

* Simulas el ESP32 en el navegador
* No necesitas instalar nada
* Puedes probar código rápidamente

👉 Perfecto para experimentar sin hardware.

---

#### ⚙️ Subida de código con ESP Web Tools

Herramienta online que permite flashear el ESP32 directamente desde el navegador:

👉 [https://esptool.spacehuhn.com/](https://esptool.spacehuhn.com/)

* No necesitas instalar nada
* Funciona vía Web Serial
* Ideal para demos o distribución de firmware

---

## Servir una web desde el ESP32 🌍

Aquí viene la magia: el ESP32 puede actuar como servidor web.

👉 La web se guarda en memoria interna
👉 Se accede mediante su IP (ej: 192.168.1.50)
👉 No necesitas hosting externo

<div style="text-align: center;">
 <img src="https://media.giphy.com/media/77BiPhJ7iTDurQfPMN/giphy.gif" alt="web control dispositivo iot" width="300" />
</div>

---

## Ejemplo práctico: controlar un LED con slider 💡

### Qué vamos a hacer

* Un slider → controla brillo
* Un botón → encender/apagar
* Una web → alojada en el ESP32

---

## Código completo

```cpp
#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "TU_WIFI";
const char* password = "TU_PASSWORD";

WebServer server(80);

const int ledPin = 5;
int brightness = 0;
bool ledState = true;

// HTML de la web
String html = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Control LED ESP32</title>
</head>
<body style="text-align:center;">
  <h2>Control de LED</h2>

  <input type="range" min="0" max="255" value="0" id="slider"
    onchange="updateBrightness(this.value)">
  
  <p>
    <button onclick="toggleLED()">Encender / Apagar</button>
  </p>

<script>
function updateBrightness(val) {
  fetch("/brightness?value=" + val);
}

function toggleLED() {
  fetch("/toggle");
}
</script>

</body>
</html>
)rawliteral";

void handleRoot() {
  server.send(200, "text/html", html);
}

void handleBrightness() {
  brightness = server.arg("value").toInt();
  if (ledState) {
    ledcWrite(0, brightness);
  }
  server.send(200, "text/plain", "OK");
}

void handleToggle() {
  ledState = !ledState;
  if (ledState) {
    ledcWrite(0, brightness);
  } else {
    ledcWrite(0, 0);
  }
  server.send(200, "text/plain", "OK");
}

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  Serial.println(WiFi.localIP());

  ledcSetup(0, 5000, 8);
  ledcAttachPin(ledPin, 0);

  server.on("/", handleRoot);
  server.on("/brightness", handleBrightness);
  server.on("/toggle", handleToggle);

  server.begin();
}

void loop() {
  server.handleClient();
}
```

---

## Qué está pasando aquí ⚙️

* `WiFi.begin()` conecta a tu red
* `WebServer` crea el servidor
* El HTML vive dentro del propio código
* El navegador llama endpoints (`/brightness`, `/toggle`)
* PWM controla el LED

---

## Cómo usarlo paso a paso

1. Subes el código
2. Abres el monitor serie
3. Copias la IP que aparece
4. La pegas en el navegador

👉 Y ya tienes tu interfaz funcionando

---

## Detalle importante: PWM en ESP32

El brillo no es “analógico real”, es PWM:

Duty\ Cycle = \frac{Tiempo\ encendido}{Periodo\ total}

Cuanto mayor es el duty cycle → más brillo.

---

## Ideas que salen de aquí 🚀

* Controlar relés (luces de casa)
* Crear paneles IoT
* Leer sensores y mostrarlos en web
* Montar dashboards sin backend

---

Este tipo de montaje es donde el ESP32 empieza a sentirse más como un **mini servidor web que como un microcontrolador clásico**.
