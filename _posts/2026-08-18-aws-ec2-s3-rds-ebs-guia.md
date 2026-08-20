---
title: "AWS desde cero: qué son EC2, S3, RDS, EBS y cómo elegir el servicio adecuado"
date: 2026-08-18
image: "https://github.com/user-attachments/assets/0d3b6ae2-6773-4b27-9313-65f32a218ddd"
categories: [aws, cloud, desarrollo-web]
tags: [amazon-web-services, aws, cloud-computing, ec2, s3, rds, ebs, cloudfront, wordpress, linux, servidores]
description: "Guía práctica de AWS para entender qué son EC2, S3, RDS, EBS y otros servicios, cuándo usar cada uno y cómo combinarlos para alojar webs estáticas, WordPress, bases de datos y servidores Linux."
faq:
- question: "¿Qué servicio de AWS necesito para alojar una web HTML y CSS?"
  answer: "Para una web estática formada por HTML, CSS, JavaScript e imágenes puedes utilizar Amazon S3 para almacenar los archivos y Amazon CloudFront para distribuirlos mediante una CDN. No necesitas una máquina EC2 si la web no requiere ejecutar código en un servidor."
- question: "¿Qué servicio de AWS necesito para alojar WordPress?"
  answer: "Una arquitectura habitual consiste en Amazon EC2 para ejecutar WordPress, Amazon EBS para almacenar el sistema y los archivos de la instancia, y Amazon RDS para alojar la base de datos MySQL o MariaDB. También pueden añadirse servicios como S3 y CloudFront para determinados archivos y contenidos."
- question: "¿Qué servicio de AWS sirve para tener una máquina Linux?"
  answer: "Amazon EC2 permite crear una máquina virtual en AWS y elegir una imagen de Linux, como Amazon Linux, Ubuntu u otras distribuciones disponibles. Puedes conectarte a ella por SSH y administrarla como un servidor convencional."
- question: "¿Qué diferencia hay entre Amazon EC2 y Amazon EBS?"
  answer: "EC2 proporciona la capacidad de cómputo, es decir, la máquina virtual que ejecuta tu sistema y aplicaciones. EBS proporciona almacenamiento persistente para esa instancia, como si fuera el disco de un servidor."
- question: "¿Qué diferencia hay entre Amazon S3 y Amazon EBS?"
  answer: "S3 es almacenamiento de objetos pensado para guardar archivos y acceder a ellos mediante una API, mientras que EBS proporciona volúmenes de almacenamiento de bloques que normalmente se conectan a instancias EC2 y funcionan como discos."
- question: "¿Qué es Amazon RDS y para qué sirve?"
  answer: "Amazon RDS es un servicio administrado de bases de datos relacionales. AWS se encarga de buena parte de las tareas de infraestructura y administración, mientras tú trabajas con motores como MySQL, PostgreSQL, MariaDB, Oracle o SQL Server."
- question: "¿Se pueden combinar los servicios de AWS?"
  answer: "Sí. De hecho, AWS está diseñado para que sus servicios se combinen. Por ejemplo, una aplicación puede utilizar EC2 para ejecutar el backend, RDS para la base de datos, S3 para archivos y CloudFront para distribuir contenido."
---

Llevo un tiempo intentando entrar en materia con **Amazon Web Services (AWS)** y hay algo que me estaba resultando especialmente confuso: no es que no entienda qué es un servidor, una base de datos o almacenamiento. El problema es que AWS tiene **tantos servicios diferentes que cuesta entender qué papel juega cada uno**.

Veo **EC2**, **S3**, **RDS**, **EBS**, **CloudFront**, **Lambda**... y todos parecen estar relacionados de alguna manera.

Y entonces aparece la pregunta que realmente importa:

> 🤔 Si quiero alojar una web, ¿qué servicio necesito?

Porque decir «usa AWS» no responde absolutamente nada.

AWS se entiende mucho mejor cuando dejamos de pensar en él como **un producto** y empezamos a verlo como un conjunto de piezas que podemos combinar.

En este post voy a intentar ordenar esas piezas desde el punto de vista más práctico posible: **qué quiero hacer → qué necesito → qué servicio de AWS encaja**.

---

## ☁️ Antes de empezar: ¿qué es realmente AWS?

**Amazon Web Services** es la plataforma de servicios cloud de Amazon.

En lugar de comprar un servidor físico, instalarlo en casa o contratar una máquina dedicada, AWS permite utilizar recursos informáticos bajo demanda.

Por ejemplo:

* Necesito una máquina Linux → **EC2**
* Necesito guardar archivos → **S3**
* Necesito una base de datos MySQL → **RDS**
* Necesito un disco para mi servidor → **EBS**
* Necesito distribuir una web rápidamente → **CloudFront**
* Necesito ejecutar una función sin mantener un servidor → **Lambda**

Y aquí empieza a tener sentido.

AWS no es simplemente «un hosting».

Es más parecido a una enorme caja de piezas de infraestructura.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/7JjtaDlLiATz2UnfsU/giphy.gif" alt="Centro de datos y computación en la nube" width="300" />
</div>

La ventaja es que puedo elegir exactamente qué piezas necesito.

La desventaja es bastante evidente:

**hay muchísimas piezas.** 😅

---

# 🖥️ EC2: necesito una máquina

Si hay un servicio de AWS que conviene entender primero, probablemente sea **Amazon EC2**.

EC2 significa **Elastic Compute Cloud**.

Dicho de forma sencilla:

> **EC2 te proporciona una máquina virtual en la nube.**

Puedes imaginar que AWS te entrega un ordenador conectado a Internet.

En esa máquina puedes instalar:

* Linux
* Windows
* Nginx
* Apache
* Node.js
* PHP
* Python
* Docker
* WordPress
* una API
* una aplicación web
* etc.

Por ejemplo, puedo crear una instancia EC2 con Ubuntu y conectarme mediante SSH:

```bash
ssh ubuntu@mi-servidor
```

A partir de ahí, la experiencia se parece bastante a administrar un servidor Linux convencional.

### ¿Qué estoy pagando realmente con EC2?

Principalmente capacidad de cómputo.

Una instancia tiene recursos como:

* CPU
* memoria RAM
* red
* almacenamiento asociado

Por ejemplo, conceptualmente:

```text
EC2
│
├── CPU
├── RAM
├── Red
└── EBS
     └── Disco
```

Y esto nos lleva al siguiente servicio.

---

# 💾 EBS: el disco de mi servidor

**Amazon EBS (Elastic Block Store)** es almacenamiento de bloques.

La forma más sencilla de entenderlo es:

> **EBS es el disco que conecto a mi máquina EC2.**

Si EC2 es el ordenador, EBS sería su SSD.

Por ejemplo:

```text
        EC2
   ┌─────────────┐
   │ Ubuntu      │
   │ Nginx       │
   │ Node.js     │
   │ Aplicación  │
   └──────┬──────┘
          │
          ▼
      ┌───────┐
      │  EBS  │
      │  SSD  │
      └───────┘
```

Aquí hay una distinción importante.

**EC2 no es lo mismo que EBS.**

EC2 proporciona la capacidad de ejecutar cosas.

EBS proporciona almacenamiento de bloques para esa infraestructura.

Si tengo una máquina Linux con:

```text
/var/www
/etc
/home
/usr
```

es muy habitual que ese sistema esté almacenado en un volumen EBS.

---

# 🗄️ S3: guardar archivos no es lo mismo que tener un disco

Aquí es donde personalmente creo que AWS empieza a resultar un poco menos intuitivo.

**Amazon S3 (Simple Storage Service)** también almacena cosas.

Entonces...

> ¿No es lo mismo que EBS?

No.

S3 utiliza **almacenamiento de objetos**, mientras que EBS proporciona **almacenamiento de bloques**.

Una manera sencilla de visualizarlo es esta:

### EBS

Es como un disco conectado a un ordenador.

```text
EC2
 │
 └── EBS
      ├── archivo.txt
      ├── imagen.jpg
      ├── aplicación
      └── sistema operativo
```

### S3

Es como un gigantesco almacén de objetos accesible mediante servicios web.

```text
S3
│
├── imagen.jpg
├── video.mp4
├── backup.zip
├── documento.pdf
└── datos.json
```

No necesito crear una máquina virtual para utilizar S3.

Puedo simplemente crear un **bucket** y almacenar objetos dentro.

---

# 🌐 ¿Y para qué puedo utilizar S3?

Aquí empieza a ser realmente interesante.

Una de las posibilidades es alojar una **web estática**.

Imaginemos que tengo:

```text
index.html
style.css
script.js
logo.png
```

No necesito PHP.

No necesito Node.js.

No necesito Python.

No necesito una base de datos.

Por tanto, ¿para qué quiero una máquina EC2 funcionando 24/7?

No la necesito.

Puedo almacenar los archivos en S3.

```text
                 INTERNET
                     │
                     ▼
              ┌─────────────┐
              │     S3      │
              │             │
              │ index.html  │
              │ style.css   │
              │ script.js   │
              │ logo.png    │
              └─────────────┘
```

Esto es especialmente interesante para páginas como:

* portfolios
* documentación
* landing pages
* blogs estáticos
* webs corporativas sencillas
* aplicaciones frontend estáticas

Por ejemplo, una aplicación creada con Vite que después de hacer:

```bash
npm run build
```

genera:

```text
dist/
├── index.html
├── assets/
│   ├── index.css
│   └── index.js
└── logo.svg
```

es un candidato perfecto para un hosting de archivos estáticos.

---

# 🚀 S3 + CloudFront: una combinación muy interesante

Aquí aparece una de las ideas más importantes de AWS:

> **No tienes por qué utilizar un único servicio.**

Puedes combinar servicios.

Por ejemplo:

```text
                    INTERNET
                       │
                       ▼
                ┌────────────┐
                │ CloudFront │
                │    CDN     │
                └─────┬──────┘
                      │
                      ▼
                 ┌─────────┐
                 │   S3    │
                 │ Website │
                 └─────────┘
```

**S3** almacena los archivos.

**CloudFront** los distribuye mediante una CDN.

La CDN permite que el contenido se entregue desde ubicaciones cercanas a los usuarios.

Por tanto, si mi objetivo es:

> «Quiero alojar una web sencilla hecha con HTML, CSS y JavaScript».

Una arquitectura razonable podría ser:

**S3 + CloudFront**

y no:

**EC2 + EBS + Apache + Linux + mantenimiento del servidor.**

No tiene demasiado sentido montar una máquina virtual completa simplemente para servir un `index.html`.

---

# 🗃️ RDS: necesito una base de datos

Ahora imaginemos algo diferente.

Tengo una aplicación que necesita:

```text
usuarios
productos
pedidos
facturas
sesiones
etc.
```

Aquí aparece **Amazon RDS (Relational Database Service)**.

RDS está pensado para bases de datos relacionales administradas.

Por ejemplo:

* MySQL
* PostgreSQL
* MariaDB
* Oracle
* SQL Server

La idea importante es que **no necesito administrar yo mismo todo el servidor de base de datos**.

Por ejemplo, podría tener:

```text
        Aplicación
             │
             ▼
           EC2
             │
             │ SQL
             ▼
           RDS
             │
        ┌────┴────┐
        │ MySQL   │
        └─────────┘
```

Mi aplicación se conecta a RDS y trabaja con la base de datos.

AWS se ocupa de buena parte de la infraestructura que hay detrás del servicio administrado.

---

# 🧩 Entonces... ¿qué pasa con WordPress?

Aquí ya podemos juntar varias piezas.

Supongamos que quiero montar:

> **WordPress en AWS con su propia base de datos.**

WordPress necesita principalmente:

1. Un servidor donde ejecutar PHP y WordPress.
2. Una base de datos.
3. Almacenamiento para sus archivos.

Una arquitectura posible sería:

```text
                    INTERNET
                       │
                       ▼
                    EC2
              ┌────────────────┐
              │ Linux          │
              │ Nginx/Apache   │
              │ PHP            │
              │ WordPress      │
              └───────┬────────┘
                      │
                      ▼
                     RDS
                 ┌──────────┐
                 │ MySQL    │
                 │ WordPress│
                 │ Database │
                 └──────────┘
```

Y podríamos añadir S3 y CloudFront dependiendo de cómo queramos gestionar determinados archivos y contenidos.

Por ejemplo:

```text
                   INTERNET
                       │
                       ▼
                 CloudFront
                       │
                       ▼
                     EC2
                 WordPress
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
            RDS                  S3
          MySQL              Archivos
```

Aquí ya se empieza a entender por qué AWS tiene tantos servicios.

**No compiten necesariamente entre ellos.**

Cada uno resuelve una parte diferente del problema.

---

# 🐧 ¿Y si simplemente quiero una máquina Linux?

Entonces la respuesta es bastante más sencilla:

## EC2

Si quiero algo parecido a:

> «Dame un servidor Ubuntu con una IP y acceso SSH».

EC2 es probablemente el servicio que estoy buscando.

Puedo tener:

```text
EC2
│
├── Ubuntu
├── Docker
├── Nginx
├── Node.js
├── Python
└── Mi aplicación
```

Y puedo administrarlo prácticamente como cualquier otro servidor Linux.

Por ejemplo:

```bash
sudo apt update
sudo apt install nginx
```

Y posteriormente:

```bash
sudo systemctl status nginx
```

No necesito aprender veinte servicios de AWS para crear una máquina Linux.

**EC2 es suficiente para empezar.**

---

# 🧠 EC2, EBS, S3 y RDS en una misma imagen mental

Esta es la asociación que me está resultando más útil para no perderme:

```text
EC2
│
└── "Necesito una máquina que ejecute cosas"

EBS
│
└── "Necesito un disco para esa máquina"

S3
│
└── "Necesito guardar archivos/objetos"

RDS
│
└── "Necesito una base de datos relacional"
```

Y a partir de ahí puedo añadir más servicios según las necesidades.

---

# 🚦 ¿Cómo elegir servicio según lo que quiero hacer?

Esta es probablemente la tabla que más me habría gustado encontrar cuando empecé a mirar AWS.

| Necesito...                                 | Servicio que miraría primero |
| ------------------------------------------- | ---------------------------- |
| Una máquina Linux                           | **EC2**                      |
| Una máquina Windows                         | **EC2**                      |
| Un disco para EC2                           | **EBS**                      |
| Guardar archivos                            | **S3**                       |
| Una base de datos MySQL                     | **RDS**                      |
| Una base de datos PostgreSQL                | **RDS**                      |
| Servir una web estática                     | **S3**                       |
| CDN para contenido web                      | **CloudFront**               |
| Ejecutar código sin administrar un servidor | **Lambda**                   |
| DNS                                         | **Route 53**                 |
| Gestionar usuarios y permisos               | **IAM**                      |
| Contenedores                                | **ECS / EKS**                |

Esto no significa que cada problema tenga una única solución.

AWS suele permitir varias arquitecturas.

Lo importante es entender **qué problema resuelve cada servicio**.

---

# 🔥 Lambda: ¿y si no quiero tener un servidor encendido?

Otro concepto que aparece mucho en AWS es **Lambda**.

Aquí cambia el planteamiento.

Con EC2:

```text
Servidor
   │
   ├── está funcionando
   ├── ejecuta mi aplicación
   └── espera peticiones
```

Con Lambda puedo ejecutar una función cuando ocurre un evento.

Por ejemplo:

```javascript
export const handler = async (event) => {
    return {
        statusCode: 200,
        body: "Hola AWS"
    };
};
```

No estoy pensando tanto en:

> «Tengo un servidor».

Estoy pensando en:

> «Tengo una función que se ejecuta cuando la necesito».

Esto puede ser útil para APIs, automatizaciones, procesamiento de archivos, tareas desencadenadas por eventos y muchos otros casos.

---

# 🌍 CloudFront: no es almacenamiento ni servidor

CloudFront puede resultar confuso al principio porque también aparece mucho cuando hablamos de webs.

Pero su función es diferente.

**CloudFront es una CDN.**

Su objetivo principal es distribuir contenido a los usuarios desde una red de ubicaciones distribuidas.

Podemos tener:

```text
                 Usuario 🇪🇸
                     │
                     ▼
                CloudFront
                     │
                     ▼
                    S3
```

O:

```text
                 Usuario
                     │
                     ▼
                CloudFront
                     │
                     ▼
                    EC2
```

Es decir, CloudFront puede trabajar delante de otros servicios.

No sustituye a S3 ni a EC2.

---

# 🌐 Route 53: ¿y el dominio?

Supongamos que tengo:

```text
www.jorgerosa.dev
```

y quiero que ese dominio apunte a mi infraestructura de AWS.

Aquí aparece **Amazon Route 53**, el servicio de DNS de AWS.

Podemos pensar:

```text
jorgerosa.dev
      │
      ▼
 Route 53
      │
      ▼
CloudFront / EC2 / otros recursos
```

DNS no es hosting.

Route 53 no es una máquina.

Simplemente ayuda a resolver nombres de dominio y proporciona otras funciones relacionadas con DNS.

---

# 🔐 IAM: ¿quién puede hacer qué?

Otro servicio fundamental es **IAM (Identity and Access Management)**.

Si AWS es una enorme infraestructura, necesitamos controlar:

> «¿Quién puede acceder a qué?»

IAM permite gestionar identidades y permisos.

Por ejemplo:

```text
Usuario A
   │
   ├── Puede leer S3
   └── No puede borrar EC2

Usuario B
   │
   ├── Puede administrar EC2
   └── Puede acceder a RDS
```

Esto puede parecer algo secundario cuando estamos empezando, pero en AWS los permisos son una parte fundamental.

---

# 🧱 Entonces, ¿cómo quedaría una web sencilla?

Si mi web solamente contiene:

```text
HTML
CSS
JavaScript
Imágenes
```

no necesito necesariamente una máquina.

Una arquitectura sencilla sería:

```text
              Internet
                  │
                  ▼
             CloudFront
                  │
                  ▼
                 S3
                  │
        ┌─────────┼─────────┐
        │         │         │
       HTML      CSS       JS
```

### ¿Necesito EC2?

❌ No necesariamente.

### ¿Necesito RDS?

❌ No.

### ¿Necesito EBS?

❌ No.

### ¿Necesito S3?

✅ Sí, si quiero utilizarlo como almacenamiento/hosting de los archivos.

### ¿CloudFront?

✅ Recomendable si quiero una CDN y una distribución más completa.

---

# 📝 ¿Y un blog estático?

Este caso es todavía más interesante.

Si genero el blog con **Jekyll**, el resultado final son archivos estáticos:

```text
_site/
├── index.html
├── about/
│   └── index.html
├── posts/
│   └── mi-post/
│       └── index.html
├── assets/
│   ├── css/
│   └── js/
└── images/
```

Jekyll necesita Ruby para **generar** esos archivos.

Pero una vez generados, el navegador solamente necesita recibir:

```text
HTML
CSS
JavaScript
imágenes
```

Por tanto, no necesito tener Ruby ejecutándose permanentemente para servir el blog.

Esto es precisamente una de las ventajas de los sitios estáticos.

---

# 🏗️ ¿Y una aplicación web dinámica?

Aquí la arquitectura empieza a crecer.

Supongamos que tengo:

```text
Frontend
    │
    ▼
Backend
    │
    ▼
Database
```

En AWS podría terminar con algo como:

```text
                 Internet
                     │
                     ▼
                CloudFront
                     │
             ┌───────┴───────┐
             ▼               ▼
            S3              EC2
         Frontend          Backend
                              │
                              ▼
                             RDS
                           Database
```

Y si además necesito guardar imágenes:

```text
                             ┌─── S3
                             │
                             │ imágenes
                             │
Internet → CloudFront → EC2 ─┤
                              │
                              └─── RDS
                                  Base de datos
```

Ya no estamos hablando de «un hosting».

Estamos construyendo una arquitectura.

---

# 🧩 La clave: los servicios de AWS se combinan

Esta era una de las dudas que tenía al principio:

> ¿Tiene sentido utilizar EC2 + EBS + RDS + S3 juntos?

Sí.

De hecho, **es completamente normal combinar servicios**.

Por ejemplo:

```text
              ┌─────────────┐
              │ CloudFront  │
              └──────┬──────┘
                     │
             ┌───────┴───────┐
             ▼               ▼
            S3              EC2
        archivos          aplicación
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
                   EBS                 RDS
                  disco              database
```

Cada servicio tiene una responsabilidad.

### EC2

Ejecuta la aplicación.

### EBS

Proporciona almacenamiento de bloques a EC2.

### RDS

Gestiona la base de datos.

### S3

Almacena objetos y archivos.

### CloudFront

Distribuye contenido.

Y pueden trabajar juntos.

---

# 🤯 ¿Por qué AWS parece tan complicado entonces?

Porque AWS no intenta venderme «un servidor».

Me ofrece piezas independientes.

En un hosting tradicional podría contratar:

```text
PLAN HOSTING
│
├── CPU
├── RAM
├── Disco
├── Base de datos
├── Email
└── Panel
```

En AWS puedo construirlo de otra manera:

```text
EC2
EBS
RDS
S3
CloudFront
Route 53
IAM
...
```

Esto proporciona mucha más flexibilidad, pero también significa que tengo que entender qué estoy construyendo.

Y hay otra consecuencia importante:

**puedo terminar pagando por recursos que realmente no necesito.**

Por eso no tiene sentido utilizar EC2 para absolutamente todo.

---

# 💡 Tres ejemplos para quedarme con la idea

## 1. «Quiero una web HTML + CSS»

Pienso:

```text
¿Necesito ejecutar código en servidor?
        │
        └── No
             │
             ▼
           S3
             │
             ▼
        CloudFront
```

**S3 + CloudFront**

---

## 2. «Quiero WordPress»

Pienso:

```text
¿Necesito ejecutar PHP?
        │
        └── Sí
             │
             ▼
            EC2
             │
             ├── EBS
             │
             └── RDS
```

Una arquitectura posible:

**EC2 + EBS + RDS**

y dependiendo de las necesidades:

**S3 + CloudFront**

---

## 3. «Quiero una máquina Linux»

Pienso:

```text
Necesito un servidor
        │
        ▼
       EC2
        │
        ▼
       EBS
```

**EC2 + EBS**

Y ya puedo instalar lo que necesite.

```bash
sudo apt update
sudo apt install nginx
```

---

# 🗺️ Mi mapa mental de AWS

Después de darle unas cuantas vueltas, creo que una buena manera de empezar a estudiar AWS es no intentar memorizar sus servicios.

Me quedaría inicialmente con este mapa:

```text
                         AWS
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
     CÓMPUTO          ALMACENAMIENTO      DATOS
        │                 │                 │
       EC2             S3 / EBS            RDS
        │
     Lambda
        │
      ECS/EKS

        ┌─────────────────┼─────────────────┐
        │                 │                 │
       RED               CDN            SEGURIDAD
        │                 │                 │
   Route 53          CloudFront            IAM
```

No necesito conocer todos los servicios para empezar.

De hecho, probablemente sea contraproducente intentarlo.

Primero quiero poder contestar estas preguntas:

> **¿Necesito una máquina? → EC2**

> **¿Necesito un disco para esa máquina? → EBS**

> **¿Necesito guardar archivos? → S3**

> **¿Necesito una base de datos relacional? → RDS**

> **¿Necesito distribuir contenido? → CloudFront**

> **¿Necesito DNS? → Route 53**

> **¿Necesito gestionar permisos? → IAM**

> **¿Necesito ejecutar una función sin administrar un servidor? → Lambda**

A partir de ahí, los demás servicios empiezan a encajar mucho mejor.

---

# 🧭 Una forma práctica de seguir aprendiendo AWS

En mi caso, creo que tiene más sentido aprender AWS **por arquitecturas y problemas reales**, no servicio por servicio.

Por ejemplo:

### Nivel 1 — Web estática

```text
S3
  +
CloudFront
```

### Nivel 2 — Servidor Linux

```text
EC2
  +
EBS
```

### Nivel 3 — Aplicación web

```text
EC2
  +
EBS
  +
RDS
```

### Nivel 4 — Aplicación web más completa

```text
Route 53
     │
CloudFront
     │
 ┌───┴────┐
 │        │
S3       EC2
          │
         RDS
```

Y a partir de aquí ya aparecen conceptos como VPC, subredes, security groups, load balancers, Auto Scaling, IAM, Docker, ECS, Lambda...

Pero ahora al menos cada pieza tiene un lugar donde encajar.

Eso es lo que me estaba faltando al mirar AWS: **no necesitaba otra lista de servicios; necesitaba un mapa.**
