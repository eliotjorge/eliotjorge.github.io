---
title: "Peligros de `/?author=1` y `wp-json/wp/v2/users` en WordPress — qué son, cómo se usan para hackear y cómo mitigarlos"
date: 2025-09-18
categories: ["Seguridad WordPress","Hardening","SEO"]
tags: ["WordPress","seguridad","author-enumeration","REST-API","hardening","SEO"]
description: "Cómo `/?author=1` y el endpoint `wp-json/wp/v2/users` facilitan la enumeración de usuarios en WordPress, por qué eso es peligroso para la seguridad y SEO, y medidas prácticas (código y configuraciones) para bloquearlos sin romper tu web."
faq:
  - question: "¿Qué es la enumeración de autores (`/?author=1`) y por qué importa?"
    answer: "Es una técnica que descubre nombres de usuario en WordPress usando URLs como `/?author=1` que redirigen a la URL de archivo del autor. Con el nombre de usuario un atacante puede intentar fuerza bruta, phishing o ataques dirigidos."
  - question: "¿El endpoint `wp-json/wp/v2/users` siempre devuelve información de usuarios?"
    answer: "Por defecto en instalaciones públicas, este endpoint puede devolver nombres y datos básicos de usuarios. Sin autenticación correcta puede exponer información útil para un atacante."
  - question: "¿Voy a romper funcionalidades del theme o plugins si bloqueo estos accesos?"
    answer: "Depende: bloquear la API REST o las páginas de autor puede afectar plugins que dependen de esas rutas. Prueba en staging y restringe sólo lo necesario (p. ej. eliminar solo el endpoint de usuarios)."
  - question: "¿Cuáles son las soluciones más seguras y simples?"
    answer: "1) Eliminar/ocultar endpoint de usuarios en REST; 2) Bloquear `author=` en queries; 3) Deshabilitar páginas de autor o redirigirlas; 4) Usar control de acceso para wp-json cuando sea necesario."
---

## Resumen breve (para quienes van al grano) ✅

* `/?author=1` es una forma sencilla de *enumerar* usuarios en WordPress (genera redirección a `/author/nombre/`).
* `wp-json/wp/v2/users` es el endpoint REST que puede listar usuarios si no se limita.
* Con un nombre de usuario un atacante reduce enormemente la superficie: puede hacer *credential stuffing*, fuerza bruta, phishing o recolección de información para ataques dirigidos.
* Aquí tienes **medidas prácticas**, con snippets y ejemplos, para mitigarlo sin cargarte cosas útiles de tu web. 😌

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/e06Wc1bfzPQXnXyhLW/giphy.gif" alt="Chequeado y aprobado" width="300" />
</div>

---

## ¿Cómo lo usan los atacantes? — flujo típico

1. El atacante prueba `https://tudominio.es/?author=1`, `/?author=2`, ... y observa la redirección a `/author/nombre/`. Así descubre `nombre` (user\_nicename).
2. Con ese `nombre` busca correo, perfiles sociales o lanza intentos de login (brute force / credential stuffing).
3. Además consulta `https://tudominio.es/wp-json/wp/v2/users` para obtener más campos (name, URL, description) que facilitan el spear-phishing o ataques más dirigidos.

Ejemplo (comando curl para ver el comportamiento de `/?author=1`):

```bash
# Detectar redirección que revela el slug del autor
curl -I "https://tudominio.es/?author=1"
# Si hay 301/302 y Location: /author/juan, ya tienes un usuario: "juan"
```

Y para el endpoint REST:

```bash
curl -s "https://tudominio.es/wp-json/wp/v2/users" | jq .
# Si devuelve lista de usuarios, hay exposición
```

---

## Mitigaciones recomendadas (ordenadas por impacto y facilidad)

### 1) Bloquear consultas `?author=` (regla simple)

Funciona rápido y no toca PHP. Añádelo en `.htaccess` (Apache):

```apache
# Bloquear author enumeration por query string
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{QUERY_STRING} (^|&)author=\d+ [NC]
  RewriteRule .* - [F,L]
</IfModule>
```

Para nginx (en el server block):

```nginx
if ($args ~* "author=\d+") {
    return 403;
}
```

> Resultado: peticiones tipo `/?author=1` devuelven 403 y el scanner no obtiene la redirección.

---

### 2) Eliminar el endpoint de usuarios de la REST API (WordPress PHP)

Esto evita que `wp-json/wp/v2/users` exista públicamente. Coloca en `functions.php` del tema hijo o en un plugin personalizado:

```php
add_filter( 'rest_endpoints', function( $endpoints ) {
    if ( isset( $endpoints['/wp/v2/users'] ) ) {
        unset( $endpoints['/wp/v2/users'] );
    }
    if ( isset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] ) ) {
        unset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
    }
    return $endpoints;
});
```

Esto es **no destructivo**: otras rutas REST siguen funcionando, sólo se quita el listado de usuarios.

---

### 3) Restringir acceso al REST API (si lo necesitas)

Si tu site no usa REST API públicamente, puedes bloquear accesos anónimos:

```php
add_filter( 'rest_authentication_errors', function( $result ) {
    if ( ! empty( $result ) ) {
        return $result;
    }
    // Permitir REST a usuarios logueados
    if ( ! is_user_logged_in() ) {
        return new WP_Error( 'rest_cannot_access', 'REST API restringida.', array( 'status' => 401 ) );
    }
    return $result;
});
```

**CUIDADO**: esto rompe integraciones externas que necesiten la API (apps móviles, headless, algunos plugins). Probar en staging.

---

### 4) Desactivar o redirigir páginas de autor

Si no necesitas archivos de autor en tu blog, redirígelos a la home o a 410. En `functions.php`:

```php
add_action('template_redirect', function() {
  if ( is_author() ) {
    wp_redirect( home_url(), 301 );
    exit;
  }
});
```

O mostrar 410:

```php
add_action('template_redirect', function() {
  if ( is_author() ) {
    status_header(410);
    exit;
  }
});
```

---

### 5) Cambios complementarios — buenas prácticas

* Cambia `user_nicename` si tu slug contiene el login real (editar en la DB o desde wp-admin a través de perfil).
* Usa contraseñas fuertes y 2FA para todas las cuentas con privilegios.
* Habilita límite de intentos de login (plugin tipo Limit Login Attempts, o Web Application Firewall).
* Mantén WP, plugins y temas actualizados.
* Reduce información pública en perfiles (no publiques emails o datos sensibles en el bio).
* Considera WAF (Cloudflare, Sucuri) para bloquear escaneos automatizados.

---

## Ejemplos prácticos y pruebas (pasos para verificar en tu instalación)

1. **Prueba de enumeración**

   * `curl -I "https://tudominio.es/?author=1"` → ¿redirige a `/author/xxx`? → si sí, hay problema.
2. **Prueba del REST users**

   * `curl -s "https://tudominio.es/wp-json/wp/v2/users" | jq .` → si devuelve objetos, hay exposición.
3. **Aplicar mitigación**

   * Subir la regla `.htaccess` o el fragmento PHP en staging y repetir pruebas. Resultado esperado: 403 para `?author=`, y 404/401/\[] vacío para `/wp/v2/users`.

---

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/xT9KVqOt8xuRYhNpq8/giphy.gif" alt="Seguridad activa" width="300" />
</div>

---

## Por qué esto importa para SEO y reputación

* Un atacante que adivine cuentas de administrador puede publicar contenido spam, que daña el SEO y la reputación del dominio.
* Los bots que exploran `/author/` y `/wp-json/` consumen recursos del servidor si no se mitigan, afectando la velocidad y experiencia (factor SEO).
* Evitar exponer usuarios reduce la superficie de ataque y contribuye a mantener resultados de búsqueda limpios y páginas indexadas relevantes.

---

## Código de ejemplo completo — checklist rápido

<input type="checkbox"> Añadir `.htaccess` para bloquear `author=` (si usas Apache).<br/>
<input type="checkbox"> Quitar endpoints `/wp/v2/users` con `rest_endpoints` filter.<br/>
<input type="checkbox"> Probar que no hay efectos secundarios en plugins críticos (hacer staging).<br/>
<input type="checkbox"> Harden: 2FA + contraseñas + limit login attempts + backups.<br/>
