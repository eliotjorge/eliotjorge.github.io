---
title: "Divi 5: cambios técnicos, nueva arquitectura y transición desde Divi 4"
description: "Resumen objetivo de los cambios de Divi 5: re-escritura del motor, eliminación de shortcodes, compatibilidad con Gutenberg, nueva API para módulos y ajustes internos del constructor."
date: 2025-12-11
image: "https://github.com/user-attachments/assets/478380b8-c2a8-40b3-9cdd-c3d6988882cc"
categories: [WordPress, Divi, Desarrollo Web]
tags: [Divi5, WordPress, Constructor, Gutenberg, API, Shortcodes]
faq:
- question: "¿Divi 5 elimina los shortcodes?"
  answer: "Sí. Divi 5 reemplaza el sistema basado en shortcodes por un nuevo motor interno que no requiere shortcodes para almacenar o representar el contenido."
- question: "¿Divi 5 es compatible con Gutenberg?"
  answer: "Sí. Divi 5 está diseñado para convivir con el editor de bloques y para integrarse mejor con el ecosistema de WordPress."
- question: "¿Cambian los módulos existentes en Divi 5?"
  answer: "El objetivo de Divi 5 es mantener los módulos actuales, pero re-escritos para funcionar con el nuevo motor."
- question: "¿Qué supone la nueva API?"
  answer: "Permite crear módulos y extensiones utilizando un sistema más moderno, simplificado y documentado, evitando limitaciones presentes en Divi 4."
- question: "¿Divi 5 rompe compatibilidad con Divi 4?"
  answer: "No. Divi 5 está diseñado para mantener compatibilidad funcional con los módulos y layouts existentes, aunque internamente el motor sea distinto."
- question: "¿Qué impacto tiene Divi 5 en el desarrollo de módulos personalizados?"
  answer: "Divi 5 introduce una nueva API más moderna y estructurada que simplifica el desarrollo de módulos y elimina dependencias antiguas."
- question: "¿Divi 5 usa Gutenberg como base?"
  answer: "No directamente, pero está diseñado para convivir y alinearse con el editor de bloques y el ecosistema moderno de WordPress."
- question: "¿Está disponible Divi 5?"
  answer: "Divi 5 está disponible actualmente en versión pública de prueba (Public Beta) a través de Elegant Themes, pensada para entornos de desarrollo y pruebas."
- question: "¿Qué novedades hay en Divi 5?"
  answer: "Divi 5 introduce una re-escritura completa del motor interno, elimina los shortcodes, añade una nueva API para módulos, mejora la compatibilidad con Gutenberg y simplifica la arquitectura del constructor."
- question: "¿Cuándo estará disponible Divi 5?"
  answer: "Elegant Themes no ha comunicado una fecha exacta para el lanzamiento final de Divi 5, indicando que llegará cuando el nuevo motor alcance estabilidad completa."
---

Llevo usando Divi de manera intermitente en distintos proyectos, así que cuando Elegant Themes anunció que estaban trabajando en **Divi 5**, me interesaba saber sobre todo **qué cambia a nivel interno** y qué supondrá para quienes trabajamos con WordPress a nivel técnico, no tanto desde el punto de vista comercial o de marketing.

La información oficial está aquí:
➡️ [https://www.elegantthemes.com/divi-5/](https://www.elegantthemes.com/divi-5/)

Este post es simplemente un **resumen objetivo** de lo que explican en esa página, pero adaptado a mi propio estilo y con algunas notas para entender mejor cómo funcionará en la práctica.

---

## Una re-escritura completa del motor de Divi

Según Elegant Themes, Divi 5 no es una actualización incremental, sino **una re-escritura total del motor interno del constructor**.
El objetivo principal es eliminar dependencias antiguas y unificar el funcionamiento del editor visual y la representación del contenido.

<div style="text-align: center;">  
<img src="https://media.giphy.com/media/m77wEsvF99FyU/giphy.gif" alt="Refactorización" width="300" />  
</div>

En la práctica, esto significa:

* El backend del builder cambia por completo.
* El sistema que renderiza módulos en el frontend también se renueva.
* Se busca mantener el mismo comportamiento visible, pero simplificando cómo funciona internamente.

Para los usuarios, el aspecto del constructor será prácticamente el mismo. La idea es que el cambio sea **profundo, pero invisible**.

---

## Eliminación total de los shortcodes

Uno de los puntos más relevantes (sobre todo si pensamos a largo plazo) es que **Divi 5 deja de usar shortcodes para almacenar el contenido**.
En Divi 4, toda la estructura del layout se convierte en shortcodes en la base de datos. En Divi 5, este mecanismo desaparece.

Esto implica:

* El contenido será más limpio.
* No habrá “shortcode mess” si se desactiva Divi.
* El builder podrá trabajar de forma más parecida a editores modernos como Gutenberg.

<div style="text-align: center;">  
<img src="https://media.giphy.com/media/hh05KqdAkVTos/giphy.gif" alt="Código limpio" width="300" />  
</div>

---

## Compatibilidad con Gutenberg

Elegant Themes explica que Divi 5 busca integrarse mejor con la dirección que WordPress está tomando desde hace años: bloques, plantillas y el editor en tiempo real.

No se trata de sustituir Gutenberg, sino de permitir:

* Usar ambos enfoques en el mismo sitio.
* Que Divi entienda mejor las decisiones del núcleo de WordPress.
* Que el contenido no dependa de un ecosistema aislado.

No se especifica que vayan a convertir módulos en bloques nativos, pero sí se indica que Divi 5 está pensado para alinearse con la evolución del editor.

---

## Una nueva API para módulos y extensiones

Otro punto muy mencionado en la documentación es que Divi 5 incluye una **API totalmente nueva** para que desarrolladores puedan crear:

* módulos personalizados,
* mejoras visuales,
* integraciones,
* y extensiones del builder.

Esta API busca resolver varias limitaciones de Divi 4:

* Dependencias internas difíciles de reutilizar.
* Falta de un sistema coherente de documentación.
* Dificultades para crear módulos complejos sin hacks.

La nueva API, al estar basada en una arquitectura moderna, debería permitir módulos más ligeros y mejor integrados con el nuevo motor.

---

## Cómo funcionarán los módulos existentes

Aunque el motor cambie, Elegant Themes indica que **los módulos de Divi seguirán funcionando** en Divi 5, pero re-escritos internamente.
Esto incluye:

* Módulos estándar
* Módulos del Theme Builder
* Plantillas
* Ajustes globales

La idea no es añadir funciones nuevas al principio, sino replicar todas las funciones existentes bajo el nuevo sistema.

---

## Enfoque en rendimiento y simplificación interna

El equipo explica que uno de los motivos principales de re-escribir Divi era que ciertas partes del código original estaban diseñadas para un WordPress muy distinto al actual.

Divi 5 busca:

* reducir cargas innecesarias,
* simplificar procesos duplicados,
* mejorar la velocidad en el Visual Builder,
* evitar dependencias históricas,
* y facilitar la extensión a futuro.

No prometen un X% de rendimiento, ni cifras específicas. Simplemente indican que el nuevo sistema permitirá que Divi funcione de forma más eficiente y consistente.

<div style="text-align: center;">  
<img src="https://media.giphy.com/media/ARb77MvJVd7Uc/giphy.gif" alt="Optimización" width="300" />  
</div>

---

## Interfaz del constructor

Aunque Divi 5 es un cambio interno, la interfaz se mantiene prácticamente igual a la que ya conocemos.
No se presenta un “nuevo Divi visual”, sino un Divi técnicamente renovado.

Los usuarios que ya trabajan con Divi no deberían notar una curva de aprendizaje adicional. La intención es conservar:

* el diseño de paneles,
* los controles,
* las secciones,
* y los flujos típicos de trabajo.
