---
title: "test mermaid"
date: 23-04-2025
categories: [Desarrollo Web,Stacks de Tecnología,Frontend,Backend,JavaScript,React,Full Stack,Guías,Comparativas]
tags: [Desarrollo Web,Stacks de Tecnología,Frontend,Backend,JavaScript,React,Full Stack,Guías,Comparativas]
comments: false
render_with_liquid: false
mermaid: true
---


## 📊 Diagrama Flowchart

```mermaid
flowchart TD
  subgraph Frontend (React)
    R1[React Component<br/>Lista de Coches]
    R2[Formulario<br/>Nuevo Coche]
    R3[Axios / Fetch]
  end

  subgraph Backend (Express + Node.js)
    E1[Express Route<br/>GET /api/cars]
    E2[Express Route<br/>POST /api/cars]
    C[Controller logic]
    M[Modelo Mongoose<br/>Car]
  end

  subgraph MongoDB
    DB[(Base de Datos)]
  end

  R1 -->|getCars()| R3
  R2 -->|addCar()| R3
  R3 -->|HTTP Request| E1
  R3 -->|HTTP Request| E2
  E1 --> C
  E2 --> C
  C --> M
  M --> DB
  DB --> M
  M --> C
  C -->|JSON Response| R1
  C -->|JSON Response| R2
```
