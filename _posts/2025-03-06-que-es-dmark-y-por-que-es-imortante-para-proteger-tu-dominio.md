---
title: "🛡️ ¿Qué es DMARC y por qué es importante para proteger tu dominio? 📧"
date: 06-03-2025
categories: [Seguridad, Email]
tags: [Seguridad, Email]
pin: false
comments: false
render_with_liquid: false
---

En el mundo del correo electrónico, la seguridad es un aspecto crucial. Uno de los principales problemas que enfrentan las empresas y propietarios de dominios es la suplantación de identidad (phishing y spoofing). Para combatirlo, existe **DMARC**, un protocolo diseñado para proteger los dominios de correo electrónico contra estos ataques. 🚀

## 🔍 ¿Qué es DMARC?

**DMARC** (Domain-based Message Authentication, Reporting, and Conformance) es un protocolo de autenticación de correo electrónico que ayuda a evitar que terceros envíen correos electrónicos en nombre de tu dominio sin autorización. Se basa en dos tecnologías previas: **SPF (Sender Policy Framework)** y **DKIM (DomainKeys Identified Mail)**. ✅

### ⚙️ ¿Cómo funciona DMARC?

DMARC permite a los propietarios de dominios definir cómo deben manejarse los correos electrónicos que no pasen las verificaciones de SPF y DKIM. Funciona de la siguiente manera:

1. **🛠️ Autenticación con SPF y DKIM:** DMARC verifica si el correo electrónico proviene de una fuente autorizada (SPF) y si el contenido no ha sido alterado (DKIM).
2. **📜 Política de manejo:** El propietario del dominio establece una política para definir qué hacer con los correos no autenticados:
   - `p=none` 🔍: Solo monitoriza los resultados sin bloquear mensajes.
   - `p=quarantine` 🚧: Los correos sospechosos se envían a la carpeta de spam.
   - `p=reject` ❌: Los correos no autenticados se rechazan completamente.
3. **📊 Informes:** DMARC envía reportes a los propietarios del dominio sobre los intentos de envío fallidos o no autorizados.

## 🎯 ¿Por qué es importante DMARC?

Implementar **DMARC** tiene varias ventajas clave:

- 🔐 **Protección contra el phishing y el spoofing:** Evita que ciberdelincuentes envíen correos fraudulentos en nombre de tu dominio.
- ✅ **Mayor confianza y credibilidad:** Garantiza a los destinatarios que los correos legítimos provienen realmente de tu dominio.
- 📩 **Mejora la entregabilidad del correo electrónico:** Reduce la posibilidad de que tus correos terminen en la carpeta de spam.
- 📡 **Monitorización y control:** Permite recibir informes detallados sobre intentos de suplantación de identidad.

## 🛠️ Cómo configurar DMARC en tu dominio

1. **🔍 Verifica que tienes SPF y DKIM configurados:** DMARC depende de estos protocolos, por lo que deben estar activos.
2. **📌 Crea un registro DMARC:** Debes añadir un registro TXT en la configuración de tu dominio (DNS) con un formato similar a este:
   ```
   v=DMARC1; p=reject; rua=mailto:reportes@tudominio.com; ruf=mailto:alertas@tudominio.com; pct=100;
   ```
   - `v=DMARC1` 📜: Versión del protocolo.
   - `p=reject` ❌: Política de manejo de correos no autenticados.
   - `rua` 📩: Dirección de correo para recibir reportes agregados.
   - `ruf` 📨: Dirección para recibir reportes forenses.
   - `pct=100` 🎯: Aplica la política al 100% de los correos.
3. **🌐 Publica el registro en el DNS:** Agrega el registro TXT en la configuración del DNS de tu dominio.
4. **📊 Monitorea los informes:** Revisa los reportes para detectar intentos de suplantación y ajustar la política si es necesario.


