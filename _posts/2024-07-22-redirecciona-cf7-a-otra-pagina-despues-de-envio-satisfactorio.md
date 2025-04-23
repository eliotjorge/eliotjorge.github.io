---
title: Redirecciona a página de agradecimiento después de envió satisfactorio de CF7 con functions.php
date: 2024-07-22
categories: [web,programacion,codigo,php,formulario,donaciones,olvidados,woocommerce,wordpress,cf7]
tags: [web,programacion,codigo,php,formulario,donaciones,olvidados,woocommerce,wordpress,cf7]
pin: false
comments: false
render_with_liquid: false
---

Una vez se ha enviado satisfactoriamente el formulario de contacto, queremos enviarle a una página de agradecimiento. La función que usaremos nos permite enviar
al usuario a una página diferente en función del formulario que se haya enviado.

Usaremos el método `wpcf7mailsent` y en función del ID del formulario que se almacena en la variable `event.detail.contactFormId` asignamos `location` a la URL
de la página que queramos.

```php
add_action( 'wp_footer', 'redirect_cf7' );

function redirect_cf7() { ?>
    <script type="text/javascript">
    	    document.addEventListener('wpcf7mailsent', function(event) {
        if ('7c820b2' == event.detail.contactFormId) { //mensual
            setTimeout( () => {
            location = 'https://www.url.com/agradecimiento/';
        }, 1000 );
        } else if ('a244b94' == event.detail.contactFormId) { //trimestral
            setTimeout( () => {
            location = 'https://www.url.com/agradecimiento/';
        }, 1000 );
        } else if ('50e130a' == event.detail.contactFormId) { //anual
            setTimeout( () => {
            location = 'https://www.url.com/agradecimiento/';
        }, 1000 );
        }else{
            setTimeout( () => {
            location = 'https://www.olvidados.org/agradecimiento/';
        }, 1000 );
        }
    }, false);
    </script>
<?php }
```
