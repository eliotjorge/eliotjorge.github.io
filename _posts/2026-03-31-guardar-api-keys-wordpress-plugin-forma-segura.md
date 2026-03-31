---
title: "Cómo guardar API Keys en WordPress de forma segura (plugins y shortcodes)"
description: "Aprende cómo guardar y proteger API keys en WordPress al desarrollar plugins o shortcodes. Métodos seguros con wp-config.php, base de datos y buenas prácticas."
date: 2026-03-31
image: "https://github.com/user-attachments/assets/139196db-8ffd-4da0-85e0-1a8b4478bd76"
categories: [wordpress, desarrollo, seguridad]
tags: [wordpress plugin, api keys wordpress, wp-config, seguridad wordpress, desarrollo plugins]
faq:
- question: "¿Dónde guardar una API key en WordPress de forma segura?"
  answer: "La mejor opción es usar wp-config.php para definir constantes y evitar exponer la clave en el código del plugin. También se puede usar la base de datos con medidas adicionales."
- question: "¿Es seguro guardar una API key en la base de datos de WordPress?"
  answer: "Sí, es una práctica común, pero no es completamente segura si no se toman medidas adicionales como cifrado o control de acceso."
- question: "¿Puedo usar variables de entorno en WordPress como en Node?"
  answer: "Sí, pero depende del hosting. WordPress permite usar getenv(), aunque no todos los servidores lo soportan."
- question: "¿Qué hacen los temas premium como Divi con sus API keys?"
  answer: "Normalmente las almacenan en la base de datos usando la Options API de WordPress para facilitar su gestión desde el panel de administración."
---


Hay un momento bastante común cuando empiezas a desarrollar en WordPress: necesitas conectarte a una API externa.

Puede ser algo sencillo como mostrar el tiempo en un shortcode, o algo más serio como integrar un servicio de pago. Y ahí aparece la pregunta:

> ¿Dónde guardo la API key sin dejarla expuesta?

<div style="text-align: center;">
<img src="https://media.giphy.com/media/xYEYXCt93QZTP5adXQ/giphy.gif" alt="pensando donde guardar api key en wordpress" width="300" />
</div>

No es exactamente lo mismo que guardar contraseñas, pero tampoco es algo que quieras dejar visible en tu código.

---

## 🔑 Qué es realmente una API key (y por qué importa)

Una API key normalmente:

* Identifica tu aplicación
* Tiene límites de uso
* Puede estar asociada a facturación 💸

Ejemplo típico:

```php
$api_key = "sk_live_123456...";
```

Si eso acaba en un repositorio público o en el código del plugin… mal asunto.

---

## 🚫 Lo que no hago nunca

La tentación inicial suele ser esta:

```php
function obtener_clima() {
    $api_key = "mi_api_key_aqui";
    // llamada a la API...
}
```

Funciona, sí.
Pero:

* ❌ Si subes el plugin a Git → expuesta
* ❌ Si alguien accede al código → visible
* ❌ No es reutilizable

---

## 🥇 Opción 1: usar wp-config.php (la más limpia)

Es lo más parecido a variables de entorno en WordPress.

En `wp-config.php`:

```php
define('MI_API_KEY', 'tu_api_key_aqui');
```

En tu plugin o shortcode:

```php
$api_key = defined('MI_API_KEY') ? MI_API_KEY : '';
```

### Ventajas

* No está dentro del plugin
* No se sube al repositorio
* Es fácil de sobreescribir por entorno (local, staging, producción)

💡 Es exactamente el enfoque que usaría en un proyecto serio.

---

## 🧩 Ejemplo real: shortcode del tiempo

```php
function mi_shortcode_clima($atts) {
    $api_key = defined('MI_API_KEY') ? MI_API_KEY : '';

    $response = wp_remote_get("https://api.ejemplo.com/weather?key=$api_key&city=Madrid");

    if (is_wp_error($response)) {
        return 'Error al obtener datos';
    }

    $data = json_decode(wp_remote_retrieve_body($response), true);

    return 'Temperatura: ' . $data['temp'] . '°C';
}

add_shortcode('clima', 'mi_shortcode_clima');
```

---

## 🥈 Opción 2: guardar la API key en la base de datos

Esto es lo que hacen muchos temas premium como Divi.

Permiten introducir la API key desde el panel:

```php
update_option('mi_api_key', $api_key);
```

Y luego:

```php
$api_key = get_option('mi_api_key');
```

### Ventajas

* Fácil para el usuario
* Editable sin tocar código
* Ideal para plugins distribuidos

---

## ⚠️ Lo que hay que tener en cuenta

Las API keys en la base de datos:

* No están cifradas por defecto
* Se guardan en texto plano
* Pueden ser visibles si hay acceso a la BD
  
<div style="text-align: center;">
<img src="https://media.giphy.com/media/077i6AULCXc0FKTj9s/giphy.gif" alt="las claves no estan cifradas" width="300" />
</div>

---

## 🧠 Enfoque híbrido (el que más me gusta)

Combinar ambas opciones:

```php
$api_key = defined('MI_API_KEY') 
    ? MI_API_KEY 
    : get_option('mi_api_key');
```

### ¿Qué ganas con esto?

* Usuario básico → usa el panel
* Usuario avanzado → usa `wp-config.php`
* Código flexible → funciona en cualquier entorno

---

## 🧪 ¿Y variables de entorno tipo Node?

Si vienes de Node (por ejemplo usando Vercel), esto te sonará:

```env
API_KEY=123456
```

En WordPress también puedes hacer:

```php
$api_key = getenv('MI_API_KEY');
```

Pero:

* ⚠️ No todos los hostings lo permiten
* ⚠️ No es estándar en WordPress

---

## 🔍 Buenas prácticas que sí aplico siempre

* ✔️ Nunca subir API keys al repositorio
* ✔️ Usar `wp-config.php` en producción
* ✔️ Permitir configuración desde admin si el plugin es público
* ✔️ Validar que la key existe antes de usarla
* ✔️ Evitar exponerla en frontend (JS, HTML…)

<div style="text-align: center;">
<img src="https://media.giphy.com/media/11fot0YzpQMA0g/giphy.gif" alt="hay que pensar en la seguridad de nuestra web" width="300" />
</div>

---

## 🧱 Detalle importante: no es lo mismo que una contraseña

Una API key:

* Suele poder regenerarse
* Tiene permisos limitados
* Puede restringirse por dominio/IP

Aun así, mejor tratarla como si fuera sensible.

---

## 🧭 Situación típica

* Plugin personal → `wp-config.php`
* Plugin para clientes → base de datos + panel
* Plugin distribuido → híbrido
