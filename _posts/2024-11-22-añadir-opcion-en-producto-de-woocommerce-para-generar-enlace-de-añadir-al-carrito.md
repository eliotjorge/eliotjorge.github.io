---
title: Añadir opción en producto de Woocommerce para generar automáticamente un enlace de añadir al carrito
date: 2024-11-22
image: https://images.unsplash.com/photo-1528399783831-8318d62d10e5
categories: [web,programacion,woocommerce,wordpress]
tags: [web,programacion,woocommerce,wordpress]
pin: false
comments: false
render_with_liquid: true
---

## Agregar una opción "Crear URL" en el listado de productos de WooCommerce

Para agregar una nueva opción en la lista de acciones de cada producto en WooCommerce, que te permita generar automáticamente una URL con el enlace para agregar el producto al carrito, puedes hacerlo mediante un pequeño código que debes añadir al archivo `functions.php` de tu tema o a un plugin personalizado.

Aquí te dejo una solución que agrega una opción llamada "Crear URL" al lado de las otras acciones del producto en el listado de productos de WooCommerce en el panel de administración:

### Paso 1: Agregar una nueva acción al listado de productos

Este código añadirá una nueva opción de "Crear URL" junto a las opciones como "Editar", "Ver", etc. Para ello, usamos el hook `post_row_actions` de WordPress para modificar las acciones disponibles para cada producto en el listado.

### Paso 2: Generar la URL de compra rápida

Cuando el administrador hace clic en esta nueva opción, se generará una URL del tipo `https://tusitio.com/?add-to-cart=ID_DEL_PRODUCTO`, donde `ID_DEL_PRODUCTO` es el ID del producto que el administrador haya seleccionado.

### Código:

```php
// Añadir una opción "Crear URL" en la lista de acciones de cada producto
function agregar_accion_crear_url($acciones, $post) {
    // Comprobar si estamos tratando con un producto
    if ($post->post_type === 'product') {
        // Obtener el ID del producto
        $product_id = $post->ID;
        
        // Crear la URL para agregar al carrito
        $url = wc_get_cart_url()."/?add-to-cart=$product_id";

        // Añadir la nueva acción "Crear URL"
        $acciones['crear_url'] = '<a href="#" class="crear-url" data-url="' . esc_url($url) . '" title="Copiar URL al portapapeles">Crear URL</a>';
    }

    return $acciones;
}
add_filter('post_row_actions', 'agregar_accion_crear_url', 10, 2);

// Añadir el script JS para copiar al portapapeles
function agregar_script_copiar_url() {
    ?>
    <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {
            // Detectar el clic en los enlaces de "Crear URL"
            const enlacesCrearUrl = document.querySelectorAll('.crear-url');

            enlacesCrearUrl.forEach(enlace => {
                enlace.addEventListener('click', function(event) {
                    event.preventDefault(); // Evitar la acción predeterminada del enlace
                    
                    // Obtener la URL del atributo 'data-url'
                    const url = this.getAttribute('data-url');

                    // Crear un elemento temporal de texto para copiar la URL al portapapeles
                    const input = document.createElement('input');
                    input.value = url;
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand('copy');
                    document.body.removeChild(input);

                    // Mostrar un mensaje al usuario (opcional)
                    alert('¡URL copiada al portapapeles!');
                });
            });
        });
    </script>
    <?php
}
add_action('admin_footer', 'agregar_script_copiar_url');

```

### Explicación del código:

1. `add_filter('post_row_actions', ...)`: Usamos este filtro para modificar las acciones que se muestran para cada producto en el listado de productos en el admin de WordPress.
2. `$acciones['crear_url']`: Aquí creamos una nueva acción llamada "Crear URL", que generará el enlace para añadir el producto al carrito.
3. `wc_get_cart_url()."/?add-to-cart=$product_id"`: Este código genera la URL que el administrador podrá usar para enviar a sus clientes. Reemplaza `wc_get_cart_url()` con la URL base de tu carrito (esto obtiene la URL correcta).
4. `target="_blank"`: Asegura que el enlace se abra en una nueva pestaña cuando el administrador haga clic en él.

### JavaScript para copiar al portapapeles:

Añadimos un script que escucha el clic sobre los enlaces con la clase `.crear-url`.
Cuando se hace clic en un enlace, el script obtiene la URL desde el atributo `data-url`, la coloca en un campo de entrada temporal, y luego ejecuta el comando `document.execCommand('copy')` para copiar la URL al portapapeles.
Después de copiar la URL, el campo temporal se elimina del DOM y se muestra un mensaje de alerta al usuario para confirmarle que la URL ha sido copiada.

### Paso 3: Añadir el código a tu tema o plugin
Para implementar este código:

Si tienes conocimientos en desarrollo web, abre el archivo functions.php de tu tema hijo (o el archivo de un plugin personalizado) y añade el código al final.
Si no tienes acceso al archivo functions.php o prefieres una opción más fácil, puedes usar un plugin como Code Snippets para agregar este código sin modificar directamente los archivos de tu tema.

### Resultado esperado:
Ahora, en el listado de productos de WooCommerce en el administrador, aparecerá una nueva opción "Crear URL" al lado de las demás acciones. Al hacer clic en esa opción, se abrirá una nueva pestaña con la URL que puedes compartir con tus clientes, permitiéndoles añadir el producto directamente al carrito y proceder a la compra.
