---
title: "WordPress CLI (WP-CLI): guía completa para gestionar WordPress desde el terminal"
description: "Guía completa sobre WordPress CLI (WP-CLI): qué es, para qué sirve, cómo conectarse por SSH, comandos esenciales, actualizaciones, gestión de plugins, edición de functions.php y administración avanzada desde el terminal."
date: 2026-02-11
image: https://github.com/user-attachments/assets/885a050e-3cfc-4ae6-a8f8-bed89e40823e
categories: [wordpress,desarrollo-web]
tags: [wordpress,wp-cli,ssh,terminal,administracion-servidor,automatizacion]
faq: 
- question: "¿Qué es WP-CLI en WordPress?"
  answer: "WP-CLI es la interfaz de línea de comandos oficial de WordPress que permite gestionar el CMS desde el terminal mediante SSH, incluyendo actualizaciones, plugins, usuarios y base de datos."
- question: "¿Es necesario usar SSH para utilizar WordPress CLI?"
  answer: "Sí, normalmente se utiliza SSH para acceder al servidor y ejecutar WP-CLI desde el terminal, aunque también puede usarse en entornos locales como Local, Laragon o Docker."
- question: "¿Se puede actualizar WordPress desde la línea de comandos?"
  answer: "Sí, con el comando 'wp core update' se puede actualizar WordPress directamente desde el terminal sin necesidad de acceder al panel de administración."
- question: "¿Cómo desactivar un plugin con WP-CLI?"
  answer: "Se puede desactivar un plugin con el comando 'wp plugin deactivate nombre-del-plugin' ejecutado desde el directorio raíz de WordPress."
- question: "¿WP-CLI es seguro?"
  answer: "WP-CLI es seguro si el acceso SSH está correctamente configurado y protegido mediante claves públicas y privadas, evitando el uso de contraseñas simples."
---

Cuando necesitas automatizar tareas, gestionar múltiples instalaciones o resolver un problema sin acceso al backend… el terminal empieza a tener sentido.

Ahí entra **WP-CLI**, la interfaz de línea de comandos oficial de WordPress.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/Zx1KzuQBR8wIbrm81t/giphy.gif" alt="Terminal ejecutando comandos de WordPress CLI" width="300" />
</div>

Hoy dejo por aquí una guía clara sobre:

* Qué es WP-CLI
* Para qué sirve
* Cómo conectarse
* Comandos esenciales
* Cómo actualizar WordPress
* Cómo gestionar plugins y archivos como `functions.php`

---

## ¿Qué es WordPress CLI (WP-CLI)?

**WP-CLI** es una herramienta oficial que permite administrar WordPress desde el terminal mediante comandos.

En lugar de:

* Entrar en `/wp-admin`
* Hacer clic en “Actualizar”
* Activar/desactivar plugins manualmente

Puedes ejecutar algo como:

```bash
wp plugin update --all
```

Y listo.

Es especialmente útil para:

* 🔧 Mantenimiento de servidores
* 🚀 Automatización
* 🛠 Gestión de múltiples webs
* 🔒 Recuperación cuando el admin no funciona

---

## Cómo conectarse para usar WP-CLI 🔐

Para utilizar WP-CLI necesitas acceso al servidor.
Normalmente se hace mediante **SSH**.

Si no tienes claro qué es SSH o cómo conectarte con claves públicas y privadas, aquí lo explico paso a paso:

👉 [SSH: cómo conectarse a un servidor de forma segura (claves, PuTTY y WordPress)](https://jorgerosa.dev/posts/ssh-conexion-servidor-claves-publicas-privadas-putty-wordpress/)

Una vez conectado por SSH:

```bash
ssh usuario@tuservidor.com
```

Debes situarte en el directorio donde está instalado WordPress:

```bash
cd public_html
```

Y comprobar que WP-CLI funciona:

```bash
wp --info
```

Si todo está correcto, verás información sobre la versión de PHP, WordPress y WP-CLI.

---

## Comandos básicos de WP-CLI

### 🔄 Actualizar WordPress

Actualizar el core:

```bash
wp core update
```

Actualizar la base de datos después de una actualización:

```bash
wp core update-db
```

---

### 🔌 Gestionar plugins

Listar plugins instalados:

```bash
wp plugin list
```

Actualizar todos los plugins:

```bash
wp plugin update --all
```

Desactivar un plugin:

```bash
wp plugin deactivate nombre-del-plugin
```

Activar un plugin:

```bash
wp plugin activate nombre-del-plugin
```

Desinstalar un plugin:

```bash
wp plugin delete nombre-del-plugin
```

Esto es especialmente útil cuando un plugin rompe la web y no puedes acceder al admin 😅

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/l2JIireYxichTAGpq/giphy.gif" alt="Error en WordPress solucionado desde el terminal" width="300" />
</div>

---

### 🎨 Gestionar temas

Listar temas:

```bash
wp theme list
```

Activar un tema:

```bash
wp theme activate nombre-del-tema
```

---

## Crear y gestionar usuarios

Crear un usuario administrador:

```bash
wp user create nuevoadmin admin@midominio.com --role=administrator --user_pass=contraseña_segura
```

Listar usuarios:

```bash
wp user list
```

Cambiar contraseña:

```bash
wp user update 3 --user_pass=nueva_contraseña
```

Muy útil si pierdes acceso al panel.

---

## Editar archivos como functions.php desde el terminal ✍️

WP-CLI no edita directamente archivos PHP, pero puedes hacerlo desde la propia terminal usando editores como:

```bash
nano wp-content/themes/tu-tema/functions.php
```

o

```bash
vim wp-content/themes/tu-tema/functions.php
```

Esto permite:

* Añadir hooks
* Insertar funciones personalizadas
* Corregir errores rápidamente

Ejemplo sencillo en `functions.php`:

```php
add_action('wp_footer', function() {
    echo '<p style="text-align:center;">Web mantenida con WP-CLI</p>';
});
```

Guardar, salir… y listo.

---

## Ejecutar consultas en la base de datos

WP-CLI también permite lanzar consultas SQL:

```bash
wp db query "SELECT ID, post_title FROM wp_posts WHERE post_status = 'publish' LIMIT 5;"
```

O exportar la base de datos:

```bash
wp db export backup.sql
```

Esto es oro cuando necesitas migrar una web o hacer backups rápidos.

---

## Automatización y mantenimiento avanzado ⚙️

Aquí es donde WP-CLI brilla de verdad.

Puedes crear scripts bash como:

```bash
#!/bin/bash
wp core update
wp plugin update --all
wp theme update --all
wp cache flush
```

Y programarlos con cron para mantenimiento automático.

Para alguien que gestiona varias webs WordPress, esto cambia completamente el flujo de trabajo.

---

## ¿Cuándo merece la pena usar WP-CLI?

En mi experiencia:

* Si gestionas **una sola web pequeña**, quizá no lo necesites.
* Si gestionas **varias instalaciones** o trabajas en servidor → imprescindible.
* Si eres desarrollador → te ahorra muchísimo tiempo.

WP-CLI convierte WordPress en algo mucho más cercano a un entorno profesional de desarrollo.
