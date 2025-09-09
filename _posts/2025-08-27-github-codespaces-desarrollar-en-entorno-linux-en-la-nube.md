---
title: "GitHub Codespaces: desarrolla en la nube como si fuera tu propio PC"
description: "Aprende a usar GitHub Codespaces para programar en la nube sin instalar nada en tu ordenador. Cómo crearlo, iniciar un entorno, detenerlo, saber el precio y controlar el tiempo usado."
image: "https://github.com/user-attachments/assets/a0fe7d54-672b-4d12-90d7-414e6a7ea791"
date: 2025-08-27
categories: [desarrollo-web, herramientas]
tags: [github, codespaces, cloud, desarrollo-online, pnpm, react, vite]
faq:
  - question: "¿Qué es GitHub Codespaces y para qué sirve?"
    answer: "GitHub Codespaces es un entorno de desarrollo en la nube que funciona como Visual Studio Code en tu navegador. Permite programar sin instalar nada en tu ordenador, ideal para trabajar desde cualquier lugar."
  
  - question: "¿Cómo crear un Codespace en GitHub?"
    answer: "Debes entrar en el repositorio de GitHub, pulsar el botón verde **Code**, ir a la pestaña **Codespaces** y hacer clic en **Create codespace on main**. En segundos tendrás un entorno listo para programar."
  
  - question: "¿Cómo detener un Codespace para que no consuma horas?"
    answer: "Cerrar la pestaña del navegador no detiene el Codespace. Para pararlo, ve a [github.com/codespaces](https://github.com/codespaces) y pulsa **Stop codespace**. Si ya no lo necesitas, puedes elegir **Delete**."
  
  - question: "¿Cuánto cuesta usar GitHub Codespaces?"
    answer: "Con GitHub Free dispones de 60 horas al mes y 15 GB gratis. Con GitHub Pro tienes 180 horas y 20 GB. Si superas esos límites, el coste aproximado es de 0,18 USD/hora de computación y 0,07 USD/GB de almacenamiento."
  
  - question: "¿Cómo saber cuántas horas llevo consumidas en Codespaces?"
    answer: "Entra en tu cuenta de GitHub → **Billing & plans** → sección **Codespaces**. Allí verás tus horas usadas y el almacenamiento consumido. También puedes consultar el detalle en la página de Usage."
---

Después de descubrir plataformas como StackBlitz y CodeSandbox, había una que me llamaba especialmente la atención: **GitHub Codespaces**.  
Lo que ofrece es básicamente tener un **entorno completo de desarrollo en la nube**, como si estuvieras en tu ordenador con Visual Studio Code, pero desde el navegador.  

Y la verdad: me sorprendió lo bien que funciona. Aquí voy a repasar cómo crearlo, iniciarlo, detenerlo, qué precio tiene y cómo ver el tiempo que llevas gastado ⏱️.  

---

## ¿Qué es GitHub Codespaces? ☁️

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/bc5at4DVgJy3k5r0n0/giphy.gif" alt="Chequeado y aprobado" width="300" />
</div>


Codespaces te permite abrir un proyecto de GitHub en un entorno remoto que ya tiene:  
- Node.js (puedes instalar `pnpm` si quieres).  
- Terminal para ejecutar tus comandos (`npm install`, `pnpm run dev`, etc.).  
- Un editor idéntico a VS Code, pero corriendo en el navegador.  

Es como llevar tu máquina de desarrollo en el bolsillo.  

---

## Cómo crear un Codespace 🛠️

1. Entra en el repositorio que quieras usar (ejemplo: tu app en React + Vite).  
2. Haz clic en el botón verde **`Code`**.  
3. Ve a la pestaña **Codespaces**.  
4. Pulsa **`Create codespace on main`**.  

Tras unos segundos, se abrirá una ventana con VS Code online.  

---

## Iniciar y trabajar con Codespaces 🚀

Una vez dentro, puedes abrir la terminal (menú *Terminal → New Terminal* o `Ctrl` + `` ` ``).  

Si quieres trabajar con **pnpm**, instálalo con:  

```bash
npm install -g pnpm
pnpm install
pnpm run dev
````

Por defecto, Vite abre en el puerto 5173. Codespaces te mostrará un aviso para abrirlo en el navegador.

---

## Cómo detener un Codespace 🛑

Aquí viene lo importante: **cerrar la pestaña del navegador NO lo apaga**. El codespace sigue consumiendo horas en la nube.

Tienes varias opciones para detenerlo:

* Desde [github.com/codespaces](https://github.com/codespaces), busca tu entorno, pulsa en ⋮ y elige **Stop codespace**.
* O directamente **Delete** si ya no lo vas a usar más (así liberas también el espacio en disco).

👉 Recomendación: si terminas tu sesión, usa *Stop*. Si ya no lo necesitas más, usa *Delete*.

---

## Precio de GitHub Codespaces 💰

Si tienes una **cuenta gratuita de GitHub** (GitHub Free):

* Incluye **60 horas al mes** de uso (máquina de 2 núcleos).
* Incluye **15 GB de almacenamiento**.
* Si llegas al límite, no se cobra nada: simplemente no podrás abrir más Codespaces hasta el próximo mes.

Con **GitHub Pro** (de pago):

* Subes a **180 horas al mes**.
* Y **20 GB de almacenamiento**.

Los precios extra rondan los **0,18 USD/hora** para computación y **0,07 USD/GB** de almacenamiento.

---

## Cómo ver tu tiempo usado ⏱️

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/l0G17RknJuOlxnFO8/giphy.gif" alt="Chequeado y aprobado" width="300" />
</div>

Para no pasarte del límite gratuito, puedes revisar tu consumo:

1. Ve a [Billing & plans](https://github.com/settings/billing).
2. Baja hasta la sección **Codespaces**.
3. Verás algo como:

```
28/60 hours used · 4 GB storage
```

4. Si quieres más detalle, entra en [Usage](https://github.com/settings/billing/summary).

El contador se resetea cada mes según tu ciclo de facturación de GitHub.

---

## Mi experiencia ✍️

Trabajar con Codespaces me resultó muy útil en vacaciones: no tenía que instalar nada en el ordenador de otra persona, y aun así podía abrir mi app con **pnpm run dev** y seguir programando.

Eso sí: me acostumbré a parar el Codespace cada vez que terminaba, para no desperdiciar horas. Y tener a mano la página de Billing me dio tranquilidad al ver cuántas horas llevaba gastadas.
