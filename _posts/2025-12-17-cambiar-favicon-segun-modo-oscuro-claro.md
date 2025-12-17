---
title: "Cómo cambiar el favicon según el modo oscuro o claro de una web"
description: "Aprende a cambiar el favicon automáticamente según si el navegador usa tema claro u oscuro. Evita favicons invisibles en dark mode usando prefers-color-scheme con ejemplos prácticos y código listo para producción."
date: 2025-12-17
image: https://github.com/user-attachments/assets/4f965651-08f9-4e69-9a5b-0f07dd1ac401
categories: [Desarrollo web, Frontend]
tags: [favicon, dark mode, light mode, prefers-color-scheme, seo técnico, html, javascript]
faq:
  - question: "¿Por qué el favicon no se ve bien en modo oscuro?"
    answer: "Porque muchos favicons están diseñados en colores oscuros y, al mostrarse sobre la barra oscura del navegador, pierden contraste y se vuelven casi invisibles."
  - question: "¿Se puede cambiar el favicon automáticamente según el tema del sistema?"
    answer: "Sí, usando la media query prefers-color-scheme directamente en las etiquetas link del favicon."
  - question: "¿Es compatible con todos los navegadores?"
    answer: "La mayoría de navegadores modernos lo soportan. Para los que no, se define un favicon por defecto."
  - question: "¿Necesito JavaScript para cambiar el favicon?"
    answer: "No es obligatorio. Puede hacerse solo con HTML usando media queries, aunque JavaScript puede servir para casos más avanzados."
---

Hay detalles pequeños en una web que solo notas cuando fallan.  
Uno de ellos es el **favicon**.

Ese icono diminuto que vive en la pestaña del navegador suele pasar desapercibido… hasta que activas el **modo oscuro** 🌓 y, de repente, desaparece o apenas se distingue.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/521JLj0YGzz6AEWsZ5/giphy.gif" alt="Cara de confusión al no ver el favicon en modo oscuro" width="300" />
</div>
---

## El problema real con los favicons en dark mode

El favicon **no cambia automáticamente** cuando el navegador cambia de tema.

Si tu favicon es oscuro:
- ✔️ Se ve bien en modo claro
- ❌ Se pierde en modo oscuro

Y al revés:
- Un favicon claro puede verse raro o sin contraste en modo claro

La clave está en **servir un favicon distinto según el esquema de color del sistema** 🎯

---

## prefers-color-scheme: la pieza clave

Desde hace tiempo, los navegadores soportan la media query:

```css
prefers-color-scheme
````

Que puede tener dos valores:

* `light`
* `dark`

Normalmente se usa en CSS, pero **también funciona en las etiquetas `<link>`**, y aquí es donde está la magia ✨

---

## Solución sin JavaScript (y totalmente válida)

Este es el código que uso y que puedes pegar directamente en el `<head>` de tu web:

```html
<!-- favicon por defecto (para navegadores que no soportan media queries en etiquetas link) -->
<link rel="icon" href="https://paginaweb.com/favicon-oscuro.ico" type="image/x-icon">

<!-- favicon modo claro -->
<link rel="icon" href="https://paginaweb.com/favicon-oscuro.ico" type="image/x-icon" media="(prefers-color-scheme: light)">

<!-- favicon modo oscuro -->
<link rel="icon" href="https://paginaweb.com/favicon-claro.ico" type="image/x-icon" media="(prefers-color-scheme: dark)">
```

📌 **Qué está pasando aquí:**

* Se define un favicon por defecto (fallback)
* Se carga uno específico si el navegador está en modo claro
* Se carga otro distinto si está en modo oscuro

Todo sin JS, sin eventos y sin complicaciones.

---

## ¿Por qué es buena idea definir un favicon por defecto?

Porque **no todos los navegadores antiguos soportan `media` en favicons**.

Ese primer `<link>` actúa como red de seguridad 🛟
Si el navegador no entiende las media queries, usará ese icono y listo.

---

## Detalles importantes a tener en cuenta

* Usa **ICO o PNG**, mejor que SVG para compatibilidad total
* Evita favicons con fondo transparente si el icono es oscuro
* El contraste es clave: piensa en fondos claros *y* oscuros
* A veces el navegador **cachea el favicon** (forzar recarga ayuda)

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/h3u7w8BR07IHDsnzQw/giphy.gif" alt="Recargar la pestaña varias veces para ver el favicon cambiar" width="300" />
</div>

---

## ¿Y si quiero hacerlo con JavaScript?

* Cambias el tema manualmente desde la web
* Tienes un switch de dark/light propio
* Necesitas reaccionar en tiempo real sin recargar

Para la mayoría de webs (blogs, landings, corporativas), **la solución con HTML es suficiente y más limpia**.

---

## SEO, UX y pequeños detalles que suman

Aunque el favicon no es un factor SEO directo:

* Mejora la **identidad visual**
* Ayuda al **reconocimiento de marca**
* Da sensación de web cuidada y profesional

Y, al final, esas pequeñas cosas son las que hacen que una web se sienta bien hecha 😊
