---
title: Estilo radio button como botones
image: radio-button-formidable-form-style-min.webp
img_path: /images/
date: 2024-03-08
categories: [css]
tags: [css,formulario,estilos,radiobutton]
pin: false
comments: false
---


## Cómo cambiar el estilo de radiobuttons con CSS para que parezcan botones

El problema es que todo lo que se encuentra tiene por una parte el `<label>` y por otra los `<input>`.

En este caso usando el Contact Form 7 mete dentro de `<label>` los `<input>`, por lo que la propiedad `input[type=radio]:checked` no se puede aplicar, sólo aplica el estilo a los `<span>` que están debajo.

Lo que tenemos que usar es la propiedad `:has()` de CSS que lo que hace es una condición, si `X:has(condicion){aplica estos estilos}`

```html
<label>
  <input type="radio" name="radio-cantidad-donada" value="15 €" checked="checked">
  <span class="wpcf7-list-item-label">15 €</span>
</label>

<label>
  <input type="radio" name="radio-cantidad-donada" value="35 €">
  <span class="wpcf7-list-item-label">35 €</span>
</label>
```

```css
.donacion-personalizada input[type="radio"] {
    display:none;
}

.donacion-personalizada label:has(input[type=radio]:checked) {
  background: blue;
	color: white;
}

.donacion-personalizada label {
     padding:5px;
     border:1px solid #CCC; 
     cursor:pointer;
    z-index:90;
}

.donacion-personalizada label > input[type="radio"]:checked + *::before, .donacion-personalizada label > input[type="radio"]+ *::before {
	display:none;
}
```
