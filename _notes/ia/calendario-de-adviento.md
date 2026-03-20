---
title: Calendario de Adviento
layout: post
notebook: IA
resumen: "Calendario de adviento de Navidad de Google"
toc: true
---

## [Link al calendario](https://adventofagents.com/2025/12/)

- Al crear el agente con el comando y el ADK (Agent Development Kit) le especificamos que el agente
se llamará "my_agent" por ejemplo, ésto creará una carpeta en la que habrá una serie de archivos,
entre ellos algo como "agent.py", "my_agent.yaml" que tendrá la configuración de nuestro agente.

- Cada carpeta como la de "my_agent" es un agente independiente, de ahí que dentro haya unos archivos
de configuración. Se peude crear un agente "desarrollador" otro "Cocinero" o "Mecánico" y a cada uno
darle su personalidad y su forma de actuar.

- No se ejecuta cada agente de forma independiente, sino que ejecutas el entorno (ADK) donde 'vivirán'
los egentes, en la web que se compila te deja elegir cuál quieres usar.

- **Importante** a diferencia de crear una proyecto con React que tienes que acceder a la carpeta para
ejecutarlo, aquí no hay que entrar en "my_agent" va a dar error en el que dice que no encuentra un
agente valido (aunque literalmente esté dentro de la carpeta...)

- Para crear un agente vamos a necesitar una API key de Google AI Studio que está en
[esta web](https://aistudio.google.com/). Es gratuita hasta cierto uso y ciertos requerimientos,
pero para aprender sirve. En el panel de la izquierda vas a "Get API Key"

## Hay dos modos de generar un entorno para que vivan los agentes

### Modo "config-first" o modo YAML (limitado pero simple)

`uvx --from google-adk adk create --type=config my_agent` (en la configuración de opciones te va a pedir la API key) por el cual dentro de la carpeta del agente se genera un archivo YAML, a parte del agent.py
   
   my_agent/
   ├── root_agent.yaml
   ├── agent.py

Esta manera es mas user-frienly porque dentro del 'root_agent.yaml' le vas a decir la confriguración sin tener que programar en Python
'YAML → se lee → se convierte en objeto → se ejecuta'

```
instruction: Eres un experto en motos
model: gemini-2.5-flash
```
👉 Luego agent.py hace algo así (simplificado):

```
agent = Agent.from_yaml("root_agent.yaml")
```

👉 Traducción: “carga esta config y crea el agente en memoria”

### Modo "code-first" o modo Python (potente y más complejo)

`adk create my_agent` se edita directamente el archivo 'agent.py', la ventaja frente al otro modo es que en este de tocar directamente el python puedes hacer lógica tipo if, loops, funciones...
```
def responder(msg):
    if "ruido" in msg:
        return "Revisa válvulas"
```

## Cuándo usar cada uno?

🟡 Usa YAML cuando:

- quieres prototipar rápido

- estás aprendiendo

- solo necesitas prompts + tools

🔵 Usa Python cuando:

- quieres lógica real

- integrar con APIs

- usarlo en producción

Pueden convivir dentro de cada entrono los dos tipos de agentes uno creado con YAML y otro con Python pero ambos crean el mismo tipo de agente. Si se hace algo rápido y que no es complejo usa YAML
