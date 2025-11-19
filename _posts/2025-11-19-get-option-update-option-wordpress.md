---
title: "Cómo usar get_option y update_option en WordPress: guía práctica y ejemplos"
description: "Aprende qué son get_option y update_option en WordPress, cómo funcionan, dónde se guardan en la base de datos y cómo usarlas correctamente con ejemplos prácticos."
date: 2025-11-19
img: "https://github.com/user-attachments/assets/f1b93b56-978c-4388-b5e5-32d80745f0cf"
categories: ["WordPress", "Desarrollo", "Backend"]
tags: ["WordPress", "get_option", "update_option", "Base de datos", "Desarrollo web"]
faq:
  - question: "¿Dónde se almacenan exactamente los valores guardados con update_option?"
    answer: "En la tabla wp_options (o el prefijo que uses), dentro de las columnas option_name y option_value."
  - question: "¿get_option puede devolver un valor por defecto?"
    answer: "Sí. Si la opción no existe, puedes pasar un segundo parámetro como valor por defecto."
  - question: "¿update_option crea la opción si no existe?"
    answer: "Sí. No solo actualiza: si la opción no existe, la crea automáticamente."
---

## ¿Qué son `get_option` y `update_option`?

En pocas palabras:

- **`get_option`** → sirve para **leer un valor** de la tabla de ajustes internos de WordPress.  
- **`update_option`** → sirve para **guardar o actualizar** dicho valor.

Son funciones esenciales cuando necesitas guardar configuraciones de un plugin, flags internos, contadores, preferencias ligeras, etc.

Lo mejor: **no tienes que preocuparte de SQL**, WordPress lo maneja todo 🔒.

---

## ¿Dónde se guardan realmente estas opciones?

Todas estas configuraciones se guardan **en la tabla `wp_options`**.  
Bueno… *wp_* si tienes el prefijo por defecto. Si no, será algo como `abc47_options`.

En esa tabla verás columnas como:

- `option_id`
- `option_name`
- `option_value`
- `autoload`

Cuando haces algo como:

```php
update_option('mi_ajuste', 'Hola mundo');
````

Lo que WordPress guarda es:

| option_name | option_value | autoload |
| ----------- | ------------ | -------- |
| mi_ajuste   | Hola mundo   | yes      |

Y cuando haces:

```php
get_option('mi_ajuste');
```

WordPress recupera ese valor directamente desde la base de datos (o desde caché si ya está cargado).

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/ZyrsWz2A11ruy1JXk2/giphy.gif" alt="Escoger de la base de datos" width="300" />
</div>

---

## Cómo usar `get_option`: ejemplos prácticos 🧪

### Ejemplo 1: obtener un valor simple

```php
$modo = get_option('modo_web');

echo $modo; // Ejemplo de salida: "mantenimiento"
```

Si la opción no existe, devuelve `false`.

### Ejemplo 2: obtener un valor con un valor por defecto

Esto es algo que uso a menudo:

```php
$color = get_option('color_destacado', '#FF0000');

// Si 'color_destacado' no existe, devolverá '#FF0000'
```

Muy útil cuando quieres asegurarte de que siempre hay un valor válido.

---

## Cómo usar `update_option`: ejemplos prácticos 🛠️

### Ejemplo 1: guardar o actualizar un valor

```php
update_option('modo_web', 'producción');
```

Si la opción ya estaba creada → la actualiza.
Si no existía → la crea.
(No hace falta hacer `add_option`, WordPress es listo 🧠✨)

### Ejemplo 2: guardar un array

Puedes guardar arrays sin problema:

```php
$ajustes = [
  'color' => 'azul',
  'tamaño' => 'grande',
  'mostrar_banner' => true
];

update_option('mi_configuracion', $ajustes);
```

Y al recuperarlo:

```php
$config = get_option('mi_configuracion');

echo $config['color']; // azul
```

WordPress se encarga de serializar y deserializar automáticamente.

---

## Ejemplo más completo: guardando la última fecha de actualización del plugin 📅

Este es un caso típico cuando desarrollas plugins:

```php
// Guardamos la fecha actual
update_option('plugin_ultima_revision', current_time('mysql'));
```

Y cuando queremos mostrarla:

```php
$fecha = get_option('plugin_ultima_revision', 'No hay registros');

echo "Última revisión: " . $fecha;
```

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/AgrfqPt5AyiTm/giphy.gif" alt="Actualizando opciones" width="300" />
</div>

---

## Cosas importantes a tener en cuenta 📌

### 🔸 Evita guardar datos grandes

`wp_options` no está pensada para almacenar logs, listas de usuarios, ni contenido extenso.

### 🔸 Controla el *autoload*

Por defecto, muchos valores se cargan en cada petición.
Si vas a almacenar algo grande o no necesario para todas las vistas, usa `add_option()` con autoload `no`.

### 🔸 Usa prefijos en tus opciones

Para evitar colisiones:

```
mi_plugin_nombre_opcion
```
