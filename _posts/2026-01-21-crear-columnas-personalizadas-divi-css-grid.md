---
title: "Crear columnas personalizadas en Divi con CSS Grid (responsive y flexible)"
description: "Aprende cómo crear columnas personalizadas en Divi usando CSS Grid. Controla el número de columnas, alinea elementos verticalmente y adapta el diseño a móviles de forma sencilla y eficiente."
date: 2026-01-21
image: "https://github.com/user-attachments/assets/a0dd56d2-7a57-4b41-a818-a3c347eda1fc" 
categories: [wordpress, css, divi]
tags: [divi, wordpress, css-grid, diseño-web, responsive, maquetación]
faq:
- question: "¿Se pueden crear columnas personalizadas en Divi sin usar módulos?"
  answer: "Sí, utilizando CSS Grid aplicado directamente a una columna de Divi puedes definir el número de columnas, el espaciado y el comportamiento responsive sin depender de módulos adicionales."
- question: "¿Es compatible CSS Grid con Divi?"
  answer: "Sí, Divi es totalmente compatible con CSS Grid, ya que el CSS se aplica directamente al contenedor de la columna."
- question: "¿Puedo cambiar el número de columnas según el tamaño de pantalla?"
  answer: "Sí, usando media queries puedes definir diferentes valores de grid-template-columns para escritorio, tablet y móvil."
- question: "¿Los elementos se pueden centrar verticalmente dentro de cada columna?"
  answer: "Sí, usando la propiedad align-items: center dentro del grid."
- question: "¿Este método afecta al rendimiento de la web?"
  answer: "No, es una solución ligera y eficiente al basarse únicamente en CSS sin JavaScript adicional."
---

Hay momentos en los que **Divi se queda corto**.
No porque no sea potente, sino porque su sistema de columnas es… rígido.

En uno de mis proyectos necesitaba algo muy concreto:
una **galería de imágenes perfectamente alineadas**, con varias columnas en escritorio, menos en tablet y solo dos en móvil. Todo limpio, sin módulos raros, sin hacks visuales y sin que el HTML se vuelva un monstruo 🧩

Y ahí apareció **CSS Grid**.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/3ornkfqNPnwvTcPU4w/giphy.gif" alt="Maquetando con CSS Grid en WordPress" width="300" />
</div>

---

## 🧠 La idea base

En Divi:

1. Creamos **una fila**
2. Dentro, **una sola columna**
3. Metemos dentro todos los elementos (imágenes, módulos de texto, iconos, lo que sea)

Antes de aplicar CSS, el resultado será este:

* Elemento 1
* Elemento 2
* Elemento 3
* Elemento 4

Todo **uno debajo de otro**, como es normal.

Y aquí es donde entra CSS Grid ✨

---

## 🎯 El CSS que lo cambia todo

Este es el código base:

```css
selector {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  align-items: center;
}

@media (max-width: 980px) {
  selector {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 767px) {
  selector {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" alt="CSS Grid funcionando correctamente" width="300" />
</div>

---

## 🔍 Qué hace exactamente este CSS

Vamos por partes, sin prisas:

### `display: grid;`

Convierte la columna de Divi en un **contenedor grid**.
Todos los elementos hijos pasan a comportarse como ítems del grid.

### `grid-template-columns: repeat(5, 1fr);`

Define **5 columnas iguales**.
Si quieres 3 columnas, cambias el número y listo:

```css
grid-template-columns: repeat(3, 1fr);
```

### `gap: 20px;`

Espacio entre columnas y filas. Limpio y ordenado 😌

### `align-items: center;`

Centra **verticalmente** los elementos dentro de cada celda del grid.
Ideal para imágenes de distinto tamaño.

---

## 📱 Responsive sin dolor

Aquí es donde CSS Grid brilla de verdad:

* **Escritorio** → 5 columnas
* **Tablet** → 4 columnas
* **Móvil** → 2 columnas

Todo sin duplicar filas ni crear estructuras paralelas.

```css
@media (max-width: 980px) { ... }   /* Tablet */
@media (max-width: 767px) { ... }   /* Móvil */
```

Si tu diseño pide otra cosa, solo ajustas los números.
Divi no se enfada 😉

---

## 🧩 Cómo aplicarlo en Divi paso a paso

Este es el punto clave, porque aquí es donde suele haber dudas:

1. Abre la **configuración de la fila**
2. Entra en la **configuración de la columna**
3. Ve a **Avanzado → CSS de formato libre**
4. Pega el código **tal cual**
5. Ajusta columnas y gaps según tu diseño

⚠️ Importante:
El `selector` hace referencia **automáticamente a esa columna**, no tienes que añadir clases ni IDs.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Configurando CSS en Divi" width="300" />
</div>

---

## 🖼 Ejemplo práctico típico

Un caso muy habitual:

* Logos de clientes
* Miniaturas de proyectos
* Fotos de un equipo
* Iconos de servicios

Todos metidos dentro de **una sola columna**, ordenados automáticamente en filas y columnas, alineados y responsive.

Sin shortcodes.
Sin JavaScript.
Sin módulos externos.
