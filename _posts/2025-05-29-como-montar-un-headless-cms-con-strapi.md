---
title: "Cómo montar un Headless CMS con Strapi (en local y en producción)"
description: "Aprende paso a paso a montar un CMS Headless con Strapi. Desde la instalación local hasta el despliegue en producción, incluyendo ejemplos, gifs y consejos técnicos."
image: https://github.com/user-attachments/assets/bdba9a62-ac40-430e-aa6a-7075d5c8e952
date: 2025-05-29
categories: [desarrollo-web, arquitectura-web]
tags: [headless, strapi, cms, api, backend, despliegue]
---

> 🧠 Después de entender qué es un [Headless CMS](https://jorgerosa.dev/posts/que-es-un-headless-cms/), ahora me lanzo a **montar uno desde cero con Strapi**, primero en local y luego dejándolo listo paraión.

---

## 🖥️ Instalación en local con Strapi

La forma más sencilla es usar `npx` para crear un proyecto nuevo. Necesitas tener instalado Node.js (preferiblemente LTS).

```bash
npx create-strapi-app@latest mi-cms --quickstart
```

Eso hará todo por ti:

* Instala las dependencias
* Inicia una base de datos SQLite
* Levanta el servidor en `http://localhost:1337`

⏳ Puede tardar un par de minutos. Y luego…

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" alt="Todo bien" width="300" />
</div>

---

## 🔐 Accede al panel de Strapi

La primera vez que accedas a `http://localhost:1337/admin`, te pedirá que crees un usuario administrador. Luego ya podrás entrar y ver esto:

* Panel de administración
* Estructura de contenido personalizable
* Roles y permisos
* API generada automáticamente 🔥

> ⚙️ Consejo: si prefieres usar Postgres o Mongo en vez de SQLite, puedes configurarlo en lugar del `--quickstart`.

---

## 🧱 Crear una colección: ejemplo “artículos”

1. Ve a *Content-Type Builder*.
2. Crea un nuevo Collection Type llamado `articulo`.
3. Añade campos como:

   * `titulo` (text)
   * `contenido` (rich text)
   * `slug` (UID)
   * `imagen` (media)
   * `fecha_publicacion` (date)

¡Y listo! La API ya está generada automáticamente. 😮

```bash
GET http://localhost:1337/api/articulos
```

Para ver los datos necesitas cambiar los **permisos públicos** desde *Settings > Roles > Public*. Marca “find” y “findOne” en la colección para que se puedan consultar sin login.

---

## 🌍 Desplegar en producción

### Opción 1: Render (gratis y fácil)

1. Crea una cuenta en [Render](https://render.com).
2. Haz push de tu proyecto a GitHub.
3. Crea un nuevo Web Service con:

   * Node: sí
   * Build command: `npm install && npm run build`
   * Start command: `npm run start`
4. Usa una base de datos externa (como PostgreSQL en Render) y actualiza el archivo `.env` con las credenciales.

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=...
DATABASE_PORT=5432
DATABASE_NAME=...
DATABASE_USERNAME=...
DATABASE_PASSWORD=...
```

Render te lo pone todo bastante fácil. Si necesitas subir imágenes, tendrás que configurar almacenamiento como Cloudinary o Amazon S3.

### Opción 2: VPS (más control)

Puedes usar un servidor tipo DigitalOcean o Hetzner:

```bash
# Instalas Node, PM2 y Strapi como siempre
npx create-strapi-app@latest strapi-prod
```

Luego:

* Usa PM2 para mantenerlo vivo
* Configura Nginx como proxy
* Añade SSL con Let's Encrypt

> Este camino es más técnico, pero te da más control sobre recursos y configuración.

---

## ☁️ Imágenes y Media en producción

Strapi almacena las imágenes localmente por defecto. En local está bien, pero en producción puede ser un lío. Por eso se recomienda usar Cloudinary:

```bash
npm install @strapi/provider-upload-cloudinary
```

Configuras `config/plugins.js`:

```js
module.exports = {
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: 'tucuenta',
        api_key: 'tu_api_key',
        api_secret: 'tu_api_secret',
      },
    },
  },
};
```

Así las imágenes subidas en producción van directas a la nube ☁️.

---

## 📦 ¿Y luego qué?

Ya con Strapi funcionando, tienes una API robusta y flexible para alimentar cualquier frontend que te apetezca: React, Astro, Svelte, Vue… o incluso una app móvil. Puedes montar relaciones entre colecciones, controlar los permisos por roles, extender el admin panel y mucho más.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/RrVzUOXldFe8M/giphy.gif" alt="Todo bien" width="300" />
</div>

---

## 📌 Notas personales

¿Por qué Strapi?:

* Es open source 🧑‍💻
* Está bien documentado 📚
* No me fuerza a usar ninguna base de datos concreta
* Tiene un panel muy limpio y cómodo


---

Hasta aquí la aventura de hoy. Montar tu propio Headless CMS con Strapi no solo es posible, sino también muy gratificante si te gusta tener el control de tus herramientas. Ahora, a [conectarlo con un frontend hecho con Next.js ↗](https://jorgerosa.dev/posts/conectando-strapi-con-nextjs/) y que empiece la fiesta de los datos 🎉.
