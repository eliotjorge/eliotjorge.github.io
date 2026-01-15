---
title: "SSH: cómo conectarse a un servidor de forma segura (claves, PuTTY y WordPress)"
description: "Guía clara y práctica sobre SSH: qué es, cómo funciona la conexión por claves pública y privada, uso de PuTTY en Windows, diferencias con FTP y cómo conectarse por SSH a un servidor con WordPress."
date: 2026-01-15
image: "https://github.com/user-attachments/assets/ee9d76d8-9782-4866-8be8-cf2f776478ba"
categories: [servidores, seguridad, desarrollo-web]
tags: [ssh, putty, claves-ssh, ftp, wordpress, servidores, linux]
faq:
  - question: "¿Qué es SSH y para qué sirve?"
    answer: "SSH es un protocolo que permite conectarse de forma segura a otro ordenador o servidor para administrarlo remotamente mediante una consola."
  - question: "¿Qué diferencia hay entre FTP y SSH?"
    answer: "FTP se usa principalmente para transferir archivos, mientras que SSH permite ejecutar comandos, administrar el sistema y también transferir archivos de forma segura."
  - question: "¿Qué son las claves pública y privada en SSH?"
    answer: "Son un sistema de autenticación basado en criptografía: la clave pública se guarda en el servidor y la privada permanece en tu ordenador."
  - question: "¿PuTTY es lo mismo que SSH?"
    answer: "No. SSH es el protocolo y PuTTY es un programa que permite usar SSH, especialmente en Windows."
  - question: "¿Puedo usar SSH en un servidor con WordPress?"
    answer: "Sí. SSH es muy útil para administrar WordPress, actualizar plugins, gestionar archivos o usar WP-CLI."
---

SSH es una de esas herramientas que al principio imponen respeto, pero cuando entiendes **qué hace y por qué existe**, pasa a ser algo casi cotidiano.
No es magia, no es solo “para sysadmins” y, desde luego, no es algo oscuro que solo se usa escribiendo comandos raros sin saber qué pasa.

SSH sirve para **conectarte a otro ordenador de forma remota y segura**, normalmente un servidor.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/QRB6F0x3ptYHu/giphy.gif" alt="Conexión remota entre ordenadores usando SSH" width="300" />
</div>

---

## ¿Qué es exactamente SSH?

SSH significa **Secure Shell**.
Es un **protocolo de comunicación cifrado** que permite:

* Conectarte a un servidor
* Ejecutar comandos
* Gestionar archivos
* Administrar servicios (como una web en WordPress)

Todo esto **sin enviar contraseñas en claro** por la red 🔐.

---

## ¿Cómo funciona una conexión SSH?

A grandes rasgos:

1. Tu ordenador actúa como **cliente**
2. El servidor espera conexiones SSH
3. Te autenticas
4. Se abre una **terminal remota**

Esa terminal no es una simulación:
👉 estás ejecutando comandos **directamente en el servidor**.

---

## Autenticación por contraseña vs claves SSH

### Opción 1: usuario y contraseña

Es la forma más simple:

```bash
ssh usuario@servidor.com
```

El servidor te pide la contraseña y entras.

✔ Fácil
✖ Menos segura
✖ Vulnerable a ataques de fuerza bruta

---

### Opción 2: claves pública y privada (la recomendada)

Aquí es donde SSH brilla de verdad ⭐

* **Clave privada** → se queda en tu ordenador
* **Clave pública** → se copia al servidor

Cuando te conectas:

* El servidor comprueba que tienes la clave privada correcta
* Si encaja → entras
* Si no → fuera 🚪

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/7UKLC3eNbOa3aqQd5d/giphy.gif" alt="Sistema de claves pública y privada en SSH" width="300" />
</div>

---

## Crear un par de claves SSH

En Linux o macOS:

```bash
ssh-keygen -t ed25519 -C "tu@email.com"
```

Se generan dos archivos:

* `id_ed25519` → **clave privada**
* `id_ed25519.pub` → **clave pública**

⚠️ La privada **no se comparte jamás**.

---

## Copiar la clave pública al servidor

La forma rápida:

```bash
ssh-copy-id usuario@servidor.com
```

O manualmente, añadiendo el contenido de `.pub` a:

```bash
~/.ssh/authorized_keys
```

A partir de ahí, podrás conectarte sin contraseña:

```bash
ssh usuario@servidor.com
```

---

## ¿Qué papel juega PuTTY en todo esto?

SSH es el protocolo.
**PuTTY es solo una herramienta** para usar SSH, sobre todo en Windows 🪟.

PuTTY permite:

* Conectarte por SSH
* Usar claves privadas (`.ppk`)
* Guardar sesiones


### Detalle importante sobre PuTTY

PuTTY **no usa directamente** las claves OpenSSH.
Hay que convertirlas con **PuTTYgen** a formato `.ppk`.

---

## FTP vs SSH: por qué importa que tu hosting ofrezca SSH

Muchos alojamientos ofrecen:

* ✅ FTP
* ✅ SSH (y esto marca la diferencia)

### FTP sirve para:

* Subir archivos
* Descargar archivos

### SSH sirve para:

* Todo lo anterior
* Ejecutar comandos
* Cambiar permisos
* Automatizar tareas
* Usar herramientas como WP-CLI

Si un hosting ofrece **FTP + SSH**, es una muy buena señal 👍

---

## Conectarse por SSH a un servidor con WordPress

Esto es especialmente útil cuando trabajas con WordPress.

Una vez conectado por SSH puedes:

```bash
cd public_html
```

Y desde ahí:

* Limpiar cachés
* Cambiar permisos
* Buscar archivos sospechosos
* Ejecutar WP-CLI

Ejemplo con WP-CLI:

```bash
wp plugin list
```

O actualizar WordPress:

```bash
wp core update
```

Nada de entrar al panel si no carga, ni depender siempre del navegador.

---

## ¿Por qué SSH es tan importante hoy?

Porque:

* 🔐 Es seguro
* ⚡ Es rápido
* 🤖 Permite automatización
* 🧠 Te da control real del servidor

No sustituye al FTP, pero **lo complementa y lo supera** en muchos escenarios.

---

SSH no es algo que haya que memorizar, sino **entender**.
Cuando sabes qué es una clave, qué hace PuTTY y por qué tu hosting ofrece SSH, deja de parecer algo “avanzado” y pasa a ser simplemente… lógico.

Y eso, en el día a día del desarrollo web, se agradece bastante 🙂
