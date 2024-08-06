---
title: Crear entorno virtual en Python
date: 08-04-2024
categories: [python,consola,apps,flutter]
tags: [python,consola,apps,flutter]
pin: false
comments: false
render_with_liquid: false
---

Cuando programamos en Python es mejor hacerlo en un entorno virtual, de esa manera todas las dependencias que usemos
en ese proyecto estarándentro del archivo de ese proyecto, no en la máquina en la que programemos.
Haciendo esto si nos llevamos el proyecto a otro ordenador, ya sea en pincho o usando Git, ya estará todo instalado en ese entrono virtual.

Para hacerlo después de crear el directorio acedemos y abrimos en code.

```
mkdir app-flutter
cd app-flutter
code .
```

Una vez dentro creamos el entorno virtual. Nos crea una carpeta con todo los archivos del entrono virtual (aquí se instalará todo lo que haga falta).

```
python -m venv venv
```

Activamos el entorno virtual y trabajamos.

```
./venv/Scripts/activate
```
Instalamos flet la primera vez que iniciemos el entorno virtual.

```
pip install flet
```

Cuando terminemos de programar ese día es recomendable desactivarlo.

```
deactivate 
```


## Código
```
mkdir app-flutter
cd app-flutter
code .
```

```
python -m venv venv
```

```
./venv/Scripts/activate
```

```
pip install flet
```

```
deactivate 
```

