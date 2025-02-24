---
title: Consideraciones a la hora de escribir mails en HTML
image: https://images.unsplash.com/photo-1708961462805-9949475ea462
date: 11-11-2024
categories: [web,programacion,codigo,html,css,mail]
tags: [web,programacion,codigo,html,css,mail]
pin: false
comments: false
render_with_liquid: false
---

- **Usa CSS en línea**: No siempre se soportan los estilos.
- **Usa diseños con tablas**: Lo sé, pero los diseños con divs dependen de CSS y muchos clientes de correo no pueden manejarlos.
- **No uses rowspan**: Esto causa problemas extraños de espaciado.
- **No uses imágenes de fondo**: El soporte para estas es limitado.
- **Estiliza las etiquetas de imagen con "display:block"**: Esto soluciona problemas extraños de espaciado en Hotmail.
- **Si usas múltiples tablas, anídalas en una tabla principal**: Esto evita más problemas extraños de espaciado.
- **No uses Javascript**: Nuevamente, no se soporta muy bien.
- **Asegúrate de que tu correo sea legible sin imágenes**: El usuario puede no cargarlas.
- **Proporciona una versión online y enlázala**: Esto permite que los usuarios vean el contenido tal como se pretende, incluso si su cliente de correo es terrible.
- **Prueba, prueba, prueba**: Solo porque funcione en un cliente de correo no significa que funcione en otros. Un gran "problema" es Outlook 2007, que usa Word para renderizar el HTML 😤.

Esta lista está lejos de ser exhaustiva, pero debería encaminar a la mayoría de las personas por el buen camino.

![Desktop view](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjVsaHY4MWN2dW9tN3c0aHYwaDc0MDJlb2MzeXVnZnlhdGlrenlidCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT5LMDjUD70GVSqShq/giphy.gif)
