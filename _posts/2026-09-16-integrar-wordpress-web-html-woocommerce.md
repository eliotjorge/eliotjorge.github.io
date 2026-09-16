---
title: "Cómo integrar una web HTML con WooCommerce sin rehacerla en WordPress"
date: 2026-09-16
image: https://github.com/user-attachments/assets/a17c02a8-ea1d-4b5e-8ef2-e073ffb8260c
description: "Aprende a integrar una web HTML, CSS y JavaScript ya terminada con WooCommerce para añadir una tienda online completa sin rehacer el diseño ni programar desde cero productos, carrito, pagos y pedidos."
categories: [wordpress,woocommerce,desarrollo-web]
tags: [wordpress,woocommerce,html,css,javascript,tienda-online,ecommerce,desarrollo-web]
faq:

- question: "¿Se puede integrar una web HTML ya terminada con WooCommerce?"
  answer: "Sí. Una web desarrollada con HTML, CSS y JavaScript puede convertirse en un tema personalizado de WordPress y utilizar WooCommerce para añadir una tienda online. La web principal puede conservar su diseño y estructura original, mientras WooCommerce gestiona productos, carrito, checkout, pagos y pedidos."
- question: "¿Es necesario rehacer una web HTML con Elementor o Divi para utilizar WooCommerce?"
  answer: "No. WooCommerce puede funcionar dentro de un tema WordPress personalizado sin utilizar Elementor, Divi ni otro constructor visual. El diseño de la web principal puede seguir estando basado en HTML, CSS y JavaScript."
- question: "¿Puedo mantener la web corporativa en HTML y utilizar WooCommerce solamente para la tienda?"
  answer: "Sí. Es posible mantener las páginas corporativas con plantillas personalizadas y utilizar WooCommerce para las páginas y funcionalidades de la tienda. La integración exacta depende de cómo se estructuren las plantillas, las URLs y la navegación."
- question: "¿Qué funcionalidades de una tienda online proporciona WooCommerce?"
  answer: "WooCommerce proporciona la base para gestionar productos, categorías, precios, inventario, carrito, checkout, pedidos y otras funciones de comercio electrónico. Las funciones de pagos, envíos, impuestos y otras necesidades pueden requerir configuración, extensiones o plugins adicionales."
- question: "¿Tengo que programar desde cero un carrito y un sistema de pedidos si utilizo WooCommerce?"
  answer: "No es necesario desarrollar desde cero las funcionalidades principales de una tienda si utilizas WooCommerce. El plugin proporciona una base de comercio electrónico que puedes configurar y ampliar. Aun así, una tienda real necesita configurar correctamente pagos, envíos, impuestos, seguridad, privacidad y otros requisitos."
- question: "¿Puedo crear un tema WordPress personalizado a partir de una web HTML para utilizar WooCommerce?"
  answer: "Sí. Puedes adaptar el HTML, CSS y JavaScript de una web existente a un tema WordPress personalizado y añadir las plantillas y estilos necesarios para WooCommerce. De esta forma, el diseño original y la tienda online pueden convivir dentro del mismo proyecto."

---

Hay proyectos en los que desarrollar una web desde cero con HTML, CSS y JavaScript tiene todo el sentido del mundo.

Tenemos un diseño terminado, responsive, funcional y con todos los componentes que necesita el cliente. El HTML está bajo nuestro control, el CSS hace lo que tiene que hacer y JavaScript se encarga de las interacciones.

Hasta aquí, perfecto.

Pero ¿qué ocurre cuando esa web necesita una tienda online?

Aquí es donde la cosa cambia.

Una web informativa puede tener unas cuantas páginas, un formulario y algunas imágenes. Una tienda online, en cambio, necesita bastantes más piezas:

* Catálogo de productos.
* Categorías.
* Precios.
* Stock.
* Carrito.
* Checkout.
* Pagos.
* Pedidos.
* Correos automáticos.
* Gestión de clientes.
* Envíos.
* Impuestos.
* Seguridad.

Y claro, desarrollar todo eso desde cero no es lo mismo que hacer una web corporativa.

Así que me surgió una idea bastante interesante:

**¿Por qué no mantener la web principal completamente hecha en HTML y utilizar WooCommerce para la tienda online?**

No rehacer toda la web en WordPress. No reconstruir el diseño con Elementor. No desarrollar un carrito desde cero.

Simplemente, aprovechar el trabajo que ya tenemos y añadir la parte de comercio electrónico utilizando una herramienta que ya existe.

<div style="text-align: center;">
<img src="https://media.giphy.com/media/3o7TKWineS040erhjq/giphy.gif" alt="Programador pensando en una solución para un proyecto web" width="300" />
</div>

## El punto de partida: una web HTML terminada

Imaginemos que tenemos una web ya desarrollada.

No estamos empezando un proyecto nuevo.

Tenemos:

```text
web/
├── index.html
├── nosotros.html
├── servicios.html
├── contacto.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── img/
    ├── logo.svg
    ├── hero.webp
    └── ...
```

La web ya es responsive, el diseño está aprobado y el cliente está contento con ella.

Además, el contenido no necesita ser editable desde un panel de administración. Si dentro de unos meses hay que cambiar un texto, podemos editar directamente el HTML.

En ese escenario, no veo necesario reconstruir toda la web utilizando WordPress.

Pero ahora el cliente quiere añadir una tienda online.

Y aquí empieza el problema.

## ¿Qué implica desarrollar una tienda online desde cero?

Si decidimos programar la tienda nosotros mismos, necesitamos construir o integrar bastantes funcionalidades.

Por ejemplo, un catálogo:

```html
<section class="productos">

    <article class="producto">

        <img src="img/producto-1.webp" alt="Producto 1">

        <h3>Producto 1</h3>

        <p>Descripción del producto.</p>

        <strong>29,99 €</strong>

        <button>
            Añadir al carrito
        </button>

    </article>

</section>
```

Hasta aquí, sencillo.

Pero ese botón no hace nada por sí solo.

Tenemos que programar qué ocurre cuando el usuario pulsa:

```javascript
document.querySelector('.producto button')
    .addEventListener('click', () => {

        // Añadir producto al carrito

    });
```

Y después viene todo lo demás:

```text
Producto
   ↓
Añadir al carrito
   ↓
Carrito
   ↓
Actualizar cantidades
   ↓
Calcular total
   ↓
Checkout
   ↓
Datos del cliente
   ↓
Método de pago
   ↓
Pedido
   ↓
Confirmación
```

Y eso es solamente el flujo básico.

Después aparecen cuestiones como:

* ¿Dónde guardamos los productos?
* ¿Cómo controlamos el stock?
* ¿Cómo calculamos los gastos de envío?
* ¿Qué pasa si el pago falla?
* ¿Cómo se envían los correos?
* ¿Dónde consulta el cliente sus pedidos?
* ¿Cómo gestionamos devoluciones?
* ¿Cómo protegemos los datos?
* ¿Cómo evitamos que alguien manipule los precios desde el navegador?

Aquí es donde deja de ser simplemente una web con HTML y empieza a ser una aplicación de comercio electrónico.

## La alternativa: utilizar WooCommerce

En lugar de programar toda esa infraestructura, podemos utilizar <Entity value="WooCommerce" category="software" disambig="Plugin de comercio electrónico para WordPress"/>.

WooCommerce es un plugin de comercio electrónico para WordPress que proporciona la base necesaria para crear una tienda online.

La idea sería aprovecharlo para todo lo relacionado con la tienda:

```text
WooCommerce
├── Productos
├── Categorías
├── Precios
├── Inventario
├── Carrito
├── Checkout
├── Pedidos
└── Gestión de la tienda
```

Mientras tanto, nuestra web principal continúa utilizando el diseño que ya hemos creado:

```text
WEB DEL CLIENTE
│
├── Inicio
├── Nosotros
├── Servicios
├── Contacto
│
└── Tienda
    ├── Productos
    ├── Categorías
    ├── Carrito
    └── Checkout
```

Y aquí está el concepto importante:

**No necesitamos que toda la web esté construida utilizando WooCommerce.**

WooCommerce puede encargarse de la parte de tienda y nuestro tema personalizado del resto.

## Convertir la web HTML en un tema WordPress

Para integrar WooCommerce de esta forma, necesitamos que nuestra web HTML funcione dentro de WordPress.

La solución que me parece más interesante es convertirla en un tema personalizado.

Partimos de:

```text
web/
├── index.html
├── nosotros.html
├── servicios.html
├── css/
├── js/
└── img/
```

Y lo adaptamos a:

```text
mi-tema/
├── style.css
├── functions.php
├── front-page.php
├── header.php
├── footer.php
├── page.php
├── single.php
├── archive.php
├── js/
│   └── main.js
└── img/
    └── ...
```

El HTML no desaparece.

Simplemente, lo repartimos en las plantillas que necesita WordPress.

Por ejemplo:

```php
<?php get_header(); ?>

<main>

    <section class="hero">

        <h1>Bienvenidos</h1>

        <p>
            Nuestra web principal sigue utilizando
            el HTML del proyecto original.
        </p>

    </section>

</main>

<?php get_footer(); ?>
```

El visitante sigue viendo la misma web.

La diferencia es que ahora WordPress puede ejecutar plugins como WooCommerce.

## ¿Dónde encaja WooCommerce?

Una vez tenemos el tema funcionando en WordPress, instalamos WooCommerce.

Y aquí es donde empieza la integración.

WooCommerce añade sus propias funcionalidades y páginas de tienda.

Por ejemplo:

```text
WordPress
│
├── Mi tema personalizado
│   ├── Inicio
│   ├── Nosotros
│   ├── Servicios
│   └── Contacto
│
└── WooCommerce
    ├── Tienda
    ├── Producto
    ├── Carrito
    ├── Checkout
    └── Mi cuenta
```

Podemos mantener las páginas corporativas con nuestro HTML y utilizar las páginas de WooCommerce para la tienda.

No es necesario que cada página tenga exactamente la misma estructura interna.

Lo importante es que el visitante perciba una web coherente.

## Ejemplo: la página principal sigue siendo HTML

Nuestra página de inicio puede continuar siendo algo así:

```php
<?php get_header(); ?>

<main>

    <section class="hero">

        <h1>
            Una web hecha a medida
        </h1>

        <p>
            Diseño, desarrollo y soluciones digitales.
        </p>

        <a href="/tienda/">
            Ver tienda
        </a>

    </section>

    <section class="servicios">

        <h2>
            Nuestros servicios
        </h2>

        <!-- HTML original -->

    </section>

</main>

<?php get_footer(); ?>
```

No estamos utilizando bloques de WooCommerce para crear la página principal.

Seguimos escribiendo nuestro HTML.

La única diferencia es que ahora tenemos un enlace hacia la tienda.

## La página de tienda la gestiona WooCommerce

Cuando el usuario entra en:

```text
/tienda/
```

podemos mostrar el catálogo de productos de WooCommerce.

Los productos se crean desde el panel de WordPress:

```text
WordPress
    ↓
Productos
    ↓
Añadir nuevo
    ↓
Nombre
Precio
Imágenes
Stock
Categoría
    ↓
Publicar
```

Y WooCommerce se encarga de utilizar esos datos para mostrar los productos.

Por ejemplo, un producto podría tener:

```text
Producto: Camiseta básica
Precio: 24,99 €
Stock: 15 unidades
Categoría: Ropa
Imagen: camiseta.webp
```

Desde nuestra perspectiva, esto supone una diferencia importante.

No tenemos que crear manualmente un HTML para cada producto.

No tenemos que programar un sistema para guardar sus precios.

No tenemos que construir un panel para gestionar el inventario.

WooCommerce ya proporciona esa base.

## ¿Y si quiero que la tienda mantenga el mismo diseño?

Aquí es donde entra nuestro trabajo como desarrolladores.

Que WooCommerce gestione los productos no significa que tengamos que aceptar un diseño que no encaje con nuestra web.

Podemos adaptar los estilos de la tienda:

```css
.woocommerce ul.products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

.woocommerce ul.products li.product {
    list-style: none;
    margin: 0;
}

.woocommerce ul.products li.product img {
    width: 100%;
    height: auto;
}
```

Y también podemos personalizar las plantillas que necesitemos.

Por ejemplo, si queremos una plantilla de producto personalizada, podemos crear:

```text
mi-tema/
└── woocommerce/
    └── single-product.php
```

Otras plantillas pueden incluir:

```text
woocommerce/
├── archive-product.php
├── single-product.php
├── cart/
├── checkout/
└── myaccount/
```

No necesitamos crear todas desde el primer día.

Lo razonable es empezar con las plantillas que realmente necesitemos modificar.

## Un ejemplo de plantilla de producto

Podemos crear una plantilla personalizada para el producto individual:

```php
<?php get_header(); ?>

<main class="producto">

    <?php
    while (have_posts()) :
        the_post();

        wc_get_template_part(
            'content',
            'single-product'
        );

    endwhile;
    ?>

</main>

<?php get_footer(); ?>
```

La idea es que nuestro tema controla la estructura general, mientras WooCommerce proporciona los datos y las funcionalidades del producto.

Por ejemplo:

```text
Producto
├── Imagen
├── Nombre
├── Precio
├── Descripción
├── Variaciones
├── Cantidad
└── Añadir al carrito
```

Y no tenemos que programar manualmente toda esa lógica.

## ¿Qué pasa con el carrito?

Esta es probablemente una de las partes que más trabajo nos ahorra.

En una tienda hecha desde cero, tendríamos que programar:

```text
Carrito
├── Añadir producto
├── Eliminar producto
├── Cambiar cantidad
├── Calcular subtotal
├── Calcular impuestos
├── Calcular envío
└── Calcular total
```

Con WooCommerce, el carrito ya forma parte de su sistema.

Podemos enlazarlo desde nuestro menú:

```html
<nav class="menu">

    <a href="/">
        Inicio
    </a>

    <a href="/nosotros/">
        Nosotros
    </a>

    <a href="/tienda/">
        Tienda
    </a>

    <a href="/contacto/">
        Contacto
    </a>

    <a href="/carrito/">
        Carrito
    </a>

</nav>
```

Y WooCommerce gestiona lo que sucede cuando el usuario añade productos.

No tenemos que crear un sistema de carrito en JavaScript.

No tenemos que almacenar manualmente todos los productos seleccionados.

No tenemos que desarrollar desde cero la lógica de actualización de cantidades.

## Y lo mismo ocurre con el checkout

El checkout es una de las partes más delicadas de una tienda online.

Tenemos que recoger información del cliente y gestionar el proceso de compra.

Por ejemplo:

```text
CHECKOUT
│
├── Datos de facturación
├── Dirección de envío
├── Método de envío
├── Método de pago
├── Resumen del pedido
└── Confirmar compra
```

Si programamos todo desde cero, necesitamos construir y mantener cada una de esas partes.

Con WooCommerce tenemos una base sobre la que trabajar.

Podemos adaptar el diseño del checkout mediante CSS y plantillas, pero no tenemos que inventar todo el sistema de comercio electrónico.

Eso no significa que la tienda esté terminada automáticamente.

Todavía tenemos que configurar los métodos de pago, los envíos, los impuestos y las opciones que necesite el proyecto.

Pero es muy diferente partir de una base funcional que empezar con un formulario vacío y tener que desarrollar toda la lógica de pedidos.

<div style="text-align: center;">
<img src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" alt="Programador trabajando en una integración de software" width="300" />
</div>

## La web principal no tiene por qué ser editable

Este punto sigue siendo importante.

En este proyecto, la web corporativa puede continuar siendo completamente estática desde el punto de vista del contenido.

Por ejemplo:

```php
<section class="historia">

    <h2>
        Nuestra historia
    </h2>

    <p>
        Este texto forma parte del diseño
        y se modifica directamente en el HTML.
    </p>

</section>
```

No necesitamos convertir cada párrafo en un campo editable.

No necesitamos utilizar el editor de WordPress para construir todas las páginas.

Si el cliente quiere cambiar un texto, lo editamos nosotros.

La tienda es diferente porque los productos sí necesitan una gestión más frecuente.

Y ahí es donde WooCommerce aporta un valor real.

## ¿Y si necesito plugins adicionales para la tienda?

WooCommerce proporciona la base, pero una tienda online real suele necesitar más funcionalidades.

Por ejemplo:

```text
WooCommerce
│
├── Productos
├── Carrito
├── Checkout
├── Pedidos
│
├── Plugin de pagos
├── Plugin de envíos
├── Plugin de impuestos
├── Plugin de facturación
├── Plugin de emails
└── Otros plugins necesarios
```

No todos estos plugins son obligatorios en todos los proyectos.

Depende del tipo de tienda y de los requisitos del cliente.

Pero la ventaja es que no tenemos que desarrollar todas esas funcionalidades desde cero.

Podemos buscar una extensión que resuelva una necesidad concreta y configurarla dentro de WordPress.

Eso nos permite centrarnos en la integración y en el diseño.

## ¿Se puede mantener el HTML original sin modificarlo?

Aquí hay que hacer una pequeña aclaración.

Podemos conservar gran parte del HTML original, pero **no significa que podamos copiar la carpeta de la web y que WooCommerce funcione automáticamente**.

Necesitamos adaptar la web a la estructura de WordPress.

Por ejemplo:

```text
index.html
```

se convierte en:

```text
front-page.php
```

Y los recursos se cargan mediante:

```php
wp_enqueue_style();
wp_enqueue_script();
```

Además, necesitamos las plantillas que correspondan a las páginas de la tienda.

Es decir, no es una integración basada en pegar un plugin dentro de un HTML estático.

Es una integración basada en convertir nuestro frontend en un tema WordPress.

Y eso es lo que permite que WooCommerce pueda funcionar dentro del mismo proyecto.

## ¿Y si quiero que la tienda esté completamente separada?

También existe otra posibilidad.

Podemos tener:

```text
Web principal
    ↓
HTML/CSS/JS
    ↓
Web corporativa
```

Y una tienda independiente:

```text
Tienda
    ↓
WordPress + WooCommerce
    ↓
Productos, carrito y pedidos
```

Por ejemplo:

```text
cliente.com
cliente.com/tienda/
```

O incluso:

```text
cliente.com
tienda.cliente.com
```

Pero aquí ya estaríamos hablando de una arquitectura diferente.

La tienda podría ser otro proyecto, con su propio tema y su propia configuración.

En cambio, si utilizamos un tema WordPress personalizado, podemos tener ambas partes dentro del mismo WordPress.

## ¿Qué arquitectura elegiría?

Para el caso que estoy planteando, la estructura sería:

```text
WORDPRESS
│
├── TEMA PERSONALIZADO
│   │
│   ├── HTML de la web principal
│   ├── CSS
│   ├── JavaScript
│   ├── Responsive
│   └── Plantillas corporativas
│
└── WOOCOMMERCE
    │
    ├── Productos
    ├── Categorías
    ├── Carrito
    ├── Checkout
    ├── Pedidos
    └── Plugins de la tienda
```

Y el flujo del visitante:

```text
Inicio
   ↓
Web HTML/CSS/JS
   ↓
Tienda
   ↓
WooCommerce
   ↓
Producto
   ↓
Carrito
   ↓
Checkout
   ↓
Pedido
```

La web principal sigue siendo nuestra.

La tienda aprovecha WooCommerce.

## ¿Qué ventajas tiene esta solución?

La primera es que no tenemos que rehacer una web que ya funciona.

Si el diseño está terminado, responsive y aprobado, podemos conservarlo.

La segunda es que evitamos desarrollar desde cero funcionalidades que son bastante complejas.

Por ejemplo:

* Gestión de productos.
* Carrito.
* Checkout.
* Pedidos.
* Inventario.
* Gestión de clientes.
* Integración de pagos mediante extensiones.
* Gestión de envíos mediante extensiones.

La tercera es que el cliente puede gestionar sus productos desde WordPress.

No necesita entrar en el código HTML para cambiar el precio de un producto o actualizar su stock.

Y la cuarta es que podemos seguir desarrollando la web principal con nuestras herramientas habituales.

```text
HTML
CSS
JavaScript
```

No necesitamos cambiar nuestra forma de trabajar en todo el proyecto.

## ¿Qué inconvenientes hay que tener en cuenta?

También hay algunos.

### WordPress y WooCommerce añaden complejidad

Una web HTML estática es relativamente sencilla de desplegar.

WordPress y WooCommerce requieren:

* PHP.
* Base de datos.
* Hosting compatible.
* Actualizaciones.
* Copias de seguridad.
* Seguridad.
* Mantenimiento de plugins.

No es una solución que elegiría solamente para añadir una página informativa.

Pero cuando necesitamos una tienda online, la situación cambia.

### Hay que adaptar el diseño de WooCommerce

Aunque podamos personalizarlo, no podemos asumir que todos los elementos de WooCommerce van a encajar automáticamente con nuestro HTML.

Probablemente tengamos que trabajar en:

```text
Diseño de tienda
Diseño de producto
Diseño del carrito
Diseño del checkout
Diseño de mi cuenta
```

Y también comprobar que todo funciona correctamente en móvil.

### Los plugins necesitan mantenimiento

WooCommerce no elimina la necesidad de mantener la tienda.

Los pagos, envíos, impuestos, seguridad y otras integraciones tienen que estar correctamente configurados.

Además, hay que probar las actualizaciones para evitar que un plugin rompa alguna parte del proyecto.

## La idea que me llevo

La parte interesante de esta arquitectura es que podemos aprovechar dos mundos.

Por un lado, tenemos una web desarrollada a medida:

```text
HTML + CSS + JS
```

Por otro, tenemos una plataforma de comercio electrónico:

```text
WordPress + WooCommerce
```

Y no necesitamos que una sustituya a la otra.

Si la web principal ya está terminada y no necesitamos que el cliente edite sus textos, podemos mantenerla bajo nuestro control.

Y cuando necesitamos una tienda online, aprovechamos WooCommerce para no tener que desarrollar desde cero todo el sistema de comercio electrónico.

El resultado es una web personalizada con una tienda online integrada, sin tener que reconstruir todo el proyecto utilizando un constructor visual.

La clave está en convertir nuestro HTML en un tema WordPress y dejar que WooCommerce se encargue de la parte que realmente necesita una plataforma de comercio electrónico.

Así podemos seguir trabajando con nuestro HTML, CSS y JavaScript, pero sin tener que programar desde cero un carrito, un checkout y un sistema completo de pedidos.
