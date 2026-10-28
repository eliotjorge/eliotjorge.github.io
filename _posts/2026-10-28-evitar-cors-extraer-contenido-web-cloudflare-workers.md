---
title: "Cómo solucionar errores CORS: proxies, Cloudflare Workers y cabeceras HTTP"
date: 2026-10-28
image: "https://github.com/user-attachments/assets/26f4bb90-087f-4343-abcb-5c3df9684e49"
categories: [web,desarrollo,seguridad]
tags: [cors,cloudflare-workers,javascript,web-scraping,scraping,proxy,api,fetch,headers,http]
description: "Aprende a solucionar errores CORS mediante configuración del servidor, proxies y Cloudflare Workers. Descubre qué hacen las cabeceras HTTP, User-Agent y cómo extraer contenido web con JavaScript."
permalink: /solucionar-errores-cors-proxy-cloudflare-workers/
faq:
  - question: "¿Cómo puedo solucionar un error CORS?"
    answer: "Si controlas el servidor, configura las cabeceras CORS para permitir el origen, los métodos y las cabeceras necesarios. Si no controlas el servidor, puedes utilizar un backend o proxy propio que realice la petición y entregue el contenido al frontend con una configuración CORS adecuada, siempre que tengas permiso y acceso al recurso."
  - question: "¿Se puede evitar CORS utilizando un proxy?"
    answer: "Sí, un proxy del lado del servidor puede realizar la petición al recurso externo y devolver su respuesta al navegador con las cabeceras CORS apropiadas. Esto evita que el navegador tenga que leer directamente la respuesta del servidor externo, pero no elimina las restricciones de acceso, autenticación o protección antibots del sitio de destino."
  - question: "¿Cambiar el User-Agent soluciona CORS?"
    answer: "No. User-Agent identifica el tipo de cliente que realiza una petición y puede influir en la respuesta de un servidor, pero no sustituye las cabeceras CORS. Un User-Agent de navegador tampoco garantiza que una web permita el acceso automatizado."
  - question: "¿Para qué sirve un Cloudflare Worker en un extractor web?"
    answer: "Un Cloudflare Worker puede actuar como proxy entre una aplicación web y una página externa. Puede realizar peticiones HTTP desde el servidor, procesar la respuesta y devolver el contenido al frontend con las cabeceras CORS necesarias. También permite aplicar controles de acceso, límites de tamaño, tiempos de espera y validaciones."
  - question: "¿Puedo configurar cualquier cabecera de Chrome desde JavaScript?"
    answer: "No. Los navegadores controlan determinadas cabeceras HTTP, como User-Agent, Origin y algunas cabeceras de conexión. Un script de una página no puede modificarlas libremente. En un entorno de servidor, como un Worker o un programa Python, existe mayor control sobre las cabeceras de las peticiones, sujeto a las restricciones del entorno."
  - question: "¿Por qué funciona una petición con Python o curl, pero falla con fetch?"
    answer: "Python y curl no aplican automáticamente la política CORS de los navegadores. Por eso pueden leer una respuesta HTTP que JavaScript no puede consultar desde una página web. Sin embargo, el servidor remoto puede seguir aplicando autenticación, límites, restricciones de acceso o protecciones antibots."
---

En la entrada anterior expliqué [qué es CORS, cómo funciona y por qué los navegadores bloquean determinadas peticiones](https://jorgerosa.dev/cors-politica-cross-origin-resource-sharing/).

Una cosa es entender la teoría y otra encontrarte con el problema mientras desarrollas una herramienta.

En mi caso, al trabajar en un extractor de contenidos web, me encontré con una situación bastante habitual: quería introducir una URL, recuperar el HTML de esa página y mostrar su contenido dentro de mi propia aplicación.

El planteamiento parecía sencillo:

```javascript
const response = await fetch(
  "https://web-que-quiero-leer.com"
);

const html = await response.text();

console.log(html);
```

Pero al ejecutarlo desde el navegador, la petición podía terminar bloqueada por CORS.

La solución pasó por utilizar un Worker de Cloudflare que realizase la petición desde el servidor y devolviese el contenido a mi herramienta.

Esto me llevó a revisar una cuestión que merece la pena aclarar: ¿cómo conseguimos leer una página que no permite peticiones desde nuestro frontend? ¿Hay que simular un navegador? ¿Basta con enviar las cabeceras de Chrome? ¿O necesitamos algo más?

Vamos por partes. 🔎

## 1. Lo primero: CORS no se soluciona siempre de la misma manera

Antes de tocar código, conviene identificar dónde está el problema.

Cuando aparece un error CORS, podemos encontrarnos con escenarios bastante diferentes:

- Estamos desarrollando una API propia y hemos olvidado configurar CORS.
- Queremos consumir una API externa que no permite nuestro origen.
- Queremos recuperar el HTML de una web para analizarlo.
- El servidor remoto rechaza nuestra petición por motivos distintos de CORS.
- La petición funciona, pero la respuesta no se puede leer desde JavaScript.

Aunque todos estos casos pueden acabar pareciéndose en las herramientas de desarrollo, no tienen necesariamente la misma solución.

Por ejemplo, si controlamos nuestra API, lo normal es configurar correctamente sus permisos CORS.

Si queremos leer una página externa que no controlamos, no podemos modificar directamente sus cabeceras de respuesta. En ese caso, una alternativa es trasladar la petición a un servidor propio.

Y aquí aparece una de las herramientas más útiles para este tipo de tareas: el proxy.

## 2. ¿Por qué un proxy puede solucionar CORS?

Recordemos el escenario inicial:

```text
Mi aplicación
https://jorgerosa.dev
        │
        │ fetch()
        ▼
Web externa
https://web-externa.com
```

El navegador intenta leer la respuesta de la web externa, pero esta no incluye las cabeceras CORS necesarias.

Por tanto, nuestro JavaScript no puede acceder al contenido.

Una solución consiste en introducir un intermediario:

```text
Navegador
    │
    │ 1. Solicita el contenido
    ▼
Mi backend o proxy
    │
    │ 2. Solicita la página externa
    ▼
Web externa
    │
    │ 3. Devuelve el HTML
    ▼
Mi backend o proxy
    │
    │ 4. Devuelve el HTML con CORS
    ▼
Navegador
```

La diferencia importante es que **el navegador ya no solicita directamente el contenido a la web externa**.

En su lugar, hace una petición a nuestro propio backend. Es el backend el que se comunica con el servidor remoto y devuelve el resultado.

Como el navegador recibe la respuesta desde nuestro proxy, podemos configurar las cabeceras CORS en ese punto.

Hay un matiz: el proxy no hace que la web externa autorice nuestro frontend. Simplemente cambia quién realiza la petición y quién entrega la respuesta al navegador.

Esto es precisamente lo que permite resolver muchos problemas de CORS en extractores web.

## 3. Primera solución: configurar CORS en nuestro propio servidor

Si tenemos control sobre la API, esta suele ser la solución más sencilla.

Por ejemplo, en un backend con FastAPI podemos permitir que nuestro frontend realice peticiones desde un origen concreto:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://jorgerosa.dev"
    ],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)
```

De esta forma, FastAPI puede añadir las cabeceras necesarias para que el navegador permita leer las respuestas desde el origen autorizado.

En desarrollo podríamos permitir, por ejemplo:

```python
allow_origins=[
    "http://localhost:5173"
]
```

Pero debemos recordar que este permiso corresponde al frontend que consume nuestra API.

**No sirve para conceder permisos sobre una web de terceros que no controlamos.**

Si el problema está en `web-externa.com`, añadir nuestro dominio a la configuración de FastAPI no modifica la respuesta que devuelve ese otro servidor.

Para ese caso necesitamos estudiar otras opciones.

## 4. Segunda solución: crear un proxy en JavaScript

JavaScript no implica necesariamente que el código se ejecute en el navegador.

También podemos utilizarlo en el servidor mediante Node.js o en entornos como Cloudflare Workers.

Y esta diferencia es fundamental.

En el navegador:

```javascript
fetch("https://web-externa.com");
```

está sujeto a las políticas de seguridad del navegador.

En cambio, desde un proceso de servidor:

```javascript
const response = await fetch(
  "https://web-externa.com"
);

const html = await response.text();

console.log(html);
```

no se aplica automáticamente la política CORS del navegador.

El servidor remoto sigue pudiendo rechazar la petición, pero nuestro código no necesita que la respuesta incluya `Access-Control-Allow-Origin` para poder leerla desde el entorno de servidor.

Esto nos permite construir un intermediario que recupere el contenido y lo entregue al frontend.

Por ejemplo:

```text
Frontend JavaScript
        │
        ▼
Endpoint de nuestro servidor
        │
        ▼
fetch() a la web externa
        │
        ▼
HTML recibido
        │
        ▼
Respuesta al frontend con CORS
```

El concepto es sencillo, pero hay que tener cuidado con una cosa: no conviene crear un proxy público que permita a cualquiera solicitar cualquier URL sin restricciones. Más adelante veremos por qué.

## 5. Mi caso: utilizar un Cloudflare Worker para extraer contenido

En mi extractor de contenidos web opté por utilizar un Worker de Cloudflare.

La idea era tener una herramienta en mi propia web que recibiese una URL, descargase su HTML y permitiese trabajar con el contenido sin depender de que el navegador pudiera leer directamente la página externa.

Un Worker puede ejecutar JavaScript en la infraestructura de Cloudflare y realizar peticiones HTTP desde el lado del servidor.

Esto nos permite separar las responsabilidades:

- El frontend recoge la URL y presenta los resultados.
- El Worker realiza la petición a la página externa.
- El Worker procesa o devuelve el HTML.
- El frontend recibe una respuesta desde nuestro propio endpoint.

El esquema sería:

```text
┌──────────────────────────────┐
│ Mi herramienta web           │
│ jorgerosa.dev                │
└──────────────┬───────────────┘
               │
               │ URL solicitada
               ▼
┌──────────────────────────────┐
│ Cloudflare Worker            │
│                              │
│ 1. Valida la petición        │
│ 2. Consulta la web externa   │
│ 3. Lee la respuesta HTML     │
│ 4. Devuelve el resultado     │
└──────────────┬───────────────┘
               │
               │ fetch()
               ▼
┌──────────────────────────────┐
│ Página externa               │
│                              │
│ Respuesta HTTP con HTML      │
└──────────────────────────────┘
```

En este caso, el Worker no necesita convencer al navegador para que ignore CORS. La petición a la página externa se realiza desde el entorno de servidor, y el Worker controla las cabeceras de la respuesta que entrega a mi aplicación.

La documentación de [Cloudflare Workers](https://developers.cloudflare.com/workers/) y su ejemplo de [proxy de cabeceras CORS](https://developers.cloudflare.com/workers/examples/cors-header-proxy/) muestran este patrón de intermediación.

### Un ejemplo simplificado de Worker

Este ejemplo ilustra el flujo básico. No es un proxy de producción listo para publicar: omite controles de acceso, límites de consumo y validaciones que sí debería incorporar una herramienta real.

```javascript
export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://jorgerosa.dev",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // El navegador puede necesitar una petición preflight.
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (request.method !== "GET") {
      return new Response("Método no permitido", {
        status: 405,
        headers: corsHeaders,
      });
    }

    const incomingUrl = new URL(request.url);
    const target = incomingUrl.searchParams.get("url");

    if (!target) {
      return new Response("Falta el parámetro url", {
        status: 400,
        headers: corsHeaders,
      });
    }

    let targetUrl;

    try {
      targetUrl = new URL(target);
    } catch {
      return new Response("URL no válida", {
        status: 400,
        headers: corsHeaders,
      });
    }

    if (!["http:", "https:"].includes(targetUrl.protocol)) {
      return new Response("Protocolo no permitido", {
        status: 400,
        headers: corsHeaders,
      });
    }

    try {
      const upstream = await fetch(targetUrl.toString(), {
        headers: {
          "Accept": "text/html",
        },
        signal: AbortSignal.timeout(8000),
      });

      if (!upstream.ok) {
        return new Response(
          `La web externa respondió con HTTP ${upstream.status}`,
          {
            status: 502,
            headers: corsHeaders,
          }
        );
      }

      const contentType =
        upstream.headers.get("content-type") || "";

      if (!contentType.toLowerCase().includes("text/html")) {
        return new Response("El recurso no es HTML", {
          status: 415,
          headers: corsHeaders,
        });
      }

      const html = await upstream.text();

      return new Response(html, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    } catch {
      return new Response("No se pudo recuperar el contenido", {
        status: 502,
        headers: corsHeaders,
      });
    }
  },
};
```

En este ejemplo hay dos comunicaciones diferentes:

1. La petición del navegador al Worker, que necesita una configuración CORS adecuada si procede de otro origen.
2. La petición del Worker a la web externa, que no está sujeta a la política CORS del navegador.

Por eso las cabeceras `Access-Control-Allow-Origin` del ejemplo se añaden a las respuestas del Worker, no a la petición que este realiza al servidor externo.

También hay una advertencia importante: validar únicamente el protocolo no hace seguro un proxy público. Una implementación real debe restringir los destinos permitidos, bloquear direcciones IP privadas y locales, controlar redirecciones y validar la respuesta antes de devolverla. De lo contrario, podría convertirse en una vía para acceder a servicios internos o consumir recursos de forma abusiva.

## 6. ¿Hay que engañar a la web para que crea que somos un navegador?

Esta era precisamente una de las dudas que me surgieron al recordar una práctica anterior de scraping en Python.

Y la respuesta es: **depende de qué esté bloqueando la petición**.

Hay dos escenarios que conviene distinguir.

### Escenario A: el navegador bloquea la lectura por CORS

En este caso, no necesitamos engañar a la web ni simular Chrome.

Si hacemos la petición desde un Worker, Python o un backend, el cliente no aplica automáticamente las restricciones CORS del navegador.

Podemos obtener una respuesta HTTP aunque el servidor remoto no incluya `Access-Control-Allow-Origin`.

### Escenario B: el servidor rechaza nuestra petición

Aquí sí puede tener sentido estudiar cómo se construye una petición HTTP normal y qué diferencias existen entre distintos clientes.

Por ejemplo, un servidor puede comportarse de forma diferente según:

- El encabezado `User-Agent`.
- El encabezado `Accept`.
- El encabezado `Accept-Language`.
- Las cookies disponibles.
- La autenticación.
- El encabezado `Referer`, cuando se utiliza.
- Las redirecciones y el estado de la sesión.

Una petición mínima puede ser suficiente:

```http
GET /articulo HTTP/1.1
Host: ejemplo.com
Accept: text/html
```

Pero otro servidor podría devolver una página diferente, redirigirnos o rechazar la petición.

En ese caso, analizar las cabeceras que utiliza un navegador puede ayudar a comprender la diferencia.

Eso no significa que tengamos que copiar todas las cabeceras de Chrome o Firefox, ni que hacerlo garantice que recibiremos el contenido.

Además, algunas protecciones antibots analizan señales que van mucho más allá de las cabeceras HTTP.

## 7. ¿Qué es el User-Agent y para qué sirve?

El `User-Agent` es una cabecera HTTP que tradicionalmente identifica el cliente que realiza la petición.

Por ejemplo, una petición puede incluir:

```http
User-Agent: Mozilla/5.0 (...)
```

Los navegadores han utilizado cadenas de este tipo para identificar su familia, sistema operativo y otras características.

En un scraper podemos encontrarnos con código como este:

```python
import requests

url = "https://ejemplo.com/articulo"

headers = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/..."
    ),
    "Accept": "text/html",
}

response = requests.get(
    url,
    headers=headers,
    timeout=10,
)

print(response.status_code)
print(response.text)
```

Los puntos suspensivos del ejemplo son intencionados: una cadena de User-Agent debe corresponder a un valor concreto y válido si queremos probar una configuración real.

Cambiar el `User-Agent` puede ser útil para comprobar si un servidor devuelve respuestas distintas según el cliente declarado.

Sin embargo, no convierte `requests` en Chrome.

Tampoco garantiza que el servidor nos permita acceder al contenido.

**Una cabecera identifica lo que el cliente declara ser; no demuestra por sí sola que realmente sea ese cliente.**

Y, sobre todo, cambiar el User-Agent no soluciona un error CORS producido por el navegador.

## 8. ¿Debemos copiar todas las cabeceras de Chrome?

No necesariamente.

Cuando inspeccionamos una petición en las herramientas de desarrollo del navegador podemos encontrar muchas cabeceras:

```http
Accept
Accept-Encoding
Accept-Language
Cache-Control
Cookie
Origin
Referer
Sec-Fetch-Dest
Sec-Fetch-Mode
Sec-Fetch-Site
User-Agent
```

Pero no todas tienen la misma función, ni todas deben copiarse en un scraper.

Por ejemplo:

| Cabecera | Para qué sirve |
|---|---|
| `Accept` | Indica los tipos de contenido que acepta el cliente. |
| `Accept-Language` | Expresa preferencias de idioma. |
| `User-Agent` | Declara información sobre el cliente. |
| `Cookie` | Puede contener información de sesión. |
| `Referer` | Puede indicar desde qué URL se ha originado una navegación o petición. |
| `Origin` | Identifica el origen de determinadas peticiones. |
| `Sec-Fetch-*` | Proporciona información sobre el contexto de una petición del navegador. |

En un scraper, lo razonable es empezar con las cabeceras necesarias para el recurso que queremos recuperar y añadir otras únicamente si existe una razón técnica para hacerlo.

Copiar cookies de una sesión personal, por ejemplo, puede introducir credenciales sensibles en nuestra herramienta. Y reproducir cabeceras `Sec-Fetch-*` no convierte automáticamente una petición de servidor en una petición real de navegador.

También conviene tener en cuenta que algunos clientes controlan determinadas cabeceras y que un script ejecutado en el navegador no puede modificarlas libremente.

En cambio, un Worker o un programa Python dispone de mayor control sobre las cabeceras HTTP que envía, dentro de las limitaciones de su entorno.

## 9. ¿Por qué un scraper en Python puede funcionar y JavaScript no?

Esta es una de las diferencias más importantes de todo el artículo.

Imaginemos que hacemos una petición con Python:

```python
import requests

response = requests.get(
    "https://ejemplo.com/articulo",
    timeout=10,
)

print(response.text)
```

Y después probamos desde una página web:

```javascript
const response = await fetch(
  "https://ejemplo.com/articulo"
);

const html = await response.text();

console.log(html);
```

Python puede leer la respuesta porque su cliente HTTP no aplica la política CORS del navegador.

En JavaScript, si el código se ejecuta en el navegador, la respuesta debe cumplir las reglas CORS para que podamos leerla.

La diferencia no está en que Python tenga una capacidad especial para saltarse CORS. Es que **CORS es una política del navegador, no una restricción universal que todos los clientes HTTP deban aplicar**.

Esto explica por qué el mismo servidor puede responder a ambos clientes y, aun así, el resultado sea diferente.

Hay que recordar que Python tampoco tiene acceso garantizado: si el servidor exige autenticación, rechaza el cliente o utiliza otras protecciones, la petición puede fallar igualmente.

## 10. ¿Y si la web utiliza JavaScript para generar el contenido?

Aquí aparece otro problema distinto.

Supongamos que nuestro Worker recupera una página y obtiene:

```html
<html>
  <head>
    <title>Mi artículo</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/assets/app.js"></script>
  </body>
</html>
```

El HTML inicial no contiene el artículo que vemos cuando abrimos la página en Chrome.

El contenido se genera posteriormente mediante JavaScript.

Nuestro Worker puede descargar el HTML, pero eso no significa que vaya a ejecutar todos los scripts de la página como lo haría un navegador.

Por tanto, hay que diferenciar:

- **Descargar HTML:** obtener el documento que devuelve el servidor.
- **Procesar HTML:** extraer títulos, párrafos, enlaces y otros elementos.
- **Renderizar JavaScript:** ejecutar el código necesario para generar contenido dinámico.

Para el primer caso suele bastar una petición HTTP.

Para el segundo podemos utilizar un parser HTML.

Para el tercero puede ser necesario utilizar un navegador automatizado o localizar una API pública que entregue los datos que necesitamos.

No conviene añadir un navegador automatizado si el HTML inicial ya contiene todo el contenido: implica más complejidad, consumo de recursos y mantenimiento.

## 11. Entonces, ¿qué solución debemos utilizar?

Depende del escenario.

| Situación | Solución que conviene estudiar |
|---|---|
| Controlamos nuestra API | Configurar CORS en el servidor. |
| La API externa permite CORS | Consumirla directamente desde el navegador. |
| La API externa no permite CORS | Utilizar un backend o proxy, si el acceso está permitido. |
| Queremos descargar HTML | Hacer la petición desde un servidor o Worker. |
| El servidor devuelve un error HTTP | Investigar la respuesta, las cabeceras, la autenticación y las restricciones de acceso. |
| El HTML no contiene el contenido final | Buscar una API adecuada o evaluar un navegador automatizado. |
| La web utiliza una sesión autenticada | Implementar el acceso autorizado sin exponer credenciales. |

Lo importante es no intentar solucionar todos estos problemas con una única técnica.

Un proxy puede resolver la barrera CORS del navegador, pero no garantiza que el servidor remoto vaya a entregarnos el contenido.

Cambiar el User-Agent puede modificar la respuesta que recibimos, pero no sustituye la configuración CORS.

Y utilizar un navegador automatizado puede servir para páginas que dependen de JavaScript, pero no es una solución universal a los problemas de acceso.

## 12. Una última precaución: no convertir nuestro proxy en una puerta abierta

Cuando construimos un extractor web, es tentador permitir que el usuario introduzca cualquier URL y que nuestro Worker la descargue.

Pero debemos tener cuidado.

Un endpoint como este:

```text
https://proxy.ejemplo.com/?url=https://cualquier-sitio.com
```

puede acabar utilizándose para realizar peticiones no deseadas, consumir recursos o intentar acceder a direcciones internas.

Por eso, en una herramienta real conviene incorporar controles como:

- Una lista de dominios permitidos, cuando sea viable.
- Validación de URLs y protocolos.
- Bloqueo de direcciones privadas, locales y servicios internos.
- Límites de tamaño de respuesta.
- Tiempos máximos de espera.
- Restricciones de métodos HTTP.
- Autenticación o límites de uso cuando sean necesarios.
- Validación del tipo de contenido recibido.

En mi caso, el Worker del extractor no se limita a hacer un `fetch()` y devolver lo que encuentre: también es importante controlar el origen de las peticiones, el tamaño de las respuestas, los tiempos de espera y los tipos de contenido que acepta la herramienta.

Son detalles que quizá no resultan tan llamativos como conseguir que la extracción funcione, pero marcan la diferencia entre una prueba rápida y un servicio que podemos mantener.

Referencias técnicas para seguir profundizando:

- [MDN: CORS y cómo funciona](https://developer.mozilla.org/es/docs/Web/HTTP/Guides/CORS){:target="_blank"}
- [MDN: errores CORS y posibles soluciones](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors){:target="_blank"}
- [Cloudflare Workers: documentación oficial](https://developers.cloudflare.com/workers/){:target="_blank"}
- [Cloudflare Workers: ejemplo de proxy CORS](https://developers.cloudflare.com/workers/examples/cors-header-proxy/){:target="_blank"}

