---
title: Road to IA
date: 2026-03-25
layout: post
notebook: IA
resumen: "Notas del camino de entender y crear IAs propias"
toc: true
---

## Modelo de IA y errores

Cuando especifiqué que el modelo de IA de Gemini que quería que usara mi API es "gemini-1.5-flash" me daba en la consola del navegador este error:
```
RESPONSE: {"error":"[GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent: [404 Not Found] models/gemini-1.5-flash is not found for API version v1beta, or is not supported for generateContent. Call ListModels to see the list of available models and their supported methods."}
```
Lo importante toda esa línea es este cachito "models/gemini-1.5-flash is not found for API version v1beta" que significa:
> "Estás usando un modelo que ya no existe o no está disponible con ese endpoint"

Sólo hay que cambiar el modelo que estas usando por el que te interes. Se pueden ver en este enlace [Modelos de IA de Gemini (Google)](https://ai.google.dev/gemini-api/docs/models?hl=es-419)

A día de hoy (marzo - 2026) ha salido **Gemini 3** y tiene estas opciones:

<img width="1270" height="729" alt="image" src="https://github.com/user-attachments/assets/3214ff22-81d4-48ce-8d48-c05702796c8d" />

Si pinchas en alguna de las tarjetas Gemini 3 Flash por ejemplo, hay que fijarse en:

<img width="875" height="299" alt="image" src="https://github.com/user-attachments/assets/a7bf8be0-7da0-4416-855f-6bc9d6f2e990" />


Lo defines aquí en 'model: ':

```
const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });
```

- Por supuesto en hay que importar la librería de Gemini en el archivo al principio y generar en el hosting de la api una variable de entorno con la **API KEY** de Gemini

```
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
.
.
.

```

La **API KEY** se consigue en → [https://aistudio.google.com/](https://aistudio.google.com/)

---

## Peticiones desde CLI web

Como lo que realmente esto progrmamando es una api la cual recibe una pregunta/consulta y devuelve la respuesta si visitas el archivo js de la IA de la api,
como no le has pasado ninguna pregunta te devuelve:

<img width="310" height="81" alt="image" src="https://github.com/user-attachments/assets/15b22c6d-4445-47a7-aad6-5ccb3bd1fa1f"/>

Se pueden usar herramientas como Jetpack para hacer peticiones, pero también se pueden hacer desde la consola de Chorme.

Abres la consola de Chrome y haces la petición en la línea de comandos:

```
fetch("https://project-c4tfr43.vercel.app/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    question: "sessionStorage"
  })
})
.then(async res => {
  const text = await res.text();
  console.log("STATUS:", res.status);
  console.log("RESPONSE:", text);
});
```

Si lo ejecutamos nos devolverá, dependiendo de si encuentra la IA respuesta o no, un
 - **'STATUS'**: 200 si ok, 400 si no se encuentra, 500 si hay fallo del servidor...
 - **'RESPONSE'**: la respuesta de la IA "{"answer":"**sessionStorage** es una interfaz de JavaScript que permite almacenar datos..." o si no ha podido generar
la respuesta porque no hay datos en la web sacará "RESPONSE: {"answer":"No tengo información sobre eso en el blog."}"


## Errores de petición por bloqueo de Cloudflare, pero si pegas la url del json sí se ve.

Estaba pasando una cosa curiosa y es que el código de la IA funcionaba con los más básico y por otra parte si pegabas la URL del JSON 'https://jorgerosa.dev/data/busqueda.json' en el navegador se veía el JSON perfecto.

Lo que estaba pasando es que Cloudflare está bloqueando la petición desde Vercel (bot protection)

### ¿Por qué ocurre?

Tu flujo actual:
`
Vercel (serverless) → fetch → jorgerosa.dev
`
Pero Cloudflare detecta:

- request desde servidor (**no navegador**)
- sin cookies
- sin JS challenge

Resultado:
`
403 + HTML (challenge page)
`

Y luego:
`
JSON.parse("<!DOCTYPE html>...")
`

¿Por qué en el navegador **SÍ funciona**?

Porque:

- ejecuta JS
- pasa el challenge de Cloudflare
- tiene headers reales de navegador

Vercel no puede hacer esto.

¿Cuál es la solución?

Hacer un archivo dentro de la propia API para que ésta no tenga que pedirle a Cloudflare el JSON.
Por ejemplo

<pre>
  API/
   └ api.js
  data/
   └ posts.json
</pre>


## URS de Vercel

En el panel 'Overview' del proyecto de Vercel aparecen dos URLs

<img width="499" height="191" alt="image" src="https://github.com/user-attachments/assets/fbcee007-14a1-47c4-9f13-5b3802896074" />

La que nos interesa para programar y probar el proyecto es la **Domains** es la URL "oficial"

La de **Deployment** es la URL del último deploy así que va cambiando cada vez que hacemos uno nuevo, ésta sirve para:
- testing
- rollback
- ver versiones antiguas

## Logs de Vercel

Si en nuestro código del API ponemos `console.log(...)` estos mensajes no saldrán en el navegador, ya que se ejecutan en Vercel.

Para verlos tenemos que loguearnos en Vercel, ir al proyecto, y en el menú de la izquierda pinchar en 'Logs'

<img width="459" height="187" alt="image" src="https://github.com/user-attachments/assets/9c5cc85c-d1c5-4217-bc9b-b02bb5bdec5d" />

---

## Diccionario de términos

### RAG (Retrieval Augmented Generation)
> La Generación Aumentada por Recuperación es una técnica de IA que conecta los modelos de lenguaje (LLM) con fuentes de datos
> externas fiables, mejorando la precisión y actualizando la información sin reentrenar el modelo. Reduce alucinaciones al buscar documentos específicos (PDFs,
> bases de datos) para contextualizar la respuesta.

### LLM (Large Language Model)
> Es una IA avanzada entrenada con volúmenes masivos de texto para comprender, resumir, traducir, predecir y generar lenguaje humano. Basados en redes neuronales
> transformadoras, aprenden patrones para responder preguntas y crear contenido, siendo ejemplos clave ChatGPT, GPT-4, Llama y Gemini.

