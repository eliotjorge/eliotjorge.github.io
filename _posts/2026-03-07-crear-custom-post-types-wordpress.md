---
title: "Cómo crear Custom Post Types en WordPress (guía práctica paso a paso)"
description: "Aprende a crear Custom Post Types en WordPress para organizar mejor tu contenido. Ejemplo de código PHP, dónde colocarlo en el tema hijo y herramientas para generarlo automáticamente."
image: "https://github.com/user-attachments/assets/ddfe77cf-8059-4568-9a9a-ced69a4bc99b"
date: 2026-03-07
categories: [wordpress, desarrollo-web, blogging]
tags: [wordpress, custom-post-types, cpt, php, desarrollo-wordpress, wordpress-avanzado, tema-hijo]
faq:
  - question: "¿Qué es un Custom Post Type en WordPress?"
    answer: "Un Custom Post Type (CPT) es un tipo de contenido personalizado que permite organizar información diferente a las entradas o páginas estándar de WordPress. Por ejemplo: proyectos, productos, eventos o rutas."
  - question: "¿Dónde se añade el código PHP para crear un Custom Post Type?"
    answer: "Normalmente se añade en el archivo functions.php del tema hijo de WordPress. También puede añadirse en un plugin propio para mantener la funcionalidad independiente del tema."
  - question: "¿Es necesario programar para crear un Custom Post Type?"
    answer: "No necesariamente. Existen generadores visuales que crean el código automáticamente. Uno muy útil es el generador de MetaBox."
  - question: "¿Se pueden usar Custom Post Types con constructores visuales como Divi o Elementor?"
    answer: "Sí. Los Custom Post Types se integran perfectamente con constructores visuales y permiten crear plantillas personalizadas para mostrar su contenido."
---

Cuando empiezas a trabajar con WordPress, todo parece girar en torno a **entradas y páginas**.
Pero en cuanto el contenido empieza a crecer, aparece un pequeño problema: todo acaba mezclado.

Por ejemplo:

* artículos del blog
* proyectos
* rutas o caminos
* testimonios
* recursos descargables

Tener todo dentro del mismo tipo de contenido no es muy escalable. Aquí es donde entran en juego los **Custom Post Types (CPT)**.

Un Custom Post Type permite crear **nuevos tipos de contenido dentro de WordPress**, completamente separados del blog.

---

## Qué es un Custom Post Type (explicado con un ejemplo)

Imaginemos una web de senderismo.

El blog podría contener artículos como:

* “Cómo preparar una mochila de trekking”
* “Las mejores botas para montaña”

Pero además queremos una sección con rutas:

* Camino del Cares
* Ruta del Montseny
* Sendero del Teide

Si usamos solo entradas del blog, todo quedaría mezclado.
En cambio, con un **Custom Post Type llamado `caminos`**, WordPress separa ese contenido.

En el panel aparecería algo así:

```
Entradas
Páginas
Caminos
```

Cada tipo de contenido puede tener:

* sus propias categorías
* campos personalizados
* plantillas
* sliders o listados específicos

<div style="text-align: center;">
<img src="https://media.giphy.com/media/l0HlQ7LRalQqdWfao/giphy.gif" alt="organizar contenido en wordpress como si fueran carpetas" width="300" />
</div>

---

## Cuándo merece la pena usar Custom Post Types

No siempre es necesario.

Los CPT empiezan a ser útiles cuando el contenido:

* tiene **estructura diferente al blog**
* necesita **campos personalizados**
* requiere **plantillas específicas**
* debe mostrarse en **listados o sliders independientes**

Ejemplos típicos:

| Proyecto web  | Custom Post Type |
| ------------- | ---------------- |
| Portafolio    | proyectos        |
| Tienda        | productos        |
| Academia      | cursos           |
| Web de viajes | rutas            |
| Agencia       | casos de estudio |

---

## Crear un Custom Post Type en WordPress con PHP

La forma clásica consiste en usar la función `register_post_type()`.

Ejemplo básico:

```php
function crear_cpt_caminos() {

register_post_type('caminos', array(
    'labels' => array(
        'name' => 'Caminos',
        'singular_name' => 'Camino'
    ),
    'public' => true,
    'has_archive' => true,
    'menu_icon' => 'dashicons-location',
    'supports' => array(
        'title',
        'editor',
        'thumbnail',
        'excerpt'
    )
));

}

add_action('init', 'crear_cpt_caminos');
```

Este código crea un nuevo tipo de contenido llamado **Caminos**.

Con soporte para:

* título
* contenido
* imagen destacada
* extracto

---

## Dónde colocar el código en WordPress

El sitio correcto para añadir este código es:

```
/wp-content/themes/tu-tema-hijo/functions.php
```

Es importante hacerlo en el **tema hijo**, no en el tema principal.

Si lo añades en el tema original, el código se perderá cuando el tema se actualice.

<div style="text-align: center;">
<img src="https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif" alt="programador modificando codigo php en wordpress" width="300" />
</div>

Otra alternativa interesante es crear un **plugin propio** para mantener la funcionalidad separada del tema.

---

## Generar el código automáticamente

Escribir el CPT a mano funciona, pero puede ser un poco repetitivo.

Existe un generador muy práctico:

👉 [https://metabox.io/post-type-generator/](https://metabox.io/post-type-generator/)

Ahí puedes configurar:

* nombre del CPT
* etiquetas del panel
* icono
* taxonomías
* visibilidad

Y el generador te devuelve el **código PHP listo para copiar**.

---

## Usar Custom Post Types con constructores visuales

Los CPT funcionan perfectamente con constructores como:

* Divi
* Elementor
* Gutenberg

Esto permite crear:

* plantillas personalizadas
* sliders de contenido
* grids dinámicos
* páginas de archivo

Por ejemplo, un slider de rutas podría mostrar automáticamente los últimos “caminos”.

```
Camino 1 | Camino 2 | Camino 3
```

WordPress se encarga de traer los datos dinámicamente.

<div style="text-align: center;">
<img src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" alt="interfaz web mostrando tarjetas de contenido dinamico" width="300" />
</div>

---

## Ventajas de usar Custom Post Types

Algunas de las más claras:

**1️⃣ Organización del contenido**

Cada tipo de contenido vive en su propio espacio.

**2️⃣ Escalabilidad**

La web puede crecer sin convertir el blog en un caos.

**3️⃣ Plantillas específicas**

Puedes crear layouts diferentes para cada tipo de contenido.

**4️⃣ Mejor SEO**

Google entiende mejor la estructura del sitio.

**5️⃣ Integración con campos personalizados**

Plugins como ACF o MetaBox permiten añadir campos como:

* duración de una ruta
* dificultad
* coordenadas GPS
* precio de un producto

---

## Un pequeño ejemplo real

Imagina una web de viajes.

Podrías tener:

```
Entradas → artículos del blog
Rutas → itinerarios
Alojamientos → hoteles recomendados
Guías → PDFs descargables
```

Cada sección funciona como un mini-sistema dentro de WordPress.

Eso es lo que hace que WordPress pase de ser un simple blog a convertirse en **un gestor de contenido bastante potente**.
