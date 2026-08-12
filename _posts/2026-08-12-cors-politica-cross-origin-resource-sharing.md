---
title: "CORS: qué es la política Cross-Origin Resource Sharing y cómo funciona"
date: 2026-08-12
image: "https://github.com/user-attachments/assets/6aef69b5-3673-4c59-844e-229260aeaecf"
categories: [web,seguridad,backend]
tags: [cors,cross-origin-resource-sharing,javascript,api,fetch,http,seguridad-web]
description: "Qué es CORS, cómo funciona la política Cross-Origin Resource Sharing, cuándo aparece un error CORS y cómo solucionarlo en APIs y aplicaciones web."
faq:
  - question: "¿Qué es CORS?"
    answer: "CORS, o Cross-Origin Resource Sharing, es un mecanismo de seguridad de los navegadores que permite a un servidor indicar qué orígenes externos pueden acceder a sus recursos mediante peticiones realizadas desde una página web."
  - question: "¿Por qué aparece un error de CORS?"
    answer: "Un error de CORS aparece normalmente cuando una página web intenta realizar una petición a un origen diferente y el servidor no incluye los encabezados CORS necesarios para permitir ese acceso."
  - question: "¿CORS es igual en todos los navegadores?"
    answer: "CORS está basado en estándares web comunes y los navegadores modernos aplican las mismas reglas fundamentales, aunque pueden existir pequeñas diferencias en mensajes de error, herramientas de desarrollo o detalles de implementación."
  - question: "¿CORS protege una API frente a cualquier petición externa?"
    answer: "No. CORS es principalmente una política aplicada por los navegadores. Un cliente que no aplique las restricciones de CORS, como curl o muchos clientes backend, puede realizar la petición igualmente. CORS controla qué respuestas puede leer una página web desde un navegador."
  - question: "¿Qué es una petición preflight de CORS?"
    answer: "Una petición preflight es una petición HTTP OPTIONS que el navegador realiza antes de determinadas peticiones cross-origin para comprobar si el servidor permite el método, las cabeceras y el origen que se quieren utilizar."
---


Una de esas cosas que tarde o temprano aparecen cuando estás desarrollando una aplicación web es el famoso:

```text
Access to fetch at 'https://api.ejemplo.com'
from origin 'https://frontend.ejemplo.com'
has been blocked by CORS policy
```

Y ahí empieza la búsqueda de turno:

> "¿Pero por qué me bloquea si la API funciona perfectamente?" 🤨

La primera vez que aparece, CORS puede parecer una especie de problema arbitrario del navegador. La petición está bien construida, la API responde correctamente y, si pruebo la misma URL con otra herramienta, funciona.

Entonces, ¿qué está pasando?

La clave está en entender que **CORS no es un problema de que una petición HTTP sea válida o inválida**. Es un mecanismo de seguridad que utilizan los navegadores para controlar **qué páginas web pueden leer recursos pertenecientes a otro origen**.

Y cuando se entiende esto, muchos errores de CORS dejan de parecer tan misteriosos.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/FoVzfcqCDSb7zCynOp/giphy.gif" alt="Persona programando y trabajando con código" width="300" />
</div>

## Antes de CORS: ¿qué significa "otro origen"?

Para entender CORS primero hay que entender qué es un **origin**.

Un origen está formado por tres elementos:

* **Esquema**: `http` o `https`
* **Host**: dominio o IP
* **Puerto**

Por ejemplo:

```text
https://jorgerosa.dev
```

tiene:

```text
Esquema: https
Host:    jorgerosa.dev
Puerto: 443
```

El puerto `443` es el puerto implícito de HTTPS.

Ahora podemos comparar diferentes URLs:

```text
https://jorgerosa.dev
https://jorgerosa.dev/blog
https://api.jorgerosa.dev
http://jorgerosa.dev
https://jorgerosa.dev:8080
```

No todas pertenecen al mismo origen.

### Mismo origen

Estas dos URLs tienen el mismo origin:

```text
https://jorgerosa.dev
https://jorgerosa.dev/blog/cors
```

La ruta (`/blog/cors`) no forma parte del origin.

### Origen diferente

En cambio:

```text
https://jorgerosa.dev
https://api.jorgerosa.dev
```

son orígenes diferentes porque cambia el host.

También:

```text
https://jorgerosa.dev
http://jorgerosa.dev
```

son diferentes porque cambia el esquema.

Y:

```text
https://jorgerosa.dev
https://jorgerosa.dev:8080
```

son diferentes porque cambia el puerto.

Esto es importante porque **CORS entra en juego cuando una página realiza determinadas operaciones hacia otro origin**.

---

# La Same-Origin Policy

CORS existe como parte del ecosistema de seguridad construido alrededor de una regla mucho más importante:

**Same-Origin Policy (SOP)**.

La idea es bastante sencilla.

Imaginemos que estamos conectados en nuestro navegador a:

```text
https://banco.com
```

Y, en otra pestaña, visitamos:

```text
https://web-maliciosa.com
```

Si cualquier página pudiera leer libremente las respuestas de cualquier otro dominio, una web maliciosa podría intentar acceder a recursos privados de otras páginas en nuestro nombre.

Por ejemplo:

```javascript
fetch("https://banco.com/api/cuenta")
```

El navegador podría estar enviando nuestras cookies de sesión asociadas a `banco.com`.

Si además la página maliciosa pudiera leer directamente la respuesta, tendríamos un problema bastante serio.

La Same-Origin Policy evita precisamente que una página pueda leer libremente datos de otro origen.

🔐 Es una de las piezas fundamentales de seguridad de los navegadores.

Pero entonces aparece una necesidad completamente legítima.

¿Qué ocurre si **yo controlo los dos sistemas**?

Por ejemplo:

```text
Frontend:
https://app.jorgerosa.dev

API:
https://api.jorgerosa.dev
```

Quiero que mi frontend pueda comunicarse con mi API.

Ambos dominios son míos, pero para el navegador siguen siendo **orígenes diferentes**.

Aquí es donde entra CORS.

---

# ¿Qué significa CORS?

CORS significa:

**Cross-Origin Resource Sharing**

En español podríamos traducirlo como:

**Intercambio de recursos entre distintos orígenes.**

CORS permite que un servidor indique al navegador:

> "Sí, puedes permitir que esta página de otro origen lea mi respuesta."

Por ejemplo, una API podría responder:

```http
Access-Control-Allow-Origin: https://app.jorgerosa.dev
```

Con esto está indicando que permite solicitudes realizadas desde:

```text
https://app.jorgerosa.dev
```

El navegador recibe esa información y puede permitir que el JavaScript de esa página acceda a la respuesta.

Por tanto, una idea importante para apuntar:

> **CORS no es algo que el frontend pueda activar unilateralmente. El servidor debe indicar qué orígenes permite.**

---

# Un ejemplo muy sencillo

Supongamos que tenemos una aplicación:

```text
https://frontend.com
```

Y una API:

```text
https://api.com
```

Desde JavaScript hacemos:

```javascript
fetch("https://api.com/users")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
```

El navegador detecta que:

```text
Página actual:
https://frontend.com

Petición:
https://api.com/users
```

son orígenes diferentes.

Por eso añade información sobre el origen de la petición.

Entre otras cosas, puede enviar:

```http
Origin: https://frontend.com
```

La API podría responder:

```http
Access-Control-Allow-Origin: https://frontend.com
```

Y el navegador entiende:

```text
Frontend: https://frontend.com
API:      https://api.com

API dice que permite frontend.com
↓
El navegador permite acceder a la respuesta
```

---

# ¿Qué ocurre si el servidor no permite el origen?

Supongamos ahora que la API responde normalmente:

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

con:

```json
{
  "name": "Jorge"
}
```

Pero no incluye el encabezado CORS correspondiente.

El navegador puede recibir perfectamente esos datos, pero **no permitirá que el JavaScript de la página acceda a ellos**.

Y entonces aparece el famoso error:

```text
blocked by CORS policy
```

Aquí hay una distinción que me parece especialmente importante:

**La petición puede haber llegado al servidor y el servidor puede haber respondido correctamente.**

El problema está en que el navegador no permite que el código JavaScript de ese origen pueda utilizar la respuesta.

Por eso a veces ocurre algo aparentemente absurdo:

```text
Postman → funciona ✅
curl    → funciona ✅
Backend → funciona ✅
Browser → CORS ❌
```

No es contradictorio.

Postman y `curl` no están sujetos a la política de seguridad CORS del navegador.

---

# Entonces, ¿CORS lo bloquea todo?

No exactamente.

Este punto suele generar bastante confusión.

CORS no significa:

> "Un servidor no acepta peticiones de otros dominios."

Significa más bien:

> "El navegador controla si el código de una página puede acceder a la respuesta de una petición cross-origin."

Esto cambia bastante la forma de entenderlo.

Por ejemplo:

```bash
curl https://api.com/users
```

puede funcionar perfectamente.

Mientras que:

```javascript
fetch("https://api.com/users")
```

ejecutado desde una página web puede quedar bloqueado por el navegador.

La API no tiene necesariamente ningún problema.

---

# ¿Por qué es bueno que exista CORS?

A veces, cuando llevamos un rato peleándonos con CORS, parece tentador pensar:

> "¿No podríamos quitarlo y ya está?" 😅

El problema es que CORS existe precisamente porque hay una razón de seguridad detrás.

Imaginemos una página maliciosa:

```text
https://malicioso.com
```

Y un usuario que está autenticado en:

```text
https://mi-banco.com
```

Si el navegador permitiera que cualquier página pudiera leer libremente las respuestas de cualquier otro origen, una web maliciosa podría intentar realizar peticiones contra servicios donde el usuario ya tiene una sesión abierta y leer las respuestas.

CORS forma parte de las restricciones que impiden ese acceso indiscriminado desde JavaScript.

Por eso, aunque como desarrolladores nos pueda complicar la vida, **no es un obstáculo puesto arbitrariamente para fastidiarnos**.

Es una barrera de seguridad.

---

# ¿Por qué CORS nos complica tanto la vida a los programadores?

Porque la arquitectura moderna de muchas aplicaciones web separa frontend y backend.

Por ejemplo:

```text
Frontend
React / Vue / Angular
        │
        │ fetch()
        ▼
Backend
FastAPI / Express / Laravel
        │
        ▼
Base de datos
```

Y muchas veces frontend y backend están en dominios diferentes:

```text
https://app.ejemplo.com
https://api.ejemplo.com
```

Desde el punto de vista del navegador:

```text
app.ejemplo.com
        ≠
api.ejemplo.com
```

Por tanto, hay que configurar correctamente CORS.

En un proyecto local ocurre constantemente:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:8000
```

Aunque ambos estén en nuestro ordenador, **son orígenes diferentes porque utilizan puertos diferentes**.

Y ahí aparece CORS.

---

# El encabezado `Origin`

Cuando el navegador realiza una petición cross-origin, puede incluir:

```http
Origin: http://localhost:5173
```

El servidor puede responder:

```http
Access-Control-Allow-Origin: http://localhost:5173
```

La comparación sería aproximadamente:

```text
Origin enviado por el navegador
            ↓
http://localhost:5173

¿Está permitido?
            ↓
Access-Control-Allow-Origin
            ↓
http://localhost:5173

Sí → el navegador permite acceder a la respuesta
```

Este encabezado es uno de los elementos fundamentales de CORS.

---

# `Access-Control-Allow-Origin`

Es probablemente el encabezado CORS que más veces vamos a encontrar.

Por ejemplo:

```http
Access-Control-Allow-Origin: https://jorgerosa.dev
```

Esto permite el acceso desde ese origen.

También podemos encontrar:

```http
Access-Control-Allow-Origin: *
```

El `*` significa que el recurso puede ser solicitado desde cualquier origen en los casos en los que las reglas de CORS lo permiten.

Por ejemplo, puede tener sentido para una API pública:

```http
Access-Control-Allow-Origin: *
```

Pero no debemos interpretar:

```text
*
```

como:

> "Todo está permitido."

Hay otros aspectos de CORS, especialmente las credenciales, métodos y encabezados, que cambian las reglas.

---

# CORS y `credentials`

Aquí es donde empiezan a aparecer configuraciones algo más delicadas.

Supongamos que nuestra aplicación utiliza cookies para mantener la sesión.

Desde JavaScript podemos hacer:

```javascript
fetch("https://api.ejemplo.com/user", {
  credentials: "include"
});
```

Estamos indicando que queremos incluir credenciales asociadas a la petición, como cookies.

En ese escenario, el servidor debe configurar CORS de forma adecuada.

Por ejemplo:

```http
Access-Control-Allow-Origin: https://app.ejemplo.com
Access-Control-Allow-Credentials: true
```

Una configuración como esta no se puede combinar simplemente con:

```http
Access-Control-Allow-Origin: *
```

cuando se utilizan credenciales.

Por eso una API que necesita cookies suele especificar explícitamente los orígenes permitidos.

---

# ¿Qué es una petición preflight?

Esta es otra de las partes de CORS que suele parecer más extraña.

No todas las peticiones cross-origin necesitan un preflight.

En determinadas situaciones, el navegador realiza primero una petición:

```http
OPTIONS
```

antes de realizar la petición real.

Es la llamada conocida como **preflight request**.

La idea es preguntarle al servidor:

> "¿Me permites hacer esta petición?"

Por ejemplo, nuestro frontend quiere realizar:

```http
PUT /users/123
```

desde:

```text
https://app.ejemplo.com
```

El navegador puede enviar primero:

```http
OPTIONS /users/123
Origin: https://app.ejemplo.com
Access-Control-Request-Method: PUT
```

Y también puede indicar determinados encabezados que pretende enviar.

El servidor responde indicando qué permite:

```http
Access-Control-Allow-Origin: https://app.ejemplo.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

Si todo está permitido, entonces el navegador realiza la petición real:

```http
PUT /users/123
```

Es decir:

```text
JavaScript
   │
   │ PUT
   ▼
Navegador
   │
   │ ¿Puedo hacer esto?
   │ OPTIONS
   ▼
Servidor
   │
   │ Sí, puedes
   ▼
Navegador
   │
   │ PUT
   ▼
Servidor
```

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/ENY5vJgJPEfG3Ym14H/giphy.gif" alt="Programador trabajando con código" width="300" />
</div>

# ¿Cuándo aparece el preflight?

No todas las peticiones necesitan preflight.

Los navegadores pueden realizar directamente determinadas peticiones consideradas **simple requests** si cumplen las condiciones establecidas por CORS.

Por ejemplo, una petición:

```javascript
fetch("https://api.ejemplo.com/users")
```

con un método sencillo como:

```http
GET
```

puede no necesitar preflight.

Sin embargo, si utilizamos determinadas combinaciones de métodos, encabezados o tipos de contenido, el navegador puede necesitar comprobar primero los permisos mediante `OPTIONS`.

Por ejemplo:

```javascript
fetch("https://api.ejemplo.com/users", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Jorge"
  })
});
```

En este caso es bastante habitual encontrarse con una petición preflight.

---

# El método `OPTIONS`

Cuando estamos depurando CORS, encontrarnos esto en las DevTools puede resultar desconcertante:

```text
OPTIONS /api/users
```

cuando nosotros realmente hemos programado:

```javascript
fetch("/api/users", {
  method: "POST"
});
```

Pero no es necesariamente un problema.

El navegador puede haber generado automáticamente el `OPTIONS` para comprobar si puede realizar posteriormente el `POST`.

Por eso, cuando aparece un error CORS, conviene mirar en:

```text
DevTools
→ Network
```

y revisar tanto:

```text
OPTIONS
```

como la petición real.

---

# Un ejemplo con FastAPI

Si tenemos un backend desarrollado con FastAPI:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/users")
def get_users():
    return {
        "name": "Jorge"
    }
```

Estamos indicando que permitimos peticiones desde:

```text
http://localhost:5173
```

Esto resulta especialmente útil durante desarrollo cuando, por ejemplo, tenemos:

```text
Vite
↓
http://localhost:5173

FastAPI
↓
http://localhost:8000
```

Son dos origins diferentes.

El middleware de FastAPI se encarga de añadir los encabezados necesarios para que el navegador pueda gestionar correctamente CORS.

---

# Un error muy típico

Imaginemos que tenemos:

```text
Frontend:
http://localhost:5173
```

y configuramos:

```python
allow_origins=[
    "http://localhost:3000"
]
```

Nuestro frontend intenta:

```text
http://localhost:5173
```

pero el backend solamente permite:

```text
http://localhost:3000
```

Resultado:

```text
CORS error
```

Y aquí el problema no está en `fetch()`.

Tampoco está necesariamente en FastAPI.

Simplemente hemos configurado un origen diferente al que realmente está realizando la petición.

---

# `localhost` no es lo mismo que `127.0.0.1`

Otro pequeño detalle que puede ahorrar bastante tiempo.

Estos dos orígenes no son iguales:

```text
http://localhost:8000
```

y:

```text
http://127.0.0.1:8000
```

Aunque ambos terminen llegando a nuestra propia máquina, el host es diferente.

Por tanto:

```text
http://localhost:5173
```

y:

```text
http://127.0.0.1:5173
```

son origins diferentes.

Si nuestra aplicación está configurada para permitir:

```python
allow_origins=[
    "http://localhost:5173"
]
```

y abrimos el frontend desde:

```text
http://127.0.0.1:5173
```

podemos encontrarnos con un error de CORS.

---

# ¿CORS es igual en todos los navegadores?

A nivel conceptual, sí: los navegadores modernos implementan las reglas CORS basadas en los estándares web correspondientes.

Por tanto, Chrome, Firefox, Safari y Edge no deberían comportarse como si cada uno tuviera una política CORS completamente diferente.

Pero sí podemos encontrar diferencias en:

* mensajes de error;
* herramientas de desarrollo;
* representación de las peticiones;
* detalles de implementación;
* comportamiento ante determinadas situaciones límite.

Por eso, si algo funciona en un navegador y falla en otro, no conviene asumir inmediatamente:

> "Es CORS."

Puede haber otras diferencias relacionadas con cookies, políticas de privacidad, caché, certificados, extensiones o mecanismos de seguridad del navegador.

---

# CORS no es un mecanismo de autenticación

Este punto también merece quedar apuntado.

CORS **no autentica usuarios**.

No sustituye:

```text
JWT
OAuth
cookies de sesión
API keys
```

Ni sirve para decidir:

> "Este usuario puede acceder a este recurso."

CORS responde a otra pregunta:

> "¿Puede el código JavaScript de este origen acceder a la respuesta?"

Son problemas diferentes.

Podemos tener:

```text
Autenticación
↓
¿Quién eres?

Autorización
↓
¿Qué puedes hacer?

CORS
↓
¿Puede este origen leer la respuesta desde el navegador?
```

---

# CORS tampoco es un firewall

Otro error conceptual bastante habitual es pensar que:

```text
CORS = bloquear peticiones externas
```

No exactamente.

Una API puede recibir una petición mediante:

```bash
curl
```

aunque no permita ese origen mediante CORS.

Por ejemplo:

```bash
curl https://api.ejemplo.com/users
```

El servidor puede recibirla y responder.

CORS no está pensado como una barrera para impedir que alguien pueda comunicarse con nuestro servidor desde cualquier herramienta.

Su función principal está relacionada con **el comportamiento de los navegadores y el acceso de código web a las respuestas**.

Por eso, si tenemos una API que necesita autenticación, debemos implementar autenticación y autorización correctamente.

No podemos confiar en CORS como mecanismo de seguridad de la API.

---

# ¿Y por qué una imagen sí puede cargarse desde otro dominio?

Aquí aparece otra situación que puede resultar curiosa.

Podemos tener:

```html
<img src="https://otro-dominio.com/imagen.jpg">
```

y la imagen puede mostrarse perfectamente.

Entonces:

> "¿No estaba bloqueado todo lo cross-origin?"

No.

La Same-Origin Policy y CORS no significan que el navegador impida absolutamente cualquier recurso procedente de otro origen.

Los navegadores permiten determinadas formas de inclusión cross-origin, como imágenes, hojas de estilo o determinados recursos.

El problema aparece cuando queremos que **nuestro JavaScript pueda acceder a los datos de una respuesta** de determinadas maneras.

Por ejemplo:

```javascript
const response = await fetch(
  "https://api.otro-dominio.com/users"
);

const data = await response.json();
```

Aquí queremos que JavaScript pueda leer la respuesta.

Y es precisamente donde CORS resulta relevante.

---

# ¿Cómo solucionar un error CORS?

Lo primero es **no intentar solucionarlo desde el frontend a ciegas**.

Si vemos:

```text
blocked by CORS policy
```

conviene comprobar:

### 1. ¿Cuáles son los dos orígenes?

Por ejemplo:

```text
Frontend:
http://localhost:5173

API:
http://localhost:8000
```

### 2. ¿Qué petición está realizando realmente el navegador?

Miramos:

```text
DevTools
→ Network
```

### 3. ¿Existe un `OPTIONS`?

Si existe:

```text
OPTIONS /api/users
```

debemos revisar la respuesta del preflight.

### 4. ¿Qué encabezados devuelve el servidor?

Por ejemplo:

```http
Access-Control-Allow-Origin
Access-Control-Allow-Methods
Access-Control-Allow-Headers
Access-Control-Allow-Credentials
```

### 5. ¿El origen coincide exactamente?

No es lo mismo:

```text
https://app.ejemplo.com
```

que:

```text
http://app.ejemplo.com
```

ni:

```text
https://www.ejemplo.com
```

que:

```text
https://ejemplo.com
```

---

# El error de intentar "arreglar CORS" con `mode: no-cors`

Alguna vez podemos encontrarnos con este supuesto arreglo:

```javascript
fetch("https://api.ejemplo.com/users", {
  mode: "no-cors"
});
```

Puede parecer una solución porque el error de CORS cambia.

Pero normalmente **no es lo que estamos buscando**.

Con `no-cors`, el navegador limita lo que JavaScript puede hacer con la respuesta. Podemos terminar con una respuesta `opaque`, que no podemos leer de la manera habitual.

Por ejemplo:

```javascript
const response = await fetch(url, {
  mode: "no-cors"
});

console.log(response);
```

No significa:

> "He desactivado CORS."

Significa:

> "Estoy haciendo la petición bajo unas restricciones todavía mayores."

Por tanto, para una API que queremos consumir desde JavaScript y cuyos datos necesitamos leer, la solución habitual es **configurar correctamente CORS en el servidor**.

---

# CORS desde el punto de vista del navegador

Después de darle unas cuantas vueltas, el flujo que me resulta más útil para recordar es este:

```text
┌─────────────────────────┐
│ Página web              │
│ https://app.com         │
└────────────┬────────────┘
             │
             │ fetch()
             ▼
┌─────────────────────────┐
│ Navegador               │
│                         │
│ ¿Es otro origin?        │
└────────────┬────────────┘
             │
             │ Sí
             ▼
┌─────────────────────────┐
│ Servidor API            │
│ https://api.com         │
└────────────┬────────────┘
             │
             │ Respuesta
             │
             │ Access-Control-Allow-Origin
             ▼
┌─────────────────────────┐
│ Navegador               │
│                         │
│ ¿Está permitido?        │
└────────────┬────────────┘
             │
       ┌─────┴─────┐
       │           │
      Sí           No
       │           │
       ▼           ▼
  JavaScript    Bloqueo
  puede leer    por CORS
  la respuesta
```

Y cuando hay preflight:

```text
Frontend
   │
   │ OPTIONS
   ▼
Servidor
   │
   │ Permisos CORS
   ▼
Navegador
   │
   │ Petición real
   ▼
Servidor
   │
   │ Respuesta
   ▼
Navegador
   │
   ▼
JavaScript
```

---

# Las cabeceras CORS que conviene recordar

No hace falta memorizar todas las cabeceras de CORS para empezar a trabajar, pero estas aparecen constantemente:

```http
Access-Control-Allow-Origin
```

Indica qué origen puede acceder al recurso.

```http
Access-Control-Allow-Methods
```

Indica qué métodos HTTP están permitidos.

Por ejemplo:

```http
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

```http
Access-Control-Allow-Headers
```

Indica qué encabezados puede utilizar la petición.

Por ejemplo:

```http
Access-Control-Allow-Headers: Content-Type, Authorization
```

```http
Access-Control-Allow-Credentials
```

Indica si se permite el uso de credenciales en las peticiones cross-origin.

Y también podemos encontrarnos:

```http
Access-Control-Max-Age
```

que permite indicar cuánto tiempo puede el navegador conservar en caché el resultado de determinadas comprobaciones preflight.

---

# Una forma sencilla de pensar en CORS

Después de entenderlo, creo que esta analogía ayuda bastante:

Imaginemos que tenemos un edificio.

Una aplicación web sería una persona que quiere entrar en una sala.

La sala pertenece a otro edificio.

La persona pregunta:

> "¿Puedo acceder?"

El servidor responde mediante sus políticas:

```text
https://app.ejemplo.com
→ Sí, puedes.
```

O:

```text
https://otro-sitio.com
→ No, no estás autorizado para leer este recurso desde el navegador.
```

Pero hay una diferencia importante con una puerta física:

**CORS no impide necesariamente que alguien llegue hasta el edificio.**

Simplemente controla, dentro del modelo de seguridad del navegador, si el código de una página puede acceder a la respuesta.

Por eso:

```text
curl
```

puede seguir llegando al servidor.

---

# CORS en una arquitectura frontend + API

En una aplicación moderna podemos acabar teniendo algo así:

```text
                  Internet
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
   app.ejemplo.com       api.ejemplo.com
          │                     │
       Frontend               Backend
          │                     │
          └────── fetch() ──────┘
```

El navegador detecta:

```text
app.ejemplo.com
        ≠
api.ejemplo.com
```

y entra en juego el modelo CORS.

Por eso, cuando una aplicación empieza a separar frontend y backend, CORS se convierte rápidamente en algo que conviene entender y no simplemente copiar de Stack Overflow hasta que desaparezca el error. 😅

La configuración correcta depende de cómo esté diseñada nuestra aplicación:

```text
¿Hay cookies?
¿Hay JWT?
¿Hay Authorization headers?
¿Qué métodos utilizamos?
¿Qué orígenes deben tener acceso?
¿Existe un preflight?
¿La API es pública?
¿Estamos en desarrollo o producción?
```

Y especialmente:

> **En producción no tiene demasiado sentido permitir orígenes indiscriminadamente si sabemos exactamente qué aplicaciones deben consumir nuestra API.**

---

# El detalle que me llevo de CORS

La idea que me parece más importante para no volver a perderse cuando aparezca un error de estos es separar tres conceptos:

```text
HTTP
↓
¿La petición llega al servidor y el servidor responde?

CORS
↓
¿El navegador permite que JavaScript lea esa respuesta?

Autenticación / autorización
↓
¿El usuario puede acceder al recurso?
```

Son tres problemas diferentes.

Una API puede responder con:

```text
200 OK
```

y aun así nuestro JavaScript recibir:

```text
CORS error
```

Una petición puede superar CORS y aun así recibir:

```text
401 Unauthorized
```

Y podemos tener una API perfectamente autenticada y autorizada que siga necesitando una configuración CORS correcta para ser consumida desde un frontend alojado en otro origen.

Cuando se mira desde esta perspectiva, CORS deja de ser simplemente **"ese error del navegador que aparece cuando hago un `fetch()`"** y pasa a tener bastante más sentido: es una pieza del modelo de seguridad del navegador que permite abrir excepciones controladas a la Same-Origin Policy cuando un servidor decide que determinados orígenes pueden acceder a sus recursos.
