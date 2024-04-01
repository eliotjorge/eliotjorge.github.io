---
title: Galería de imágenes DIVI con bloque de imagen cuadrada
image: destacada-cuadrado.jpg
img_path: /images/
date: 2024-04-01
categories: [development,wordress,divi]
tags: []
pin: false
comments: false
render_with_liquid: false
toc: false
---

## Hacer que las fotos aparezcan cuadradas en los bloques de imagen en Divi

En la página de Gemma Álvaro hay una galeíra que he tenido que hacer con bloque de imagnen individual en vez de emplear el de galería de esa manera se puede usar el lightbox de la imagen.
Lo que pasa es que saca cada imagen en el tamaño que tiene y la cuadrícula se descuadra.

![img-description](/images/destacada-cuadrado.jpg)
_Captura de imagen del resultado_

Hay que añadir un CSS para que recorte las miniaturas en cuadrado, pero no afecta a la imagen en el lightbox.

A la fila (Bloque verde) le damos la clase `.destacados`

```css
.destacados .et_pb_image img{
    object-fit: cover;
    height: 295px;
    aspect-ratio: 1 / 1;
}
```
