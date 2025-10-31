---
title: "Problemas de caché y rutas en Netlify con aplicaciones React"
description: "Descubre cómo solucionar el error de 'página no encontrada' en Netlify al usar rutas dinámicas en una SPA con React Router. Aprende cuándo usar el archivo _redirects o netlify.toml, cómo evitar errores de caché y qué pasa con la carpeta dist en los despliegues."
date: 2025-10-30
image: "https://github.com/user-attachments/assets/b6a70cb6-f8f2-4a3c-ae2c-f5285a5bdac5"
categories: [Desarrollo Web, React, Netlify]
tags: [netlify, react, spa, redirects, routing, deploy, cache, build]
faq:
  - question: "¿Por qué Netlify muestra 'Página no encontrada' al acceder a rutas internas de mi app React?"
    answer: "Porque Netlify busca físicamente esa ruta en el servidor. En una SPA las rutas solo existen dentro de React Router, así que es necesario configurar redirecciones para que todas las rutas apunten a index.html."
  - question: "¿Qué diferencia hay entre usar el archivo _redirects y el archivo netlify.toml?"
    answer: "Ambos sirven para configurar redirecciones, pero no deben coexistir con las mismas reglas. Lo recomendable es usar uno solo: _redirects si buscas simplicidad, o netlify.toml si quieres una configuración más avanzada."
  - question: "¿Cómo limpiar la caché en Netlify tras hacer cambios en el enrutamiento?"
    answer: "Puedes usar la opción 'Clear cache and deploy site' desde el panel de Netlify o ejecutar un redeploy completo para que se regeneren los archivos correctamente."
  - question: "¿Es necesario borrar la carpeta dist antes de desplegar en Netlify?"
    answer: "No. Netlify genera el directorio dist desde cero en cada build. Solo conviene borrarlo manualmente si experimentas errores locales o artefactos de compilaciones anteriores."
---

# 🚧 Problemas de caché y rutas en Netlify con aplicaciones React

Hace poco, mientras desplegaba una pequeña aplicación hecha con **React** (una especie de gestor de usuarios), me encontré con un error que parecía no tener sentido:  

> **Netlify decía que mi página no existía**, aunque la ruta funcionaba perfectamente en local.  

El problema apareció al intentar acceder directamente a una URL como esta:  

```

https://pagina.com/ruta/fwefw343434

````

y Netlify me devolvía un **404**. Sin embargo, en el código React tenía definida la ruta correctamente:  

```jsx
<Route
  path="/ruta/:id"
  element={<Page onUpdateUser={handleUpdateUser} users={users} />}
/>
````

---

## 🧩 ¿Por qué Netlify devuelve un 404?

El motivo no está en tu código React —sino en **cómo Netlify maneja el enrutamiento** de las aplicaciones de una sola página (SPA).

Cuando escribes directamente esa URL en el navegador, este le pide **esa ruta exacta al servidor**. Pero esa ruta **no existe como archivo físico**, solo existe **dentro de React Router**.

👉 Por eso Netlify devuelve un **404**, porque busca un archivo `/ruta/fwefw343434` y, claro, no lo encuentra.

Lo que necesitamos es **decirle a Netlify** que, ante cualquier ruta desconocida, **devuelva el `index.html`**, para que React se encargue de interpretar la ruta.

---

## ✅ Solución 1: el archivo `_redirects`

Esta es la forma más sencilla y rápida de resolverlo.

1. Dentro de tu carpeta `public/`, crea un archivo llamado:

   ```
   _redirects
   ```

2. Escribe dentro lo siguiente:

   ```
   /*    /index.html   200
   ```

3. Guarda, haz un nuevo deploy en Netlify y prueba de nuevo la ruta.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/VR4Xdxj5MXDna/giphy.gif" alt="empaquetar" width="300" />
</div>

Con esto, Netlify servirá siempre tu `index.html` cuando no encuentre una ruta física, permitiendo que React Router gestione el resto.

---

## 🧰 Solución 2: usar `netlify.toml`

Otra opción más avanzada (y útil si tienes varias reglas de configuración) es el archivo `netlify.toml`.

Crea un archivo llamado **`netlify.toml`** en la raíz del proyecto con este contenido:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Guarda y despliega tu sitio.
Ahora Netlify sabrá que todas las rutas deben servir el `index.html`.

---

## ⚠️ Importante: elige **una** de las dos opciones

No uses **_redirects** y **netlify.toml** al mismo tiempo si contienen la misma regla.
Netlify **prioriza el archivo `_redirects`**, y podrías obtener resultados inesperados o confusos.

En la práctica:

* Si tu proyecto es sencillo → usa `_redirects`.
* Si tu proyecto crece y necesita más reglas → pasa a `netlify.toml`.

---

## 🧹 Problemas de caché en Netlify

A veces, después de aplicar la corrección, parece que **Netlify sigue mostrando el mismo error**.
Eso ocurre porque conserva una versión en caché del sitio anterior.

👉 Para solucionarlo, puedes:

1. Ir al panel de Netlify.
2. Entrar en tu sitio → pestaña **Deploys**.
3. Hacer clic en **“Clear cache and deploy site”**.

Con eso forzarás a Netlify a **reconstruir todo desde cero** y aplicar correctamente tus nuevos archivos `_redirects` o `netlify.toml`.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/5kFM0MabGwT7lBNpCK/giphy.gif" alt="Desplegando de nuevo" width="300" />
</div>

---

## 💾 Sobre el directorio `dist` y el build en Netlify

Una duda habitual es si hay que borrar manualmente la carpeta `dist/` antes de hacer un nuevo deploy.
La respuesta es: **no hace falta** 🧘‍♂️

Cada vez que haces un commit o despliegas, Netlify ejecuta un **build completamente nuevo**:

1. Clona el repositorio limpio desde Git.
2. Instala dependencias (`npm install`, `pnpm install`, etc.).
3. Ejecuta el comando de build configurado (`npm run build`).
4. Genera una nueva carpeta `dist/` o `build/` desde cero.

Así que **tu carpeta local `dist/` no se usa ni se sube al servidor**, siempre que esté incluida en el `.gitignore`:

```
dist/
```

Solo conviene borrarla manualmente si:

* Haces pruebas locales y algo no se actualiza correctamente.
* Cambias la configuración del bundler (Vite, Webpack…).
* Sospechas de archivos residuales o corruptos.

En ese caso, puedes limpiar y regenerar con:

```bash
rm -rf dist
npm run build
```

Pero en los despliegues de Netlify, **no es necesario**:
Netlify siempre crea el build desde cero y maneja su propio sistema de caché durante los deploys.

---

## 🧠 En definitiva...

El error de “página no encontrada” en Netlify **no tiene nada que ver con React ni con tu código**, sino con la forma en que los servidores manejan rutas en aplicaciones SPA.

La solución pasa por **enseñarle a Netlify a redirigir todo hacia `index.html`**, y por mantener limpio el caché al hacer nuevos despliegues.

Y si te lo preguntas: no, **no hace falta borrar el `dist/` local** cada vez que haces deploy 😉
Netlify ya lo hace por ti, de forma limpia y automática.
