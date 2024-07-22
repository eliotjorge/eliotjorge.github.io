---
title: Validación personalizada en Contact Form 7 en functions.php
date: 22-07-2024
categories: [web,programacion,codigo,php,formulario,donaciones,olvidados,woocommerce,wordpress,cf7]
tags: [web,programacion,codigo,php,formulario,donaciones,olvidados,woocommerce,wordpress,cf7]
pin: false
comments: false
render_with_liquid: false
---

En Contact Form 7 no hay la posibilidad de validar los campos, sólo deja hacerlos obligatorios o no. Pero en el `functions.php` podemos hace unas condiciones que se activan
con la función de validación del propio CF7.

Por ejemplo pongamos que tenemos éste formulario, 
```
Correo electrónico:              [email* your-email]
Confirmar el correo electrónico: [email* your-email-confirm]
```

Que queremos verificar que el correo electrónico es correcto pidiéndole al usuario que lo intriduzca dos veces, pero tenemos que comprobarlo viendo que los dos campos contienen el mismo correo.

Para ello en el `functions.php` escribiremos el fragmento de código a continuación muestra un código que verifica si los dos campos tienen valores idénticos.

```php
add_filter( 'wpcf7_validate_email*', 'custom_email_confirmation_validation_filter', 20, 2 );
  
function custom_email_confirmation_validation_filter( $result, $tag ) {
  if ( 'your-email-confirm' == $tag->name ) {
    $your_email = isset( $_POST['your-email'] ) ? trim( $_POST['your-email'] ) : '';
    $your_email_confirm = isset( $_POST['your-email-confirm'] ) ? trim( $_POST['your-email-confirm'] ) : '';
  
    if ( $your_email != $your_email_confirm ) {
      $result->invalidate( $tag, "¿Estás seguro(a) que esta es la dirección correcta?" );
    }
  }
  
  return $result;
}
```

Se pasarán dos parámetros a la función de filtro: `$result` y `$tag`. `$result` es una instancia de la clase WPCF7_Validation que gestiona una secuencia de procesos de validación. `$tag` es una instancia de la clase WPCF7_FormTag.

Mira dentro de la función de filtro. Primero, se verifica el nombre de la etiqueta de formulario para asegurarse de que la validación se aplica solo al campo específico `(your-email-confirm)`.

Luego se comparan los dos valores de los campos de correo electrónico y, si no coinciden, se llamará `$result->invalidate()`. Debes pasar dos parámetros al método `invalidate()`: el primer parámetro debe ser la variable `$tag` y el segundo parámetro es el mensaje de error de validación que deseas que muestre el campo.

Por último, no olvides devolver `$result`.

[Link documentación CF7](https://contactform7.com/es/2015/03/28/custom-validation/)
