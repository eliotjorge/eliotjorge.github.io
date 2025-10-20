---
title: "React Router: Guía práctica para navegar entre páginas en React 🚀"
description: "Aprende a instalar, configurar y usar React Router para crear rutas dinámicas en tus proyectos con React. Incluye ejemplos prácticos, cómo pasar valores por URL y leerlos desde otra página."
date: 2025-10-20
categories: [React, JavaScript, Frontend]
tags: [react, react-router, routing, frontend, spa, javascript]
image: "https://github.com/user-attachments/assets/89410d20-0d16-42e1-92fd-5110eb67910b"
faq:
  - question: "¿Qué es React Router?"
    answer: "React Router es una librería que permite manejar la navegación y las rutas en aplicaciones React, sin recargar la página completa."
  - question: "¿Cómo se instala React Router?"
    answer: "Se instala fácilmente con el comando npm install react-router-dom, o yarn add react-router-dom si usas Yarn."
  - question: "¿Puedo pasar valores por URL con React Router?"
    answer: "Sí, puedes pasar parámetros en la URL (por ejemplo /usuario/123) y leerlos con el hook useParams."
  - question: "¿React Router funciona en Vite o Next.js?"
    answer: "Funciona perfectamente en proyectos creados con Vite o Create React App, pero en Next.js no se usa porque ya tiene su propio sistema de enrutamiento."
---

# React Router: cómo moverte entre páginas sin perderte 🧭

React Router es una de esas herramientas que **no sabes cuánto la necesitas hasta que la usas**. Si tu aplicación tiene más de una vista, ya es hora de añadirla.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/cjbfyJrICOaKIXBWyG/giphy.gif" alt="Chequeado y aprobado" width="300" />
</div>

## 🚀 Instalación

Instalar **React Router** es muy sencillo. Desde tu proyecto React, abre la terminal y ejecuta:

```bash
npm install react-router-dom
````

O, si usas Yarn:

```bash
yarn add react-router-dom
```

> 💡 Consejo: asegúrate de tener React 18 o superior, ya que React Router 6 se apoya en sus nuevas APIs.

---

## 🧩 Configuración básica

Imagina que tienes dos páginas: `Home` y `About`.
Tu estructura podría ser así:

```
src/
 ├── App.jsx
 ├── Home.jsx
 └── About.jsx
```

En tu archivo `App.jsx`, configura las rutas de esta forma:

```jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/about">Acerca de</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
```

🎯 Con esto, ya puedes navegar entre las páginas sin recargar la aplicación.

---

## 🔗 Pasar valores por URL (parámetros dinámicos)

Supongamos que quieres mostrar el perfil de un usuario según su ID.
Puedes definir una ruta dinámica así:

```jsx
<Route path="/usuario/:id" element={<Usuario />} />
```

Y acceder a ella desde un enlace:

```jsx
<Link to="/usuario/42">Ver perfil del usuario 42</Link>
```

En la página `Usuario.jsx`, puedes leer el valor con el hook `useParams`:

```jsx
import { useParams } from "react-router-dom";

function Usuario() {
  const { id } = useParams();

  return <h2>Mostrando perfil del usuario con ID: {id}</h2>;
}

export default Usuario;
```

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Routing dinámico en acción" width="300" />
</div>

---

## 🧠 Ejemplo práctico completo

```jsx
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Página de inicio 🏠</h2>
      <Link to="/usuario/7">Ir al usuario 7</Link>
    </div>
  );
}

function Usuario() {
  const { id } = useParams();
  return <h3>Perfil del usuario: {id}</h3>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuario/:id" element={<Usuario />} />
      </Routes>
    </BrowserRouter>
  );
}
```

✅ Simple, limpio y 100% funcional.

---

## ⚙️ Ventajas de usar React Router

* Navegación **sin recargar** la página (Single Page Application).
* Soporte para **rutas dinámicas** y **anidadas**.
* Control completo sobre la URL.
* Integración con **hooks** como `useNavigate`, `useParams` o `useLocation`.
* Facilita la gestión de layouts y componentes compartidos.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/QmHmjEwtbQtlkOx8T1/giphy.gif" alt="Smooth navigation" width="300" />
</div>

---

Si quieres saber más sobre React Router pásate por su página oficial [https://reactrouter.com/](https://reactrouter.com/){:target="_blank"}
