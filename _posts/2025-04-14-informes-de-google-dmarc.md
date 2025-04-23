---
title: "📩 Informe de DMARC de Google"
image: https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?q=80&w=1974
description: "Aprende a interpretar los informes DMARC de Google, descubre por qué los recibes y cómo usarlos para mejorar la seguridad del correo electrónico en tu dominio."
date: 2025-04-14
categories: [seguridad, Email, dmarc, google, autenticacion, correo-electronico, proteccion-de-dominio]
tags: [seguridad, Email, dmarc, google, autenticacion, correo-electronico, proteccion-de-dominio]
comments: false
render_with_liquid: false
---

Tras configurar un registro **DMARC** en el registro DNS de nuestro dominio como vimos en este post
[**🛡️ ¿Qué es DMARC y por qué es importante para proteger tu dominio? 📧**](https://jorgerosa.dev/posts/que-es-dmark-y-por-que-es-imortante-para-proteger-tu-dominio/),
es habitual recibir correos electrónicos desde la dirección `noreply-dmarc-support@google.com`. Estos correos suelen incluir archivos adjuntos con extensión `.zip`,
lo cual puede generar dudas sobre su legitimidad. Pero no hay de qué preocuparse: ✅ **es completamente normal y seguro**.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/Yavo0SXhZYhSo/giphy.gif" alt="Todo bien" width="300" />
</div>

---

### 🗂️ ¿Qué contienen estos archivos `.zip`?

Los `.zip` que envía Google contienen **informes agregados DMARC**, útiles para saber si los correos enviados desde un dominio están pasando las validaciones **SPF** y **DKIM**.

🧠 Estos informes ayudan a identificar:
- Intentos de suplantación de identidad (spoofing)
- Problemas de autenticación
- Correos legítimos que pueden estar siendo bloqueados

El nombre del archivo suele tener esta estructura:

```
google.com!tudominio.es!<ID>.zip
```

📌 Esto indica:
- **google.com** → proveedor que generó el informe
- **tudominio.es** → dominio analizado
- `<ID>` → identificador único del informe

---

### 🔐 ¿Es seguro abrirlo?

¡Sí! Siempre que:
- El remitente sea **exactamente** `noreply-dmarc-support@google.com`
- El archivo esté **adjunto directamente**, sin enlaces raros
- Se haya publicado un registro DMARC con el campo `rua` (para informes agregados)

Dentro del `.zip` hay un archivo `.xml` con los resultados. Para visualizarlo fácilmente:

🛠️ Herramientas recomendadas:
- [DMARCian XML Parser](https://dmarcian.com/dmarc-xml-parser/)
- [Google DMARC Analyzer](https://toolbox.googleapps.com/apps/dmarc/)

---

## 📊 Ejemplo real de un informe

Este es un ejemplo de contenido `.xml` recibido tras configurar DMARC para `tudominio.es`:

```xml
<feedback>
  <report_metadata>
    <org_name>google.com</org_name>
    <email>noreply-dmarc-support@google.com</email>
    <report_id>13634760113354352809</report_id>
    <date_range>
      <begin>1744243200</begin>
      <end>1744329599</end>
    </date_range>
  </report_metadata>
  <policy_published>
    <domain>tudominio.es</domain>
    <adkim>r</adkim>
    <aspf>r</aspf>
    <p>quarantine</p>
    <sp>quarantine</sp>
    <pct>100</pct>
    <np>quarantine</np>
  </policy_published>
  <record>
    <row>
      <source_ip>80.98.171.206</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>tudominio.es</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>tudominio.es</domain>
        <result>pass</result>
        <selector>default</selector>
      </dkim>
      <spf>
        <domain>tudominio.es</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
</feedback>
```

---

## 🔍 ¿Qué significa este informe?

- ✉️ **1 correo** fue enviado desde la IP `80.98.171.206`
- ✅ **SPF y DKIM pasaron correctamente**
- 📥 **DMARC se aplicó** pero el correo fue considerado legítimo (`disposition: none`)
- 📄 Se usó la configuración DKIM `default` y SPF desde el dominio `tudominio.es`

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/5VKbvrjxpVJCM/giphy.gif" alt="Chequeado y aprobado" width="300" />
</div>

---

## 🛡️ Política DMARC vigente

El dominio `tudominio.es` tiene publicada esta política:

| Campo         | Valor        |
|---------------|--------------|
| p             | quarantine   |
| sp            | quarantine   |
| pct           | 100          |
| adkim         | r (relajado) |
| aspf          | r (relajado) |
| np            | quarantine   |

👉 Esto significa que se aplicará **cuarentena** a los mensajes que no cumplan SPF/DKIM.

---

## 🧾 En resumen...

📬 Recibir archivos `.zip` desde `noreply-dmarc-support@google.com` es completamente **normal** si se ha configurado correctamente un registro DMARC con informes agregados.  

Estos informes permiten:
- Detectar envíos legítimos y sospechosos
- Verificar que la autenticación de correos funciona
- Evitar que otros usen un dominio sin permiso

💡 Para dominios con mucho tráfico de correo, es recomendable automatizar la visualización de estos reportes con herramientas o servicios especializados.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/xVpUhR49z4F14vWJZ5/giphy.gif" alt="Protección activada" width="300" />
</div>

---

Sólo hay que preocuparse si en el informe aparece algo como:

- **spf:** fail
- **dkim:** fail
- **disposition:** quarantine o reject.
- IPs sospechosas que no reconoces.
- Muchos intentos fallidos.
