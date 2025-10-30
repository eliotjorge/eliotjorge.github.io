---
title: "Supabase: la alternativa open source a Firebase que lo tiene todo"
description: "Descubre todo lo que ofrece Supabase: base de datos PostgreSQL, autentificación de usuarios, almacenamiento, funciones, editor SQL y mucho más. Una plataforma open source que sorprende por su potencia y facilidad de uso."
date: 2025-10-27
image: https://github.com/user-attachments/assets/c8713298-4824-4b29-813a-36e1c99063f6
categories: [Supabase, Backend, Bases de datos, Open Source]
tags: [Supabase, Firebase, PostgreSQL, Auth, Storage, Backend, Open Source]
faq:
  - question: "¿Qué es Supabase y para qué sirve?"
    answer: "Supabase es una plataforma open source que ofrece herramientas backend listas para usar: base de datos PostgreSQL, API REST, autenticación de usuarios, almacenamiento de archivos, funciones y más. Es una alternativa gratuita y abierta a Firebase."
  - question: "¿Supabase es gratis?"
    answer: "Sí, Supabase tiene un plan gratuito muy completo que incluye base de datos PostgreSQL, autenticación, almacenamiento y API. Sin embargo, tiene límites en almacenamiento, peticiones y rendimiento. Puedes ampliarlos con planes de pago según tus necesidades."
  - question: "¿Supabase necesita servidor?"
    answer: "No. Supabase ofrece todo el backend gestionado en la nube: base de datos, API, autenticación, almacenamiento y panel de administración. No necesitas configurar un servidor propio, aunque puedes autohospedarlo si prefieres."
  - question: "¿Supabase es mejor que Firebase?"
    answer: "Depende del caso. Supabase destaca por usar PostgreSQL (SQL real, relacional y exportable), ofrecer autenticación open source y no depender de servicios cerrados de Google. Firebase, por su parte, tiene un ecosistema más grande y una capa gratuita más generosa para apps móviles."
---

Cuando empecé a usar **Supabase**, no imaginaba lo completo que era.  
Entré buscando una forma rápida de tener **autenticación** en una app personal… y acabé descubriendo un ecosistema **backend completo**, con base de datos, API, almacenamiento, funciones y hasta editor visual 🤯.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/XR9Dp54ZC4dji/giphy.gif" alt="Chequeado y aprobado" width="300" />
</div>

---

## 🚀 ¿Qué es Supabase?

Supabase se define como “**una alternativa OPEN SOURCE a Firebase**”.  
Pero en la práctica, es mucho más que eso.  
Ofrece una infraestructura completa para tu backend, construida sobre **PostgreSQL**, una base de datos potente, segura y estándar.

Lo que más me gusta es que puedes acceder a todo directamente desde su **panel online** o desde la **CLI** (línea de comandos).  
Nada de configuraciones raras ni dependencias cerradas: lo creas, lo ejecutas y funciona.

[https://supabase.com/](supabase.com)

---

## 🧩 Base de datos PostgreSQL (con API automática)

Cada proyecto Supabase incluye una base de datos **PostgreSQL real**, con todas sus funciones: relaciones, vistas, triggers, JSONB, etc.

Y lo mejor: Supabase genera automáticamente una **API RESTful** (PostgREST) sobre todas tus tablas.  
Solo con crear una tabla, ya puedes hacer peticiones como:

```bash
GET https://<tu-proyecto>.supabase.co/rest/v1/inventario
```

O desde JavaScript:

```js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const { data } = await supabase.from("inventario").select("*");
```

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/WvTKJoo9Dudou54YY6/giphy.gif" alt="Conectando la base de datos" width="300" />
</div>

La API respeta las políticas RLS que configures (lo vimos en mis posts anteriores sobre políticas de seguridad 😉).

---

## 🔑 Autenticación integrada (Auth)

Supabase incluye un sistema de **autenticación de usuarios** totalmente funcional: registro, login, recuperación de contraseña, correo de confirmación… incluso **integración con proveedores externos** como Google, GitHub, Apple o Discord.

Y lo más cómodo: el panel tiene un **editor de emails** para personalizar las plantillas de confirmación o recuperación 🔥.

Ejemplo de uso básico:

```js
const { user, error } = await supabase.auth.signUp({
  email: "usuario@ejemplo.com",
  password: "12345678"
});
```

Además, puedes controlar los accesos desde la base de datos con **RLS (Row Level Security)** y políticas personalizadas, lo que lo hace muy potente para proyectos serios.

---

## 🗂️ Almacenamiento de archivos (Storage)

Otro punto fuerte: los **buckets de almacenamiento**.
Puedes guardar imágenes, vídeos, PDFs, lo que necesites.
El acceso también se controla con políticas (igual que las tablas).

Por ejemplo, para subir un archivo:

```js
const { data, error } = await supabase.storage
  .from("avatars")
  .upload("user1/avatar.png", file);
```

Y para obtener su URL pública:

```js
const { data } = supabase.storage
  .from("avatars")
  .getPublicUrl("user1/avatar.png");
```

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/NYTiMpwZ5eqj3l5Zai/giphy.gif" alt="Subiendo imágenes" width="300" />
</div>

---

## ⚙️ Funciones, logs y editor SQL

Supabase incluye un **editor SQL** en el panel, muy práctico para ejecutar consultas o scripts de migración sin salir del navegador.
También puedes ver **logs en tiempo real**, estadísticas de uso y plan de consultas.

Además, recientemente añadieron **Edge Functions**, pequeñas funciones serverless escritas en JavaScript o TypeScript, que puedes desplegar directamente desde la CLI:

```bash
supabase functions deploy notificar-usuario
```

Perfectas para **automatizar tareas** como enviar correos, generar facturas o procesar webhooks.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/PlLanl8Bzcvr14IfjJ/giphy.gif" alt="Ejecutando funciones" width="300" />
</div>

---

## 💸 Plan gratuito y limitaciones

El **plan gratuito de Supabase** es sorprendentemente generoso:

* 500 MB de base de datos PostgreSQL
* 1 GB de almacenamiento
* 50 MB de transferencias mensuales
* 50.000 invocaciones de funciones
* 10.000 usuarios activos mensuales en Auth

Suficiente para proyectos personales, prototipos y pruebas.
A medida que el proyecto crece, puedes pasar a un plan de pago (bastante razonable) o incluso **autohospedar Supabase** tú mismo, ya que es 100 % open source.

---

## 🧠 Conclusión

Supabase me ha sorprendido porque consigue algo muy difícil: ofrecer un **backend completo, moderno y bien documentado**, sin cerrarte en un ecosistema propietario.
Puedes tener base de datos, autenticación, almacenamiento y funciones en minutos, sin renunciar a usar **SQL real** ni a la libertad del código abierto 🧩.

Si vienes de Firebase, vas a sentirte como en casa, pero con el control total de tu backend y sin miedo a quedarte encerrado.
Y si estás empezando un nuevo proyecto, puede que sea la opción más práctica y transparente que existe ahora mismo.
