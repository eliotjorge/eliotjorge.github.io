# [Calendario de adviento de agentes](https://adventofagents.com/2025/12/)

Al crear el agente con el comando y el ADK (Agent Development Kit) le especificamos que el agente
se llamará "my_agent" por ejemplo, ésto creará una carpeta en la que habrá una serie de archivos,
entre ellos algo como "agent.py", "my_agent.yaml" que tendrá la configuración de nuestro agente.

Cada carpeta como la de "my_agent" es un agente independiente, de ahí que dentro haya unos archivos
de configuración. Se peude crear un agente "desarrollador" otro "Cocinero" o "Mecánico" y a cada uno
darle su personalidad y su forma de actuar.

No se ejecuta cada agente de forma independiente, sino que ejecutas el entorno (ADK) donde 'vivirán'
los egentes, en la web que se compila te deja elegir cuál quieres usar.

**Importante** a diferencia de crear una proyecto con React que tienes que acceder a la carpeta para
ejecutarlo, aquí no hay que entrar en "my_agent" va a dar error en el que dice que no encuentra un
agente valido (aunque literalmente esté dentro de la carpeta...)

Para crear un agente vamos a necesitar una API key de Google AI Studio que está en
[esta web](https://aistudio.google.com/). Es gratuita hasta cierto uso y ciertos requerimientos,
pero para aprender sirve. En el panel de la izquierda vas a "Get API Key"
