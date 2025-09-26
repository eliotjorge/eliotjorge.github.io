---
title: "Cómo convertir la galería de Divi en un diseño Masonry estilo Pinterest"
description: "Aprende a transformar la galería de Divi en un diseño masonry estilo Pinterest con solo un poco de CSS. Guía paso a paso, ejemplos prácticos y optimizado para SEO."
date: 2025-09-17
image: "https://github.com/user-attachments/assets/80d9f04e-de49-4942-8e1b-9c59b515f41a"
categories: [WordPress, Divi, CSS]
tags: [wordpress, divi, galería, masonry, pinterest, css]
faq:
  - question: "¿Divi incluye por defecto un diseño masonry para sus galerías?"
    answer: "No, Divi solo ofrece cuadrículas o slides. Para conseguir un diseño masonry es necesario añadir CSS personalizado."
  - question: "¿Se puede hacer un masonry en Divi sin plugins?"
    answer: "Sí, con solo unas pocas líneas de CSS aplicadas al módulo de galería puedes conseguirlo, sin necesidad de instalar plugins extra."
  - question: "¿El diseño masonry funciona en móviles?"
    answer: "Sí, con media queries puedes controlar el número de columnas y hacer que la galería se vea bien en cualquier dispositivo."
---

Si usas **Divi en WordPress** seguro que te has topado con el clásico problema de las galerías:  
todas las imágenes se colocan en una cuadrícula rígida y, si tienes fotos apaisadas y retratos, el resultado puede quedar descompensado 😕.  

Yo me encontré justo con esto creando una página para un cliente y decidí darle una vuelta: **convertí la galería de Divi en un estilo Masonry (tipo Pinterest)**, sin usar plugins, solo con un poco de CSS.  

<div style="text-align: center;">  
  <img src="https://media.giphy.com/media/mEVWOs5Kto9RErUBCi/giphy.gif" alt="Chequeado y aprobado" width="300" />  
</div>  

## Paso 1: Preparar la galería en Divi  
Primero, añade el **módulo de galería** en modo cuadrícula (`grid`). Divi siempre genera un `ul` con clase `.et_pb_gallery_items` y dentro cada imagen como `.et_pb_gallery_item`.  

No podemos cambiar ese HTML, pero sí podemos **forzarlo con CSS** a comportarse como un masonry.

## Paso 2: CSS para el diseño Masonry  

Aquí está el CSS que usé (y que puedes copiar/pegar en *Divi > Opciones del tema > CSS personalizado* o en el módulo de página):

```css
/* Masonry Gallery para Divi con clase .gallery-masonry */

/* Anular el grid y flex de Divi */
.et_pb_gallery.gallery-masonry .et_pb_gallery_items {
  display: block !important;   /* fuera flex */
  column-count: 3;             /* columnas en escritorio */
  column-gap: 1em;
}

/* Anular reglas internas de grid/flex en los ítems */
.et_pb_gallery.gallery-masonry .et_pb_gallery_item {
  float: none !important;             /* fuera float */
  position: static !important;        /* fuera absolute si lo hubiera */
  display: inline-block !important;   /* clave para masonry */
  width: 100% !important;             /* ocupa ancho de columna */
  margin: 0 0 1em !important;
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
}

/* Asegurar que la imagen se adapta */
.et_pb_gallery.gallery-masonry .et_pb_gallery_image img {
  width: 100% !important;
  height: auto !important;
  display: block;
}

/* Responsive */
@media (max-width: 991px) {
  .et_pb_gallery.gallery-masonry .et_pb_gallery_items {
    column-count: 2;
  }
}
@media (max-width: 600px) {
  .et_pb_gallery.gallery-masonry .et_pb_gallery_items {
    column-count: 1;
  }
}
````

👉 Muy importante: asegúrate de añadir al módulo de galería la clase CSS personalizada `gallery-masonry`.

## Paso 3: Resultado

Ahora las imágenes se ajustan de forma fluida, encajando unas con otras y respetando sus proporciones, sin necesidad de recortar ni deformar.

Es el mismo efecto que ves en **Pinterest**, pero dentro de Divi 🎉.

<img width="1536" height="1283" alt="masonry-gallery" src="https://github.com/user-attachments/assets/976d8008-9f5d-4342-80c1-ee732ee7688f" />


## Ejemplo práctico

* Foto vertical (retrato) → ocupa una columna completa.
* Foto apaisada → se ajusta al ancho disponible, pero no obliga a las demás a tener la misma altura.

El resultado es una galería mucho más natural y estética.

---

✅ Con esto, ya no tienes que depender de plugins pesados ni de JavaScript adicional.

✅ Solo CSS puro, ligero y fácil de mantener.

✅ Y lo mejor: **funciona tanto en escritorio como en móviles**.

<div style="text-align: center;">  
  <img src="https://media.giphy.com/media/8UF0EXzsc0Ckg/giphy.gif" alt="Funciona perfecto" width="300" />  
</div>
