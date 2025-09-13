---
title: "Roles de usuario en WordPress: guía completa con ejemplos y comparativa"
description: "Descubre qué son los roles de usuario en WordPress, cuáles existen, qué permisos tienen y cómo usarlos correctamente. Incluye ejemplos, tabla comparativa y FAQs."
date: 2025-09-13
categories: [WordPress, Tutoriales]
tags: [roles de usuario, wordpress, permisos, seguridad, administración]
faq:
- question: "¿Qué son los roles de usuario en WordPress?"
  answer: "Son perfiles predefinidos que determinan qué acciones puede realizar cada usuario en un sitio WordPress, como publicar, editar, moderar comentarios o administrar el sitio."

- question: "¿Cuáles son los roles predeterminados de WordPress?"
  answer: "WordPress incluye seis roles: Super Admin, Administrador, Editor, Autor, Colaborador y Suscriptor."

- question: "¿Puedo crear o personalizar roles de usuario en WordPress?"
  answer: "Sí. Puedes usar código con la función `add_role()` o instalar plugins como User Role Editor para personalizar permisos."

- question: "¿Qué rol es recomendable asignar a los escritores invitados?"
  answer: "El rol de Autor suele ser suficiente, ya que pueden publicar y gestionar sus propios posts sin acceso a los de otros."
---

# Roles de usuario en WordPress 📌

En WordPress, cada usuario tiene un rol que define **qué puede y qué no puede hacer** dentro del sitio. Esto es esencial para mantener la seguridad, la organización y la productividad en proyectos con varios colaboradores.

<div style="text-align: center;">
<img src="https://media.giphy.com/media/mEVWOs5Kto9RErUBCi/giphy.gif" alt="Chequeado y aprobado" width="300" />
</div>

A lo largo de este post veremos:

✅ Qué roles existen en WordPress
✅ Qué permisos tiene cada uno
✅ Ejemplos prácticos
✅ Una tabla comparativa optimizada para móviles
✅ FAQs para resolver dudas rápidas

---

## Los roles de usuario en WordPress

WordPress viene con seis roles predeterminados:

1. **Super Admin** 👑 → Disponible solo en instalaciones *multisite*. Control absoluto de la red de sitios.
2. **Administrador** ⚙️ → Control total de un único sitio: usuarios, plugins, temas, contenido, etc.
3. **Editor** ✍️ → Puede publicar, editar y eliminar **cualquier entrada o página**, aunque no sea suya.
4. **Autor** 📝 → Puede publicar y gestionar **solo sus propias entradas**.
5. **Colaborador** 🤝 → Puede **escribir y editar borradores**, pero no publicarlos.
6. **Suscriptor** 👤 → Solo puede **leer contenido privado y editar su perfil**.

---

## Ejemplo práctico 📖

Imagina que tienes un blog con varios niveles de participación:

* Tú como **Administrador** controlas todo.
* Un redactor de confianza es **Editor**, porque revisa y publica lo de otros.
* Un escritor invitado es **Autor**, publica solo lo suyo.
* Otro colaborador es **Colaborador**, escribe borradores que tú revisas.
* Tus lectores registrados son **Suscriptores**, con acceso limitado.

De esta manera, se mantiene el orden sin dar permisos innecesarios.

---

## Tabla comparativa de roles en WordPress 📊

He preparado una tabla sencilla y adaptada a móviles (no demasiado ancha), que muestra de un vistazo lo que puede hacer cada rol:

| Rol              | Publicar contenido | Editar contenido propio | Editar contenido ajeno | Administrar sitio    |
| ---------------- | ------------------ | ----------------------- | ---------------------- | -------------------- |
| Super Admin 👑   | ✅                  | ✅                       | ✅                      | ✅ (todos los sitios) |
| Administrador ⚙️ | ✅                  | ✅                       | ✅                      | ✅ (sitio único)      |
| Editor ✍️        | ✅                  | ✅                       | ✅                      | ❌                    |
| Autor 📝         | ✅                  | ✅                       | ❌                      | ❌                    |
| Colaborador 🤝   | ❌                  | ✅ (borradores)          | ❌                      | ❌                    |
| Suscriptor 👤    | ❌                  | ❌                       | ❌                      | ❌                    |

---

## Cómo personalizar roles en WordPress 🔧

Si necesitas ajustar los permisos, puedes hacerlo de dos formas:

### 1. Con código

```php
// Crear un rol personalizado
add_role(
  'revisor',
  'Revisor de Contenido',
  [
    'read' => true,
    'edit_posts' => true,
    'publish_posts' => false,
    'delete_posts' => false,
  ]
);
```

### 2. Con plugins

Existen plugins como **User Role Editor** o **Members** que permiten modificar roles desde el panel de administración.
