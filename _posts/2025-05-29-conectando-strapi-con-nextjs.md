---
title: "Conectando Strapi con Next.js: crea tu frontend con datos dinámicos"
description: "Aprende cómo conectar un Headless CMS como Strapi con un frontend hecho en Next.js. Desde las peticiones a la API hasta el renderizado dinámico de contenidos, paso a paso y con ejemplos claros."
image: https://github.com/user-attachments/assets/bdba9a62-ac40-430e-aa6a-7075d5c8e952
date: 2025-05-29 +1000
categories: [desarrollo-web, headless-cms, nextjs]
tags: [strapi, headless, nextjs, react, frontend, api]
---

> 🧱 Ya tengo montado mi backend con Strapi, ¡pero no sirve de mucho si no lo muestro!  
> Ahora toca conectar ese CMS headless con un frontend hecho en Next.js. Vamos paso a paso.

---

## 🧠 ¿Por qué Next.js?

Next.js es perfecto para esto porque:

- Soporta **renderizado híbrido** (SSR y SSG)
- Tiene routing automático
- Es fácil de desplegar en Vercel 🚀
- Puedes crear un sitio dinámico que se actualice con los datos de Strapi

---

## 📦 Preparar Next.js

1. Crea tu proyecto:

```bash
npx create-next-app@latest frontend-strapi
cd frontend-strapi
npm run dev
````

2. Instala `axios` para consumir la API:

```bash
npm install axios
```

---


## 🗂️ ¿Cómo organizar el frontend y el backend?

En este tipo de proyectos tendremos dos frameworks, uno encargado del **backend** (Strapi) y del **front-end** (Next.js), cada uno va en **su propia carpeta**, así:

```
mi-proyecto/
├── backend-strapi/      ← Strapi
└── frontend-nextjs/     ← Next.js
```

---

## 🛠️ ¿Cómo los ejecuto a la vez?

Tienes dos opciones:

---

### 🧩 Opción 1: Ejecutarlos manualmente en dos terminales

1. Abre una terminal y arranca Strapi:

```bash
cd backend-strapi
npm run develop
```

2. Abre otra terminal y arranca Next.js:

```bash
cd frontend-nextjs
npm run dev
```

Esto es lo más habitual cuando estás desarrollando localmente.

---

### 🧰 Opción 2: Unificar con `concurrently` (opcional)

Si te molesta tener dos terminales abiertas, puedes crear una carpeta raíz y un script para lanzar ambos.

1. Estructura:

```
mi-proyecto/
├── backend-strapi/
├── frontend-nextjs/
└── package.json  ← aquí va el script unificado
```

2. Instala `concurrently` en la raíz:

```bash
npm init -y
npm install concurrently --save-dev
```

3. En el `package.json` raíz, añade:

```json
"scripts": {
  "dev": "concurrently \"npm run develop --prefix backend-strapi\" \"npm run dev --prefix frontend-nextjs\""
}
```

4. Ahora puedes lanzar ambos con:

```bash
npm run dev
```

---

## 🌐 Configuración de URLs

Asegúrate de que Next.js apunte correctamente al backend. En desarrollo local:

* Strapi suele correr en `http://localhost:1337`
* Next.js corre en `http://localhost:3000`

En tu `frontend-nextjs/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337/api
```

Y en tu código usa esa variable:

```js
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

---


## 🔗 Conectar con la API de Strapi

Supongamos que en Strapi tienes una colección `articulos` con campos `titulo`, `slug` y `contenido`.

Creamos un archivo en `lib/api.js` para centralizar las llamadas:

```js
// lib/api.js
import axios from 'axios';

const API_URL = 'http://localhost:1337/api'; // o el dominio en producción

export const getArticulos = async () => {
  const res = await axios.get(`${API_URL}/articulos?populate=*`);
  return res.data.data;
};

export const getArticuloPorSlug = async (slug) => {
  const res = await axios.get(`${API_URL}/articulos?filters[slug][$eq]=${slug}&populate=*`);
  return res.data.data[0];
};
```

---

## 🧭 Crear rutas dinámicas

### 1. Lista de artículos (`pages/index.js`):

```js
import { getArticulos } from "@/lib/api";

export default function Home({ articulos }) {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Artículos</h1>
      <ul>
        {articulos.map(({ id, attributes }) => (
          <li key={id}>
            <a href={'/articulo/${attributes.slug}'} className="text-blue-600 underline">
              {attributes.titulo}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const articulos = await getArticulos();
  return {
    props: { articulos },
    revalidate: 60, // ISR
  };
}
```

---

### 2. Página de artículo (`pages/articulo/[slug].js`):

```js
import { getArticuloPorSlug, getArticulos } from "@/lib/api";

export default function Articulo({ articulo }) {
  const { titulo, contenido } = articulo.attributes;
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">{titulo}</h1>
      <article dangerouslySetInnerHTML={{ __html: contenido }} />
    </main>
  );
}

export async function getStaticPaths() {
  const articulos = await getArticulos();
  const paths = articulos.map(({ attributes }) => ({
    params: { slug: attributes.slug },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const articulo = await getArticuloPorSlug(params.slug);
  return {
    props: { articulo },
    revalidate: 60,
  };
}
```

---

## 🖼️ Mostrar imágenes subidas a Strapi

Strapi devuelve las URLs relativas, así que necesitas concatenar el dominio:

```js
const imagenUrl = articulo.attributes.imagen.data.attributes.url;
const urlAbsoluta = `http://localhost:1337${imagenUrl}`;
```

Y en JSX:

```js
<img src={urlAbsoluta} alt="Imagen del artículo" />
```

---

## 🌍 Desplegar el frontend

Lo más fácil es usar **Vercel**:

```bash
npx vercel
```

* Añade como variable de entorno: `NEXT_PUBLIC_API_URL=https://tu-backend-strapi.com/api`
* Vercel se encargará del resto ✨

---

## 🧪 Resultado final

* El contenido se crea en Strapi
* El frontend de Next.js lo consume y muestra
* Si cambias algo en Strapi, el frontend se actualiza automáticamente en el próximo build o al cabo de unos segundos si usas ISR (Incremental Static Regeneration)

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/YQitE4YNQNahy/giphy.gif" alt="Chequeado y aprobado" width="300" />
</div>

---

## 🧭 Rutas posibles a futuro

Ahora que tengo el backend y el frontend conectados, puedo hacer cosas como:

* Crear un buscador
* Añadir una landing con filtros
* Mostrar categorías, etiquetas, fechas…
* Proteger rutas privadas (por rol)
* Mostrar previews para redacción de contenidos

---

## 🗒️ Notas personales

Conectar Strapi con Next.js ha sido bastante fluido. Me ha gustado que:

* Puedes usar `getStaticProps` y tener todo pre-renderizado
* Los slugs se gestionan fácilmente
* La separación backend/frontend es muy clara y elegante

Y sobre todo: tengo control total, tanto del contenido como de la forma en que lo muestro.
La arquitectura Headless empieza a cobrar sentido poco a poco 🧩


