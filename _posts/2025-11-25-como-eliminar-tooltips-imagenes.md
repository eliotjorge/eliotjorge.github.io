---
title: "Cómo eliminar los tooltips de imágenes al pasar el ratón en tu web"
description: "Aprende a eliminar los molestos tooltips que aparecen al pasar el cursor sobre imágenes en tu web usando CSS o JavaScript, con ejemplos prácticos y soluciones globales."
date: 2025-11-25
categories: ["Web", "CSS", "JavaScript", "SEO"]
tags: ["tooltips", "CSS", "JavaScript", "imágenes", "UX", "accesibilidad"]

faq: 
  - question: "¿Por qué aparece un tooltip al pasar el ratón sobre mis imágenes?"
    answer: "Normalmente, los navegadores muestran un tooltip con el contenido del atributo 'title' o 'alt' de la imagen cuando pasas el cursor sobre ella."
  - question: "¿Puedo ocultar los tooltips sin modificar el HTML de cada imagen?"
    answer: "Sí, se puede hacer de forma global usando CSS o JavaScript para que ningún tooltip aparezca al pasar sobre las imágenes."
  - question: "¿Afecta esto a la accesibilidad de mi web?"
    answer: "Si ocultas tooltips con 'title', asegúrate de mantener descripciones accesibles con el atributo 'alt', ya que los lectores de pantalla dependen de él."
---

A veces estás navegando por tu web o la de un cliente y aparece ese molesto **tooltip** con el nombre del archivo o el título de la imagen 😬. Esto pasa porque los navegadores muestran automáticamente el contenido de los atributos `title` o, a veces, `alt`.

Si quieres una solución **global**, no tienes que tocar cada imagen de tu web: puedes usar **CSS** o **JavaScript**. Vamos a verlo paso a paso.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/Temg1IkgItEQhK8nWp/giphy.gif" alt="Tooltip desapareciendo" width="300" />
</div>

---

### Solución con CSS

La forma más sencilla y ligera de ocultar tooltips es usando CSS. Solo necesitas agregar esto a tu hoja de estilos:

```css
img[title] {
  pointer-events: none; /* Desactiva los eventos de puntero */
}
img[title]:hover::after {
  content: none; /* Evita mostrar cualquier tooltip */
}
```

💡 **Truco adicional:** Si no quieres desactivar completamente los eventos de puntero, otra opción es vaciar los `title` al cargar la página con JS.

---

### Solución con JavaScript

Si prefieres JavaScript y quieres que se aplique **a todas las imágenes automáticamente**, puedes hacer algo así:

```javascript
document.querySelectorAll('img[title]').forEach(img => {
  img.addEventListener('mouseover', () => {
    img.dataset.titleBackup = img.title; // Guardamos el title
    img.title = ""; // Lo eliminamos temporalmente
  });
  img.addEventListener('mouseout', () => {
    img.title = img.dataset.titleBackup; // Restauramos el title
  });
});
```

Esto hace que los tooltips desaparezcan solo mientras el ratón está sobre la imagen, y se restauran después. Es útil si quieres **mantener la info para lectores de pantalla** o SEO interno.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/l0Iyl55kTeh71nTXy/giphy.gif" alt="Terminado" width="300" />
</div>
