---
title: "test"
date: 23-04-2025
categories: [test]
---


## ✅ Checklist para app MERN (mantenimientos de coches)

### 📁 Estructura inicial
- [ ] Crear carpeta principal del proyecto (ej. `coches-app/`)
- [ ] Dentro, crear dos subcarpetas: `backend/` y `frontend/`

### 🚀 Backend (Node.js + Express + MongoDB)
- [ ] `npm init -y` en `/backend`
- [ ] Instalar dependencias: `npm install express mongoose cors dotenv`
- [ ] Crear archivo principal `server.js`
- [ ] Crear carpeta `models/` y archivo `Car.js` (modelo de ejemplo)
- [ ] Crear carpeta `routes/` y definir rutas CRUD básicas para coches
- [ ] Configurar conexión a MongoDB (local o Atlas) usando `dotenv`
- [ ] Probar la API con Postman o Insomnia

### 🌐 Frontend (React)
- [ ] Crear app React con `npx create-react-app frontend` (o con Vite)
- [ ] Instalar dependencias: `npm install axios react-router-dom`
- [ ] Crear estructura: `components/`, `pages/`, `services/`
- [ ] Crear componentes para mostrar lista de coches
- [ ] Conectar al backend usando Axios (GET, POST, etc.)
- [ ] Añadir formularios para añadir/editar coches
- [ ] Estilizar con Tailwind o CSS/Bootstrap

### 🧪 Test y mejoras
- [ ] Probar toda la app localmente (`localhost:3000` + `localhost:5000`)
- [ ] Añadir mantenimiento por coche (otra colección/modelo en MongoDB)
- [ ] Agregar validaciones (fechas, campos obligatorios)
- [ ] Considerar autenticación (opcional)

### 🚀 Deploy (más adelante)
- [ ] Subir frontend a Vercel o Netlify
- [ ] Subir backend a Render, Railway o un VPS
- [ ] Usar MongoDB Atlas en la nube si no lo usas ya

---
