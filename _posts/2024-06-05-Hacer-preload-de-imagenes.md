---
title: Hacer preload de imagenes o de fuentes
date: 05-06-2024
categories: [web,programacion,codigo,seo,velocidad,html,css]
tags: [web,programacion,codigo,seo,velocidad,html,css]
pin: false
comments: false
render_with_liquid: false
---

En el carrousel de imágnes de los clientes en la página de Attento, cuando se habían mostrado 7 de las 21 fotos, no aparecían las siguientes porque no estaban el en scope del navegador, por lo que había que pasar por encima con el raton y cargaban automáticamente.

La soluciíon es precargar las fotos de los logos cuando la página ha terminado de cargar. Las fotos deben estar optimizadas de tamaño porque si no penaliza la velocidad de carga.

Hay dos formas, un preload en el `<head>` del la página o en el `CSS`

# 1 - HTML

En la cabecera de la página añadimos una etiqueta `<link>` con el `rel="preload"`

```html
<link rel="preload" href="https://sitedomain.com/your-image.jpg" as="image">
```

# 2 - CSS

En el `css` hacemos que el elemento que tiene las imágenes sea de ancho y alto 0, esté oculto y tenga un z-index que -1 (nos aseguramos MUY BIEN de que no se vea...) y le ponemos como contenido todas las imágenes que nos interesen

```css
figure::after {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    z-index: -1;
    content:
        url(https://sitedomain.com/your-image-1.jpg)
        url(https://sitedomain.com/your-image-2.jpg)
        url(https://sitedomain.com/your-image-3.jpg);
}
```

```html
<!DOCTYPE html>
<html lang="es" >
<head>
  <meta charset="UTF-8">
  <title>Mapa interactivo Impulsa v3</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
<figure id="projectosvg">
</figure>
  <script  src="./script.js"></script>
</body>
</html>
```
