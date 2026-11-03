---
title: "Cómo evitar que WooCommerce acumule sesiones en wp_options"
date: 2026-11-03
image: "https://github.com/user-attachments/assets/77277f97-5c64-4a50-9b6f-303106616c3b"
description: "Aprende a detectar, limpiar y evitar la acumulación de sesiones de WooCommerce en wp_options. Soluciona problemas de tamaño en la base de datos y mejora el rendimiento de WordPress."
permalink: /evitar-acumulacion-sesiones-woocommerce/
categories: [wordpress, woocommerce, rendimiento]
tags: [woocommerce, wp_options, sesiones, base de datos, mysql, wp-cron, robots-txt, optimizacion]
faq:
  - question: "¿Por qué WooCommerce acumula sesiones en wp_options?"
    answer: "WooCommerce almacena información de las sesiones de los clientes en la tabla wp_options. Si las tareas de limpieza programadas no se ejecutan correctamente, estas sesiones pueden acumularse y aumentar considerablemente el tamaño de la base de datos."
  - question: "¿Cómo puedo eliminar las sesiones antiguas de WooCommerce?"
    answer: "Puedes utilizar la herramienta de limpieza de sesiones disponible en WooCommerce, dentro de WooCommerce > Estado > Herramientas. Si el proceso falla por límites de ejecución de PHP, también puedes eliminar los registros directamente mediante una consulta SQL, siempre después de realizar una copia de seguridad."
  - question: "¿Cómo evitar que los bots generen sesiones en WooCommerce?"
    answer: "Puedes limitar el rastreo de URLs que contienen parámetros como add-to-cart mediante robots.txt, aunque esta medida es voluntaria para los rastreadores que respetan el protocolo. También conviene revisar los bots que visitan la web y configurar correctamente las tareas de limpieza de WooCommerce."
  - question: "¿Qué ocurre si desactivo WP-Cron en WordPress?"
    answer: "Si desactivas WP-Cron mediante DISABLE_WP_CRON, las tareas programadas de WordPress dejan de ejecutarse automáticamente con las visitas. Debes configurar una tarea cron real en el servidor para sustituirlo y garantizar que WooCommerce pueda ejecutar sus procesos de mantenimiento."
  - question: "¿Es seguro borrar las sesiones de WooCommerce directamente desde MySQL?"
    answer: "Sí, siempre que sepas qué registros estás eliminando y hayas realizado una copia de seguridad. Sin embargo, al borrar las sesiones también puedes eliminar carritos activos y otros datos temporales de los clientes. Es preferible utilizar primero las herramientas de limpieza de WooCommerce."
---

En alguna ocasión me he encontrado con instalaciones de WordPress en las que la base de datos empieza a crecer mucho más de lo esperado, especialmente en proyectos que utilizan WooCommerce.

Al revisar la tabla `wp_options`, aparece una cantidad considerable de registros cuyo nombre comienza por `_wc_session_`. El problema es que estas entradas pueden acumularse con el tiempo y terminar ocupando un espacio considerable en la base de datos.

Vamos a ver de dónde vienen estas sesiones, cómo podemos eliminarlas y qué podemos hacer para evitar que vuelvan a acumularse. 🔍

## 🔎 ¿Por qué se acumulan las sesiones de WooCommerce?

WooCommerce necesita almacenar información temporal de los visitantes para gestionar funcionalidades como los carritos de compra y otros datos asociados a la navegación.

Para ello utiliza un sistema de sesiones que, por defecto, almacena información en la tabla `wp_options` de WordPress.

Si echamos un vistazo a esta tabla desde phpMyAdmin, podemos encontrar registros con nombres similares a estos:

```text
_wc_session_abc123...
_wc_session_expires_abc123...
_wc_session_def456...
_wc_session_expires_def456...
```

Cada sesión tiene asociado un registro con su información y otro con su fecha de caducidad.

El problema aparece cuando las sesiones caducadas no se eliminan correctamente. Poco a poco, estos registros se van acumulando y la tabla `wp_options` puede terminar alcanzando un tamaño considerable.

Hay dos situaciones que conviene revisar especialmente:

- **Las tareas programadas de WordPress no se están ejecutando.** WooCommerce depende de estas tareas para realizar operaciones de mantenimiento, incluida la limpieza de sesiones caducadas.
- **Los bots están generando sesiones durante el rastreo de la web.** Algunos rastreadores pueden visitar páginas y provocar la creación de sesiones aunque no tengan intención de realizar una compra.

En ambos casos, podemos terminar con una base de datos llena de sesiones que ya no tienen ninguna utilidad.

## 🧹 Cómo eliminar las sesiones acumuladas de WooCommerce

Lo primero que debemos hacer es comprobar si WooCommerce puede realizar la limpieza por sí mismo.

En versiones actuales de WooCommerce disponemos de una herramienta específica para ello.

Desde el panel de administración accedemos a:

**WooCommerce → Estado → Herramientas**

Buscamos la herramienta relacionada con la limpieza de sesiones de clientes (Clear customer sessions) y ejecutamos el proceso.

<img width="663" height="420" alt="wc_sessions-woocommerce" src="https://github.com/user-attachments/assets/ab43a193-e9d7-477d-b752-4333c5b051ee" />


<div style="text-align: center;">
  <img src="https://media.giphy.com/media/119LVmecQWrzlm/giphy.gif" alt="Limpieza de datos y mantenimiento de WooCommerce" width="300" />
</div>

Esta es la opción que recomiendo utilizar inicialmente, ya que permite que WooCommerce gestione la limpieza mediante sus propios mecanismos.

### ¿Qué ocurre si la limpieza falla?

En instalaciones con una cantidad muy elevada de sesiones, el proceso puede tardar demasiado y terminar fallando.

Esto puede suceder por diferentes motivos:

- El límite de tiempo de ejecución de PHP (`max_execution_time`).
- El límite de memoria disponible (`memory_limit`).
- El volumen de registros que hay que procesar.

Si nos encontramos en esta situación, podemos realizar la limpieza directamente desde MySQL.

**Antes de continuar, recomiendo realizar una copia de seguridad de la base de datos.** También hay que tener en cuenta que eliminar las sesiones activas puede vaciar carritos de compra de visitantes que todavía estaban navegando por la tienda.

Accedemos a phpMyAdmin, seleccionamos la base de datos de WordPress y ejecutamos la siguiente consulta:

```sql
DELETE FROM wp_options
WHERE option_name REGEXP '^_wc_session(_expires)?_';
```

Esta consulta elimina los registros de sesiones de WooCommerce y sus correspondientes fechas de expiración.

**Importante:** he utilizado `REGEXP` para identificar los prefijos de las sesiones de forma literal. Así evitamos el comportamiento especial que tiene el carácter `_` en las expresiones `LIKE` de SQL.

Si nuestra instalación utiliza un prefijo de tablas diferente, debemos sustituir `wp_options` por el nombre correspondiente.

Una vez ejecutada la consulta, podemos volver a revisar la tabla para comprobar que los registros se han eliminado.

## ⚙️ Comprobar que WP-Cron funciona correctamente

Eliminar las sesiones acumuladas soluciona el problema inmediato, pero si no corregimos su origen, probablemente volverán a aparecer.

Uno de los primeros puntos que revisaría es el funcionamiento de WP-Cron.

WordPress incorpora un sistema de tareas programadas que permite ejecutar procesos de mantenimiento sin necesidad de configurar manualmente un cron en el servidor.

WooCommerce utiliza este mecanismo para programar diferentes operaciones, entre ellas la limpieza periódica de sesiones caducadas.

El problema es que WP-Cron depende de las visitas a la web para comprobar si hay tareas pendientes. Si no recibe visitas o su ejecución está bloqueada, algunas tareas pueden quedarse sin ejecutar.

Además, es posible que WP-Cron esté desactivado expresamente en la configuración de WordPress.

Para comprobarlo, revisamos el archivo `wp-config.php` y buscamos esta constante:

```php
define('DISABLE_WP_CRON', true);
```

Si encontramos esta línea, significa que WP-Cron está desactivado.

Esto no implica necesariamente que exista un problema: algunas instalaciones desactivan WP-Cron porque utilizan una tarea cron real configurada directamente en el servidor.

Lo importante es asegurarnos de que existe un mecanismo alternativo que ejecute las tareas programadas.

Si no utilizamos un cron del servidor, podemos retirar la constante o establecerla en `false`:

```php
define('DISABLE_WP_CRON', false);
```

De esta forma, WordPress podrá volver a ejecutar sus tareas programadas mediante las visitas a la web.

💡 **Un detalle importante:** si utilizamos un cron real del servidor, no debemos eliminar esta constante sin comprobar antes su configuración. Lo recomendable es mantener el sistema de ejecución de tareas que hayamos elegido y verificar que las tareas de WooCommerce se están ejecutando correctamente.

## 🤖 Evitar que los bots generen sesiones innecesarias

Otro aspecto que conviene revisar es el comportamiento de los rastreadores que visitan nuestra tienda.

Algunos bots recorren URLs con parámetros que no aportan demasiado valor al rastreo y que pueden provocar actividad innecesaria en WooCommerce.

Un ejemplo bastante habitual son las URLs que incluyen el parámetro `add-to-cart`.

Por ejemplo:

```text
https://midominio.com/producto/camiseta/?add-to-cart=123
```

Este parámetro permite añadir directamente un producto al carrito. Si un bot rastrea repetidamente este tipo de URLs, puede provocar la creación de sesiones y operaciones innecesarias.

Podemos indicar a los rastreadores que respetan el protocolo Robots Exclusion Protocol que eviten estas URLs.

Para ello, añadimos la siguiente regla a nuestro archivo `robots.txt`:

```text
User-agent: *
Disallow: /*?add-to-cart=
```

Con esta instrucción estamos indicando a los bots que no rastreen las URLs cuyo parámetro de consulta contiene `add-to-cart`.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/hve2mtfdlJEZYNX6uI/giphy.gif" alt="Robots rastreadores visitando una página web" width="300" />
</div>

Hay que tener presente que `robots.txt` no es un sistema de seguridad ni impide que los bots accedan realmente a esas URLs. Simplemente establece unas directrices para los rastreadores que deciden respetarlas.

Si detectamos tráfico automatizado que ignora estas instrucciones, tendremos que analizarlo y aplicar medidas adicionales desde el servidor o herramientas como Cloudflare.

Tampoco conviene bloquear indiscriminadamente todas las URLs con parámetros: debemos valorar qué páginas necesitan rastrearse y cuáles pueden generar actividad innecesaria.

## 🔧 Comprobar que la limpieza funciona

Después de realizar los cambios, merece la pena comprobar que WooCommerce está gestionando correctamente sus sesiones.

Podemos hacerlo siguiendo estos pasos:

1. Revisar el tamaño de la tabla `wp_options` y la cantidad de registros `_wc_session_`.
2. Comprobar que WP-Cron está habilitado o que existe una tarea cron alternativa funcionando.
3. Revisar las tareas programadas de WooCommerce y verificar que sus procesos de limpieza se ejecutan.
4. Observar durante los siguientes días si vuelven a acumularse sesiones caducadas.
5. Si el crecimiento continúa, revisar los registros de acceso para identificar bots o patrones de navegación que estén generando sesiones innecesarias.

Para esta última comprobación podemos utilizar los registros del servidor o las herramientas de análisis de tráfico de Cloudflare.

La idea no es evitar que WooCommerce cree sesiones, ya que son necesarias para su funcionamiento, sino asegurarnos de que las sesiones caducadas se eliminan correctamente y que los rastreadores no generan actividad innecesaria.

Así evitaremos que la tabla `wp_options` crezca sin control y mantendremos la base de datos de nuestra tienda mucho más limpia. 🔧
