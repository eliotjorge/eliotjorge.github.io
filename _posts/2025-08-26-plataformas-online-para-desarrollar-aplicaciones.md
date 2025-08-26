---
title: "Plataformas online para desarrollar aplicaciones sin instalar nada en tu ordenador"
description: "Descubre cómo programar aplicaciones en React, Vite, Tailwind y más desde el navegador, sin necesidad de instalar Node ni editores de código. Ideal para vacaciones o equipos prestados."
image: "https://img.freepik.com/free-vector/programmer-working-isometric-style_52683-16805.jpg"
categories: [desarrollo-web, herramientas]
tags: [react, vite, tailwind, stackblitz, codespaces, codesandbox, desarrollo-online]
---

Hay momentos en los que quieres avanzar en tu proyecto, pero no tienes tu ordenador de siempre a mano. A mí me pasó en vacaciones: estaba en el portátil de un amigo y no quería llenárselo de Node.js, npm, pnpm, Visual Studio Code… en fin, todo el ecosistema que solemos arrastrar 🧳.  

La pregunta fue clara:  
👉 *“¿Hay alguna manera online y gratuita en la que pueda desarrollar mi aplicación sin instalar nada en el ordenador?”*  

Y la respuesta es sí. Hoy quiero repasar las opciones más interesantes que encontré para trabajar en la nube como si tuviera mi entorno local.  

---

## StackBlitz ⚡

<iframe src="https://giphy.com/embed/l41YtZOb9EUABnuqA" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

StackBlitz es probablemente la opción más rápida para proyectos con **React + Vite**. Funciona directamente en el navegador gracias a su motor *WebContainers*, que simula un entorno Node.  

- No necesitas instalar nada.  
- Puedes abrir un repo de GitHub escribiendo directamente en la URL:  

```text
https://stackblitz.com/github/usuario/repositorio
````

* Ideal si lo que quieres es editar y probar tu app sin complicaciones.

👉 Eso sí, usa `npm` por debajo (no `pnpm`), así que si tu proyecto depende sí o sí de `pnpm`, quizá te interese otra opción.

---

## GitHub Codespaces 💻☁️

<iframe src="https://giphy.com/embed/3o7TKx2UxW9FjHEnYw" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

Aquí entramos en un nivel superior: Codespaces es básicamente un **Linux remoto con VS Code en tu navegador**.

* Puedes abrir la terminal, correr `npm install`, `pnpm install` o incluso Docker.
* Todo queda guardado en la nube: dependencias, configuraciones, cambios de código.
* Es literalmente como tener tu entorno local, pero sin instalar nada en el ordenador donde estés.

⚠️ En este post no me voy a meter en detalle con precios, horas incluidas o cómo crearlo. Eso lo dejaré para otra entrada, porque merece su propio espacio.

---

## CodeSandbox 🏖️

<iframe src="https://giphy.com/embed/3o6Zt481isNVuQI1l6" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

Otra opción muy interesante es CodeSandbox.
Está pensado para prototipado rápido y, lo bueno, es que **sí soporta `pnpm`** 🎉.

* Puedes importar tu repo de GitHub.
* Reconoce automáticamente `pnpm-lock.yaml`.
* Es perfecto para trabajar en proyectos que ya usen `pnpm` de base.

Ejemplo de comandos que puedes ejecutar desde su terminal:

```bash
pnpm install
pnpm run dev
```

---

## ¿Cuál elegir? 🤔

* **Quiero algo rápido y ligero:** StackBlitz.
* **Quiero un entorno completo, como si fuera mi PC:** Codespaces.
* **Quiero trabajar con pnpm sin líos:** CodeSandbox.

En mi caso, mientras estaba de vacaciones, la comodidad de abrir el navegador y tener todo listo fue suficiente para seguir avanzando en la aplicación de mantenimiento de vehículos sin preocuparme por instalar nada en el ordenador de mi amigo 🛠️.
