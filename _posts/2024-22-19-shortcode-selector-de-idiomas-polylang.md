---
title: Crear shortcode de selector de idioma en Wordpress usando Polylang para la traducción
image: https://translatepress.com/wp-content/uploads/2021/03/polylang-woocommerce-alternative.png.webp
date: 19-11-2024
categories: [web,programacion,wordpress,shorcode,polylang,idiomas]
tags: [web,programacion,wordpress,shorcode,polylang,idiomas]
pin: false
comments: false
render_with_liquid: false
---

# Crear shortcode en Wordpress, para incluir selector de idiomas con Polylang

Si queremos añadir un selector de idiomas con en una web que estemos traduciendo con el plugin [Polylang](https://polylang.pro/)
es fácil hacerlo en el menú, pero si lo queremos añadir en la cabecera que contiene un bloque de texto, podemos emplear
un shortcode, pero el plugin no lo proporciona por defecto.

Para crearlo en el `functions.php` de nuestro tema hijo añadimos:

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

Si nos fijamos en el array de argumentos, se pueden configurar algunos parámetros como mostrar las banderas, los nombres,
ocultar el idioma actual... Tenemos un listado de todos los agumentos

```
/**
* @param array     $args {
*   Optional array of arguments.
*
*   @type int      $dropdown               The list is displayed as dropdown if set, defaults to 0.
*   @type int      $echo                   Echoes the list if set to 1, defaults to 1.
*   @type int      $hide_if_empty          Hides languages with no posts ( or pages ) if set to 1, defaults to 1.
*   @type int      $show_flags             Displays flags if set to 1, defaults to 0.
*   @type int      $show_names             Shows language names if set to 1, defaults to 1.
*   @type string   $display_names_as       Whether to display the language name or its slug, valid options are 'slug' and 'name', defaults to name.
*   @type int      $force_home             Will always link to home in translated language if set to 1, defaults to 0.
*   @type int      $hide_if_no_translation Hides the link if there is no translation if set to 1, defaults to 0.
*   @type int      $hide_current           Hides the current language if set to 1, defaults to 0.
*   @type int      $post_id                Returns links to the translations of the post defined by post_id if set, defaults not set.
*   @type int      $raw                    Return a raw array instead of html markup if set to 1, defaults to 0.
*   @type string   $item_spacing           Whether to preserve or discard whitespace between list items, valid options are 'preserve' and 'discard', defaults to 'preserve'.
*   @type int      $admin_render           Allows to force the current language code in an admin context if set, default to 0. Need to set the admin_current_lang argument below.
*   @type string   $admin_current_lang     The current language code in an admin context. Need to set the admin_render to 1, defaults not set.
*   @type string[] $classes                A list of CSS classes to set to each elements outputted.
*   @type string[] $link_classes           A list of CSS classes to set to each link outputted.
* }
*/
```

Por defecto el shortcode nos devolverá un `ul` por lo que tendrá bullets

![101773340-8f88e500-3ae4-11eb-875c-29a81384e04d](https://github.com/user-attachments/assets/7c6dc3cf-6a2b-4bd8-a9d1-99e61f6b0a35)

Para solucionarlo lo único que debemos hacer es añadir este CSS a nuestro tema.

```css
.polylang_langswitcher{
padding: 0 0 23px 0;
list-style: none;
}
```
