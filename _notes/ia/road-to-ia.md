---
title: Road to IA
date: 2026-03-25
layout: post
notebook: IA
resumen: "Notas del camino de entender y crear IAs propias"
toc: true
---


- Cuando especifiqué que el modelo de IA de Gemini que quería que usara mi API es "gemini-1.5-flash" me daba en la consola del navegador este error:
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


## Diccionario de términos

### RAG (Retrieval Augmented Generation)
> La Generación Aumentada por Recuperación es una técnica de IA que conecta los modelos de lenguaje (LLM) con fuentes de datos
> externas fiables, mejorando la precisión y actualizando la información sin reentrenar el modelo. Reduce alucinaciones al buscar documentos específicos (PDFs,
> bases de datos) para contextualizar la respuesta.

### LLM (Large Language Model)
> Es una IA avanzada entrenada con volúmenes masivos de texto para comprender, resumir, traducir, predecir y generar lenguaje humano. Basados en redes neuronales
> transformadoras, aprenden patrones para responder preguntas y crear contenido, siendo ejemplos clave ChatGPT, GPT-4, Llama y Gemini.

