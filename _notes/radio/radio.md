---
title: Radio
date: 2026-08-08
layout: post
notebook: Radio
resumen: "Notas de todo lo necesario para un radioaficionado"
toc: true
---

## Enlaces interesantes

[Flashear online](https://egzumer.github.io/uvtools/?firmwareURL=https://github.com/egzumer/uv-k5-firmware-custom/releases/download/v0.17/egzumer_v0.17.packed.bin)

[Mods carga online](https://whosmatt.github.io/uvmod/)

[📍 Repo con firmwares de diferentes modders (Revisar versiones porque no se cogen de los repos oficiales)](https://github.com/spm81/Quansheng_UV-K5/tree/main/Firmware/UNIVERSAL%20FIRMWARE%20(%20All%20Radios%20-%20UV-K5%2C%20UV-K5(8)%2C%20UV-K6%2C%20UV-5R%20Plus%2C%20etc...)/Custom%20Firmware%20by%20Matoz)

---


## Cómo conectar tu Quansheng UV-K5 para control remoto
La aplicación de la imagen inicial (PocketHam shack) no es compatible directamente con el Quansheng UV-K5, ya que está diseñada para transceptores de base de alta gama (Icom, Yaesu, Kenwood).
Sin embargo, puedes lograr una experiencia de control remoto o programación similar utilizando dos métodos diferentes:
------------------------------
## Opción 1: Control inalámbrico por Bluetooth (Desde el móvil)
Ideal si buscas comodidad para gestionar tu "walkie-talkie" desde el smartphone sin usar cables.

* 
* El Hardware: Necesitas un programador inalámbrico con conector de dos pines tipo Kenwood (como el TIDRADIO Wireless Programmer o el módulo Odmaster).
* La Aplicación: Descarga en tu móvil la app gratuita Odmaster.
* El Proceso:
1. Conecta el módulo Bluetooth al puerto de micro/altavoz del Quansheng.
   2. Enciende la radio.
   3. Abre la app Odmaster en tu smartphone y emparéjala por Bluetooth.
   4. Desde ahí podrás leer la radio, modificar frecuencias, cambiar configuraciones y guardar canales en tiempo real.
* 

------------------------------
## Opción 2: Control remoto total por Cable (Desde la PC)
Ideal si quieres replicar la experiencia de la imagen original: controlar la radio desde una pantalla con botones virtuales, clonación de pantalla en tiempo real y analizador de espectro.

* 
* El Hardware: Requiere el clásico cable de programación USB a dos pines K (el mismo que usan los equipos Baofeng).
* El Firmware (Paso Clave): El software original de fábrica no permite el control remoto interactivo. Debes instalar un firmware modificado en tu Quansheng (como el de Egzumer o IJV) que tenga activada la función UART_RC (Remote Control). Puedes flashearlo en 2 minutos desde el navegador de tu PC usando herramientas web como [uv-k5-firmware-rx](https://github.com/egzumer/uv-k5-firmware-custom).
* El Software: Instala en tu ordenador el programa gratuito Quansheng Dock o utiliza herramientas web de control serial.
* El Proceso: Al conectar el cable USB al PC y abrir el programa, verás un clon digital de la pantalla del Quansheng en tu monitor. Podrás cambiar de frecuencia con el teclado de la computadora, ajustar el volumen y operar la radio de forma remota.
* 

------------------------------

Para flasheando desde la web, configurar el control remoto total desde el PC necesitas instalar un binario específico que habilite la comunicación bidireccional en tiempo real (comandos CAT) y usar el software adecuado. Sigue estos pasos para dejarlo listo: [1] 
## Paso 1: Flashear el firmware con soporte de control remoto
Aunque el firmware popular de Egzumer es excelente, para usar el panel de control remoto virtual necesitas el firmware específico desarrollado por Nic Shaw, el cual incluye el protocolo UART interactivo necesario para comunicarse con la computadora. [1, 2] 

   1. Apaga tu Quansheng UV-K5. [3] 
   2. Mantén presionado el botón PTT y, sin soltarlo, enciende la radio. La linterna superior se quedará encendida fija y la pantalla permanecerá en blanco. Esto indica que entró en modo DFU (Flasheo). [4, 5, 6, 7] 
   3. Conecta firmemente el cable de dos pines a la radio y el extremo USB a tu ordenador. [4, 8] 
   4. Abre tu navegador (Google Chrome o Microsoft Edge) y entra al flasheador web oficial en el [Repositorio de Firmware Quansheng Dock en GitHub](https://github.com/nicsure/QuanshengDock). [9, 10] 
   5. Haz clic en el botón interactivo ⚡ FLASH WITH A BROWSER ⚡. [4] 
   6. En la ventana emergente, pulsa Connect, selecciona el puerto COM correspondiente a tu cable USB y presiona Flash. Espera a que la barra llegue al 100%. [7, 11] 

## Paso 2: Descargar el programa de control para la PC
Una vez que tu radio tiene el firmware adecuado instalado, necesitas la interfaz virtual para operarla: [12] 

   1. Ve a la sección de descargas del software en las Releases de QuanshengDock en GitHub.
   2. Descarga el archivo comprimido .zip de la última versión disponible.
   3. Descomprime la carpeta en cualquier lugar de tu computadora (es un programa portátil, no requiere instalación compleja).
   4. Nota de sistema: Asegúrate de tener instalado .NET 6 Runtime de Microsoft en tu PC, ya que el programa lo requiere para ejecutarse correctamente. [2, 3] 

## Paso 3: Conexión y ejecución

   1. Apaga y vuelve a encender la radio de manera normal (para salir del modo flasheo) y déjala conectada por cable al ordenador.
   2. Entra en la carpeta que descomprimiste y ejecuta el archivo QuanshengDock.exe.
   3. Dentro del programa, selecciona el puerto COM asignado a tu cable y haz clic en Connect. [2, 8, 11, 13] 

¡Listo! Verás cómo aparece una réplica exacta de la pantalla de tu Quansheng en el monitor de tu PC. Podrás usar el ratón y el teclado para cambiar de frecuencias, abrir el analizador de espectro integrado y gestionar el VFO de manera idéntica a la aplicación que viste originalmente. [9] 
Dime si lograste abrir el instalador web o si te surge alguna duda al identificar tu puerto COM en el Administrador de dispositivos de Windows. [14] 

[1] [https://www.youtube.com](https://www.youtube.com/watch?v=KbEFBB1haY4&t=45)
[2] [https://github.com](https://github.com/nicsure/QuanshengDock)
[3] [https://www.facebook.com](https://www.facebook.com/groups/6780091945388779/posts/7615239235207375/)
[4] [https://github.com](https://github.com/egzumer/uv-k5-firmware-custom/wiki/Flashing-the-firmware)
[5] [https://www.youtube.com](https://www.youtube.com/watch?v=9T6JeLNWSoo)
[6] [https://www.reddit.com](https://www.reddit.com/r/Quansheng/comments/1pcf6tb/help_with_uvk58_firmware_flashing/)
[7] [https://www.facebook.com](https://www.facebook.com/groups/6780091945388779/posts/7237319876332648/)
[8] [https://www.youtube.com](https://www.youtube.com/watch?v=J33Y1RI0Xio)
[9] [https://hamradiodx.net](https://hamradiodx.net/remote-control-quansheng-dock-uv-k5/)
[10] [https://www.facebook.com](https://www.facebook.com/groups/6780091945388779/posts/26719478384356840/)
[11] [https://red-orbita.com](https://red-orbita.com/posts/2025/05/manual-para-actualizar-el-firmware-del-quansheng-uv-k5-uv-k58-uv-k6/)
[12] [https://ke2yk.com](https://ke2yk.com/2024/01/10/elevate-your-radio-control-with-quansheng-dock-a-comprehensive-guide/)
[13] [https://www.youtube.com](https://www.youtube.com/watch?v=vgVocQpSF7s&t=403)
[14] [https://www.facebook.com](https://www.facebook.com/groups/6780091945388779/posts/26719478384356840/)
