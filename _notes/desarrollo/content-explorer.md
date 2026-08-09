---
title: Content Explorer
date: 2026-08-06
layout: post
notebook: Desarrollo
resumen: "Creación de una API de explorador de HTML de web"
toc: true
---

## Funcionalidades de la v1

### Rastreo
✅ Analizar una única página.
✅ Analizar sitio completo (crawler).
✅ Barra de progreso.
✅ Cancelar análisis.
✅ Cola de URLs pendientes.
✅ Evitar analizar la misma URL dos veces.
✅ Solo enlaces internos.
✅ Respetar robots.txt (opcional, lo podemos añadir después).

### Extracción
✅ Title
✅ H1-H6
✅ P
✅ LI
✅ A
✅ BUTTON
✅ LABEL
✅ SPAN
✅ BLOCKQUOTE
✅ CAPTION
✅ TD
✅ TH

Configurable mediante checkboxes.

### Filtros
✅ Longitud mínima.
✅ Ignorar duplicados.
✅ Ignorar texto vacío.
✅ Ignorar elementos ocultos.
✅ Agrupar por página.
✅ Buscar en tiempo real.
✅ Filtrar por etiqueta.
✅ Regex.

### Resultados
✅ Texto.
✅ Etiqueta.
✅ URL.
✅ Selector CSS.
✅ XPath.
✅ Copiar cualquiera de ellos.

### Exportar
✅ JSON.
✅ CSV.
✅ Copiar JSON.

### Resumen
✅ Nº páginas.
✅ Nº elementos.
✅ Nº caracteres.
✅ Nº palabras.
✅ Nº duplicados.
✅ Tiempo empleado.

### SEO
✅ H1 duplicados.
✅ Páginas sin H1.
✅ Más de un H1.
✅ Titles duplicados.
✅ Title >60 caracteres.
✅ Title <20 caracteres.
✅ H1 demasiado largo.
✅ H1 vacío.
✅ Botones sin texto.
✅ Enlaces sin texto.

### Interfaz
✅ Tema JR Tools.
✅ Cards plegables por página.
✅ Barra de progreso.
✅ Spinner.
✅ Contadores.
✅ Toast de "Copiado".

------

## Pasos de exrtacción

https://content-explorer.jorgerosa.dev
            │
            │ fetch()
            ▼
https://proxy.jorgerosa.dev/?url=https://cliente.com
            │
            ▼
Cloudflare Worker
            │
      Descarga el HTML
            │
            ▼
 Devuelve el HTML con CORS habilitado

------

## Creamos el Worker en Cloudflare

- Dentro de Cloudflare en Build > Compute > Workers and Pages.
- Aquí es donde esta la web y los workers pueden estar ambas cosas, no es excluyente que se tenga la web y el worker.


```javascript
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const TIMEOUT = 10000; // 10 segundos
const CACHE_SECONDS = 3600;
const VERSION = "1.1.0";

export default {

  async fetch(request, env, ctx) {

    // -----------------------------
    // CORS
    // -----------------------------

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders()
      });
    }

    // -----------------------------
    // Referer
    // -----------------------------

    const referer = request.headers.get("Referer") || "";

    if (
      referer &&
      !referer.startsWith("https://jorgerosa.dev")
    ) {

      return json({
        success: false,
        error: "Forbidden."
      }, 403);

    }

    // -----------------------------
    // API KEY
    // -----------------------------

    const apiKey = request.headers.get("X-API-Key");

    if (apiKey !== env.API_KEY) {

      return json({
        success: false,
        error: "Unauthorized."
      }, 401);

    }

    // -----------------------------
    // URL
    // -----------------------------

    const requestUrl = new URL(request.url);

    const target = requestUrl.searchParams.get("url");

    if (!target) {

      return json({
        success: false,
        error: "Missing 'url' parameter."
      }, 400);

    }

    const options = requestUrl.searchParams.get("options") || "{}";

    let targetUrl;

    try {

      targetUrl = new URL(target);

      if (
        targetUrl.protocol !== "http:" &&
        targetUrl.protocol !== "https:"
      ) {
        throw new Error();
      }

    } catch {

      return json({
        success: false,
        error: "Invalid URL."
      }, 400);

    }

    // -----------------------------
    // CACHE
    // -----------------------------

    const cache = caches.default;

    // Crear hash de las opciones
    const optionsHash = await hashOptions(options);

    // Crear una clave de caché independiente
    // para cada combinación URL + opciones
    const cacheUrl = new URL(request.url);

    cacheUrl.searchParams.set(
      "optionsHash",
      optionsHash
    );

    // No necesitamos guardar las opciones originales
    cacheUrl.searchParams.delete("options");

    const cacheKey = new Request(cacheUrl.toString());

    const cached = await cache.match(cacheKey);

    if (cached) {

      const headers = new Headers(cached.headers);

      headers.set("X-Cache", "HIT");

      return new Response(
        cached.body,
        {
          status: cached.status,
          headers
        }
      );

    }

    // -----------------------------
    // TIMEOUT
    // -----------------------------

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, TIMEOUT);

    const start = Date.now();

    try {

      const response = await fetch(targetUrl.toString(), {

        redirect: "follow",

        signal: controller.signal,

        headers: {

          "User-Agent": "JR Tools Content Explorer",

          "Accept":
            "text/html,application/xhtml+xml",

          "Accept-Encoding":
            "gzip, br"

        }

      });

      clearTimeout(timeout);

      if (!response.ok) {

        return json({
          success: false,
          status: response.status,
          error: response.statusText
        }, response.status);

      }

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("text/html")) {

        return json({
          success: false,
          error: "Only HTML pages are supported.",
          contentType
        }, 415);

      }

      const html = await response.text();

      if (html.length > MAX_SIZE) {

        return json({
          success: false,
          error: "Page exceeds 10 MB."
        }, 413);

      }

      const elapsed = Date.now() - start;

      const headers = new Headers(corsHeaders());

      headers.set(
        "Content-Type",
        "text/html; charset=utf-8"
      );

      headers.set(
        "Cache-Control",
        `public, max-age=${CACHE_SECONDS}`
      );

      headers.set(
        "X-Worker-Version",
        VERSION
      );

      headers.set(
        "X-Cache",
        "MISS"
      );

      headers.set(
        "X-Options-Hash",
        optionsHash
      );

      headers.set(
        "X-Final-URL",
        response.url
      );

      headers.set(
        "X-Status",
        response.status.toString()
      );

      headers.set(
        "X-Content-Type",
        contentType
      );

      headers.set(
        "X-Content-Length",
        html.length.toString()
      );

      headers.set(
        "X-Response-Time",
        `${elapsed} ms`
      );

      const result = new Response(
        html,
        {
          status: 200,
          headers
        }
      );

      ctx.waitUntil(
        cache.put(
          cacheKey,
          result.clone()
        )
      );

      return result;

    }

    catch (e) {

      clearTimeout(timeout);

      if (e.name === "AbortError") {

        return json({
          success: false,
          error: "Request timeout."
        }, 408);

      }

      return json({
        success: false,
        error: e.message
      }, 500);

    }

  }

};

// ----------------------------------------------------

function corsHeaders() {

  return {

    "Access-Control-Allow-Origin":
      "https://jorgerosa.dev",

    "Access-Control-Allow-Methods":
      "GET, OPTIONS",

    "Access-Control-Allow-Headers":
      "Content-Type, X-API-Key"

  };

}

// ----------------------------------------------------

function json(data, status = 200) {

  return new Response(

    JSON.stringify(data, null, 2),

    {

      status,

      headers: {

        ...corsHeaders(),

        "Content-Type":
          "application/json"

      }

    }

  );

}

async function hashOptions(options) {

  const data = new TextEncoder().encode(options);

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  const hashArray = Array.from(
    new Uint8Array(hashBuffer)
  );

  return hashArray
    .map(byte =>
      byte.toString(16).padStart(2, "0")
    )
    .join("");

}
```

-------

## Para que no cualqueira emplee el workers desde su web y empiecen a generear tráfico que no sobrecargue el sistema y se sobrepase el límite de gratuito hay que generar una API_KEY para que solo acepte peticiones de quien tiene la api, osea yo.
 
Para crearlo hay que ir a `Workers & Pages → tu Worker → Settings → Variables and Secrets → API_KEY`

-----

## Cómo probarlo?

Desde la consola del navegador (F12) hay que poner este comando

```
fetch("https://proxy.jorgerosa.dev/?url=https%3A%2F%2Fexample.com", {
  headers: {
    "X-API-Key": "MI_API_KEY"
  }
})
.then(async response => {
  console.log("Status:", response.status);
  console.log("Headers:", [...response.headers.entries()]);
  console.log("Body:", await response.text());
});
```