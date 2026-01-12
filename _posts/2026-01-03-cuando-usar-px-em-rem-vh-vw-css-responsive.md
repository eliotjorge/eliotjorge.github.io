---
title: "Cuándo usar px, em, rem, %, vh y vw en CSS (guía práctica orientada a responsive)"
description: "Guía clara y práctica sobre cuándo usar px, em, rem, porcentajes, vh y vw en CSS. Enfoque responsive, ejemplos reales y buenas prácticas para layouts modernos."
date: 2026-01-03
image: "https://github.com/user-attachments/assets/1bcc2af7-cafe-4ef9-9a7d-afb17633a059"
categories: [css, desarrollo-web]
tags: [css, responsive, unidades-css, front-end, diseño-web]
faq:
  - question: "¿Es mala práctica usar px en CSS?"
    answer: "No, px no es una mala práctica. Es útil para elementos que no deben escalar, como bordes o sombras. El problema aparece cuando se usa para todo sin pensar en accesibilidad y responsive."
  - question: "¿Cuál es la diferencia real entre em y rem?"
    answer: "em depende del tamaño de fuente del elemento padre, mientras que rem depende del tamaño de fuente raíz (html), lo que lo hace más predecible para layouts grandes."
  - question: "¿Cuándo conviene usar vh y vw?"
    answer: "vh y vw son ideales para secciones a pantalla completa, hero sections o layouts que dependen del tamaño del viewport, pero deben usarse con cuidado en móviles."
  - question: "¿Qué unidad es mejor para diseño responsive?"
    answer: "No existe una única unidad mejor. Un diseño responsive sólido suele combinar rem para tipografía, % y flex para layouts, y vh/vw para secciones específicas."
---

A lo largo del tiempo, cada vez que empiezo un proyecto nuevo o reviso uno antiguo, me vuelve la misma pregunta:  
**¿qué unidad de medida debería usar aquí?** 🤔  

`px`, `em`, `rem`, `%`, `vh`, `vw`… todas conviven en CSS, pero no todas sirven para lo mismo. Este post es una especie de mapa mental que me ayuda a decidir **cuándo usar cada una**, especialmente pensando en **responsive design y accesibilidad**.

---

## px: cuando necesitas control absoluto 🎯

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/pKxkYzIFm1rQ2a4K8K/giphy.gif" alt="Precisión y control en diseño web" width="300" />
</div>

`px` es la unidad más directa: un píxel es un píxel.  
No escala, no depende de nada, no se adapta.

### Cuándo usar px
- Bordes (`border: 1px solid`)
- Sombras (`box-shadow`)
- Iconos
- Ajustes finos donde **no quieres que el tamaño cambie**

```css
.card {
  border: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0,0,0,.1);
}
````

### Cuándo evitarlo

* Tipografía principal
* Espaciados generales
* Layouts responsive

💡 **Nota personal:** usar px para todo suele ser la raíz de diseños rígidos que no respiran bien en pantallas grandes o pequeñas.

---

## em: útil, pero con efectos secundarios ⚠️

`em` depende del tamaño de fuente del **elemento padre**.
Eso puede ser una ventaja… o un dolor de cabeza.

```css
.card {
  font-size: 1.2em;
  padding: 1.5em;
}
```

Si el padre cambia, todo cambia.

### Cuándo usar em

* Componentes aislados
* Elementos que deben escalar con su contexto
* Botones o módulos reutilizables

### Cuándo no

* Layouts complejos
* Márgenes globales

🧠 **Regla mental:** si no tengo claro el contexto, mejor no usar em.

---

## rem: la base sólida para tipografía 🧱

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/OrFmkOFx7PVK/giphy.gif" alt="Construcción sólida en CSS" width="300" />
</div>

`rem` depende del tamaño de fuente raíz (`html`).
Eso lo hace **predecible, escalable y accesible**.

```css
html {
  font-size: 16px;
}

h1 {
  font-size: 2rem;
}
```

### Por qué me gusta usar rem

* Facilita escalado global
* Respeta zoom del navegador
* Ideal para accesibilidad

### Dónde usar rem

* Tipografía
* Márgenes y paddings principales
* Diseño base del sitio

📌 **Mi elección por defecto** para casi todo lo relacionado con texto.

---

## %: proporcionalidad consciente ⚖️

Los porcentajes dependen del contenedor padre.

```css
.container {
  width: 80%;
}
```

### Usos habituales

* Anchos de columnas
* Imágenes fluidas
* Layouts flexibles

### Precauciones

* En alturas puede ser confuso
* Depende mucho del contexto

✔️ Funciona muy bien combinado con `flexbox` o `grid`.

---

## vh y vw: el viewport manda 🖥️📱

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/esJfE90mlLAXoTmuj5/giphy.gif" alt="Pantalla completa en diseño web" width="300" />
</div>

* `1vh` = 1% del alto del viewport
* `1vw` = 1% del ancho del viewport

```css
.hero {
  height: 100vh;
}
```

### Casos ideales

* Hero sections
* Landing pages
* Slides o secciones full screen

### Problemas conocidos

* Navegadores móviles (barra de dirección)
* Scroll inesperado

📱 En móviles, suelo combinarlos con `min-height` o media queries.

---

## Cómo combino todo en un diseño responsive 🧩

Si tuviera que resumir mi enfoque actual:

* **Tipografía:** `rem`
* **Espaciados generales:** `rem`
* **Bordes y detalles:** `px`
* **Layout:** `%`, `flex`, `grid`
* **Secciones especiales:** `vh` / `vw`

```css
body {
  font-size: 1rem;
}

.section {
  padding: 2rem;
}

.hero {
  min-height: 100vh;
}
```

No se trata de elegir **una unidad perfecta**, sino de **usar la correcta en cada contexto**.

---

## Conclusión personal 🧠

CSS no va de memorizar reglas, sino de **entender cómo responde el diseño al entorno**.
Cada unidad cuenta una historia distinta, y cuando las combinas bien, el resultado se nota:
más accesible, más flexible y más fácil de mantener.

Este post no es una verdad absoluta, sino el resumen de lo que a mí me funciona hoy.
Seguramente dentro de un tiempo lo revise… y eso también forma parte del camino 🚀
