---
title: "Qué pasa cuando un dominio caduca: fases, riesgos y recuperación"
description: "¿Se puede recuperar un dominio después de caducado? Explico paso a paso qué ocurre tras la expiración de un dominio, las fases que atraviesa y cuándo aún puedes salvarlo."
date: 2025-05-30
categories: [dominios, web]
tags: [dominios, expiración, web, hosting, recuperación]
image: https://github.com/user-attachments/assets/15a07a95-e6e6-4911-8aed-6abe63f9569c
---

¡Ojo con dejar caducar un dominio sin querer! 😅 Puede parecer que tras expirar, el dominio simplemente desaparece, pero en realidad entra en una serie de **fases administrativas** que determinan si aún puedes recuperarlo o si lo perderás definitivamente.

Para no tener sorpresas (ni sustos) 💥, aquí te explico cada fase por la que pasa un dominio tras su expiración, cuánto dura cada etapa y qué margen tienes para reaccionar.

---

## 📅 1. Fecha de expiración (Expiration Date)

Cuando un dominio **caduca**, no desaparece inmediatamente. Sigue registrado, pero:

- **Se desactiva** el servicio asociado (web, email...).
- Sigue figurando a tu nombre por un breve tiempo.
- Comienza una cuenta atrás ⚠️.

Ejemplo: si tu dominio expiró el `30 de mayo`, no lo perderás ese mismo día, pero sí comenzarán las siguientes fases.

> 💡 **Truco**: Algunos registradores ofrecen renovación automática o envían recordatorios antes de esta fecha. Si usas GitHub Pages con un dominio propio, ¡no olvides revisar el estado de renovación!

---

## ⏳ 2. Grace Period (periodo de gracia)

**Duración aproximada:** de 0 a 45 días (varía según TLD y registrador).

Durante este periodo aún puedes renovar el dominio **sin penalizaciones adicionales**.

```bash
# Ejemplo: renovarlo desde la CLI con Namecheap
whois tudominio.com
# Verás que el status es "REDEMPTIONPERIOD" o similar
````

> 🟢 **Buena noticia**: Tu dominio aún es tuyo. Solo está dormido.

🎉

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" alt="Chequeado y aprobado" width="300" />
</div>

---

## 🆘 3. Redemption Period (periodo de redención)

**Duración:** 30 días aprox.

En esta fase ya **no puedes renovarlo de forma normal**. El dominio entra en "redención", lo que significa que aún puedes recuperarlo, pero:

* Solo el **registrante original** puede pedirlo.
* Hay un coste extra por recuperación (puede superar los 80 €).
* Es una especie de "modo rescate" 😬.

```text
Status: redemptionPeriod
Registrar: Tucows
Renewal fee: ~85 €
```

> 🧨 **Consejo**: No esperes llegar aquí. La renovación cuesta mucho más que el registro original.

---

## 🪦 4. Pending Delete (pendiente de borrado)

**Duración:** 5 días.

Aquí ya no hay vuelta atrás 🚫.

El dominio está en lista de espera para ser **eliminado del registro** y liberado al público.

En estos días no puedes renovarlo ni recuperarlo, pero puedes **vigilarlo** para intentar comprarlo justo cuando quede libre (lo que hacen muchos cazadores de dominios).

> ⚠️ **Riesgo**: Otros pueden usar herramientas de "backorder" para quedárselo en cuanto esté libre.

🔁

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif" alt="Chequeado y aprobado" width="300" />
</div>

---

## 🆓 5. Dominio disponible para registro

Finalmente, el dominio vuelve a estar libre.

🔓 Cualquiera puede registrarlo.

Esto suele ocurrir unos **75 días** después de la fecha de expiración original (aunque puede variar según el registrador y tipo de dominio: .com, .es, .org...).

Si llegas a este punto y no lo recuperaste, lo has perdido.

> 🕵️ **Pro tip**: Herramientas como [SnapNames](https://www.snapnames.com/) o [BackorderZone](https://www.backorderzone.com/) permiten reservar dominios en el momento exacto en que se liberan.

---

## 🧭 Resumen visual de fases

| Fase                  | Duración aprox. | ¿Puedes renovarlo? | Coste estimado |
| --------------------- | --------------- | ------------------ | -------------- |
| Expiración            | Día 0           | ❌ (servicio caído) | 0 €            |
| Grace Period          | 0–45 días       | ✅                  | Precio normal  |
| Redemption Period     | 30 días         | ✅                  | +80–100 €      |
| Pending Delete        | 5 días          | ❌                  | —              |
| Disponible al público | Desde el día 75 | —                  | Cualquiera     |

---

## 🛡️ Cómo evitar perder un dominio

* Activa la **renovación automática**.
* Añade recordatorios en tu calendario 📆.
* Usa un email fiable para tu cuenta del registrador.
* Revisa periódicamente que el dominio sigue registrado a tu nombre.

---

```bash
# Revisión básica de un dominio con WHOIS
whois tudominio.com | grep "Expiry Date"
```

---

Mantener controlado un dominio es parte de cuidar tu identidad digital. Perderlo puede no solo significar costes extra para recuperarlo, sino también la pérdida del acceso a tu sitio, emails o incluso SEO ganado con el tiempo.
