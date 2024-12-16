---
title: Desactivar W3 Total Cache por completo en Wordpress
image: https://www.wpkube.com/wp-content/uploads/2022/08/w3-total-cache-free-plugin.png
date: 16-12-2024
categories: [web,programacion,codigo,php,wordpress,cache,w3total,plugin]
tags: [web,programacion,codigo,php,wordpress,cache,w3total,plugin]
pin: false
comments: false
render_with_liquid: false
---

Si necesitas desactivar por completo el plugin W3 Total Cache en tu instalación de WordPress, sigue estos pasos detallados:

1. Editar el archivo wp-config.php

Localiza el archivo `wp-config.php` en la raíz de tu instalación de WordPress y busca la siguiente línea de código:

```php
define('WP_CACHE', true);
```

Cambia el valor de `true` a `false`, de manera que quede así:

```php
define('WP_CACHE', false);
```

Esto desactiva la funcionalidad de caché a nivel de WordPress.

2. Eliminar el directorio del plugin

Accede a la carpeta `wp-content/plugins` y elimina el directorio `w3-total-cache` completo. Esto desinstalará el plugin.

3. Eliminar archivos generados por el plugin

Dentro de la carpeta `wp-content`, elimina los siguientes archivos si existen:

`object-cache.php`

`advanced-cache.php`

`db.php`

4. Eliminar el directorio de configuración

Si existe, borra también el directorio `wp-content/w3tc`, donde se almacenan configuraciones y datos adicionales del plugin.

5. Revisar el archivo `.htaccess` (si usas Apache)

Si tu servidor utiliza Apache, es probable que W3 Total Cache haya modificado el archivo `.htaccess`. Revisa este archivo en la raíz de tu instalación de WordPress y elimina cualquier regla relacionada con W3 Total Cache. Estas suelen estar claramente delimitadas con comentarios como:

```
# BEGIN W3TC
... (configuraciones del plugin)
# END W3TC
```
Elimina esas líneas para asegurarte de que no quedan rastros del plugin en la configuración del servidor.

> Para hacer una **desactivación temporal** del plugin y ver si los errores que te esta dando Wordpress vienen porducidos por el plugin en vez de borrar añade al final de cada directorio y archivo `-desact` por ejemplo y el `.htacess` no hace falta que lo edites.
