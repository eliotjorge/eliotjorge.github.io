---
title: ESP32 C3 LVGL
date: 2026-04-10
layout: note
notebook: Microcontroladores
resumen: "Módulo de desarollo ESP32 con pantalla redonda de 1.28'"
color: "--cuaderno-marron"
toc: true
---

<img width="500" height="500" alt="imagen de la placa ESP32 C3" src="https://github.com/user-attachments/assets/7e104f5b-8255-44d0-9238-9756dca29d07" />


## Flujo para compilar y subir
1. Codespaces:
```bash
pio run
```
2. Descargas:
`firmware.bin`
3. En cualquier PC:
- abres [**WEB ESP Tool**](https://esptool.spacehuhn.com/){:target="_blank"}
- conectas ESP32
- subes `.bin`

---
---

## Compilar **Firmware.bin** en codespace de Github

- Hacemos fork del [repo de Github del proyecto](https://github.com/fbiego/esp32-c3-mini/){:target="_blank"} y creamos un Codespace como siempre.

- Tenemos que tenre instalado la Extensión **PlatformIO** (Si lo tenemos en nuestra config de VSCode con sincronizar el archivo ya aparecerá)
 
- Cuando le demos la primera vez instalará el IDE en VSCode.

- Cuando esté instalado en la parte de abajo de VSCode aparecerán unos iconos que son shortcuts a los comandos de PlatforIO

<img width="677" height="27" alt="image-2" src="https://github.com/user-attachments/assets/7e4c60bd-a55e-41e7-8985-cab82a26073b" />

- El que nos interesa es el check que compila el firmware.bin en la carpeta '.pio/buil/lolin_c3_mini' que tenemos que descargar.

- Tenemos que configurar el entorno de PlatformIO para que haga la build para nuestra placa si no no encenderá o los pines del backlight no estarán configurados.

- ⚠️ Para cambiar el entorno abrimos el archivo `platformio.ini` y en la parte de arriba comentar todo y sólo dejar el de nuestra paca.

- ⚠️ Viene por defecto `default_envs = elecrow_c3_1_28 ; ELECROW C3 LCD 1.28 240x240` y nuestra placa **NO ES ESA**

- Comentar con `;` y descomentar `default_envs = lolin_c3_mini ; ESP32-C3 LVGL 1.28 240x240` La primera vez que hagamos una compilación tardará mucho (8min apox.) porque configura el entorno para la nueva placa.

<img width="723" height="572" alt="Captura de pantalla 2026-04-10 143845" src="https://github.com/user-attachments/assets/30806fb4-dde0-47c7-a31a-95ead5e400fa" />

---

## Flasear ESP32 Online

- Al conectar la placa al ordenador para progamarla, hay que mantener pulsado el botón Boot.

- Para programarla sep eude usar el programa de Arduino o de manera online el WEB ESP Tool 👇

[**WEB ESP Tool** - para flashear Placas ESP32 online](https://esptool.spacehuhn.com/){:target="_blank"}

- Cuando conectamos la placa a la web (pide que selecciones la placa en un pop-up) aparecen 4 espacios de memoria.

<img width="701" height="851" alt="Captura de pantalla 2026-04-09 221626" src="https://github.com/user-attachments/assets/73a6fe73-5121-4d25-ac16-d8f219297ce6" />


- El que nos interesa es el "0x10000"

| Dirección | Qué es                         |
| --------- | ------------------------------ |
| `0x1000`  | bootloader                     |
| `0x8000`  | tabla de particiones           |
| `0xE000`  | OTA / config                   |
| `0x10000` | 👉 TU firmware (el importante) |

- Podemos pulsar en la papelera de la derecha porque lo que hace es borrar de las opciones para subirlo, pero con no seleccionar archivo es suficiente

- Hay que seleccionar un archivo `.bin` que es el que tendrá el sistema operativo llamado Firmware. De hecho el archivo es normal que se llame "Firmware.bin"

- Cuando se cargue se pincha en **Program** que te preguntará que si quieres sobreescribir. Sí queremos.

---

## Archivos importantes

- Antes de descubrir que la placa que se usaba en el entorno era la incorrecta iba a cambiar los pines del backlight.

- Hay una carpeta que se llama **hal** donde hay configuraciones de la placa, vemos que hay una subcarepta esp32 y dento hay archivos como `app_hal.cpp` o una carpeta `displays` donde tengo **pins.h** que es la deficinión de los pines para el esp32 si son de salida, entrada...

<img width="166" height="287" alt="image" src="https://github.com/user-attachments/assets/a2e8ed4a-fc52-4954-87cd-d5abaf4e619e" />

- Hay 2 tipos de archivo de código:
    - **.h** → definiciones (cabeceras)
    - **.cpp** → código real (C++)
    - **.p** → probablemente archivo auxiliar / compilado / raro del repo

- Otro archivo que nos interesa **src/ui/ui.c** aqui

-------

## Directorio **hal/esp32/**

<img width="215" height="285" alt="image" src="https://github.com/user-attachments/assets/8a082408-8913-4eec-ac8c-3445e0a2b9a8" />

### Archivo **app_hal.cpp**

- En este archivo tenemos las definiciones de las funciones del ESP32 y la pantalla. Tenemos algunas funciones para cada placa, pero otras que se ejecutan por defecto (si no es ninguna de las placas/pantallas que hemos definido).

- Por ejemplo tenemos `M5_STACK_DIAL` este stack de pantalla y ESP32 además tiene un dial giratorio en el exterior.
Otro de los stacks tiene un botón físico de home, así que hay que controlar esa función.
Otro tiene la opción de vibración, otro no tiene control de brillo de pantalla y esta siempre fixed...

- Dentro de este archivo se llama a "loadSplash();" que supongo que es la pantalla de inicio.
  
```
void loadSplash()
{
  int w = 122;
  int h = 130;
  int x = (SCREEN_WIDTH - w) / 2;
  int y = (SCREEN_HEIGHT - h) / 2;
  tft.fillScreen(TFT_BLACK);
  screenBrightness(200);
  tft.pushImage(x, y, w, h, (uint16_t *)splash);
  delay(2000);
}
```

Que como vemos tiene un delay de 2 segundos y se llama a `splash` que es un archivo que se encuentra en `include/splash.h` y es una imagen convertida en imagenes de Arduino (**investigar esto**).


---

## Directorio **src/ui/**

### 🧠 1. Lo que estás viendo

Dentro de `src/ui/` tienes:

```
ui.c
ui.h
ui_helpers.c
ui_helpers.h
ui_events.h
custom_face.c
custom_face.h
assets/
```

👉 Esto NO es aleatorio, tiene sentido:

---

### 🧩 2. Qué es cada archivo (clave total)

#### 🟢 `ui.c` → 🔥 EL IMPORTANTE

👉 Aquí se construye la interfaz

Es donde encontrarás:

* creación de pantallas
* imágenes (los logos que ves)
* labels, etc.

💥 ESTE es el archivo que vamos a tocar primero

---

#### 🔵 `ui.h`

👉 Solo declaraciones (no lógica)

Ejemplo:

```cpp
extern lv_obj_t * ui_Screen1;
```

👉 No lo toques de momento

---

#### 🟡 `ui_helpers.c`

👉 funciones auxiliares de LVGL

* animaciones
* estilos
* helpers

👉 tampoco lo toques aún

---

#### 🟣 `ui_events.h`

👉 eventos (botones, interacciones)

👉 ahora mismo no nos interesa

---

#### 🔴 `custom_face.c` → 👀 MUY interesante

👉 Esto suele ser:

* “watchface”
* diseño personalizado del reloj

💥 Aquí puede estar parte de lo que ves en pantalla

---

#### 📦 `assets/`

👉 imágenes (logos, iconos)

Ahí estará algo tipo:

* logo
* fondos

---

### 🧠 3. Dónde está tu pantalla de inicio REAL

👉 En este repo hay dos posibilidades:

##### 🅰️ Opción 1 (la típica)

Está en:

```id="3xb5cj"
ui.c
```

---

##### 🅱️ Opción 2 (MUY probable aquí)

👉 Está en:

```id="9k0m1q"
custom_face.c
```

Porque el nombre indica:
👉 “cara de reloj” (watchface)

---

### 🔍 4. Vamos a encontrarla (paso exacto)

En **VS Code / Codespaces**:

##### 🔎 Busca:

```id="rhz5s2"
lv_img_set_src
```

o:

```id="1g4nq9"
lv_img_create
```

---

💥 Eso te lleva DIRECTO a los logos

---

### 🎯 5. Qué espero que encuentres

Algo así:

```cpp
lv_obj_t * img = lv_img_create(parent);
lv_img_set_src(img, &ui_img_xxx);
```

👉 ESO es lo que ves al arrancar

---

### 🧠 6. Flujo real del programa

Para que lo entiendas del todo:

```id="1hm5g1"
main.cpp
   ↓
ui_init()
   ↓
ui.c crea pantalla
   ↓
custom_face.c añade diseño
```

---

## Archivo **ui.c**

### 🧠 1. Qué estás viendo exactamente

Esta función:

```cpp
ui_clockScreen_screen_init()
```

👉 construye COMPLETAMENTE la pantalla principal

Todo lo que ves en pantalla es esto:

---

#### 🧩 Estructura real (simplificada)

```text
ui_clockScreen (fondo negro)
├── hora ("20")
├── minutos ("28")
├── fecha ("08 July")
├── día ("Sunday")
├── icono tiempo ☁️
├── temperatura "--°C"
├── AM/PM
└── panel de notificaciones (oculto)
```

---

### 🎯 2. Lo importante: YA CONTROLAS LA UI

Cada cosa que ves es una línea tipo:

```cpp
lv_label_create(...)
lv_image_create(...)
```

👉 Eso es lo que vas a modificar

---

### 🔥 3. Objetivo: convertir esto en cuadro del Mini

Vamos a hacer una versión SIMPLE primero:

👉 quitar todo lo innecesario
👉 dejar solo lo importante
👉 añadir tus datos (RPM, velocidad)

---

### ✂️ 4. LIMPIEZA (primer paso seguro)

Puedes comentar TODO esto sin miedo:

---

#### ❌ Quitar fecha

```cpp
// ui_dateLabel = lv_label_create(ui_clockScreen);
```

---

#### ❌ Quitar clima

```cpp
// ui_weatherIcon = lv_image_create(ui_clockScreen);
// ui_weatherTemp = lv_label_create(ui_clockScreen);
```

---

#### ❌ Quitar día

```cpp
// ui_dayLabel = lv_label_create(ui_clockScreen);
```

---

#### ❌ Quitar AM/PM

```cpp
// ui_amPmLabel = lv_label_create(ui_clockScreen);
```

---

#### ❌ Quitar alert panel

Todo este bloque:

```cpp
ui_alertPanel = lv_obj_create(ui_clockScreen);
...
```

👉 fuera (o comentado)

---

### 🎨 5. DEJA SOLO esto

👉 hora y minutos (de momento)

```cpp
ui_hourLabel
ui_minuteLabel
```

---

### 🚗 6. Ahora: tu primer “cuadro de instrumentos”

Añade esto AL FINAL de la función:

---

#### 🌀 RPM

```cpp
lv_obj_t * rpmLabel = lv_label_create(ui_clockScreen);
lv_label_set_text(rpmLabel, "RPM: 0");
lv_obj_align(rpmLabel, LV_ALIGN_TOP_MID, 0, 10);
lv_obj_set_style_text_font(rpmLabel, &lv_font_montserrat_20, 0);
```

---

#### 🚗 Velocidad

```cpp
lv_obj_t * speedLabel = lv_label_create(ui_clockScreen);
lv_label_set_text(speedLabel, "0 km/h");
lv_obj_align(speedLabel, LV_ALIGN_CENTER, 0, 0);
lv_obj_set_style_text_font(speedLabel, &lv_font_montserrat_48, 0);
```

---

#### 🔋 Voltaje (opcional)

```cpp
lv_obj_t * voltLabel = lv_label_create(ui_clockScreen);
lv_label_set_text(voltLabel, "12.4V");
lv_obj_align(voltLabel, LV_ALIGN_BOTTOM_MID, 0, -10);
lv_obj_set_style_text_font(voltLabel, &lv_font_montserrat_16, 0);
```

---

### 🧠 7. MUY importante (esto te hará avanzar rápido)

👉 No borres cosas aún
👉 solo comenta

Así puedes volver atrás fácil

---

### 🎯 8. Qué vas a conseguir con esto

Cuando compiles:

👉 pantalla negra limpia
👉 texto grande en el centro
👉 RPM arriba
👉 voltaje abajo

💥 Ya parecerá un cuadro digital

---

### 🚀 9. Siguiente paso (después de esto)

Cuando lo tengas:

👉 sustituimos valores fijos por dinámicos:

```cpp
lv_label_set_text_fmt(speedLabel, "%d km/h", velocidad);
```
## OpenCode

El código está guardado **localmente** en tu PC:

**Archivos modificados:**
- `C:\esp32-c3-mini\hal\esp32\app_hal.cpp` (84KB) - lógica principal
- `C:\esp32-c3-mini\src\ui\ui.c` - panel de configuración UI
- `C:\esp32-c3-mini\src\ui\ui.h` - declaraciones
- `C:\esp32-c3-mini\src\ui\ui_events.h` - eventos

**Para compilar**, ejecuta en tu máquina donde tengas PlatformIO:

```bash
cd C:\esp32-c3-mini
pio run
```

El .bin se generará en `.pio/build/lolin_c3_mini/firmware.bin` (u otro entorno que uses).

---

---

## Canal de Youtube @ThatProject con proyectos de ESP-32

[**Canal @ThatProject**](https://www.youtube.com/@ThatProject){:target="_blank"}

Tiene vídeos muy interesantes y una herramienta para generar tiles de mapas y poder meter mapas offline en el ESP-32 y consultarlos como un GPS.

<img width="320" height="180" alt="captura video de youtube" src="https://github.com/user-attachments/assets/ad6c16f1-e228-46b3-aa0d-1b15d652fdd6" />

[**Vídeo** Offline Map Viewer with ESP32 and Round Display](https://www.youtube.com/watch?v=Kyjf24e-Poo){:target="_blank"}

### Enlaces herramientas (descripción del vídeo)

[Offline Map Downloader](https://github.com/0015/OfflineMapDownloader){:target="_blank"}

[LVGL Map Tile Converter](https://github.com/0015/map_tiles/tree/main/script){:target="_blank"}

[Map Tiles Component for LVGL 9.x](https://components.espressif.com/components/0015/map_tiles/versions/2.0.0/readme){:target="_blank"}

---

### Short mostrando una pantalla redonda con ESP-32

<img width="480" height="360" alt="jcGIl11Qf3Y-HQ" src="https://github.com/user-attachments/assets/415fc686-6a18-4297-9fe0-b3359530a90b" />

[Short enseñando la navegación en ESP-32 con pantalla](https://www.youtube.com/shorts/jcGIl11Qf3Y){:target="_blank"}

En resumen genera la ruta en el ordenador con los programas de su Github y los exporta para guardarlos en la micro SD que mete en el ESP-32. De esta manera no hace falta conexión a internet ni tener un móvil que le mande las indicaciones al ESP-32.

#### Enlaces descripción del short

Turn-by-turn navigation on an ESP32-S3 with a 1.75″ round AMOLED. Maps and routes load from a microSD card, so it works with no phone, no internet and no subscription.

[map_tiles, the ESP-IDF component](https://github.com/0015/map_tiles){:target="_blank"}

[Navigation firmware](https://github.com/0015/map_tiles_projects/tree/main/v2/01.Navigation_ESP32-S3-Touch-AMOLED-1.75){:target="_blank"}

[Map & route packager](https://github.com/0015/OfflineMapDownloader){:target="_blank"}

[Firmware navegación offline](https://github.com/0015/map_tiles_projects/blob/main/v2/README.md){:target="_blank"}


### Tutorial LVGL 9

[[Ep. 01], From Scratch to Benchmark, For newbie/beginner/starter](https://www.youtube.com/watch?v=s4_fUwhw-dI){:target="_blank"}


---

## 💡 IDEAS

- Usar otro microcontrolador como el ESP32 82266 para aunar todas las señales de los sensores, RPM... porque tiene 9 pines digitales y 1 analógico y pasar esos datos al ESP de la pantalla porque solo tiene un puerto de entrada (RT, TX), un IO8 y el USB.
  
<img width="250" alt="image" src="https://github.com/user-attachments/assets/6e42ef8a-13c6-4e20-8f97-6a69f9dd34c7" />

-  A lo mejor se puede usar uncluso comunicación por USB entre los dos dispositivos.
