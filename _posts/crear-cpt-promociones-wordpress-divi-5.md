---
title: "Crear un CPT en WordPress y mostrar promociones con Divi 5"
date: 2026-11-26
description: "Cómo crear un Custom Post Type en WordPress desde PHP, añadir campos personalizados sin plugins y diseñar fichas de promociones con Divi 5 Loop Builder."
categories: [wordpress,divi-5,desarrollo-web]
tags: [custom-post-type,cpt,wordpress,divi-5,loop-builder,campos-personalizados,php,metabox]
faq:
  - question: "¿Qué es un Custom Post Type en WordPress?"
    answer: "Un Custom Post Type (CPT) es un tipo de contenido personalizado que permite organizar información independiente de las entradas y páginas habituales de WordPress. Por ejemplo, promociones inmobiliarias, proyectos, inmuebles o servicios."
  - question: "¿Cómo crear un Custom Post Type en WordPress sin plugins?"
    answer: "Puedes crear un Custom Post Type utilizando la función register_post_type() de WordPress y ejecutándola mediante el hook init. El código puede incorporarse en el archivo functions.php de un tema hijo."
  - question: "¿Se pueden añadir campos personalizados a un CPT sin utilizar ACF?"
    answer: "Sí. WordPress dispone de funciones nativas como add_meta_box(), get_post_meta() y update_post_meta() que permiten crear formularios de campos personalizados, recuperar sus valores y guardarlos sin instalar plugins adicionales."
  - question: "¿Qué campos personalizados necesita una promoción inmobiliaria?"
    answer: "Depende del proyecto, pero una ficha de promoción inmobiliaria puede incluir dirección, número de viviendas, descripción corta y estado comercial, además de una imagen destacada."
  - question: "¿Qué es Divi 5 Loop Builder?"
    answer: "Divi 5 Loop Builder es una funcionalidad que permite diseñar visualmente un elemento y repetirlo automáticamente para mostrar diferentes contenidos, incluidos los registros de un Custom Post Type."
  - question: "¿Se pueden mostrar promociones de un CPT con Divi 5?"
    answer: "Sí. Mediante Loop Builder puedes crear una tarjeta visual con módulos de Divi y utilizar contenido dinámico para mostrar la información de cada promoción."
  - question: "¿Es mejor utilizar un shortcode o Divi 5 Loop Builder?"
    answer: "Si necesitas un diseño que puedas construir con los módulos de Divi, Loop Builder permite maquetar las fichas visualmente y repetirlas automáticamente. Los shortcodes siguen siendo una alternativa cuando necesitas consultas o estructuras personalizadas mediante PHP."
---


Hay proyectos en los que las entradas y páginas habituales de WordPress se quedan cortas. Cuando necesitas gestionar un tipo de contenido específico, con sus propios datos y una estructura independiente, los **Custom Post Types (CPT)** son una solución muy interesante.

En uno de mis últimos desarrollos me he encontrado precisamente con esta situación: una web inmobiliaria en la que necesitaba gestionar distintas promociones de viviendas y mostrar sus fichas en la página principal.

La idea era sencilla: tener una página individual para cada promoción, con toda su información, y utilizar algunos de sus datos para construir unas tarjetas visuales que se repitiesen automáticamente en la portada.

Y ya que estaba trabajando con Divi 5, quería aprovechar sus posibilidades sin tener que recurrir necesariamente a los shortcodes que había utilizado en otros proyectos con Divi 4.


## 1. ¿Qué es un Custom Post Type en WordPress?

WordPress incorpora de serie varios tipos de contenido:

- Entradas: para artículos del blog.
- Páginas: para contenidos estáticos.
- Adjuntos: para imágenes, documentos y otros archivos.

Pero imagina que estás desarrollando una web inmobiliaria y necesitas gestionar promociones de viviendas.

Podrías crear una página para cada promoción, pero acabarías mezclando contenidos de distinta naturaleza.

Aquí es donde entran los **Custom Post Types o CPT**.

Un CPT permite crear un nuevo tipo de contenido independiente, con su propio apartado en el administrador de WordPress.

Algunos ejemplos habituales:

| CPT | Contenido |
|---|---|
| Promociones | Promociones inmobiliarias |
| Proyectos | Trabajos realizados por una empresa |
| Inmuebles | Viviendas disponibles para la venta |
| Servicios | Servicios de una empresa |
| Eventos | Eventos y actividades |

La ventaja es que cada tipo de contenido puede tener sus propios campos, taxonomías, plantillas y consultas.

## 2. Crear el CPT Promociones mediante código PHP

Para este proyecto necesitaba un apartado llamado **Promociones**, donde poder crear, editar y eliminar los distintos desarrollos inmobiliarios.

En lugar de instalar un plugin para registrar el CPT, he optado por utilizar directamente la función `register_post_type()` que proporciona WordPress.

Puedes incorporar el código en el `functions.php`.

Este es el código:

```php
/**
 * CPT: Promociones
 */

// Registrar Custom Post Type
function registrar_cpt_promociones() {

    $labels = array(
        'name'                  => 'Promociones',
        'singular_name'         => 'Promoción',
        'menu_name'             => 'Promociones',
        'name_admin_bar'        => 'Promoción',
        'add_new'               => 'Añadir nueva',
        'add_new_item'          => 'Añadir nueva promoción',
        'new_item'              => 'Nueva promoción',
        'edit_item'             => 'Editar promoción',
        'view_item'             => 'Ver promoción',
        'all_items'             => 'Todas las promociones',
        'search_items'          => 'Buscar promociones',
        'not_found'             => 'No se han encontrado promociones',
        'not_found_in_trash'    => 'No hay promociones en la papelera',
        'parent_item_colon'     => 'Promoción superior:',
        'archives'              => 'Archivo de promociones',
        'attributes'            => 'Atributos de la promoción',
        'insert_into_item'      => 'Insertar en la promoción',
        'uploaded_to_this_item' => 'Subido a esta promoción',
        'filter_items_list'     => 'Filtrar promociones',
        'items_list_navigation' => 'Navegación de promociones',
        'items_list'            => 'Listado de promociones',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'query_var'          => true,
        'rewrite'            => array(
            'slug' => 'promociones'
        ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-building',
        'supports'           => array(
            'title',
            'editor',
            'thumbnail'
        ),
    );

    register_post_type('promociones', $args);
}
add_action('init', 'registrar_cpt_promociones');
```

Hay algunos parámetros que merece la pena conocer:

- `public`: hace que el contenido sea público.
- `show_in_rest`: habilita su exposición en la REST API de WordPress.
- `has_archive`: habilita el archivo general de promociones.
- `rewrite`: establece el prefijo de las URL.
- `supports`: determina las funcionalidades disponibles en el editor. En este caso, título e imagen destacada.

Una vez añadido el código, aparecerá un nuevo apartado en el menú lateral de WordPress llamado **Promociones**.

Desde ahí podremos añadir nuevas promociones, editar las existentes o enviarlas a la papelera.

## 3. Añadir campos personalizados sin utilizar ACF

Ahora necesitamos que cada promoción almacene información específica.

En este caso, los datos que quiero gestionar son:

- Dirección.
- Número de viviendas.
- Descripción corta.
- Estado de la promoción.

Para ello podemos utilizar los metadatos de WordPress (*Post Meta*).

WordPress permite almacenar información adicional asociada a cada entrada, página o CPT mediante funciones como `update_post_meta()` y `get_post_meta()`.

La ventaja es que no necesitamos instalar Advanced Custom Fields (ACF) para gestionar unos campos relativamente sencillos.

### Crear el formulario de campos personalizados

Primero vamos a añadir un metabox al editor de promociones.

Un metabox es un bloque que aparece dentro del administrador de WordPress y permite introducir información adicional.

```php
/**
 * Campos personalizados de las promociones
 */

// Añadir metabox
function promociones_metabox() {

    add_meta_box(
        'datos_promocion',
        'Datos de la promoción',
        'promociones_metabox_html',
        'promociones',
        'normal',
        'high'
    );

}
add_action('add_meta_boxes', 'promociones_metabox');


// Contenido del metabox
function promociones_metabox_html($post) {

    wp_nonce_field(
        'guardar_datos_promocion',
        'promociones_nonce'
    );

    $direccion = get_post_meta($post->ID, '_promo_direccion', true);
    $viviendas = get_post_meta($post->ID, '_promo_viviendas', true);
    $descripcion = get_post_meta($post->ID, '_promo_descripcion', true);
    $estado = get_post_meta($post->ID, '_promo_estado', true);

    ?>

    <p>
        <label for="promo_direccion">
            <strong>Dirección</strong>
        </label><br>
        <input
            type="text"
            id="promo_direccion"
            name="promo_direccion"
            value="<?php echo esc_attr($direccion); ?>"
            style="width:100%;"
        >
    </p>

    <p>
        <label for="promo_viviendas">
            <strong>Número de viviendas</strong>
        </label><br>
        <input
            type="number"
            id="promo_viviendas"
            name="promo_viviendas"
            value="<?php echo esc_attr($viviendas); ?>"
            min="0"
            style="width:150px;"
        >
    </p>

    <p>
        <label for="promo_descripcion">
            <strong>Descripción corta</strong>
        </label><br>
        <textarea
            id="promo_descripcion"
            name="promo_descripcion"
            rows="4"
            style="width:100%;"
        ><?php echo esc_textarea($descripcion); ?></textarea>
    </p>

    <p>
        <label for="promo_estado">
            <strong>Estado de la promoción (Ribbon)</strong>
        </label><br>
                <select
            id="promo_estado"
            name="promo_estado"
            style="width:100%;"
        >
            <option value="">Seleccionar estado</option>

            <option value="en comercialización"
                <?php selected($estado, 'en comercialización'); ?>>
                En comercialización
            </option>

            <option value="próximamente"
                <?php selected($estado, 'próximamente'); ?>>
                Próximamente
            </option>

            <option value="finalizada"
                <?php selected($estado, 'finalizada'); ?>>
                Finalizada
            </option>

        </select>
    </p>

    <?php
}
```

He utilizado un selector para el estado en lugar de un campo de texto libre. De esta forma evitamos que alguien introduzca accidentalmente valores diferentes como «Finalizada», «Finalizado» o «Finalizadas».

### Guardar los datos introducidos

Crear los campos no es suficiente. También tenemos que guardar sus valores cuando actualizamos una promoción.

Para ello utilizaremos el hook `save_post_promociones`.

```php
// Guardar los campos personalizados
function guardar_datos_promocion($post_id) {

    // Comprobar nonce
    if (
        !isset($_POST['promociones_nonce']) ||
        !wp_verify_nonce(
            sanitize_text_field(wp_unslash($_POST['promociones_nonce'])),
            'guardar_datos_promocion'
        )
    ) {
        return;
    }

    // Evitar guardados automáticos
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Comprobar permisos
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Dirección
    if (isset($_POST['promo_direccion'])) {
        update_post_meta(
            $post_id,
            '_promo_direccion',
            sanitize_text_field(wp_unslash($_POST['promo_direccion']))
        );
    }

    // Número de viviendas
    if (isset($_POST['promo_viviendas'])) {
        update_post_meta(
            $post_id,
            '_promo_viviendas',
            absint($_POST['promo_viviendas'])
        );
    }

    // Descripción
    if (isset($_POST['promo_descripcion'])) {
        update_post_meta(
            $post_id,
            '_promo_descripcion',
            sanitize_textarea_field(wp_unslash($_POST['promo_descripcion']))
        );
    }

    // Estado
    if (isset($_POST['promo_estado'])) {

        $estado = sanitize_text_field(wp_unslash($_POST['promo_estado']));

        $estados_validos = array(
            'en comercialización',
            'próximamente',
            'finalizada'
        );

        if (in_array($estado, $estados_validos, true)) {
            update_post_meta(
                $post_id,
                '_promo_estado',
                $estado
            );
        }
    }

}
add_action('save_post_promociones', 'guardar_datos_promocion');
```

He incluido algunas comprobaciones de seguridad importantes:

- Verificación del nonce para validar la petición.
- Comprobación de permisos del usuario.
- Exclusión de los guardados automáticos.
- Saneamiento de los datos antes de almacenarlos.
- Validación de los estados permitidos.

### ¿Cómo quedan almacenados los campos?

Cada promoción tendrá sus propios metadatos, asociados a su identificador de WordPress.

Estas son las claves utilizadas:

| Campo | Meta key |
|---|---|
| Dirección | `_promo_direccion` |
| Viviendas | `_promo_viviendas` |
| Descripción | `_promo_descripcion` |
| Estado | `_promo_estado` |

Por ejemplo, si tenemos una promoción llamada Residencial Los Olivos, sus datos quedarán asociados a su correspondiente ID.

Esto permite recuperar posteriormente cada valor mediante `get_post_meta()`.

## 4. Diseñar las fichas de promociones con Divi 5 Loop Builder

Aquí llega la parte que más me interesaba resolver.

Hasta ahora, cuando necesitaba mostrar un listado de contenidos personalizados en una página, solía recurrir a un shortcode.

El funcionamiento era bastante sencillo:

1. Crear un shortcode en PHP.
2. Realizar una consulta `WP_Query` para recuperar los registros del CPT.
3. Recorrer los resultados con un bucle.
4. Generar el HTML de cada ficha.
5. Aplicar el diseño mediante CSS.
6. Insertar el shortcode en la página correspondiente.

Era una solución perfectamente válida, pero tenía una limitación: el diseño de las fichas quedaba definido en el código y cualquier modificación visual requería volver a tocar HTML o CSS.

Con Divi 5 tenemos otra posibilidad: **Loop Builder**.

<div style="text-align: center;">
    <img src="https://media.giphy.com/media/l0Iy5Hw2UPdMahub6/giphy.gif" alt="Animación de un proceso de programación en bucle" width="300" />
</div>

Loop Builder permite seleccionar un elemento de Divi y convertirlo en una plantilla repetible.

Es decir, podemos construir una tarjeta utilizando los módulos habituales de Divi y configurar una consulta para que se repita automáticamente con los registros de nuestro CPT.

### ¿Cómo sería la estructura de la ficha?

En mi caso, la tarjeta de cada promoción tendría esta estructura:

- Imagen destacada de la promoción.
- Ribbon con el estado.
- Dirección.
- Número de viviendas.
- Descripción corta.
- Botón para acceder a la promoción.

La idea es diseñar una única tarjeta y dejar que Divi se encargue de repetirla.

### Conectar los campos dinámicos

Una vez creada la estructura visual, necesitamos conectar cada módulo con los datos almacenados en WordPress.

La correspondencia sería la siguiente:

| Elemento de la ficha | Dato de WordPress |
|---|---|
| Imagen | Imagen destacada |
| Dirección | `_promo_direccion` |
| Viviendas | `_promo_viviendas` |
| Descripción | `_promo_descripcion` |
| Ribbon | `_promo_estado` |
| Botón | Enlace a la promoción actual |

Para ello utilizaremos las opciones de contenido dinámico de Divi y los datos del elemento que se está mostrando en el bucle.

### Personalizar el ribbon según el estado

El estado de la promoción tiene una particularidad: además de cambiar el texto, me interesa que pueda cambiar su apariencia.

Por ejemplo:

- En comercialización: fondo verde claro.
- Próximamente: fondo amarillo claro.
- Finalizada: fondo gris.

Podemos utilizar clases CSS asociadas al valor del campo para conseguirlo.

Un ejemplo de los estilos que utilizaría:

```css
.ribbon-comercializacion {
    background-color: #F0FFB8;
    color: #285B53;
}

.ribbon-proximamente {
    background-color: #FFF1B8;
    color: #685B2B;
}

.ribbon-finalizada {
    background-color: #E2E2E2;
    color: #555555;
}
```

De esta forma mantenemos el diseño de las tarjetas centralizado y evitamos tener que generar manualmente cada una.

## 5. ¿Shortcode o Loop Builder? ¿Qué opción elegir?

No creo que los shortcodes hayan dejado de tener utilidad. De hecho, siguen siendo una herramienta muy interesante cuando necesitamos generar estructuras específicas o realizar consultas complejas.

Sin embargo, cuando trabajamos con Divi 5, merece la pena valorar primero Loop Builder.

Las diferencias principales serían:

| Característica | Shortcode PHP | Divi 5 Loop Builder |
|---|---|---|
| Diseño visual desde Divi | No directamente | Sí |
| Generación automática de fichas | Sí, mediante código | Sí |
| Consulta de un CPT | Sí | Sí |
| Campos dinámicos | Mediante PHP | Mediante contenido dinámico |
| Personalización visual | HTML y CSS | Constructor visual |
| Consultas complejas | Gran flexibilidad | Según las opciones disponibles |

Mi elección para este proyecto sería Loop Builder, porque la estructura de las fichas es bastante sencilla y no necesito una lógica especialmente compleja para mostrar los datos.

Además, si en el futuro quiero cambiar el aspecto de las tarjetas, podré hacerlo directamente desde el constructor visual.

## 6. Organización de las promociones en WordPress

Una vez configurado todo, el flujo de trabajo queda bastante ordenado.

Cada vez que haya una nueva promoción:

1. Accedo a WordPress → Promociones → Añadir nueva.
2. Introduzco el nombre de la promoción.
3. Subo la imagen destacada.
4. Completo la dirección.
5. Indico el número de viviendas.
6. Escribo una descripción breve.
7. Selecciono el estado correspondiente.
8. Publico la promoción.

La página principal recuperará automáticamente los contenidos publicados que cumplan los criterios de la consulta del Loop Builder.

Y cuando alguien pulse el botón de una tarjeta, accederá a la página individual de esa promoción, donde podremos mostrar información mucho más detallada utilizando una plantilla de Divi Theme Builder.

<div style="text-align: center;">
    <img src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" alt="Persona trabajando en programación frente a un ordenador" width="300" />
</div>

## 7. Algunas consideraciones antes de ponerlo en producción

Hay varios detalles que conviene tener presentes:

- **Tema hijo o plugin propio:** registrar un CPT en `functions.php` es válido, pero si cambias de tema desaparecerá su registro. Para proyectos que van a mantenerse durante años, conviene valorar un plugin propio.
- **Campos personalizados:** si necesitas muchos campos, relaciones entre contenidos o estructuras más complejas, ACF puede ahorrar bastante trabajo.
- **Imagen destacada:** utilizarla para la fotografía principal de cada promoción evita crear un campo adicional.
- **Plantillas individuales:** puedes utilizar Divi Theme Builder para diseñar una plantilla que se aplique a todas las promociones.
- **Enlaces permanentes:** después de registrar un CPT por primera vez, conviene entrar en Ajustes → Enlaces permanentes y guardar los cambios para actualizar las reglas de URL.

También es importante no confundir la plantilla individual con la ficha del listado. Son dos diseños distintos, aunque ambos utilizan la información almacenada en el mismo registro.

## Documentación de referencia

- [WordPress Developer Resources: register_post_type()](https://developer.wordpress.org/reference/functions/register_post_type/)
- [WordPress Developer Resources: add_meta_box()](https://developer.wordpress.org/reference/functions/add_meta_box/)
- [WordPress Developer Resources: update_post_meta()](https://developer.wordpress.org/reference/functions/update_post_meta/)
- [WordPress Developer Resources: get_post_meta()](https://developer.wordpress.org/reference/functions/get_post_meta/)
