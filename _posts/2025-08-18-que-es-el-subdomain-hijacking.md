---
title: "¿Qué es el Subdomain Hijacking (Subdominio Secuestrado) y cómo evitarlo? 🛡️"
description: "Explico qué es el subdominio secuestrado, por qué puede afectar a webs alojadas en GitHub Pages con dominio personalizado y cómo proteger tu dominio."
date: 2025-08-18
categories: [seguridad, dominios, web]
tags: [subdominios, seguridad, github-pages, cloudflare, dns, hosting]
image: [https://github.com/user-attachments/assets/15a07a95-e6e6-4911-8aed-6abe63f9569c](https://github.com/user-attachments/assets/15a07a95-e6e6-4911-8aed-6abe63f9569c)
---

***

# ¿Qué es el Subdominio Secuestrado (Subdomain Hijacking) y cómo evitarlo? 🛡️

Si tienes un blog o web alojada en GitHub Pages con un dominio personalizado, y usas servicios de DNS y seguridad como Cloudflare, quizá no conozcas el riesgo del **subdominio secuestrado** (o subdomain hijacking). Aquí te cuento en detalle qué es, por qué puede afectar a tu dominio y cómo protegerte para mantener tu imagen y SEO seguros. 🚀✨

***

## ¿Qué es el subdominio secuestrado?

Es un problema de seguridad donde un subdominio de tu dominio apunta a un servicio externo (por ejemplo GitHub Pages) que no está correctamente configurado o está vacío. Esto permite que terceros malintencionados creen sitios basura, publiciten cosas no deseadas (como casinos online) o incluso hagan phishing bajo tu propio dominio. 😱⚠️

En pocas palabras: aunque no tengas control sobre ese contenido, se mostrará como si fuera parte de tu dominio principal, lo que puede dañar tu reputación y SEO.

***

## ¿Cómo puede suceder esto con GitHub Pages?

- Usas GitHub Pages para alojar tu blog o sitio estático. 📚
- Configuras un **registro DNS wildcard** tipo `*` en Cloudflare u otro proveedor, apuntándolo a GitHub Pages. 🌐
- Al hacer esto, cualquier subdominio no asignado específicamente puede ser reclamado por cualquier usuario de GitHub Pages que configure ese subdominio en su repositorio. 🕵️♂️
- Así, alguien puede crear un sitio que se cargue en `app.tudominio.com` o `blog.tudominio.com` sin permiso tuyo, mostrando contenido no deseado. 🚫

***

## ¿Cómo detectarlo y protegerte?

😌 **Yo mismo tuve este problema y descubrí la solución después de un susto. Algo que espero te ayude si te pasa lo mismo.**

1. **Revisa tus registros DNS en Cloudflare o tu proveedor:** 🔍
   - Busca si tienes un registro `CNAME` con el nombre `*` (wildcard). Esto permite que cualquier subdominio apunte a GitHub Pages.
2. **Elimina este registro wildcard si existe.** ❌
   - Solo deben existir los registros para los subdominios que realmente uses (`www`, `jorgerosa.dev`, etc.).
3. **Gestiona los usuarios y permisos de Google Search Console** para asegurarte de que solo tú tienes acceso. 🔐
4. **Solicita la eliminación de URLs basura en Google Search Console** si ya han sido indexadas y perjudican tu imagen. 🗑️
5. **Mantén siempre seguras tus credenciales y revisa periódicamente tus DNS y configuraciones.** 🔑

***

## ¿Por qué no debes usar registros DNS comodín con GitHub Pages?

Aunque cómodo, puede poner en riesgo tu dominio y exponerlo a este tipo de secuestros. Además, permite que terceros publiquen bajo tu dominio sin control. ⚠️

***

## ¿Qué beneficios tiene proteger tu dominio así?

- Mantienes intacta la reputación de tu web y blog profesional. 🌟
- Evitas que contenido no deseado aparezca en buscadores y sea asociado a ti. 🚫🔎
- Garantizas que solo tú controles qué contenido se sirve bajo tus subdominios. 🛡️
- Mejora tu posicionamiento SEO y la confianza de empresas o usuarios que visitan tu sitio. 📈

***
