---
title: Cómo Especificar Diferentes Favicons para los Modos Claro y Oscuro
image: https://images.unsplash.com/photo-1617975609658-2de247badd36
date: 20-11-2024
categories: [web,programacion,favicon]
tags: [web,programacion,favicon]
pin: false
comments: false
render_with_liquid: false
---

# Cómo Especificar Diferentes Favicons para los Modos Claro y Oscuro

En la era de las preferencias de modo oscuro, adaptar el favicon de tu sitio web para que coincida con el esquema de colores elegido por el usuario puede mejorar significativamente la experiencia. Aunque muchas soluciones dependen de JavaScript, hay un enfoque más simple, basado únicamente en HTML, para proporcionar favicons diferentes para los modos claro y oscuro. Este método aprovecha el atributo `media` de la etiqueta `<link>`, permitiendo especificar diferentes recursos según la preferencia de esquema de color del usuario.

## La Solución Solo con HTML
Así es como puedes implementar favicons específicos para el modo utilizando solo HTML:

```html
<head>
  <!-- Favicon por defecto (para navegadores que no soportan consultas de medios en las etiquetas link) -->
  <link rel="icon" href="favicon-light.ico" type="image/x-icon">
  
  <!-- Favicon para el modo claro -->
  <link rel="icon" href="favicon-light.ico" type="image/x-icon" media="(prefers-color-scheme: light)">
  
  <!-- Favicon para el modo oscuro -->
  <link rel="icon" href="favicon-dark.ico" type="image/x-icon" media="(prefers-color-scheme: dark)">
</head>
```

## Explicación
1. Favicon por defecto: Asegura que los navegadores que no soportan consultas de medios en las etiquetas <link> aún muestren un favicon.
2. Favicon para el modo claro: Se especifica utilizando el atributo media con (prefers-color-scheme: light). Este favicon se utilizará cuando el sistema del usuario esté configurado en modo claro.
3. Favicon para el modo oscuro: Usamos (prefers-color-scheme: dark), y se usará cuando el sistema del usuario esté configurado en modo oscuro.
