---
title: "Cómo pasar funciones como props en React (explicación clara, ejemplos y casos reales)"
description: "Aprende cómo pasar funciones como props en React, por qué es útil, cómo usarlas para manejar eventos entre componentes y cómo crear un botón de logout reutilizando funciones existentes."
date: 2025-12-10
image: "https://github.com/user-attachments/assets/90e76dc1-ecfc-4aba-b919-bc49d96d84d8"
categories: ["React", "JavaScript", "Desarrollo Web"]
tags: ["react", "props", "componentes", "funciones", "frontend", "logout", "event-handling"]
faq:
  - question: "¿Por qué es útil pasar funciones como props en React?"
    answer: "Porque permite que un componente hijo ejecute lógica definida en su componente padre, como manejar eventos, actualizar estado o ejecutar acciones globales de la aplicación."
  - question: "¿Puedo reutilizar la misma función en varios componentes?"
    answer: "Sí, es una de las principales ventajas: defines la función una sola vez y la pasas donde la necesites mediante props."
---

# Cómo pasar funciones como *props* en React (y añadir un botón de logout) 🚀

A veces, mientras avanzo en mi app y reorganizo componentes, necesito que un componente hijo pueda ejecutar algo que ya tengo implementado en el padre. Por ejemplo, un *logout*, una creación de usuario, un cambio de estado global… En estos casos, **React no permite que el hijo llame directamente al padre**, pero sí permite algo mejor: **pasar funciones como props**.

Cuando lo interioricé, fue como ese momento en el que de repente encajas una pieza del puzzle 🧩.

<div style="text-align: center;">
<img src="https://media.giphy.com/media/V2MJADdC027gk/giphy.gif" alt="React aha moment" width="300" />
</div>

## 🌱 ¿Qué significa pasar funciones como props?

En React, las props son simplemente *datos* que pasan de un componente a otro (diminutivo de `propertites` en inglés).
Esos datos pueden ser:

* números
* strings
* arrays
* objetos
* **funciones**

Cuando pasas esto:

```jsx
<Header onLogout={handleLogout} />
```

… significa literalmente:

👉 **Estoy pasando al componente `<Header>` una prop llamada `onLogout` cuyo valor es la función `handleLogout`.**

Es decir, el hijo recibirá:

```jsx
function Header({ onLogout }) {
  // ...
}
```

Y ahora `Header` puede ejecutar esa función, como si fuese suya, cuando lo necesite:

```jsx
<button onClick={onLogout}>Cerrar sesión</button>
```

💡 **La clave:**
El botón está en el Header,
la lógica del logout está en App,
pero el Header puede activarla gracias a que el padre le pasa la función.

---

## 🌍 ¿Por qué esto es útil?

Porque mantiene el **estado y la lógica donde deben estar** (normalmente arriba), y permite que los componentes hijos sean más reutilizables y más limpios.
React a esto lo llama **"lifting state up"**, pero también aplica a “lifting actions up”.

<div style="text-align: center;">
<img src="https://media.giphy.com/media/3o6ZsXNO4piW3ttn6k/giphy.gif" alt="Flow of props in React" width="300" />
</div>

---

# 🛠️ Ejemplo simplificado: pasar una función `onAddUser` a un componente hijo

## 1. Componente padre (App)

```jsx
function App() {
  const handleAddUser = () => {
    console.log("Añadiendo usuario...");
  };

  return (
    <Header onAddUser={handleAddUser} />
  );
}
```

## 2. Componente hijo (Header)

```jsx
function Header({ onAddUser }) {
  return (
    <header>
      <button onClick={onAddUser}>Añadir usuario</button>
    </header>
  );
}
```

🧠 **El hijo no sabe cómo se añade un usuario.**
Solo sabe que al pulsar el botón debe ejecutar lo que le pasaron como prop.

---

# 🔐 Añadir un botón de Logout al Header

Este fue mi caso real:
Tenía una función `handleLogout` ya implementada y no quería reescribirla en otro componente.

## 1. En el componente padre (`App`)

```jsx
function App() {
  const handleLogout = () => {
    // Lógica real de logout: limpiar usuario, cerrar sesión, redirigir, etc.
    console.log("Sesión cerrada");
  };

  return (
    <Header onLogout={handleLogout} />
  );
}
```

## 2. En el componente hijo (`Header`)

```jsx
function Header({ onLogout }) {
  return (
    <header>
      <button onClick={onLogout}>Cerrar sesión</button>
    </header>
  );
}
```

📌 **Así de simple**:

* `App` crea la función.
* `Header` recibe esa función como `onLogout`.
* El botón la ejecuta cuando se pulsa.

<div style="text-align: center;">
<img src="https://media.giphy.com/media/DKnMqdm9i980E/giphy.gif" alt="Logout button React" width="300" />
</div>

---

# 🤔 ¿Y qué pasa si un día tengo que cambiar la lógica del logout?

Nada.
**La cambias solo en App**, y todos los componentes que la usan automáticamente ejecutarán la nueva lógica.

Esa es una de las razones por las que React escala tan bien en aplicaciones grandes.

---

# 📚 FAQs (para SEO + para mí mismo)

Estas FAQs ya están incluidas en el front matter, pero las dejo aquí para lectura:

---

### **¿Por qué es útil pasar funciones como props en React?**

Porque permite que un componente hijo ejecute lógica definida en el padre, sin duplicar código ni mover estado innecesariamente.

### **¿Puedo reutilizar la misma función en varios componentes?**

Sí, es una de las grandes ventajas de React: defines la función una vez y la pasas a todos los componentes que la necesiten.
