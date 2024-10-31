---
title: Validación de DNI (NIF), CIF, NIE en Contact Form 7 en functions.php
date: 22-07-2024
categories: [web,programacion,codigo,php,formulario,donaciones,olvidados,woocommerce,wordpress,cf7]
tags: [web,programacion,codigo,php,formulario,donaciones,olvidados,woocommerce,wordpress,cf7]
pin: false
comments: false
render_with_liquid: false
---

En el formulario de la ONG hay que validar que el NIF y NIE fueran correctos, el código para hacerlo es el siguiente.

```php
function valida_nif_nie_cf7($result, $tag) {

    if ( 'DNI' === $tag->name && !validDniCifNie($_POST['DNI']) ) {
        
        $result->invalidate( $tag, __('Error en NIF/NIE') );
    }

    return $result;
}


add_filter('wpcf7_validate_text','valida_nif_nie_cf7', 5, 2);
add_filter('wpcf7_validate_text*', 'valida_nif_nie_cf7', 5, 2);
```

Usamos los métodos `wpcf7_validate_text` y `wpcf7_validate_text*` para llamar a la función `valida_nif_nie_cf7` que le pasamos `$result` y `$tag`.

Una vez dentro, en el `if` ponemos el campo que hemos puesto en el formulario de contacto, en este caso he pueso `[DNI]`, por lo que en la condición paso `DNI`,
en otro caso he puesto en el formulario otro campo `[cif]`, por lo que le tendría que pasar `cif`. Ésta función de `wpcf7_validate_text` cuando le pasmos el campo
es **case sensitive**.

Después le pasamos el valor que ha introducido el usuario mediante `$_POST['DNI']` a la función `validDniCifNie`, que podemos ver en el post [Función para validar DNI (NIF), CIF, NIE con PHP](https://jorgerosa.dev/posts/validar-nif-nie-cif-con-php/)

Para terminar a `$result` le asignamos el error que aparecerá debajo del campo.
