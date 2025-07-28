---
layout: post
title: "Cómo incrustar un vídeo de YouTube responsive sin bandas negras"
date: 2025-07-28
categories: [CSS, YouTube, Responsive]
tags: [CSS, YouTube, iframe, responsive, diseño web]
description: "Descubre cómo incrustar vídeos de YouTube de forma responsive usando solo CSS, sin bandas negras y manteniendo la proporción 16:9."
---

🎥 Hace unos días tuve que incrustar un vídeo de YouTube en una web en la que estoy trabajando y, como suele pasar, parecía todo fácil... hasta que **no lo fue**. 😅

## El objetivo

Quería que el vídeo se viera **a todo lo ancho** del contenedor (que tiene un `width: 90%`) y mantuviera la **proporción 16:9**. Fácil, ¿no? Pues...

## El intento inicial

Lo primero que hice fue meter el típico `<iframe>` de YouTube y ajustar manualmente el `width` y el `height` para que se adaptara a esa proporción. Algo como esto:

```html
<iframe width="900" height="506" src="https://www.youtube.com/embed/ID_DEL_VIDEO" allowfullscreen></iframe>
````

Calculé el alto a partir del ancho con una regla de tres (16:9 → 9/16 = 0.5625 → `height = width * 0.5625`).

## El problema

Todo bien hasta que reducía ligeramente el tamaño de la ventana del navegador. De repente... ¡zas! Aparecían **bandas negras arriba y abajo del vídeo**. 🤦‍♂️

Y no eran del vídeo, sino del iframe. El problema estaba claro: aunque el contenedor cambiaba de tamaño, el iframe mantenía sus dimensiones fijas.

## La solución elegante

Buscando una forma de hacer que el vídeo **fuera responsive de verdad**, encontré una técnica con CSS que me pareció *magia negra* al principio: usar `height: 0` combinado con `padding-bottom`.

El truco consiste en meter el `<iframe>` dentro de un contenedor y aplicar este CSS:

```css
.video-container { 
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 = 9 / 16 = 0.5625 = 56.25% */
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
```

Y en el HTML:

```html
<div class="video-container">
  <iframe src="https://www.youtube.com/embed/ID_DEL_VIDEO" allowfullscreen></iframe>
</div>
```

## ¿Por qué no usar `height: 56.25%` directamente?

Aquí viene lo curioso 👇

Cuando usamos `height: 56.25%`, esa altura **no** se calcula en función del **ancho del elemento** (que es lo que nos interesa), sino en función de la **altura del contenedor padre**. Y si ese padre no tiene una altura definida, el resultado es... impredecible o directamente `0`.

En cambio, el `padding-bottom` **sí se calcula respecto al ancho del contenedor**, no a su altura. Esto permite que la relación de aspecto se mantenga **proporcional al ancho**, que sí es fácilmente controlable (por ejemplo, `width: 100%` o `width: 90vw`).

👉 En resumen:

| Propiedad CSS       | ¿Se calcula respecto al ancho?         | ¿Sirve para mantener proporción? |
| ------------------- | -------------------------------------- | -------------------------------- |
| `height: %`         | ❌ respecto a la altura del padre       | ❌ No mantiene la proporción      |
| `height: vw`        | ✅ pero depende del viewport            | ⚠️ No se adapta al contenedor    |
| `height: em`        | ❌ relativo al tamaño de fuente         | ❌ No sirve para proporciones     |
| `padding-bottom: %` | ✅ relativo al **ancho** del contenedor | ✅ ¡Ideal para proporciones! ✅    |

## Resultado

✅ El vídeo ocupa el 100% del ancho del contenedor
✅ Se adapta al tamaño de pantalla
✅ Mantiene la proporción 16:9
✅ **Sin bandas negras**
✅ Y todo con un poquito de CSS 😎

<p class="codepen" data-height="400" data-default-tab="html,result" data-slug-hash="XWOxLYv" data-user="openai-gpt" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 1px solid #ccc; margin: 1em 0; padding: 1em;" data-preview="true">
  <span>Ver la demo en <a href="https://codepen.io/openai-gpt/pen/XWOxLYv" target="_blank">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
