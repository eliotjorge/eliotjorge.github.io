---
title: Crear shortcode de selector de idioma en Wordpress usando Polylang para la traducción
image: https://images.unsplash.com/photo-1617975609658-2de247badd36
date: 2024-11-19
categories: [web,programacion,wordpress,shorcode,polylang,idiomas]
tags: [web,programacion,wordpress,shorcode,polylang,idiomas]
pin: false
comments: false
render_with_liquid: false
---

Si queremos añadir un selector de idiomas en una web que estemos traduciendo con el plugin [Polylang](https://polylang.pro/)
es fácil hacerlo en el menú, pero si lo queremos añadir en la cabecera que contiene un bloque de texto, podemos emplear
un shortcode, pero el plugin no lo proporciona por defecto.

Para crearlo en el `functions.php` de nuestro tema hijo añadiremos:

```php
/* Shortcode selector de idiomas polylang*/

/**
 * Polylang Shortcode - https://wordpress.org/plugins/polylang/
 * Put shortcode [polylang_langswitcher] to post/page for display flags
 *
 * @return string
 */
function custom_polylang_langswitcher() {
	$output = '';
	if ( function_exists( 'pll_the_languages' ) ) {
		$args   = [
			'show_flags' => 0,
			'show_names' => 1,
			'echo' => 0,
			'hide_current' => 1,
		];
		$output = '<ul class="polylang_langswitcher">'.pll_the_languages( $args ). '</ul>';
	}

	return $output;
}

add_shortcode( 'polylang_langswitcher', 'custom_polylang_langswitcher' );
```

El shortcode que debemos incluir en nuestra página es:
```
[polylang_langswitcher]
```

Si nos fijamos en el array de argumentos, lo que en el código de arriba dice  `$args   = [...`  , se pueden configurar algunos parámetros como mostrar las banderas, los nombres,
ocultar el idioma actual... Tenemos un listado de todos los agumentos:

```
/**
* @param array     $args {
*   Optional array of arguments.
*
*   @type int      $dropdown               Muestra la lista como un menú desplegable si se establece, por defecto es 0.
*   @type int      $echo                   Muestra (imprime) la lista si se establece en 1, por defecto es 1.
*   @type int      $hide_if_empty          Oculta los idiomas que no tienen publicaciones (o páginas) si se establece en 1, por defecto es 1.
*   @type int      $show_flags             Muestra las banderas si se establece en 1, por defecto es 0.
*   @type int      $show_names             Muestra los nombres de los idiomas si se establece en 1, por defecto es 1.
*   @type string   $display_names_as       Indica si se debe mostrar el nombre del idioma o su slug; las opciones válidas son 'slug' y 'name'. Por defecto es name.
*   @type int      $force_home             Enlaza siempre a la página de inicio del idioma traducido si se establece en 1, por defecto es 0.
*   @type int      $hide_if_no_translation Oculta el enlace si no existe traducción, cuando se establece en 1. Por defecto es 0.
*   @type int      $hide_current           Oculta el idioma actual si se establece en 1, por defecto es 0.
*   @type int      $post_id                Devuelve los enlaces a las traducciones de la publicación definida por post_id, si se establece. Por defecto no se establece.
*   @type int      $raw                    Devuelve un array sin procesar en lugar del marcado HTML si se establece en 1, por defecto es 0.
*   @type string   $item_spacing           Indica si se debe conservar o eliminar el espacio en blanco entre los elementos de la lista; las opciones válidas son 'preserve' y 'discard'. Por defecto es 'preserve'.
*   @type int      $admin_render           Permite forzar el código de idioma actual en un contexto de administración si se establece. Por defecto es 0. Es necesario establecer también el argumento `admin_current_lang` indicado a continuación.
*   @type string   $admin_current_lang     El código del idioma actual en un contexto de administración. Es necesario establecer admin_render en 1. Por defecto no se establece.
*   @type string[] $classes                Lista de clases CSS que se aplicarán a cada elemento generado.
*   @type string[] $link_classes           Lista de clases CSS que se aplicarán a cada enlace generado.
* }
*/
```

Por defecto el shortcode nos devolverá un `ul` (unordered list) por lo que tendrá bullets, los puntitos delante de cada elemento de la lista.

![101773340-8f88e500-3ae4-11eb-875c-29a81384e04d](https://github.com/user-attachments/assets/7c6dc3cf-6a2b-4bd8-a9d1-99e61f6b0a35)

Para solucionarlo lo único que debemos hacer es añadir este CSS a nuestro tema:

```css
.polylang_langswitcher{
padding: 0 0 23px 0;
list-style: none;
}
```

Si queremos que salgan los nombres o las banderas en línea una al lado de la otra pondremos:

```css
.polylang_langswitcher{
display:inline;
padding-left:5px;
list-style:none;
}
```
