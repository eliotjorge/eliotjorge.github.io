---
title: "Subdomain Hijacking: qué es el secuestro de subdominios y cómo proteger tu web 🛡️"
description: "Qué es el subdomain hijacking (subdominio secuestrado), cómo afecta a webs en GitHub Pages con dominio personalizado y los pasos clave para proteger tu dominio y SEO."
date: 2025-08-18
categories: [seguridad, dominios, web]
tags: [subdominios, seguridad, github-pages, cloudflare, dns, hosting, seo]
image: "https://img.freepik.com/free-photo/teenager-boy-playing-computer_23-2148860517.jpg?t=st=1756470383~exp=1756473983~hmac=42f43bbfdd4e03c3a67a74b467467355c479602c2d6b779d14b61a0ae9198912&w=740"
---

***

Si usas **GitHub Pages con un dominio personalizado** y gestionas tus DNS con servicios como **Cloudflare**, quizá no sepas que existe un riesgo silencioso: el **subdomain hijacking** o **secuestro de subdominios**.  
En este post te cuento en qué consiste, cómo puede afectar a tu reputación y SEO 🚀✨ y, sobre todo, cómo protegerte para evitar sustos.

***

## 🤔 ¿Qué es el subdomain hijacking (secuestro de subdominios)?

Se trata de un **problema de seguridad** que aparece cuando un subdominio de tu dominio apunta a un servicio externo (ej. GitHub Pages) pero ese servicio **no está configurado** o **queda libre**.  

Esto abre la puerta a que un tercero malintencionado:  
- Cree páginas basura. 🗑️  
- Publique publicidad no deseada (ej. casinos online). 🎰  
- Monte ataques de phishing bajo tu propio dominio. 🕵️  

En pocas palabras: aunque no lo controles tú, **el contenido se muestra como si fuese parte de tu web principal**. Resultado → tu reputación online y tu SEO pueden verse seriamente dañados. ⚠️

***

## 📚 ¿Cómo sucede en GitHub Pages?

Ejemplo real de cómo ocurre este problema:  

1. Alojas tu blog en **GitHub Pages**.  
2. Configuras un **registro DNS comodín (wildcard)** como `*` en Cloudflare apuntando a GitHub.  
3. Cualquier subdominio no asignado (`app.midominio.com`, `blog.midominio.com`) queda libre para que otra persona lo reclame en su repositorio.  
4. El atacante publica contenido en ese subdominio → y aparece como si fuese tuyo. 🚨  

***

## 🔍 Cómo detectarlo y proteger tu dominio

Yo mismo sufrí este problema 😅 y la solución fue más sencilla de lo que pensaba. Te dejo la checklist que a mí me sirvió:  

1. **Revisa tus registros DNS (Cloudflare u otro proveedor):**  
   - Si ves un `CNAME` tipo `*`, ¡elimínalo ya!  
2. **Elimina cualquier wildcard innecesario.**  
   - Mantén solo registros para los subdominios que uses de verdad (`www`, `mail`, etc.).  
3. **Asegura Google Search Console:**  
   - Revisa que solo tú tengas permisos.  
4. **Limpia URLs basura en Search Console:**  
   - Si ya fueron indexadas, pide su eliminación.  
5. **Haz auditorías periódicas de DNS y credenciales.** 🔑  

***

## 🚫 Por qué no usar comodines DNS en GitHub Pages

Aunque parecen prácticos, los registros wildcard:  
- Ponen en riesgo tu dominio.  
- Permiten que terceros publiquen sin tu consentimiento.  
- Crean puertas abiertas para ataques de phishing.  

***

## ✅ Beneficios de proteger tu dominio

- Mantienes intacta la **reputación profesional** de tu web. 🌟  
- Evitas que contenido basura se indexe en buscadores. 🚫  
- Garantizas que solo tú decides qué se publica bajo tu dominio. 🛡️  
- Refuerzas tu **SEO y confianza** frente a usuarios y empresas. 📈  

***

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/mEVWOs5Kto9RErUBCi/giphy.gif" alt="Chequeado y aprobado" width="300" />
</div>
