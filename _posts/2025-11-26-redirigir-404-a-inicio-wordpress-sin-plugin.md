---
title: "Cómo redirigir los errores 404 a la página de inicio en WordPress sin usar plugins"
description: "Aprende a redirigir automáticamente cualquier error 404 de tu WordPress hacia la página de inicio sin instalar plugins adicionales, usando solo una pequeña función en el archivo functions.php."
date: 2025-11-26
image: "https://github.com/user-attachments/assets/c657015c-af9c-4c49-88ad-f6d3051c1600"
categories: ["WordPress", "Desarrollo Web", "Optimización"]
tags: ["wordpress", "404", "seo técnico", "functions.php", "redirecciones"]
faq:
  - question: "¿Es seguro redirigir los errores 404 a la página de inicio?"
    answer: "Sí, siempre que se haga con wp_safe_redirect y se mantenga una gestión adecuada de enlaces. Aun así, no conviene abusar si el sitio tiene muchas URLs rotas."
  - question: "¿Puedo redirigir las 404 sin usar plugins en WordPress?"
    answer: "Sí. Solo necesitas añadir una pequeña función en el archivo functions.php de tu tema hijo."
  - question: "¿La redirección 404 afecta al SEO?"
    answer: "Puede afectarlo si hay demasiadas URLs rotas. Sin embargo, usar redirecciones evita que Google detecte errores 404 repetidos y mejora la experiencia del usuario."
  - question: "¿Qué pasa si uso un tema que se actualiza?"
    answer: "Si editas el functions.php de un tema padre perderás los cambios. Por eso se recomienda siempre utilizar un tema hijo."
---

A veces, cuando hago mantenimiento en una web en WordPress o simplemente organizo URLs, aparecen enlaces rotos que terminan en páginas 404. No es la mejor experiencia del mundo para quien navega 💥. Y aunque existen plugins que lo gestionan, no siempre quiero instalar otro más por algo tan sencillo.

Por eso, hoy dejo aquí una de esas pequeñas funciones que me gusta tener a mano: **redirigir cualquier error 404 directamente a la página de inicio**, sin instalar nada adicional. Una solución elegante, liviana y que mantiene el sitio limpio.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/VeSvZhPrqgZxx2KpOA/giphy.gif" alt="Gif de alguien arreglando algo rápido" width="300" />
</div>

## Por qué redirigir los errores 404

Los errores 404 no son malos por sí mismos, pero un exceso puede resultar molesto para los usuarios y, dependiendo del caso, puede afectar ligeramente al SEO técnico del sitio.  

Algunas razones para gestionarlos mejor:

- Evitas que los visitantes se encuentren con páginas rotas 🙄  
- Reduces el número de errores detectados en Search Console  
- Mantienes la experiencia del sitio más fluida  
- No dependes de plugins adicionales  

Todo muy ligero y fácil de mantener.

---

## Cómo hacerlo desde el archivo functions.php

La solución es tan sencilla como añadir esta función al archivo `functions.php` de tu **tema hijo** (reposando el café… ☕️ y con cuidado de no romper nada).

```php
// Source - https://stackoverflow.com/a
// Posted by Ruvee
// Retrieved 2025-11-26, License - CC BY-SA 4.0

add_action('template_redirect', 'redirecting_404_to_home');

function redirecting_404_to_home()
{
    if (is_404()) 
    {
        wp_safe_redirect(site_url());
        exit();
    }
};
````

Y ya está. No tiene misterio.

### ¿Qué hace exactamente este código?

1. **Escucha el evento `template_redirect`**
   Ese hook se ejecuta justo antes de que WordPress cargue la plantilla final.

2. **Comprueba si la página actual es una 404**
   La función `is_404()` se encarga de eso.

3. **Redirige a la página de inicio**
   `wp_safe_redirect(site_url())` asegura que la redirección sea interna y segura.

4. **Detiene la ejecución**
   `exit();` evita que WordPress siga procesando el contenido 404.

Sencillo y eficaz.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/3o7btNa0RUYa5E7iiQ/giphy.gif" alt="Gif de un camino directo" width="300" />
</div>

---

## Ejemplo práctico

Supongamos que un usuario entra a una URL que ya no existe, por ejemplo:

```
https://tu-dominio.com/productos/lamparas-2021-descatalogadas
```

Sin esta función → verá una 404 típica de WordPress.
Con esta función → será enviado directamente a la página de inicio.

Perfecto para webs pequeñas, catálogos temporales o sitios donde no quieres dedicar tiempo a gestionar decenas de redirecciones manuales.

---

## ¿Cuándo *no* usar esta técnica?

Aunque es útil, no es una solución universal. No la usaría en estos casos:

* Sitios grandes con muchas URLs antiguas indexadas
* Blogs donde quieres analizar qué URLs fallan
* Webs con estructuras muy cuidadas de SEO
* E-commerce donde las URLs antiguas deberían redirigir al producto equivalente

En esos escenarios, una redirección 301 personalizada sigue siendo la mejor opción.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" alt="Gif reflexionando sobre decisiones" width="300" />
</div>
