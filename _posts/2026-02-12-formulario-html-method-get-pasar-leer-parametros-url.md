---
title: "Method GET: cómo pasar y leer parámetros en la URL (JavaScript y WordPress)"
description: "Guía técnica para entender cómo funciona method GET en formularios HTML, cómo se generan los parámetros en la URL y cómo leer la query string en JavaScript y WordPress paso a paso."
date: 2026-02-11
image: "https://github.com/user-attachments/assets/4c3811d0-b340-40bd-954a-d89dfcd8373c"
categories: [desarrollo-web, javascript, wordpress, html]
tags: [method-get, query-string, parametros-url, javascript, php, wordpress]
faq:
- question: "¿Qué hace method GET en un formulario HTML?"
  answer: "Envía los datos del formulario en la URL como una query string, construyendo pares clave=valor a partir de los atributos name de los inputs."
- question: "¿Cómo se leen parámetros de la URL en JavaScript?"
  answer: "Se pueden leer usando URLSearchParams junto con window.location.search para obtener los valores de cada parámetro."
- question: "¿Cómo acceder a parámetros GET en WordPress?"
  answer: "En WordPress se accede mediante el array global $_GET en PHP, por ejemplo $_GET['checkin']."
- question: "¿Cuándo usar GET en lugar de POST?"
  answer: "GET es recomendable para búsquedas, filtros y datos no sensibles que deban poder compartirse o indexarse."
- question: "¿Por qué usar method GET en un formulario HTML?"
  answer: "Porque envía los datos en la URL como query string, permite compartir la URL con los parámetros incluidos, mejora la indexabilidad y es ideal para búsquedas o filtros no sensibles."
- question: "¿Qué diferencia hay entre GET y POST?"
  answer: "GET envía los datos en la URL y es visible en la barra del navegador. POST envía los datos en el cuerpo de la petición HTTP y no se muestran en la URL."
- question: "¿Cómo leer parámetros de la URL en JavaScript?"
  answer: "Con URLSearchParams usando window.location.search. Permite obtener fácilmente valores como checkin o checkout desde la query string."
- question: "¿Cómo acceder a parámetros GET en WordPress?"
  answer: "En PHP se accede usando $_GET['nombre_parametro']. WordPress permite usar parámetros personalizados sin generar error 404."
---

Al trabajar con formularios para búsquedas (por ejemplo, un motor de reservas), es habitual enviar fechas o filtros en la propia URL 🔎:

```
/reservas?checkin=2026-05-01&checkout=2026-05-05
```

Este comportamiento depende directamente de `method="GET"` y del atributo `name` de los campos del formulario.

Dejo aquí el funcionamiento detallado y cómo recuperar esos valores en la página de destino 🧩.

---

## ⚙️ Cómo funciona method="GET" en un formulario

Ejemplo básico:

```html
<form action="/reservas" method="GET">
  <input type="date" name="checkin" required>
  <input type="date" name="checkout" required>
  <button type="submit">Buscar</button>
</form>
```

Cuando el usuario envía el formulario, el navegador:

1. Recoge todos los campos que tengan atributo `name`.
2. Obtiene sus valores.
3. Construye pares en formato `clave=valor`.
4. Une los pares con `&`.
5. Añade el resultado al `action` precedido por `?`.

Si el usuario selecciona:

* checkin → 2026-05-01
* checkout → 2026-05-05

La URL final será:

```
/reservas?checkin=2026-05-01&checkout=2026-05-05
```

📌 Punto clave:
Si un input no tiene atributo `name`, no se enviará.

Ejemplo incorrecto:

```html
<input type="date" id="checkin">
```

Aquí no se genera ningún parámetro porque falta `name`.

---

<div style="text-align: center;"> <img src="https://media.giphy.com/media/3o7aCTfyhYawdOXcFW/giphy.gif" alt="Formulario HTML enviando datos con method GET" width="300" /> </div>

---

## 🔗 Qué es la Query String

La parte que comienza por `?` se denomina **query string**.

Estructura general:

```
?clave1=valor1&clave2=valor2
```

Se utiliza en:

* Buscadores
* Filtros de ecommerce
* Paginaciones
* Motores de reservas
* Parámetros UTM en marketing 📈

Es un mecanismo estándar del protocolo HTTP.

---

## 🖥️ Cómo leer los parámetros en JavaScript

En la página `/reservas`, se pueden recuperar así:

```javascript
const params = new URLSearchParams(window.location.search);

const checkin = params.get("checkin");
const checkout = params.get("checkout");

console.log(checkin);
console.log(checkout);
```

`window.location.search` devuelve:

```
?checkin=2026-05-01&checkout=2026-05-05
```

`URLSearchParams` permite acceder a cada valor por su clave.

Ejemplo práctico:

```javascript
document.getElementById("info").textContent =
  `Entrada: ${checkin} | Salida: ${checkout}`;
```

---

<div style="text-align: center;"> <img src="https://media.giphy.com/media/l41lVsYDBC0UVQJCE/giphy.gif" alt="JavaScript procesando parámetros de la URL" width="300" /> </div>

---

## 🧱 Cómo leer parámetros GET en WordPress (PHP)

Si la página de destino está en WordPress:

```php
<?php
$checkin = $_GET['checkin'] ?? '';
$checkout = $_GET['checkout'] ?? '';

echo "Entrada: " . esc_html($checkin);
echo "Salida: " . esc_html($checkout);
?>
```

`$_GET` es un array asociativo con todos los parámetros de la query string.

Uso recomendado:

* Validar los valores.
* Sanitizar con `esc_html()` u otras funciones de escape.
* Comprobar que existen antes de usarlos 🔐.

---

## ⚖️ Diferencia técnica entre GET y POST

| Método | Ubicación de los datos | Visible en URL | Uso típico            |
| ------ | ---------------------- | -------------- | --------------------- |
| GET    | Query string           | Sí             | Búsquedas y filtros   |
| POST   | Body de la request     | No             | Formularios sensibles |

GET es apropiado cuando:

* Los datos no son sensibles.
* Se quiere compartir la URL.
* Se desea indexabilidad.
* Se trabaja con filtros o búsquedas.

---

## 🧪 Construcción manual de la URL con JavaScript

Si se quiere validar antes de redirigir:

```html
<form id="buscador">
  <input type="date" id="checkin" required>
  <input type="date" id="checkout" required>
  <button type="submit">Buscar</button>
</form>

<script>
document.getElementById("buscador").addEventListener("submit", function(e) {
  e.preventDefault();

  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;

  if (checkout <= checkin) {
    alert("La salida debe ser posterior a la entrada.");
    return;
  }

  const url = `/reservas?checkin=${checkin}&checkout=${checkout}`;
  window.location.href = url;
});
</script>
```

Aquí ya no dependemos del envío automático del formulario, sino que generamos la query string explícitamente ⚙️.

---

Este patrón (GET + query string + lectura en destino) es la base de buena parte de la web moderna: filtros, buscadores, motores de reservas, sistemas de tracking y aplicaciones híbridas 🚀.

Entenderlo bien simplifica mucho cualquier integración entre frontend y backend.
