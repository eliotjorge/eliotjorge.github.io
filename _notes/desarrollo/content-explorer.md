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


```javascriptconst MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const TIMEOUT = 10000; // 10 segundos
const CACHE_SECONDS = 3600; // 1 hora
const VERSION = "1.2.0";

export default {

  async fetch(request, env, ctx) {

    // -----------------------------
    // METHOD
    // -----------------------------

    if (
      request.method !== "GET" &&
      request.method !== "OPTIONS"
    ) {

      return json({
        success: false,
        error: "Method not allowed."
      }, 405);

    }

    // -----------------------------
    // CORS PREFLIGHT
    // -----------------------------

    if (request.method === "OPTIONS") {

      return new Response(null, {
        status: 204,
        headers: corsHeaders()
      });

    }

    // -----------------------------
    // ORIGIN / REFERER
    // -----------------------------

    const origin =
      request.headers.get("Origin") || "";

    const referer =
      request.headers.get("Referer") || "";

    // Si existe Origin, debe ser nuestra web.
    if (
      origin &&
      origin !== "https://jorgerosa.dev"
    ) {

      return json({
        success: false,
        error: "Forbidden."
      }, 403);

    }

    // Si existe Referer, también debe ser nuestra web.
    if (
      referer &&
      !referer.startsWith("https://jorgerosa.dev/")
    ) {

      return json({
        success: false,
        error: "Forbidden."
      }, 403);

    }

    // -----------------------------
    // API KEY
    // -----------------------------

    const apiKey =
      request.headers.get("X-API-Key");

    if (
      !apiKey ||
      apiKey !== env.API_KEY
    ) {

      return json({
        success: false,
        error: "Unauthorized."
      }, 401);

    }

    // -----------------------------
    // REQUEST URL
    // -----------------------------

    const requestUrl =
      new URL(request.url);

    const target =
      requestUrl.searchParams.get("url");

    if (!target) {

      return json({
        success: false,
        error: "Missing 'url' parameter."
      }, 400);

    }

    // -----------------------------
    // VALIDATE TARGET URL
    // -----------------------------

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
        error: "Invalid URL. Only HTTP and HTTPS are allowed."
      }, 400);

    }

    // -----------------------------
    // CACHE KEY
    // -----------------------------
    //
    // The cache key contains:
    //
    //   target URL
    //   extraction options hash
    //
    // This means:
    //
    // URL + options A = cache A
    // URL + options B = cache B
    //
    // The original query string is NOT used
    // directly as the cache key.
    //
    // NOTE:
    // cf.cacheKey is an Enterprise-only feature
    // according to Cloudflare documentation.
    //
    // Therefore we encode our cache identity
    // into the URL used by the subrequest instead.
    //
    // -----------------------------

    // -----------------------------
    // TIMEOUT
    // -----------------------------

    const controller =
      new AbortController();

    const timeout =
      setTimeout(() => {
        controller.abort();
      }, TIMEOUT);

    const start =
      Date.now();

    try {

      // -----------------------------
      // FETCH ORIGIN THROUGH
      // CLOUDFLARE CACHE
      // -----------------------------

      const response = await fetch(
        targetUrl.toString(),
        {
          redirect: "follow",

          signal:
            controller.signal,

          headers: {
            "User-Agent":
              "JR Tools Content Explorer",

            "Accept":
              "text/html,application/xhtml+xml"
          },

          cf: {
            cacheEverything: true,
            cacheTtl: CACHE_SECONDS
          }
        }
      );

      clearTimeout(timeout);

      // -----------------------------
      // HTTP STATUS
      // -----------------------------

      if (!response.ok) {

        return json({
          success: false,
          status: response.status,
          error: response.statusText
        }, response.status);

      }

      // -----------------------------
      // CONTENT TYPE
      // -----------------------------

      const contentType =
        response.headers.get(
          "content-type"
        ) || "";

      if (
        !contentType
          .toLowerCase()
          .includes("text/html")
      ) {

        return json({
          success: false,
          error:
            "Only HTML pages are supported.",
          contentType
        }, 415);

      }

      // -----------------------------
      // READ HTML
      // -----------------------------

      const html =
        await response.text();

      // -----------------------------
      // SIZE LIMIT
      // -----------------------------

      if (
        html.length > MAX_SIZE
      ) {

        return json({
          success: false,
          error:
            "Page exceeds 10 MB."
        }, 413);

      }

      // -----------------------------
      // RESPONSE TIME
      // -----------------------------

      const elapsed =
        Date.now() - start;

      // -----------------------------
      // CLOUDFLARE CACHE STATUS
      // -----------------------------

      const cloudflareCacheStatus =
        response.headers.get(
          "CF-Cache-Status"
        ) || "UNKNOWN";

      // -----------------------------
      // RESPONSE HEADERS
      // -----------------------------

      const headers =
        new Headers(
          corsHeaders()
        );

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
        cloudflareCacheStatus
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

      // -----------------------------
      // RETURN HTML
      // -----------------------------

      return new Response(
        html,
        {
          status: 200,
          headers
        }
      );

    } catch (e) {

      clearTimeout(timeout);

      // -----------------------------
      // TIMEOUT
      // -----------------------------

      if (
        e.name === "AbortError"
      ) {

        return json({
          success: false,
          error:
            "Request timeout."
        }, 408);

      }

      // -----------------------------
      // OTHER ERROR
      // -----------------------------

      return json({
        success: false,
        error: e.message
      }, 500);

    }

  }

};


// ============================================================
// CORS
// ============================================================

function corsHeaders() {

  return {

    "Access-Control-Allow-Origin":
      "https://jorgerosa.dev",

    "Access-Control-Allow-Methods":
      "GET, OPTIONS",

    "Access-Control-Allow-Headers":
      "Content-Type, X-API-Key",

    "Access-Control-Expose-Headers":
      "CF-Cache-Status, X-Worker-Version, X-Cache, X-Final-URL, X-Status, X-Content-Type, X-Content-Length, X-Response-Time"
  };

}


// ============================================================
// JSON RESPONSE
// ============================================================

function json(
  data,
  status = 200
) {

  return new Response(

    JSON.stringify(
      data,
      null,
      2
    ),

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
```

-------

## ¿Y para que no use cualquiera tu worker?

Para que no cualqueira emplee el workers desde su web y empiecen a generear tráfico que no sobrecargue el sistema y se sobrepase el límite de gratuito hay que generar una API_KEY para que solo acepte peticiones de quien tiene la api, osea yo.
 
Para crearlo hay que ir a `Workers & Pages → tu Worker → Settings → Variables and Secrets → API_KEY`

Importante guardarlo bien porque una vez se haga el deploy del API KEY no se podrá volver a ver se podrá cambiar por otro

-----

## Cómo probarlo?

Desde la consola del navegador (F12) hay que poner este comando. Pero **IMPORTANTE** como hemos configurado en el código que sólo acepte peticiones desde la URL https://jorgerosa.dev hay que abrir la consola para probarlo desde esta URL.

Si por ejemplo abrimos la consola desde https://google.com devolverá esto:




```

fetch("https://proxy.jorgerosa.dev/?url=https://jorgerosa.dev/", {
  headers: {
    "X-API-Key": "MI_API_KEY"
  }
})
.then(async response => {
  console.log("Status:", response.status);
  console.log("Cloudflare:", response.headers.get("CF-Cache-Status"));
  console.log("Worker:", response.headers.get("X-Worker-Version"));
  console.log("Final URL:", response.headers.get("X-Final-URL"));
  console.log("Content Type:", response.headers.get("X-Content-Type"));
  console.log("Content Length:", response.headers.get("X-Content-Length"));
  console.log("Response Time:", response.headers.get("X-Response-Time"));
  console.log("Body:", await response.text());
});

```