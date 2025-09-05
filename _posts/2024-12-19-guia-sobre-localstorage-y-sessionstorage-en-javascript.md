---
title: Guía sobre localStorage y sessionStorage en JavaScript
image: https://github.com/user-attachments/assets/48375fdf-328e-4a4c-b9c4-edbc96ac0007
date: 2024-12-19
description: "Aprende qué son localStorage y sessionStorage en JavaScript, sus diferencias principales, ejemplos prácticos de uso y cuándo elegir cada uno para almacenar datos en el navegador."
categories: [localStorage, sessionStorage, webstorage]
tags: [localStorage, sessionStorage, webstorage]
pin: false
comments: false
render_with_liquid: false
---

## ✨ ¿Qué son `localStorage` y `sessionStorage`?

En JavaScript, tanto `localStorage` como `sessionStorage` son interfaces para almacenar datos clave-valor en el navegador. Ambas ofrecen una forma sencilla de guardar información, pero tienen diferencias clave en su funcionamiento.

---

## 🔎 Diferencias Principales: Tabla Comparativa (Vertical)

### Persistencia
- **`localStorage`:** Los datos persisten incluso después de cerrar el navegador o reiniciar el dispositivo.
- **`sessionStorage`:** Los datos se eliminan cuando se cierra la pestaña o ventana del navegador.

### Capacidad
- **`localStorage`:** Generalmente hasta 5MB por dominio.
- **`sessionStorage`:** Generalmente hasta 5MB por dominio.

### Acceso entre pestañas
- **`localStorage`:** Compartido entre todas las pestañas del mismo dominio.
- **`sessionStorage`:** Único para cada pestaña o ventana.

### API
- **Ambos:** Igual para ambos (`setItem`, `getItem`, etc.).

---

## 🔄 Cómo Usarlos

### 🔒 Uso de `localStorage`

```javascript
// Guardar un valor
localStorage.setItem('nombre', 'Juan');

// Recuperar un valor
const nombre = localStorage.getItem('nombre');
console.log(nombre); // Output: "Juan"

// Eliminar un valor
localStorage.removeItem('nombre');

// Limpiar todo el almacenamiento
localStorage.clear();
```

### 🔒 Uso de `sessionStorage`

```javascript
// Guardar un valor
sessionStorage.setItem('sessionId', 'abc123');

// Recuperar un valor
const sessionId = sessionStorage.getItem('sessionId');
console.log(sessionId); // Output: "abc123"

// Eliminar un valor
sessionStorage.removeItem('sessionId');

// Limpiar todo el almacenamiento
sessionStorage.clear();
```

---

## 🔨 Ejemplo Práctico: Guardar Preferencias de Usuario

Supongamos que quieres guardar el tema oscuro como preferencia del usuario:

### 🔒 Con `localStorage`

```javascript
// Guardar preferencia
localStorage.setItem('tema', 'oscuro');

// Leer preferencia
const tema = localStorage.getItem('tema');
document.body.classList.add(tema);
```

### 🔒 Con `sessionStorage`

```javascript
// Guardar preferencia
sessionStorage.setItem('tema', 'oscuro');

// Leer preferencia
const tema = sessionStorage.getItem('tema');
document.body.classList.add(tema);
```

---

## 🔧 Cuándo Usar Cada Uno

- Usa `localStorage` para datos que deben persistir más allá de la sesión del navegador, como configuraciones de usuario o tokens de autenticación.
- Usa `sessionStorage` para datos temporales que solo necesitan estar disponibles durante la sesión actual, como identificadores de sesión o datos específicos de una pestaña.

---

## ❓ FAQ sobre `localStorage` y `sessionStorage`

### ¿Qué es `localStorage` en JavaScript?
`localStorage` guarda pares clave-valor de forma persistente en el navegador. Los datos permanecen incluso después de cerrar la pestaña o el navegador, hasta que se eliminen manualmente.

### ¿Qué es `sessionStorage` en JavaScript?
`sessionStorage` también guarda pares clave-valor, pero únicamente durante la sesión actual. Sus datos se eliminan automáticamente al cerrar la pestaña o la ventana del navegador.

### ¿Cuál es la diferencia entre `localStorage` y `sessionStorage`?
La diferencia principal es la **persistencia**:  
- `localStorage` mantiene los datos indefinidamente (hasta que se borren).  
- `sessionStorage` elimina los datos al cerrar la pestaña o ventana.  
Ambos usan la misma API (`setItem`, `getItem`, `removeItem`, `clear`).

### ¿Se comparten los datos entre pestañas?
- `localStorage`: Sí, se comparte entre todas las pestañas del mismo dominio.  
- `sessionStorage`: No, es único por cada pestaña o ventana.

### ¿Cuál es la capacidad típica de almacenamiento?
Tanto `localStorage` como `sessionStorage` suelen permitir hasta **5 MB por dominio**, aunque puede variar según el navegador.


<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es localStorage en JavaScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "localStorage guarda pares clave-valor de forma persistente en el navegador, permaneciendo después de cerrar la pestaña o el navegador hasta que se eliminen."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es sessionStorage en JavaScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "sessionStorage guarda pares clave-valor solo durante la sesión actual; sus datos se eliminan al cerrar la pestaña o ventana del navegador."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre localStorage y sessionStorage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Principalmente la persistencia: localStorage mantiene los datos indefinidamente (hasta borrarlos), mientras que sessionStorage los elimina al cerrar la pestaña. La API (setItem, getItem, removeItem, clear) es la misma."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se comparten los datos entre pestañas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "localStorage se comparte entre pestañas del mismo dominio; sessionStorage es único por pestaña o ventana."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la capacidad típica de almacenamiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Típicamente alrededor de 5 MB por origen tanto para localStorage como para sessionStorage, aunque puede variar por navegador."
      }
    }
  ]
}
</script>
