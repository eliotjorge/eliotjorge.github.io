---
title: Guía sobre localStorage y sessionStorage en JavaScript
image: https://github.com/user-attachments/assets/48375fdf-328e-4a4c-b9c4-edbc96ac0007
date: 19-12-2024
categories: [ia,gpt,openai,inteligencia artificial,cahtgpt]
tags: [ia,gpt,openai,inteligencia artificial,cahtgpt]
pin: false
comments: false
render_with_liquid: false
---

## ¿Qué son `localStorage` y `sessionStorage`?

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

## Cómo Usarlos

### Uso de `localStorage`

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

### Uso de `sessionStorage`

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

## Ejemplo Práctico: Guardar Preferencias de Usuario

Supongamos que quieres guardar el tema oscuro como preferencia del usuario:

### Con `localStorage`

```javascript
// Guardar preferencia
localStorage.setItem('tema', 'oscuro');

// Leer preferencia
const tema = localStorage.getItem('tema');
document.body.classList.add(tema);
```

### Con `sessionStorage`

```javascript
// Guardar preferencia
sessionStorage.setItem('tema', 'oscuro');

// Leer preferencia
const tema = sessionStorage.getItem('tema');
document.body.classList.add(tema);
```

---

## Cuándo Usar Cada Uno

- Usa `localStorage` para datos que deben persistir más allá de la sesión del navegador, como configuraciones de usuario o tokens de autenticación.
- Usa `sessionStorage` para datos temporales que solo necesitan estar disponibles durante la sesión actual, como identificadores de sesión o datos específicos de una pestaña.
