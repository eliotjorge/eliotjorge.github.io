---
title: Calendario de Adviento
date: 2026-03-20
layout: post
notebook: IA
resumen: "Calendario de adviento de Navidad de Google"
toc: true
---

## [🔗 Link al calendario](https://adventofagents.com/2025/12/)

## Días 1, 2, 3 y 4

- Al crear el agente con el comando y el ADK (Agent Development Kit) le especificamos que el agente
se llamará "my_agent" por ejemplo, ésto creará una carpeta en la que habrá una serie de archivos,
entre ellos algo como "agent.py", "my_agent.yaml" que tendrá la configuración de nuestro agente.

- Cada carpeta como la de "my_agent" es un agente independiente, de ahí que dentro haya unos archivos
de configuración. Se peude crear un agente "desarrollador" otro "Cocinero" o "Mecánico" y a cada uno
darle su personalidad y su forma de actuar.

- No se ejecuta cada agente de forma independiente, sino que ejecutas el entorno (ADK) donde 'vivirán'
los agentes, en la web que se compila te deja elegir cuál quieres usar.

- **Importante** a diferencia de crear una proyecto con React que tienes que acceder a la carpeta para
ejecutarlo, aquí no hay que entrar en "my_agent" va a dar error en el que dice que no encuentra un
agente valido (aunque literalmente esté dentro de la carpeta...)

- Para crear un agente vamos a necesitar una API key de Google AI Studio que está en
[esta web](https://aistudio.google.com/). Es gratuita hasta cierto uso y ciertos requerimientos,
pero para aprender sirve. En el panel de la izquierda vas a "Get API Key"

### Hay dos modos de generar un entorno para que vivan los agentes

#### Modo "config-first" o modo YAML (limitado pero simple)

`uvx --from google-adk adk create --type=config my_agent` (en la configuración de opciones te va a pedir la API key) por el cual dentro de la carpeta del agente se genera un archivo YAML, a parte del agent.py

  <pre>
   my_agent/
   ├── root_agent.yaml
   ├── agent.py
  </pre>

Esta manera es mas user-frienly porque dentro del 'root_agent.yaml' le vas a decir la confriguración sin tener que programar en Python
'YAML → se lee → se convierte en objeto → se ejecuta'.

```
instruction: Eres un experto en motos
model: gemini-2.5-flash
```
👉 Luego agent.py hace algo así (simplificado):

```
agent = Agent.from_yaml("root_agent.yaml")
```

👉 Traducción: “carga esta config y crea el agente en memoria”

Si se quiere crear otro agente que 'viva' dentro de ese entrono simplemente habría otra carpeta igual que la de `my_agent` pero con el nombre que le hemos dado a ese agente.

- En el archivo root_agent.yaml es donde se le pone la configuración que quieres que siga al agente. Qué modelo de IA usar, cómo se va a llamar el agente, una descripción.

**Para ejecutar** esta opción hay que ejecutar en CLI 

```
uvx --from google-adk adk web
```

o

```
adk web
```

#### Modo "code-first" o modo Python (potente y más complejo)

`adk create my_agent` se edita directamente el archivo 'agent.py', la ventaja frente al otro modo es que en este de tocar directamente el python puedes hacer lógica tipo if, loops, funciones... el del vídeo de la chica → [Build an AI Agent with Gemini 3](https://www.youtube.com/watch?v=9EGtawwvlNs){target="_blank"}
Poer lo general se hace un [entorno virtual de Python](https://jorgerosa.dev/posts/crear-entorno-virtual-python/) mientras de desarrolla.

<pre>
  my_agent/
  ├── agent.py
</pre>

Toda el CLI de creación del entorno sería este:

```
uv init
uv add google-adk
uv add google-genai
export GOOGLE_API_KEY="YOUR_API_KEY"
source .venv/bin/activate
adk create my_agent
```

- En el archivo `agent.py` es donde se le pone la configuración que quieres que siga al agente. Qué modelo de IA usar, cómo se va a llamar el agente, una descripción, herramientas que quieres que use como por ejemplo el buscador de Google (`tools=[google_search]`), respuestas predefinidas a ciertas consultas...

```
def responder(msg):
    if "ruido" in msg:
        return "Revisa válvulas"
```

**Para ejecutar** esta opción __code-first__ hay que ejecutar en CLI. Creará un entorno local (localhost)

```
adk web
```

---

### Cuándo usar cada uno?

#### Usa YAML cuando:

- quieres prototipar rápido

- estás aprendiendo

- solo necesitas prompts + tools

#### Usa Python cuando:

- quieres lógica real

- integrar con APIs

- usarlo en producción

Pueden convivir dentro de cada entrono los dos tipos de agentes uno creado con YAML y otro con Python pero ambos crean el mismo tipo de agente. Si se hace algo rápido y que no es complejo usa YAML

---


🔥 Ejemplo equivalente (muy importante)

YAML:
```
instruction: Eres experto en motos
model: gemini-2.5-flash
```

Python:
```
agent = Agent(
    instruction="Eres experto en motos",
    model="gemini-2.5-flash"
)
```

👉 EXACTAMENTE lo mismo pero en uno solo le das al configuración y en el otro se programa permite if, loops, funciones...

---

**Otro ejemplo aplicado a una gente que genere post**

YAML (rápido)
```
instruction: Genera posts para mi blog
```

Python (real)
```
def generar_post(topic):
    contenido = agent.run(topic)
    guardar_en_md(contenido)
```


## Día 4

- Cómo hacer un build and deply de los agentes y ponerlo en producción.

[Link Youtube](https://www.youtube.com/watch?v=8RjzMG3BKA0)

```
uvx agent-starter-pack create my-agent -a adk_base -d agent_engine
cd my-agent
make deploy
```

Una vez hecho el deploy con este código, puedes interactuar con tu agente (al cual le has dado sus órdendes específicas) desde la pestaá `playground` de Google Cloud
<img width="1000"  alt="image" src="https://github.com/user-attachments/assets/1b2d8b65-ae0c-4454-91f8-810f54774e75" />

## Día 5

- Una vez desplegado el agente nos interesa ver cómo se comporta, qué hace... y eso se puede ver desde el panel de Google Cloud.

[Link Youtube](https://www.youtube.com/watch?v=Q5CXbwkHHns)


## Día 7

- Los agentes pueden tener un entorno visual (UI) crado con React por ejemplo y por detrás se esta ejecuntando el ADK.

  <img width="1000" alt="image" src="https://github.com/user-attachments/assets/f2e96677-84b7-4eac-bcba-6b3e955e6eed" />

- El sistema de archivos suele tener esta estructura:

<pre>
  project/
    ├── backend/   ← ADK (lo que ejecutamos en días anteriores)
    ├── frontend/  ← app bonita (UI hecha con React o con Next.js)
    ├── Makefile   ← Archivo donde se configuaran comandos que ejecutar, entre otras cosas.
</pre>

- El archivo Makefile es como el package.json en Node, entre otras cosas hay definidos bundles de comandos.

```
## Install dependencies
install:
	@command -v uv >/dev/null 2>&1 || { echo "uv is not installed. Installing uv..."; curl -LsSf https://astral.sh/uv/0.6.12/install.sh | sh; source $$HOME/.local/bin/env; }
	uv sync

## Run agent locally with ADK web UI
dev:
	uv run adk web . --port 8501

## Alias for dev
playground: dev
```

- Ejecutaríamos **`make install`** y sólo con ese comando se ejecuta esto → `@command -v uv >/dev/null 2>&1 || { echo "uv is not installed. Installing uv..."; curl -LsSf https://astral.sh/uv/0.6.12/install.sh | sh; source $$HOME/.local/bin/env; }
	uv sync`

- Si ejecutamos **`make dev`** se lanza el servidor local con  →  `uv run adk web . --port 8501` (si ejecutamos sólo esto como dice el texto del calendario, solo veremos el agente del backend, hay que ejecutar los siguiente para que cargue el front-end)
  
- En el ejemplo del vídeo ejecuta un comando `make ag-ui` que ejecuta este bundle de comandos que también esta definido en Makefile:

```
## Run AG-UI frontend (backend + Next.js frontend)
ag-ui:
	@echo "Starting AG-UI servers..."
	@echo "Backend will run at http://localhost:8000"
	@echo "Frontend will run at http://localhost:3000"
	@echo ""
	@trap 'kill 0' INT; \
	(cd app/frontend/backend && python main.py) & \
	(cd app/frontend && npm run dev) & \
	wait
```

[Link Youtube](https://www.youtube.com/watch?v=u1txECrXj6k)
