---
title: Shopify
date: 2026-10-07
layout: post
notebook: Desarrollo
resumen: "Creación de una tienda online con Shopify"
toc: true
---


# Pasos a seguir después de crear una cuenta en Sopify.

NO cambiar las DNS en el proveedor del dominio (si no hemso comprado el dominio en Shopify) hasta que la tienda esté montada, se puede hacer antes de lanzarla públicamnte.

Es mejor así poqrue:
 - no tienes una tienda a medio hacer accesible públicamente
 - puedes romper cosas, cambiar el tema y probar Liquid sin afectar al dominio
 - cuando llegue el momento de lanzar, haces la conexión DNS

2 fases:

## Construcción

Sí. Y en tu caso **yo no tocaría el DNS todavía**. Lo más lógico es montar prácticamente toda la tienda en el dominio temporal de Shopify y conectar Dinahosting cuando la tienda esté bastante avanzada.

Además, como eres desarrollador y quieres usar **Craft + Liquid/CSS**, te recomiendo separar el proceso en dos fases: **construcción** y **puesta en producción**.



## El orden que yo seguiría

### 1. No hagas nada con el dominio todavía

Ahora mismo tendrás una URL tipo:

`tu-tienda.myshopify.com`

Trabaja ahí tranquilamente.

**No necesitas que el dominio real esté conectado para construir la tienda.** Shopify permite previsualizar el tema y trabajar con productos, colecciones, páginas, menús, etc. desde el propio panel. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes?utm_source=chatgpt.com)

De hecho, es mejor así porque mientras estás desarrollando:

- el dominio real sigue donde esté actualmente;
- no tienes una tienda a medio hacer accesible públicamente;
- puedes romper cosas, cambiar el tema y probar Liquid sin afectar al dominio;
- cuando llegue el momento de lanzar, haces la conexión DNS.

---

# FASE 1 — Configurar la tienda

Yo haría esto en este orden:

### 2. Configuración básica de Shopify

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

# 3. Instalar Craft

Aquí sí puedes empezar ya con el diseño.

Ve a:

**Tienda online → Temas**

Y añade **Craft**, que es gratuito.

No empezaría modificando código inmediatamente.

Primero pondría Craft y entendería qué trae de serie.

Después:

**Craft → Editar**

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

Shopify permite hacer una buena parte de la personalización desde este editor sin tocar Liquid. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes?utm_source=chatgpt.com)

### Y aquí hay algo importante para ti

**Antes de tocar código, duplica Craft.**

Tendrás algo parecido a:

```text
Craft
├── Publicado
└── Craft - desarrollo
```

Y trabajas sobre la copia.

Shopify recomienda precisamente duplicar el tema antes de hacer modificaciones de código para tener una copia de seguridad. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes?utm_source=chatgpt.com)

---

# 4. Primero estructura, después CSS/Liquid

Yo no haría:

> Instalar Craft → empezar a modificar CSS → empezar a crear productos → cambiar cosas → volver al CSS...

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

# 5. Crear productos

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

De hecho, te recomiendo crearlos relativamente pronto porque cuando empieces a editar Craft necesitarás contenido real para ver cómo queda.

---

# 6. Crear colecciones

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

Las colecciones son especialmente importantes porque después puedes utilizarlas directamente en la navegación y en secciones del tema. [Shopify Help Center](https://help.shopify.com/es/manual/products/collections/make-collections-findable?utm_source=chatgpt.com)

---

# 7. Crear las páginas

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

Shopify las gestiona como recursos independientes y posteriormente las puedes añadir a los menús. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/add-edit-pages?utm_source=chatgpt.com)

Y aquí hay una diferencia importante respecto a WordPress que te vendrá bien tener clara:

### En Shopify no pienses tanto en:

> "Voy a crear una página y después decidiré cómo diseñarla"

Sino más bien:

> **Contenido + plantilla/sección del tema**

El tema determina cómo se representa ese contenido.

---

# 8. Crear la navegación

Cuando ya tengas productos, colecciones y páginas:

**Contenido → Menús**

Ahí construyes:

### Menú principal

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

### Footer

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

Shopify permite utilizar productos, colecciones, páginas y artículos del blog como elementos de los menús. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/menus-and-links?utm_source=chatgpt.com)

---

# 9. Ahora sí: diseño de Craft

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

Craft permite establecer estas configuraciones globales desde el editor. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes/theme-editor/theme-settings?utm_source=chatgpt.com)

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

# 10. Y después entra tu parte de desarrollador

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

**Tienda online → Temas → ... → Editar código** [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes/edit-code?utm_source=chatgpt.com)


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

# 11. No empezaría metiendo todo el CSS en el código

Una cosa que te recomiendo especialmente.

Craft ya tiene:

**Configuración del tema → CSS personalizado**

para CSS global. Shopify indica que ese CSS afecta a las páginas de la tienda salvo el checkout. [Shopify Help Center](https://help.shopify.com/es/manual/online-store/themes/customizing-themes/theme-editor/theme-settings?utm_source=chatgpt.com)

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

## Puesta en producción

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

Shopify confirma que al conectar un dominio externo sigues gestionando el dominio, su pago y renovación desde el proveedor externo. [Shopify Help Center](https://help.shopify.com/es/manual/domains/add-a-domain/connecting-domains?utm_source=chatgpt.com)

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

y especifica que debe eliminarse cualquier otro A/AAAA que entre en conflicto. [Shopify Help Center](https://help.shopify.com/es/manual/domains/add-a-domain/connecting-domains/connect-domain-manual?utm_source=chatgpt.com)

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
✓ Craft instalado
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
✓ Diseño Craft
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

Shopify señala que los cambios DNS suelen hacerse efectivos en unas dos horas, aunque en algunos casos pueden tardar hasta 48 horas. [Shopify Help Center](https://help.shopify.com/es/manual/domains/add-a-domain/connecting-domains?utm_source=chatgpt.com)

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
             Shopify      Craft
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

Como además quieres **Craft y modificar código**, creo que lo más práctico es que no intentemos aprender todo Shopify de golpe.

Podemos ir construyéndola en este orden:

**1.** Configuración inicial de Shopify  
**2.** Instalar Craft y duplicarlo  
**3.** Entender la estructura de Craft/Liquid  
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
