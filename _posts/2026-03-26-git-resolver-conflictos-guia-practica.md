---
title: "Cómo resolver conflictos en Git paso a paso (sin romper tu proyecto)"
description: "Aprende qué son los conflictos en Git, por qué ocurren al trabajar en varios ordenadores y cómo resolverlos paso a paso sin errores. Guía práctica con ejemplos reales."
date: 2026-03-26
image: "https://github.com/user-attachments/assets/1db217d0-cb75-40c8-a932-e7612c6e5daf"
categories: [git, github, desarrollo-web]
tags: [git, github, conflictos, control-de-versiones, desarrollo, programacion, jekyll]
faq:
  - question: "¿Qué es un conflicto en Git?"
    answer: "Un conflicto en Git ocurre cuando dos cambios afectan a la misma parte de un archivo y Git no puede decidir automáticamente cuál mantener, por lo que requiere intervención manual."
  - question: "¿Cuándo suelen aparecer los conflictos en Git?"
    answer: "Suelen aparecer cuando trabajas en varios ordenadores o ramas y modificas el mismo archivo sin haber sincronizado antes con git pull."
  - question: "¿Cómo se resuelve un conflicto en Git?"
    answer: "Se resuelve editando manualmente el archivo afectado, eliminando las marcas de conflicto y dejando el código final deseado, para luego hacer git add, git commit y git push."
  - question: "¿Se pueden evitar los conflictos en Git?"
    answer: "Sí, se pueden reducir haciendo git pull antes de trabajar, realizando commits frecuentes y evitando modificar las mismas líneas en diferentes entornos."
---

Hay un momento bastante típico cuando empiezas a trabajar con Git en serio: todo va bien hasta que aparece un error raro al hacer `git push`… 😅

Y entonces ves algo como esto:

```bash
! [rejected] main -> main (fetch first)
```

Ahí es donde empiezan los conflictos.

---

## 🧠 Qué está pasando realmente

Un conflicto en Git ocurre cuando:

* Has hecho cambios en un archivo
* Otra versión de ese mismo archivo ya existe en remoto
* Y ambos cambios afectan a la misma zona

Un caso muy real:

* En el trabajo modificas `page.tsx`
* En casa modificas también `page.tsx`
* Subes uno de los cambios
* Intentas subir el otro…

💥 Git no sabe cuál elegir

---

## 📉 El error típico al hacer push

```bash
git push
```

Resultado:

```bash
! [rejected] main -> main (fetch first)
```

Esto significa:

👉 “Antes de subir tus cambios, necesitas traer los últimos del repositorio”

---

## 🔄 El primer paso siempre: sincronizar

```bash
git pull
```

Aquí pueden pasar dos cosas:

---

## 🟢 Caso 1: todo se mezcla automáticamente

Git hace magia:

```bash
Auto-merging page.tsx
```

Y puedes seguir sin problemas:

```bash
git push
```

---

## 🔴 Caso 2: conflicto detectado

Aquí es donde entra lo interesante:

```bash
CONFLICT (content): Merge conflict in page.tsx
```

Git no ha podido resolverlo solo.

---

## 🧩 Cómo se ve un conflicto dentro del código

Cuando abres el archivo, verás algo así:

```javascript
<<<<<<< HEAD
const mensaje = "Hola desde el trabajo";
=======
const mensaje = "Hola desde casa";
>>>>>>> main
```

Estas marcas indican:

* `HEAD` → tu versión actual
* `=======` → separación
* `main` → versión remota

---

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif" alt="programador confundido mirando código" width="300" />
</div>

---

## ✍️ Resolver el conflicto paso a paso

Aquí no hay automatismo: decides tú.

Por ejemplo, puedes dejar:

```javascript
const mensaje = "Hola desde casa y trabajo";
```

Y eliminar completamente:

```text
<<<<<<< HEAD
=======
>>>>>>>
```

---

## ✅ Guardar la solución

Una vez editado:

```bash
git add .
git commit -m "resuelvo conflicto"
git push
```

Y listo 🚀

---

## ⚡ Forma más profesional: usar rebase

En lugar de `git pull`, puedes usar:

```bash
git pull --rebase
```

Esto hace que:

* Tus cambios se apliquen después de los remotos
* El historial sea más limpio
* Haya menos merges innecesarios

---

## 🧠 Cómo evitar conflictos (o al menos reducirlos)

Algunas reglas que acaban saliendo solas con el tiempo:

* Antes de trabajar:

```bash
git pull
```

* Haz commits pequeños y frecuentes
* Evita editar el mismo archivo en dos sitios a la vez
* Divide componentes (por ejemplo en Next.js)

Ejemplo:

En vez de un solo archivo gigante:

```text
page.tsx
```

Divide en:

```text
components/Header.tsx
components/Footer.tsx
components/Card.tsx
```

👉 Menos probabilidad de pisarte a ti mismo

---

## 🧩 Un caso práctico rápido

Imagina este flujo:

1. En casa:

```bash
git commit -m "añado header"
git push
```

2. En el trabajo (sin hacer pull):

```bash
git commit -m "cambio estilos"
git push ❌
```

3. Solución:

```bash
git pull
# resolver conflicto
git push
```

---

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif" alt="persona resolviendo problema en ordenador" width="300" />
</div>

---

## 📌 Idea clave que conviene interiorizar

Git no se equivoca ni “rompe cosas”.

Simplemente te dice:

👉 *“Aquí hay dos versiones distintas, decide tú cuál es la correcta”*

Y eso, aunque al principio asuste un poco, es justo lo que evita perder código sin darte cuenta.

