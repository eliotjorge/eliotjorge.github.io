---
title: Shopify
date: 2026-10-07
layout: note
notebook: Desarrollo
resumen: "Creación de una tienda online con Shopify"
color: "#703c36"
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

Aquí está la documentación sobre la customización [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes)

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

Shopify permite hacer una buena parte de la personalización desde este editor sin tocar Liquid. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes)

**Antes de tocar código, duplica Dwell.**

Tendrás algo parecido a:

```text
Dwell
├── Publicado
└── Dwell - desarrollo
```

Y trabajas sobre la copia.

Shopify recomienda precisamente duplicar el tema antes de hacer modificaciones de código para tener una copia de seguridad. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes)

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

Las colecciones son especialmente importantes porque después puedes utilizarlas directamente en la navegación y en secciones del tema. [Shopify Help Center](https://help.shopify.com/es/manual/products/collections/make-collections-findable)

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

Shopify las gestiona como recursos independientes y posteriormente las puedes añadir a los menús. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/add-edit-pages)

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

Shopify permite utilizar productos, colecciones, páginas y artículos del blog como elementos de los menús. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/menus-and-links)

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

Dwell permite establecer estas configuraciones globales desde el editor. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes/theme-editor/theme-settings)

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

**Tienda online → Temas → ... → Editar código** [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes/edit-code)


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

para CSS global. Shopify indica que ese CSS afecta a las páginas de la tienda salvo el checkout. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes/theme-editor/theme-settings)

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

Shopify confirma que al conectar un dominio externo sigues gestionando el dominio, su pago y renovación desde el proveedor externo. [Shopify Help Center](https://help.shopify.com/es/manual/domains/add-a-domain/connecting-domains)

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

y especifica que debe eliminarse cualquier otro A/AAAA que entre en conflicto. [Shopify Help Center](https://help.shopify.com/es/manual/domains/add-a-domain/connecting-domains/connect-domain-manual)

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

