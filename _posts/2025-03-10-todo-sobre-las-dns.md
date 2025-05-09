---
title: "🌐 Todo sobre las DNS: Qué son y cómo funcionan"
image: https://github.com/user-attachments/assets/b8da8aac-99e6-4a9c-820b-6b93332e9134
description: "Conoce todo sobre las DNS: qué son, cómo funcionan y los tipos de registros más comunes. Aprende cómo los servidores DNS traducen nombres de dominio en direcciones IP para navegar por Internet de forma rápida y segura."
date: 2025-03-10
categories: [DNS, servidores, dominios, registros DNS]
tags: [DNS, servidores, dominios, registros DNS]
pin: false
comments: false
render_with_liquid: false
---

Cuando escribes una dirección en tu navegador, como `example.com`, algo mágico ocurre en el fondo: las **DNS** entran en acción. Pero, ¿qué son exactamente? 🤔

## ✨ Qué es DNS

El **Sistema de Nombres de Dominio** (DNS, por sus siglas en inglés) es como la agenda telefónica de Internet. Su función es traducir nombres de dominio legibles por humanos (como `google.com`) en direcciones IP que los ordenadores entienden (como `142.250.184.206`).

Sin el DNS, tendrías que recordar largas secuencias de números en lugar de simples nombres. ¡Nada práctico! 😅

## 🖥️ Cómo funciona el DNS

Cada vez que introduces una URL en tu navegador, se siguen estos pasos:

1. **Consulta al caché local**: Primero, tu ordenador revisa si ya tiene la dirección IP guardada.
2. **Servidor DNS recursivo**: Si no la encuentra, consulta a un servidor DNS recursivo (normalmente el de tu proveedor de Internet o Google DNS `8.8.8.8`).
3. **Servidores raiz**: Estos redirigen la solicitud según la terminación del dominio (`.com`, `.org`, `.es`).
4. **Servidor TLD**: Este busca el servidor de nombres específico del dominio.
5. **Servidor autoritativo**: Finalmente, este responde con la dirección IP correcta.

Todo esto ocurre en milisegundos. 🏃‍♂️

## 🗂 Tipos de registros DNS

Los registros DNS indican cómo deben resolverse los nombres de dominio. Los más comunes son:

- **A (Address)**: Asocia un dominio con una dirección IPv4.
- **AAAA**: Lo mismo que el registro A, pero para IPv6.
- **CNAME (Canonical Name)**: Redirige un dominio a otro (por ejemplo, `www.example.com` a `example.com`).
- **MX (Mail Exchanger)**: Define los servidores de correo del dominio.
- **TXT**: Contiene información adicional, como verificaciones de Google o SPF para correos.
- **NS (Name Server)**: Indica los servidores de nombres responsables del dominio.
- **SRV**: Define servicios específicos dentro de un dominio, como VoIP.

## 🌐 DNS Públicos vs. Privados

Puedes usar distintos servidores DNS según tus necesidades:

| Tipo | Ejemplo | Ventajas |
|------|---------|----------|
| **Públicos** | Google (`8.8.8.8`) o Cloudflare (`1.1.1.1`) | Más rápidos y seguros |
| **Privados** | DNS de tu proveedor de Internet | Pueden tener restricciones |

## 📡 Cambiar tu servidor DNS

Si quieres mejorar tu velocidad de navegación o evitar restricciones, puedes cambiar el servidor DNS en tu router o dispositivo. Algunos populares son:

- **Google DNS:** `8.8.8.8` y `8.8.4.4`
- **Cloudflare:** `1.1.1.1` y `1.0.0.1`
- **OpenDNS:** `208.67.222.222` y `208.67.220.220`
