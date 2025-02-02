---
title: Introducción a Docker: Qué es, para qué sirve y cómo empezar
image: https://github.com/user-attachments/assets/e3feebf6-7f3f-4413-b602-2536c854a9c2
date: 19-01-2025
categories: [docker]
tags: [docker]
pin: false
comments: false
render_with_liquid: false
---

# 🐳 Introducción a Docker: Qué es, para qué sirve y cómo empezar

## 🤔 ¿Qué es Docker?

Docker es una plataforma de código abierto que permite automatizar el despliegue de aplicaciones dentro de contenedores. Los contenedores son entornos ligeros y aislados que agrupan todo lo necesario para ejecutar una aplicación, como el código, las bibliotecas y las configuraciones del sistema. Esta tecnología hace que las aplicaciones sean más fáciles de desplegar y ejecutar en diferentes entornos sin preocuparse por las dependencias o configuraciones del sistema subyacente.

### 🚀 ¿Para qué sirve Docker?

Docker es ideal para desarrolladores y equipos de TI que necesitan ejecutar aplicaciones en entornos de prueba, desarrollo y producción de manera consistente. Sus principales ventajas incluyen:

- **Portabilidad**: Las aplicaciones en contenedores pueden ejecutarse de manera idéntica en cualquier sistema, ya sea en tu máquina local, en un servidor de producción o en la nube.
- **Aislamiento**: Cada contenedor es independiente y tiene sus propias dependencias, lo que evita conflictos entre aplicaciones y versiones de software.
- **Escalabilidad**: Docker facilita el escalado de aplicaciones, ya que puedes ejecutar múltiples instancias de un contenedor sin problemas.

## 💻 ¿Cómo instalar Docker?

A continuación, te explico cómo instalar Docker en Windows, Mac y Linux.

### 🖥️ En Windows

1. **Requisitos**: Asegúrate de que tu sistema sea de 64 bits y esté corriendo Windows 10 Pro o Enterprise. Docker utiliza la tecnología de virtualización, por lo que también necesitas habilitar la función de virtualización en la BIOS.
   
2. **Instalación**:
   - Visita la [página de Docker Desktop para Windows](https://www.docker.com/products/docker-desktop).
   - Descarga el instalador y sigue las instrucciones en pantalla.
   - Durante la instalación, Docker instalará una máquina virtual ligera llamada Hyper-V, que es utilizada para ejecutar los contenedores.
   - Una vez instalado, abre Docker Desktop y espera a que inicie.

### 🍏 En Mac

1. **Requisitos**: Asegúrate de tener macOS 10.13 o superior y un procesador de 64 bits compatible con la virtualización.

2. **Instalación**:
   - Ve a la [página de Docker Desktop para Mac](https://www.docker.com/products/docker-desktop).
   - Descarga el archivo `.dmg` y sigue las instrucciones de instalación.
   - Una vez instalado, abre Docker Desktop y espera a que inicie.

### 🐧 En Linux

La instalación de Docker en Linux puede variar según la distribución que utilices. A continuación te muestro los pasos para Ubuntu.

1. **Requisitos**: Ubuntu 18.04 o superior.

2. **Instalación**:
   Abre una terminal y sigue estos comandos:

   ```bash
   sudo apt update
   sudo apt install apt-transport-https ca-certificates curl software-properties-common
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
   sudo apt update
   sudo apt install docker-ce
   ```

3. **Verifica la instalación**:
   ```bash
   sudo docker --version
   ```

## 🌐 Alojamientos de Internet gratis para Docker

Si estás interesado en probar Docker pero no tienes un servidor propio, existen varias plataformas que ofrecen alojamiento gratuito para tus contenedores. Algunas opciones incluyen:

1. **Docker Hub**: El registro oficial de Docker, donde puedes almacenar y compartir imágenes de contenedores. Es una excelente opción si solo necesitas almacenar tus contenedores y acceder a ellos desde cualquier lugar. [Docker Hub](https://hub.docker.com/)

2. **Play with Docker**: Es una plataforma en línea que permite ejecutar contenedores Docker de forma gratuita en un entorno de pruebas. Puedes acceder a un entorno de contenedores para hacer experimentos sin tener que configurar nada en tu computadora local. [Play with Docker](https://labs.play-with-docker.com/)

3. **Heroku**: Aunque originalmente no está centrado en Docker, Heroku permite ejecutar aplicaciones en contenedores Docker en su plataforma como servicio (PaaS). Ofrecen un plan gratuito limitado que puede ser útil para proyectos pequeños. [Heroku Docker](https://devcenter.heroku.com/articles/container-registry-and-runtime)

4. **Railway**: Es una plataforma que permite crear aplicaciones y desplegarlas rápidamente, y también soporta Docker. Ofrecen un plan gratuito con ciertas limitaciones. [Railway](https://railway.app/)

## 🛠️ ¿Cómo empezar a usar Docker?

Una vez que hayas instalado Docker, es hora de comenzar a utilizarlo. Aquí tienes algunos pasos básicos para familiarizarte con la herramienta:

1. **Verificar la instalación**: Abre una terminal o línea de comandos y ejecuta el siguiente comando para verificar que Docker está funcionando correctamente:

   ```bash
   docker --version
   ```

2. **Ejecutar tu primer contenedor**: Uno de los ejemplos más sencillos para comenzar es ejecutar un contenedor con una imagen de **hello-world**, que imprime un mensaje de bienvenida.

   ```bash
   docker run hello-world
   ```

   Esto descargará la imagen desde Docker Hub y ejecutará un contenedor que mostrará un mensaje indicando que Docker se ha instalado correctamente.

3. **Listar contenedores**: Para ver los contenedores que estás ejecutando, usa el siguiente comando:

   ```bash
   docker ps
   ```

4. **Parar un contenedor**: Si tienes un contenedor en ejecución y deseas detenerlo, usa el siguiente comando:

   ```bash
   docker stop <container_id>
   ```

   Puedes obtener el ID del contenedor con el comando `docker ps`.

## 🔍 Páginas interesantes para encontrar contenedores

Hay muchas imágenes de contenedores listas para usar, que van desde aplicaciones web hasta herramientas de desarrollo. Algunas páginas donde puedes encontrar contenedores interesantes incluyen:

- **Docker Hub**: Es la plataforma principal para encontrar imágenes oficiales y de la comunidad. [Docker Hub](https://hub.docker.com/)
- **Awesome Docker**: Una lista curada de recursos y contenedores útiles para Docker. [Awesome Docker](https://github.com/veggiemonk/awesome-docker)
- **GitHub**: Muchos desarrolladores publican sus contenedores y proyectos relacionados con Docker en GitHub. Buscar por palabras clave como "Docker" o "Docker container" te dará muchas opciones.
