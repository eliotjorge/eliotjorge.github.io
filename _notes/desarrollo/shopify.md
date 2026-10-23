---
title: Shopify
date: 2026-10-07
layout: note
notebook: Desarrollo
resumen: "Creación de una tienda online con Shopify"
color: "--cuaderno-rojo"
toc: true
---


# Pasos a seguir después de crear una cuenta en Sopify.

NO cambiar las DNS en el proveedor del dominio (si no hemso comprado el dominio en Shopify) hasta que la tienda esté montada, se puede hacer antes de lanzarla públicamnte.

Lo más lógico es montar prácticamente toda la tienda en el dominio temporal de Shopify y conectar Dinahosting cuando la tienda esté bastante avanzada.

Es mejor así poqrue:
 - no tienes una tienda a medio hacer accesible públicamente
 - puedes romper cosas, cambiar el tema y probar Liquid sin afectar al dominio
 - cuando llegue el momento de lanzar, haces la conexión DNS

**No necesitas que el dominio real esté conectado para construir la tienda.** Shopify permite previsualizar el tema y trabajar con productos, colecciones, páginas, menús, etc. desde el propio panel.

Aquí está la documentación sobre la customización [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes){:target="_blank"}

Es recomendable separar el proceso en 2 fases [**construcción**](#fase-1--construcción) y [**puesta en producción**](#fase-2--puesta-en-producción).

## FASE 1 — Construcción

### 1. Configuración básica de Shopify

Antes incluso de ponerte con el diseño:

**Configuración → General**

Revisa:

- nombre de la tienda
- información de la empresa
- dirección
- moneda
- zona horaria
- unidades
- idioma
- datos de contacto

Después:

**Configuración → Dominios**

Simplemente comprueba que tienes el dominio `myshopify.com` que te ha asignado Shopify.

**No conectes todavía Dinahosting.**

---

### 2. Instalar Dwell

Aquí sí puedes empezar ya con el diseño.

Ve a:

**Tienda online → Temas**

Y añade **Dwell**, que es gratuito.

No empezaría modificando código inmediatamente.

Primero pondría Dwell y entendería qué trae de serie.

Después:

**Dwell → Editar**

Ahí tienes el editor visual de Shopify.

Puedes modificar:

- cabecera
- logo
- colores
- tipografías
- botones
- ancho de contenido
- footer
- página de inicio
- secciones
- bloques
- productos
- colecciones
- etc.

Shopify permite hacer una buena parte de la personalización desde este editor sin tocar Liquid. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes){:target="_blank"}

**Antes de tocar código, duplica Dwell.**

Tendrás algo parecido a:

```text
Dwell
├── Publicado
└── Dwell - desarrollo
```

Y trabajas sobre la copia.

Shopify recomienda precisamente duplicar el tema antes de hacer modificaciones de código para tener una copia de seguridad. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes){:target="_blank"}

---

### 3. Primero estructura, después CSS/Liquid

Yo no haría:

> Instalar Dwell → empezar a modificar CSS → empezar a crear productos → cambiar cosas → volver al CSS...

Es mejor establecer primero la estructura.

Por ejemplo:

```text
TIENDA
│
├── Inicio
│
├── Productos
│   ├── Categoría A
│   ├── Categoría B
│   └── Categoría C
│
├── Sobre nosotros
├── Contacto
├── FAQ
│
└── Footer
    ├── Envíos
    ├── Devoluciones
    ├── Privacidad
    ├── Cookies
    └── Términos
```

Los nombres concretos dependerán de la tienda, evidentemente.

---

### 4. Crear productos

Después crearía los productos reales.

En Shopify el producto es una pieza fundamental porque después lo reutilizas en:

- páginas de producto
- colecciones
- búsqueda
- recomendaciones
- productos destacados
- carrito
- etc.

Aquí configurarías:

- nombre
- descripción
- imágenes
- precio
- SKU
- inventario
- variantes
- peso
- disponibilidad
- etc.

**No necesitas tener el diseño terminado para crear productos.**

De hecho, te recomiendo crearlos relativamente pronto porque cuando empieces a editar Dwell necesitarás contenido real para ver cómo queda.

---

### 5. Crear colecciones

Después:

**Productos → Colecciones**

Por ejemplo:

```text
Todos los productos

Categoría 1
Categoría 2
Categoría 3
Novedades
Destacados
```

Las colecciones son especialmente importantes porque después puedes utilizarlas directamente en la navegación y en secciones del tema. [Shopify Help Center](https://help.shopify.com/es/manual/products/collections/make-collections-findable){:target="_blank"}

---

### 6. Crear las páginas

Después crearía las páginas estáticas.

En Shopify:

**Tienda online → Páginas**

Ahí puedes crear páginas como:

- Sobre nosotros
- Contacto
- FAQ
- Envíos
- Devoluciones
- etc.

Shopify las gestiona como recursos independientes y posteriormente las puedes añadir a los menús. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/add-edit-pages){:target="_blank"}

Y aquí hay una diferencia importante respecto a WordPress que te vendrá bien tener clara:

**En Shopify no pienses tanto en:**

> "Voy a crear una página y después decidiré cómo diseñarla"

Sino más bien:

> **Contenido + plantilla/sección del tema**

El tema determina cómo se representa ese contenido.

---

### 7. Crear la navegación

Cuando ya tengas productos, colecciones y páginas:

**Contenido → Menús**

Ahí construyes:

**Menú principal**

Por ejemplo:

```text
Inicio
Tienda
    Categoría 1
    Categoría 2
    Categoría 3
Sobre nosotros
Contacto
```

**Footer**

```text
Ayuda
    Envíos
    Devoluciones
    FAQ

Legal
    Privacidad
    Cookies
    Términos

Contacto
```

Shopify permite utilizar productos, colecciones, páginas y artículos del blog como elementos de los menús. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/menus-and-links){:target="_blank"}

---

### 8. Ahora sí: diseño de Dwell

Aquí es donde yo empezaría a trabajar contigo como si fuera un proyecto web normal.

Primero:

**Configuración del tema**

- colores
- tipografías
- logo
- favicon
- layout
- botones
- estilos generales

Dwell permite establecer estas configuraciones globales desde el editor. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes/theme-editor/theme-settings){:target="_blank"}

Después vas página por página:

```text
Home
↓
Collection
↓
Product
↓
Cart
↓
Search
↓
Pages
↓
404
```

Y compruebas cómo está construido cada template.

---

### 9. Y después entra tu parte de desarrollador

Aquí Shopify te va a resultar bastante familiar si ya trabajas con WordPress/Divi, aunque el concepto es diferente.

El código del tema utiliza:

```text
Liquid
HTML
CSS
JavaScript
JSON
```

Shopify permite acceder a:

**Tienda online → Temas → ... → Editar código** [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes/edit-code){:target="_blank"}


Y ahí ya puedes hacer cosas como:

```text
/layout
/templates
/sections
/snippets
/assets
/config
/locales
```

Por ejemplo, podrás crear tus propios:

```text
sections
snippets
CSS
JS
```

y modificar los existentes.

Para ti esta parte probablemente será bastante más cómoda que para un usuario normal de Shopify porque ya tienes experiencia con HTML/CSS y algo de Liquid.

---

### 10. No empezaría metiendo todo el CSS en el código

Una cosa que te recomiendo especialmente.

Dwell ya tiene:

**Configuración del tema → CSS personalizado**

para CSS global. Shopify indica que ese CSS afecta a las páginas de la tienda salvo el checkout. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes/theme-editor/theme-settings){:target="_blank"}

Puedes utilizarlo para pequeñas modificaciones.

Pero si vas a hacer una personalización importante, yo haría algo más ordenado:

```text
assets/
    base.css
    custom.css
    custom-product.css
    custom-collection.css
```

o la estructura que finalmente decidamos.

Así no acabas con 1.500 líneas de CSS metidas en un campo del editor.

---

## FASE 2 — Puesta en producción

### 1. Cuando esté aproximadamente al 90% → conectar Dinahosting

**Aquí sí tocaría el DNS.**

No necesitas esperar literalmente al 100%.

De hecho, hacerlo cuando esté al 90% es bastante razonable porque quieres comprobar la tienda con el dominio real antes del lanzamiento.

La conexión **no implica transferir el dominio**.

Tu situación sería:

```text
DINAHOSTING
     │
     ├── propiedad del dominio
     ├── renovación
     └── DNS
          │
          ▼
       SHOPIFY
          │
          └── tienda
```

Es decir:

**El dominio sigue siendo de Dinahosting.**

Shopify simplemente recibe las visitas.

Shopify confirma que al conectar un dominio externo sigues gestionando el dominio, su pago y renovación desde el proveedor externo. [Shopify Help Center](https://help.shopify.com/es/manual/domains/add-a-domain/connecting-domains){:target="_blank"}

---

### 2. ¿Qué DNS tendrás que poner?

Actualmente Shopify indica:

#### Dominio raíz

```text
Tipo: A
Host: @
Valor: 23.227.38.65
```

#### www

```text
Tipo: CNAME
Host: www
Valor: shops.myshopify.com
```

Shopify también documenta un registro AAAA para IPv6:

```text
AAAA
@
2620:0127:f00f:5::
```

y especifica que debe eliminarse cualquier otro A/AAAA que entre en conflicto. [Shopify Help Center](https://help.shopify.com/es/manual/domains/add-a-domain/connecting-domains/connect-domain-manual){:target="_blank"}

**Pero ojo:** antes de tocar nada en Dinahosting, yo miraría contigo exactamente qué registros tienes ahora.

Especialmente si el dominio tiene:

- correo electrónico
- SPF
- DKIM
- DMARC
- otros subdominios
- algún servicio externo

No hay que hacer una limpieza a lo bruto del DNS.

Por ejemplo, podrías perfectamente acabar con:

```text
@       A       23.227.38.65
www     CNAME   shops.myshopify.com

@       MX      ...
@       TXT     v=spf1 ...
_dmarc  TXT     ...
...
```

La web va a Shopify pero el correo puede seguir funcionando donde esté.

---

### 3. ¿Cuándo haría yo exactamente el cambio?

Yo lo plantearía así:

#### 0–20 %

```text
✓ Shopify configurado
✓ Dwell instalado
✓ Tema duplicado
✓ Estructura decidida
```

#### 20–50 %

```text
✓ Productos
✓ Variantes
✓ Colecciones
✓ Páginas
✓ Menús
```

#### 50–80 %

```text
✓ Diseño Dwell
✓ Home
✓ Colecciones
✓ Producto
✓ Carrito
✓ Footer
✓ Responsive
```

#### 80–90 %

```text
✓ Liquid personalizado
✓ CSS
✓ JS si hace falta
✓ Detalles visuales
✓ Errores
✓ 404
✓ Mobile
```

#### 90–95 %

**Conectar Dinahosting → Shopify.**

Y entonces comprobar:

```text
https://tudominio.com
https://www.tudominio.com

Home
↓
Colección
↓
Producto
↓
Añadir carrito
↓
Carrito
↓
Checkout
```

Shopify señala que los cambios DNS suelen hacerse efectivos en unas dos horas, aunque en algunos casos pueden tardar hasta 48 horas. [Shopify Help Center](https://help.shopify.com/es/manual/domains/add-a-domain/connecting-domains)

#### 95–100 %

Ya con el dominio real:

- prueba completa de compra
- emails
- móvil
- diferentes navegadores
- enlaces
- menús
- carrito
- variantes
- stock
- métodos de pago
- envíos
- impuestos
- políticas
- etc.

Y finalmente quitar cualquier bloqueo/estado de prueba que impida que los clientes entren.

---

### Una cosa importante: no necesitas "publicar" mientras desarrollas

Este es probablemente el concepto que más te interesa viniendo de WordPress.

Puedes tener:

```text
                    AHORA
                      │
                      ▼
        tienda-xxx.myshopify.com
                      │
                ┌─────┴─────┐
                │           │
             Shopify      Dwell
                │           │
             productos   Liquid/CSS
                │
                ▼
           DESARROLLO
```

Y cuando esté lista:

```text
              DINAHOSTING
                   │
                  DNS
                   │
                   ▼
                SHOPIFY
                   │
                   ▼
            tudominio.com
```

**No necesitas empezar el proyecto cambiando el dominio.**

---

### Y yo lo haría contigo en este orden

Como además quieres **Dwell y modificar código**, creo que lo más práctico es que no intentemos aprender todo Shopify de golpe.

Podemos ir construyéndola en este orden:

**1.** Configuración inicial de Shopify  
**2.** Instalar Dwell y duplicarlo  
**3.** Entender la estructura de Dwell/Liquid  
**4.** Crear productos  
**5.** Crear colecciones  
**6.** Crear páginas  
**7.** Crear navegación  
**8.** Construir la Home  
**9.** Personalizar producto/colección/carrito  
**10.** CSS y Liquid personalizado  
**11.** Responsive y pruebas  
**12.** Configurar pagos/envíos/impuestos  
**13.** Conectar dominio de Dinahosting  
**14.** Pruebas finales  
**15.** Lanzamiento

Y **SEO, identidad visual y contenidos los podemos dejar fuera**, como dices, porque ya tienes ese trabajo preparado.

---

## Hacer copia de seguridad del tema empleado

Antes de tocar nada de código es recomendable (el propio Shopify lo dice en su documentación) hacer una copia de seguridad el tema.

Para hacer una copia de seguridad de un tema de Shopify, puedes usar tres métodos principales: descarga manual, duplicación interna o apps automatizadas.

- **Descargar el archivo del tema:** En tu panel de Shopify, ve a Tienda online > Temas, haz clic en los tres puntos junto a tu tema y selecciona Descargar archivo del tema. Shopify te enviará un archivo .zip con todo el código y los recursos para guardarlo offline.

- **Duplicar el tema:** En la misma sección de Temas, selecciona Duplicar para crear una copia interna. Así puedes probar cambios sin riesgo y restaurar el original publicando el duplicado si hace falta, aunque estás limitado a 20 temas en tu biblioteca.

  <img width="454" height="354" alt="image" src="https://github.com/user-attachments/assets/1cc3ba26-c679-43b8-8b1f-977de4a8fbfc" />
  
- **Apps automatizadas:** Instala apps como Rewind Backups o ThemeWatch desde la Shopify App Store para programar copias de seguridad automáticas y restaurar temas y otros datos de la tienda con un solo clic.
Shopify no ofrece copias de seguridad automáticas de temas por defecto, por lo que las descargas manuales o las apps de terceros son necesarias para una protección completa.

---

## Cambiar tamaño del logo

Para cambiar el tamaño del logo no basta con añadir un CSS en el archivo 'base.css', hay un problema y es que si sólo se pone en tamaño en CSS el tema carga una imagen de 100px así que por mucho que le dé tamaño se pondrá de 150px una foto de 100px por lo que se verá pixelada:

<img width="260" height="152" alt="image" src="https://github.com/user-attachments/assets/13e50b96-09cf-4c39-902d-0c24570b52c3" />

```css
 .header-logo__image {
    max-width: none !important;
    width: 150px !important;
    height: auto !important;
  }
```

Además del CSS hay que cambiar el tamaño de la foto que renderiza. Para hacerlo hay que cambiar 'blocks/_header-logo.liquid' que en este tema es el encargado de los ajustes del logo del tema.

En la línea 60 tenemos esto:

{% raw %}
```liquid
{% render 'image',
  image: settings.logo,
  class: 'header-logo__image',
  height: settings.logo_height,
  alt_text_fallback: alt_text_fallback,
  text_fallback: shop.name,
  style: logo_style
%}
```
{% endraw %}

Cambiar por (poner altura a 300 o lo que quiera):

{% raw %}
```liquid
{% render 'image',
  image: settings.logo,
  class: 'header-logo__image',
  height: 300,
  alt_text_fallback: alt_text_fallback,
  text_fallback: shop.name,
  style: logo_style
%}
```
{% endraw %}

<img width="236" height="154" alt="image" src="https://github.com/user-attachments/assets/11d13ead-0383-47eb-97cf-367a8184b2e8" />

## Ancho del contenido de la página con plantilla legales

Cree una plantilla para los textos legales que solo llevan título de la página y los textos debajo, pero se quedaba por defecto muy estrecho el contenido:

<img width="1919" height="885" alt="image" src="https://github.com/user-attachments/assets/ec73e6c2-dd75-4a57-954f-805f87c42954" />

Así que hay que añadir en 'base.css' esta regla:

```css
  body:has(main[data-template="page.legales"]) {
  --normal-content-width: 70rem;
}
```

Lo que hace esta regla es al 'body' que tenga como 'data-template = page.legales' cambia la variable '--normal-content-width' al valor que queramos.

<img width="248" height="84" alt="image" src="https://github.com/user-attachments/assets/51f04a6c-116a-4ec0-b737-72d088b9770e" />

Y se queda de esta manera:

<img width="1919" height="886" alt="image" src="https://github.com/user-attachments/assets/eca34303-40f2-43cb-815e-98a693c99560" />

---

## Cambiar políticas de la tienda

Para cambiar las páginas de:

- Política de devoluciones y reembolsos
- Política de privacidad
- Términos del Servicio
- Política de envío
- Información de contacto
- Aviso legal

Shopify nos da las páginas y en algún caso con el contenido creado (revisar porque no se hacen responsables) y se encuentran en **Configuración/Políticas**

<img width="809" height="375" alt="image" src="https://github.com/user-attachments/assets/4803f66d-1243-4295-aeb2-8c45b4071237" />

---

## Conectar Google Analytics con Shopify

Para una tienda Shopify, aunque Shopify ya incluye sus propias estadísticas es recomendable asociar tambien un Google Anaitycs. No necesitas elegir entre uno y otro: lo ideal es utilizar ambos porque se complementan.

### 1. ¿Qué estadísticas ofrece cada uno?

**Shopify Analytics**

Las estadísticas integradas de tu tienda.

- Ventas, pedidos e ingresos.
- Productos más vendidos.
- Sesiones y tasa de conversión.
- Valor medio del pedido.
- Informes de clientes y marketing.

<img width="1008" height="759" alt="estadisticas venta" src="https://github.com/user-attachments/assets/4db2fc79-b6f7-43d2-8c6b-0a27e29bbfd5" />


**Google Analytics 4**

Para analizar con más detalle cómo llegan y se comportan los usuarios.

- Tráfico por fuente, medio y campaña.
- Campañas con parámetros UTM.
- Eventos como ver productos, añadir al carrito y comprar.
- Recorridos de los usuarios.
- Informes personalizados y exploraciones.

<img width="1892" height="860" alt="estadisticas analytics" src="https://github.com/user-attachments/assets/22a39872-d028-4cf8-b0e4-d29200a28301" />

Recomendación: configurar ambos. Shopify servirá para el seguimiento comercial del día a día y GA4 para analizar las visitas, las campañas y el comportamiento de los usuarios.

### 2. Cómo dar de alta la tienda en Google Analytics 4

Vamos a configurarlo desde cero. No necesitas tener conectado todavía el dominio de Dinahosting: puedes preparar Analytics durante el desarrollo y empezar a recoger datos cuando la tienda esté accesible y el seguimiento funcione.

- **1 Crear la propiedad de GA4**

Entra en [Google Analytics](https://analytics.google.com/?utm_source=chatgpt.com){:target="_blank"} con la cuenta de Google que vaya a gestionar las estadísticas.

1. Abre Administrar.
2. Crea una cuenta de Analytics si aún no tienes una.
3. Crea una propiedad con el nombre de la tienda.
4. Selecciona la zona horaria de España y la moneda que utilizará la tienda.
5. Crea un flujo de datos de tipo Web.

En la URL del sitio puedes utilizar el dominio definitivo que vas a conectar a Shopify. No necesitas cambiar sus DNS todavía.

Al terminar, tendrás un identificador de medición parecido a `G-XXXXXXXXXX`. Guárdalo.

- **2 Conectar GA4 con Shopify**

En el administrador de Shopify:

1. Entra en Configuración → Aplicaciones y canales de ventas.
2. Busca el canal oficial Google & YouTube e instálalo si no está instalado.
3. Sigue el proceso de configuración de la etiqueta de Google y vincula la propiedad de Analytics.

No necesitas configurar Google Merchant Center para completar la instalación de Analytics.

- **3 Comprobar que funciona**

Una vez conectado, abre la tienda y visita varias páginas. En GA4, entra en Informes → Tiempo real para comprobar si aparece tu actividad.

Cuando esté correctamente configurado, Shopify puede enviar automáticamente eventos de comercio electrónico como visualizaciones de productos, añadidos al carrito y compras.

### 3. Dos detalles importantes antes del lanzamiento

- Privacidad y cookies: al vender en España, revisa la configuración de privacidad de Shopify y el consentimiento de cookies. La recogida de datos de Analytics debe respetar las preferencias de consentimiento aplicables.

- No instales dos veces la etiqueta: si conectas GA4 mediante Google & YouTube, evita añadir además el mismo identificador manualmente al código de Craft, porque podrías duplicar eventos y visitas.

Y recuerda que, mientras la tienda esté protegida con contraseña, el seguimiento de Analytics no funcionará como en una tienda pública.

Consejo: empieza creando la propiedad de GA4 y el flujo web. Cuando llegues al paso de conectar Google & YouTube, dime qué opciones te aparecen y seguimos desde ahí, sin tocar todavía el código de Dawn.


## Conectar la tienda a Analytics

Para recibir estadísticas de los visitantes de la web a parte de hacer que los productos salgan en las búsquedas de Google con Merchant center hay que instalar la App en Shopify de [Google & YouTube](https://apps.shopify.com/google?locale=es){:target="_blank"} según la página de la App:

> Conecta tu tienda a Google y YouTube, y convierte a más compradores en clientes
Accede a lo mejor de Google y YouTube desde Shopify: Sincroniza tus productos, ofertas y envíos con Google Merchant Center, y convierte a más compradores en clientes. Aumenta las ventas con anuncios Máximo rendimiento en la Búsqueda, YouTube y Display, y accede a valiosas estadísticas con Google Analytics. Aprovecha las herramientas basadas en IA de Google, como Product Studio, para crear y mejorar imágenes, y los descuentos automáticos de Google para optimizar tus beneficios.
> 
> - Conecta tu tienda a Merchant Center para que tus productos aparezcan en Google
> - Aumenta las ventas con campañas Máximo rendimiento, creadas con la IA de Google
> - Conecta tu tienda a YouTube y permite comprar directamente desde tus vídeos
> - Conoce todo el recorrido de tus clientes gracias a los datos de Google Analytics
> - Permite que la IA de Google optimice las ganancias con Descuentos Automatizados.

Una vez instalada tenemos que crear la propiedad de Analytics en la plataforma de Google como siempre.

<img width="1274" height="573" alt="image" src="https://github.com/user-attachments/assets/e873bd39-eb3a-4dc3-91fe-5fe13e27d0b2" />

Y luego es seguir las instrucciones en Shopify para conectar la App a la nueva propiedad.
