---
layout: post
title: "La Command Palette de WordPress: cómo añadir comandos personalizados a tus plugins"
description: "Descubre cómo funciona la Command Palette de WordPress y cómo añadir comandos personalizados a tus plugins con registerCommand en Gutenberg. Ejemplos, código y usos prácticos para desarrolladores."
date: 2026-05-20
categories: [wordpress, gutenberg, desarrollo-web, javascript]
tags: [wordpress, gutenberg, command-palette, plugins, javascript, desarrollo-wordpress, gutenberg-api, wp-admin, bloques, frontend]
faq:
  - question: "¿Qué es la Command Palette de WordPress?"
    answer: "Es una ventana de comandos integrada en WordPress que permite navegar y ejecutar acciones rápidas mediante teclado usando Ctrl+K o Cmd+K."
  - question: "¿Cómo se abre la Command Palette en WordPress?"
    answer: "Se abre pulsando Ctrl+K en Windows/Linux o Cmd+K en macOS dentro del panel de administración de WordPress."
  - question: "¿Se pueden añadir comandos personalizados a WordPress?"
    answer: "Sí. Los desarrolladores pueden registrar comandos personalizados mediante JavaScript usando el paquete @wordpress/commands."
  - question: "¿Qué se necesita para añadir comandos a un plugin?"
    answer: "Necesitas cargar JavaScript en el administrador de WordPress y usar dispatch(commandsStore).registerCommand() para registrar acciones."
  - question: "¿Funciona en cualquier plugin de WordPress?"
    answer: "Sí, siempre que el plugin cargue correctamente los paquetes de Gutenberg necesarios en el administrador."
---

Hay pequeñas funcionalidades que cambian bastante la forma de moverse por el panel de administración de WordPress 😄 Y una de ellas es la *Command Palette* integrada en Gutenberg.

Si pulsas `Ctrl + K` (o `⌘ + K` en Mac) dentro del admin de WordPress aparece una ventana flotante desde la que puedes buscar páginas, navegar por el panel y ejecutar acciones rápidas.

Muy estilo:

* VS Code
* Notion
* Raycast
* Obsidian

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif" alt="Ventana de comandos apareciendo rápidamente en una interfaz" width="300" />
</div>

Y lo interesante como desarrollador no es solo usarla. Lo potente es que puedes añadir tus propios comandos a plugins personalizados 🚀

# Qué permite hacer la Command Palette

La paleta de comandos de WordPress permite:

* navegar rápidamente por el admin,
* abrir páginas concretas,
* crear contenido,
* acceder a plantillas,
* ejecutar acciones rápidas,
* buscar bloques y herramientas.

Por ejemplo, puedes escribir:

* `Plugins`
* `Entradas`
* `Nueva página`
* `Patrones`
* `Editor del sitio`

Y WordPress te lleva directamente.

Documentación oficial:

* [https://developer.wordpress.org/block-editor/reference-guides/packages/packages-commands/](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-commands/)
* [https://wordpress.org/documentation/article/command-palette/](https://wordpress.org/documentation/article/command-palette/)

# Lo interesante para desarrolladores de plugins

Aquí es donde la cosa se pone realmente útil 👀

La API permite registrar comandos personalizados desde JavaScript, así que un plugin puede añadir acciones específicas directamente al `Ctrl + K`.

Por ejemplo:

* Limpiar caché
* Regenerar miniaturas
* Abrir ajustes del plugin
* Crear datos de prueba
* Lanzar imports
* Sincronizar usuarios
* Abrir una sección concreta del admin
* Ejecutar herramientas internas

En plugins grandes esto mejora muchísimo la experiencia de uso.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Desarrollador programando rápidamente en el ordenador" width="300" />
</div>

# Cómo registrar un comando personalizado en WordPress

La API se basa en el paquete `@wordpress/commands`.

Un ejemplo sencillo sería este:

```js
import { dispatch } from '@wordpress/data';
import { store as commandsStore } from '@wordpress/commands';

dispatch( commandsStore ).registerCommand({
    name: 'mi-plugin/abrir-ajustes',
    label: 'Abrir ajustes de Mi Plugin',
    callback: () => {
        window.location.href = '/wp-admin/admin.php?page=mi-plugin';
    },
});
```

Ese comando aparecerá automáticamente en la Command Palette.

Al pulsarlo:

* WordPress ejecutará el callback,
* y abrirá la página del plugin.

# Cómo cargar el JavaScript desde el plugin

El script puede cargarse usando `enqueue_block_editor_assets` o cargándolo directamente en administración.

Ejemplo:

```php
function mi_plugin_command_palette_assets() {

    wp_enqueue_script(
        'mi-plugin-command-palette',
        plugin_dir_url(__FILE__) . 'command-palette.js',
        array(
            'wp-data',
            'wp-commands'
        ),
        '1.0',
        true
    );

}

add_action('enqueue_block_editor_assets', 'mi_plugin_command_palette_assets');
```

# Un ejemplo más útil: limpiar caché

Supongamos un plugin interno para clientes.

Puedes crear un comando rápido para limpiar caché:

```js
dispatch( commandsStore ).registerCommand({
    name: 'mi-plugin/limpiar-cache',
    label: 'Vaciar caché del sitio',
    callback: async () => {

        await fetch('/wp-json/mi-plugin/v1/clear-cache', {
            method: 'POST',
            headers: {
                'X-WP-Nonce': wpApiSettings.nonce
            }
        });

        alert('Caché limpiada');

    },
});
```

Desde el punto de vista UX es muchísimo más cómodo que esconder acciones en submenús eternos 😅

# También se pueden agrupar comandos

WordPress permite registrar comandos dentro de categorías para mantener ordenada la interfaz.

Ejemplo conceptual:

```js
dispatch( commandsStore ).registerCommand({
    name: 'mi-plugin/exportar-pdf',
    label: 'Exportar catálogo PDF',
    icon: 'media-document',
    callback: () => {
        console.log('Exportando...');
    },
});
```

Esto permite crear auténticos *launchers internos* para herramientas complejas.

# Ideas interesantes para plugins personalizados

Mientras iba probando la API fui apuntando algunas ideas bastante útiles para proyectos reales:

## Plugins de mantenimiento

Comandos rápidos para:

* activar modo mantenimiento,
* limpiar logs,
* vaciar caché,
* regenerar CSS.

## Plugins para clientes

Atajos para:

* crear pedidos de prueba,
* abrir informes,
* exportar documentos,
* sincronizar datos.

## Plugins internos de agencias

Muy útil para:

* cambiar entre CPTs,
* abrir configuraciones concretas,
* lanzar scripts internos,
* revisar errores.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Persona usando múltiples herramientas digitales rápidamente" width="300" />
</div>

# Detalles interesantes de la API

Algunas cosas curiosas de la implementación:

* Forma parte de Gutenberg.
* Está basada completamente en JavaScript.
* Usa `@wordpress/data`.
* Los comandos pueden tener iconos.
* Pueden mostrarse condicionalmente.
* Se pueden registrar dinámicamente.

Y además la experiencia se integra perfectamente con el resto del admin.

# Recursos oficiales

## Documentación de Commands API

[https://developer.wordpress.org/block-editor/reference-guides/packages/packages-commands/](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-commands/)

## Guía de la Command Palette

[https://wordpress.org/documentation/article/command-palette/](https://wordpress.org/documentation/article/command-palette/)

## Repositorio Gutenberg

[https://github.com/WordPress/gutenberg/tree/trunk/packages/commands](https://github.com/WordPress/gutenberg/tree/trunk/packages/commands)

## Búsqueda de ejemplos reales en Gutenberg

[https://github.com/WordPress/gutenberg/search?q=registerCommand&type=code](https://github.com/WordPress/gutenberg/search?q=registerCommand&type=code)

# Un detalle bastante cómodo en el día a día

Después de acostumbrarse, acabar navegando por WordPress con teclado resulta sorprendentemente rápido 😄

Especialmente en instalaciones con:

* muchos CPTs,
* plugins personalizados,
* menús enormes,
* herramientas internas,
* o paneles hechos a medida.

Y en plugins desarrollados a medida abre una forma muy limpia de añadir acciones rápidas sin llenar el admin de botones por todas partes.
