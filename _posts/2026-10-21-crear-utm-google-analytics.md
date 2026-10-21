---
title: "Cómo crear UTM en Google Analytics para medir tus campañas"
date: 2026-10-21
image: "https://github.com/user-attachments/assets/db03c154-1870-4d10-96fe-c47c1c89bf94"
description: "Aprende a crear URLs con parámetros UTM para Google Analytics 4 y descubre de dónde llegan las visitas a tu web desde newsletters, redes sociales y otros enlaces."
categories: [analitica-web, marketing-digital, tutoriales]
tags: [google-analytics, ga4, utm, seo, email-marketing, redes-sociales, analitica-web, medicion-de-campanas]
faq:
  - question: "¿Qué es una UTM y para qué sirve?"
    answer: "Una UTM es un parámetro que se añade a la URL de una página para identificar el origen, el medio y la campaña que genera una visita. Permite medir en Google Analytics 4 el tráfico procedente de newsletters, redes sociales, anuncios y otros enlaces etiquetados."
  - question: "¿Cómo crear una URL con UTM para Google Analytics 4?"
    answer: "Puedes utilizar el Creador de URLs de campañas de Google Analytics. Introduce la URL de destino y completa los campos utm_source, utm_medium y utm_campaign. Después, copia la URL generada y úsala en el enlace que quieras medir."
  - question: "¿Qué diferencia hay entre utm_source, utm_medium y utm_campaign?"
    answer: "utm_source identifica la fuente del tráfico, como una newsletter o Instagram; utm_medium identifica el canal, como email u organic_social; y utm_campaign identifica la campaña concreta, como lanzamiento_producto."
  - question: "¿Cómo medir los clics de una newsletter en Google Analytics?"
    answer: "Añade parámetros UTM a los enlaces de la newsletter, utilizando valores como utm_source=newsletter, utm_medium=email y utm_campaign=nombre_de_campana. Después, consulta el informe Informes > Adquisición > Adquisición de tráfico de Google Analytics 4 para analizar las sesiones atribuidas a esa campaña."
  - question: "¿Cómo saber qué red social genera más visitas a mi web?"
    answer: "Etiqueta los enlaces de cada red social con un utm_source diferente, como instagram, facebook o linkedin. Mantén un utm_medium coherente, por ejemplo organic_social, y compara la fuente, el medio, las sesiones y las conversiones en Google Analytics 4."
  - question: "¿Las UTM mejoran el posicionamiento SEO de una página?"
    answer: "No. Los parámetros UTM no mejoran directamente el posicionamiento orgánico. Su función es medir el rendimiento de las campañas y conocer qué enlaces generan tráfico y conversiones."
  - question: "¿Las UTM funcionan si mi web está hecha con Jekyll y alojada en GitHub Pages?"
    answer: "Sí. Las UTM funcionan con una web estática creada con Jekyll y alojada en GitHub Pages siempre que Google Analytics 4 esté correctamente instalado, el usuario permita la medición correspondiente y los parámetros lleguen a la página de destino."
  - question: "¿Debo crear una UTM diferente para cada enlace?"
    answer: "No siempre. Utiliza los mismos parámetros para los enlaces que quieras agrupar dentro de una campaña y añade utm_content cuando necesites distinguir ubicaciones o creatividades, como un botón principal y un enlace situado en el pie de una newsletter."
---

A veces publicamos una entrada nueva, enviamos una newsletter o compartimos un enlace en redes sociales y vemos que llegan visitas a nuestra web. Hasta ahí, todo bien. El problema aparece cuando queremos responder a una pregunta bastante más interesante: **¿de dónde vienen exactamente esas visitas y qué enlace ha funcionado mejor?** 🤔

Google Analytics 4 (GA4) permite consultar las fuentes de tráfico, pero no siempre ofrece el nivel de detalle que necesitamos. Por ejemplo, puede interesarnos distinguir entre las visitas que llegan desde Instagram, las de una campaña de email marketing y las de un enlace que hemos compartido en una publicación concreta.

Para eso están las **UTM**, unos parámetros que añadimos a las URLs para identificar el origen de cada visita.

## 🔎 ¿Qué son las UTM y cómo funcionan?

Las UTM son parámetros de seguimiento que se incorporan al final de una URL. Cuando alguien hace clic en un enlace etiquetado y llega a nuestra web, Google Analytics puede utilizar esos parámetros para identificar la fuente, el medio y la campaña que han generado esa visita.

Imaginemos que publicamos una entrada sobre SEO en nuestro blog y queremos compartirla en tres sitios:

- Una newsletter enviada a nuestros suscriptores.
- Una publicación en Instagram.
- Una publicación en LinkedIn.

Si utilizamos el mismo enlace en los tres canales, nos resultará más difícil identificar qué visitas proceden de cada acción.

En cambio, podemos etiquetar cada enlace con parámetros UTM diferentes. Así, aunque todos lleven a la misma página, GA4 podrá distinguir las campañas que hemos configurado.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Persona trabajando frente al ordenador mientras analiza datos de una campaña digital" width="300" loading="lazy" />
</div>

Lo interesante es que no necesitamos modificar nuestra web, instalar un complemento adicional ni crear una página diferente para cada canal. Basta con preparar correctamente las URLs y comprobar que Google Analytics está funcionando.

## 🧩 Los parámetros UTM que debes conocer

Aunque existen varios parámetros, hay tres fundamentales para identificar una campaña: `utm_source`, `utm_medium` y `utm_campaign`.

También podemos utilizar `utm_content` y `utm_term` cuando necesitamos información más específica.

| Parámetro | ¿Qué identifica? | Ejemplo |
|---|---|---|
| `utm_source` | La fuente del tráfico | `newsletter`, `instagram` |
| `utm_medium` | El medio o canal | `email`, `organic_social` |
| `utm_campaign` | La campaña concreta | `guia_seo_2026` |
| `utm_content` | La variante o ubicación del enlace | `boton_principal`, `enlace_footer` |
| `utm_term` | La palabra clave asociada a una campaña de pago | `consultor_seo` |

Vamos a ver cómo utilizar cada uno.

### 1. `utm_source`: ¿desde dónde llega el usuario?

Este parámetro identifica la fuente que queremos medir. Puede ser una red social, una newsletter, una plataforma externa o cualquier otro origen que nos interese distinguir.

Por ejemplo:

- `utm_source=instagram`
- `utm_source=linkedin`
- `utm_source=newsletter`
- `utm_source=facebook`

Si compartimos el mismo artículo en Instagram y LinkedIn, utilizaremos una fuente distinta en cada enlace.

### 2. `utm_medium`: ¿a través de qué canal llega?

El medio nos permite clasificar el tipo de tráfico.

Algunos valores habituales son:

- `email`: campañas de correo electrónico.
- `organic_social`: publicaciones orgánicas en redes sociales.
- `paid_social`: publicidad en redes sociales.
- `cpc`: campañas de coste por clic.
- `referral`: tráfico de referencia procedente de otras webs, cuando lo etiquetamos manualmente.

Es importante mantener una nomenclatura coherente. Si unas veces utilizamos `email`, otras `Email` y otras `correo`, podemos terminar con los datos repartidos entre distintas categorías.

### 3. `utm_campaign`: ¿qué campaña estamos midiendo?

Este parámetro identifica la iniciativa concreta que queremos analizar.

Por ejemplo:

- `utm_campaign=lanzamiento_blog`
- `utm_campaign=newsletter_octubre`
- `utm_campaign=promocion_navidad`

Lo recomendable es utilizar un nombre que podamos reconocer fácilmente meses después. Evitar nombres demasiado genéricos como `campana1` o `promocion` nos ahorrará trabajo cuando tengamos que revisar los informes.

### 4. `utm_content`: ¿qué enlace ha recibido el clic?

Este parámetro es especialmente útil cuando incluimos varios enlaces hacia la misma página dentro de una campaña.

Imaginemos que una newsletter contiene un botón al principio del correo y un enlace de texto al final. Ambos llevan al mismo artículo, pero queremos saber cuál recibe más clics.

Podemos diferenciarlos así:

- `utm_content=boton_principal`
- `utm_content=enlace_footer`

De esta forma, podremos comparar las variantes en los informes que incluyan la dimensión de contenido del anuncio manual.

### 5. `utm_term`: ¿qué palabra clave estamos identificando?

Se utiliza principalmente para identificar palabras clave asociadas a campañas de publicidad de pago.

Por ejemplo, si realizamos una campaña en la que queremos identificar el tráfico asociado a una palabra clave concreta, podemos utilizar `utm_term=consultor_seo`.

Para el seguimiento habitual de publicaciones orgánicas o newsletters, normalmente no necesitaremos este parámetro.

## 🛠️ Cómo crear una UTM con la herramienta de Google

La forma más sencilla de empezar es utilizar el creador oficial de URLs de campañas de Google Analytics.

👉 [Abrir el Creador de URLs de campañas](https://ga-dev-tools.google/campaign-url-builder/)

No necesitamos construir las URLs manualmente, aunque entender su estructura nos ayudará a detectar errores.

Vamos a utilizar como ejemplo una entrada ficticia de nuestro blog:

`https://ejemplo.com/blog/guia-seo/`

Queremos compartirla en una newsletter llamada `octubre_2026`.

En el generador, rellenaríamos los campos de esta forma:

- **Website URL:** `https://ejemplo.com/blog/guia-seo/`
- **Campaign Source:** `newsletter`
- **Campaign Medium:** `email`
- **Campaign Name:** `octubre_2026`
- **Campaign Content:** `boton_principal` (opcional).

El resultado sería una URL como esta:

`https://ejemplo.com/blog/guia-seo/?utm_source=newsletter&utm_medium=email&utm_campaign=octubre_2026&utm_content=boton_principal`

¡Ya tenemos nuestra primera URL etiquetada! 🎯

Cuando un usuario haga clic en ella y visite la página, Google Analytics podrá asociar la sesión con los valores de campaña que hemos definido, siempre que se cumplan las condiciones de medición.

### ¿Y si quiero crear la UTM manualmente?

También podemos añadir los parámetros directamente a la URL.

La estructura básica es la siguiente:

```text
https://ejemplo.com/blog/guia-seo/
?utm_source=newsletter
&utm_medium=email
&utm_campaign=octubre_2026
```

En una URL real, todo debe ir seguido, sin saltos de línea:

```text
https://ejemplo.com/blog/guia-seo/?utm_source=newsletter&utm_medium=email&utm_campaign=octubre_2026
```

Hay tres detalles que conviene recordar:

1. El primer parámetro se introduce con `?`.
2. Los parámetros siguientes se separan mediante `&`.
3. Cada parámetro tiene un nombre y un valor separados por `=`.

Si la URL original ya contiene parámetros de consulta, debemos añadir las UTM con `&` en lugar de introducir un segundo `?`.

Por ejemplo:

```text
https://ejemplo.com/buscar?q=seo&utm_source=newsletter&utm_medium=email&utm_campaign=octubre_2026
```

Además, si queremos incluir valores con espacios o caracteres especiales, debemos codificarlos correctamente para que la URL se interprete sin errores. Lo más sencillo es utilizar nombres cortos, en minúsculas y separados por guiones bajos.

## 📩 Cómo utilizar UTM en email marketing

Las newsletters son uno de los casos en los que más sentido tiene etiquetar nuestros enlaces.

Si utilizamos una plataforma de email marketing para enviar comunicaciones, podemos incorporar las UTM a los enlaces de los correos y comprobar posteriormente qué tráfico generan.

Imaginemos que enviamos una newsletter con tres enlaces:

- Un botón que lleva a una nueva entrada.
- Una imagen que lleva al mismo artículo.
- Un enlace de texto al final del correo.

Podemos utilizar una estructura común para toda la campaña:

```text
utm_source=newsletter
utm_medium=email
utm_campaign=octubre_2026
```

Y añadir un parámetro `utm_content` diferente para cada ubicación:

```text
# Botón principal
utm_content=boton_principal

# Imagen
utm_content=imagen

# Enlace del pie
utm_content=enlace_footer
```

La URL completa del botón sería:

```text
https://ejemplo.com/blog/guia-seo/?utm_source=newsletter&utm_medium=email&utm_campaign=octubre_2026&utm_content=boton_principal
```

Mientras que la del enlace del pie sería:

```text
https://ejemplo.com/blog/guia-seo/?utm_source=newsletter&utm_medium=email&utm_campaign=octubre_2026&utm_content=enlace_footer
```

Así podemos analizar qué ubicación genera más visitas y estudiar si esas visitas terminan realizando alguna acción relevante.

**Un detalle importante:** las UTM permiten analizar las visitas atribuidas a los enlaces, pero no sustituyen las estadísticas propias de la plataforma de email marketing. Para conocer las aperturas del correo o el total de clics registrados por la herramienta de envío, tendremos que consultar también sus informes.

## 📱 Cómo crear UTM para redes sociales

El procedimiento es prácticamente idéntico. La diferencia está en los valores que utilizamos para identificar cada red social.

Supongamos que publicamos un artículo y queremos medir las visitas que llegan desde Instagram, Facebook y LinkedIn.

Podemos mantener el mismo medio y la misma campaña, cambiando la fuente:

**Instagram**

```text
https://ejemplo.com/blog/guia-seo/?utm_source=instagram&utm_medium=organic_social&utm_campaign=promocion_guia_seo
```

**Facebook**

```text
https://ejemplo.com/blog/guia-seo/?utm_source=facebook&utm_medium=organic_social&utm_campaign=promocion_guia_seo
```

**LinkedIn**

```text
https://ejemplo.com/blog/guia-seo/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=promocion_guia_seo
```

Con esta estructura, las visitas de las tres redes sociales se podrán comparar dentro de la misma campaña.

Si además queremos distinguir diferentes publicaciones de una misma red, podemos añadir un `utm_content` específico:

```text
utm_content=post_carrusel
```

O bien:

```text
utm_content=post_enlace_perfil
```

Esto resulta útil cuando reutilizamos una misma URL en varias ubicaciones.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" alt="Persona utilizando un ordenador para gestionar publicaciones y contenidos digitales" width="300" loading="lazy" />
</div>

### ¿Debemos etiquetar todos los enlaces de nuestra web?

No. Este punto es importante.

Las UTM están pensadas para identificar campañas y enlaces externos que controlamos, como newsletters, publicaciones sociales o anuncios.

No es recomendable añadirlas indiscriminadamente a los enlaces internos de nuestra propia web. Si un usuario está leyendo una entrada y hace clic en un enlace interno con nuevas UTM, podemos introducir información de campaña que complique la interpretación de sus sesiones y de las fuentes de tráfico.

Para analizar la navegación entre páginas de nuestra web, es preferible utilizar los informes de páginas, eventos y recorridos de GA4.

## 📊 Cómo consultar las visitas de tus UTM en Google Analytics 4

Una vez que hemos publicado los enlaces, toca comprobar si están funcionando.

Entra en Google Analytics 4 y selecciona la propiedad correspondiente a tu web.

A continuación, accede a:

**Informes → Adquisición → Adquisición de tráfico**

En este informe podemos analizar las sesiones y las fuentes de tráfico que llegan a nuestra web.

Según la configuración del informe y las dimensiones disponibles, podremos consultar datos como:

- **Fuente de la sesión:** permite identificar la fuente, como `newsletter` o `instagram`.
- **Medio de la sesión:** muestra el medio, como `email` u `organic_social`.
- **Fuente/medio de la sesión:** combina ambos valores, por ejemplo `newsletter / email`.
- **Campaña de la sesión:** identifica la campaña, como `octubre_2026`.

Si queremos comparar redes sociales, podemos utilizar la dimensión de fuente/medio de la sesión. Si lo que nos interesa es el rendimiento de una newsletter concreta, podemos revisar la campaña y sus métricas.

Para analizar los resultados con mayor detalle, también podemos explorar otras métricas disponibles, como las sesiones con interacción, las conversiones o los eventos clave configurados en nuestra propiedad.

La interfaz de GA4 puede variar según la configuración de los informes, por lo que quizá tengamos que cambiar la dimensión principal o añadir una dimensión secundaria para ver todos los datos que buscamos.

### ¿Cuánto tardan en aparecer los datos?

No siempre veremos los resultados inmediatamente en los informes estándar. Podemos comprobar primero si las visitas están llegando mediante los informes en tiempo real o DebugView, si tenemos una configuración de depuración disponible.

Después, conviene revisar los informes de adquisición cuando los datos se hayan procesado.

Si no aparecen las UTM, comprobaría estos puntos:

1. Que la URL utilizada contiene los parámetros correctos.
2. Que Google Analytics 4 está instalado y funcionando en la página de destino.
3. Que el consentimiento de medición y la configuración de privacidad permiten recoger los datos correspondientes.
4. Que estamos consultando la propiedad y el periodo correctos.
5. Que los nombres de los parámetros están escritos correctamente y sus valores no se han modificado al copiar el enlace.

Las UTM no pueden compensar una instalación incorrecta de Analytics ni garantizar que todos los usuarios sean medidos.

## ⚠️ Errores frecuentes al crear enlaces UTM

Aunque la mecánica es sencilla, hay varios errores que pueden dificultar la interpretación de los informes.

### Utilizar nombres diferentes para una misma campaña

Si etiquetamos una misma campaña como `newsletter_octubre`, `Newsletter_Octubre` y `newsletter-octubre`, Analytics puede tratar esos valores como campañas distintas.

Lo mejor es establecer una convención y mantenerla durante toda la campaña.

### Confundir la fuente con el medio

Una estructura como esta:

```text
utm_source=email&utm_medium=newsletter
```

puede funcionar técnicamente, pero no es la nomenclatura que elegiría si quiero identificar la newsletter como fuente y el correo electrónico como medio.

Preferiría:

```text
utm_source=newsletter&utm_medium=email
```

Lo importante es decidir qué representa cada campo y mantener el mismo criterio en todos los enlaces.

### Olvidar alguno de los parámetros principales

Aunque algunos parámetros pueden omitirse técnicamente, conviene incluir `utm_source`, `utm_medium` y `utm_campaign` cuando estamos etiquetando una campaña.

Si faltan datos relevantes, podemos encontrarnos con dimensiones incompletas o valores `(not set)` en los informes.

### Utilizar UTM en enlaces internos

No añadiría parámetros UTM a los enlaces que conectan dos páginas de nuestro propio dominio para medir la navegación. Para eso ya tenemos los informes de páginas y eventos.

### Pensar que cada clic equivale a una sesión

Un clic registrado por una plataforma externa no tiene por qué equivaler a una sesión registrada en GA4. El usuario puede cerrar la página antes de cargar Analytics, bloquear la medición o no dar el consentimiento necesario.

Por tanto, es normal que existan diferencias entre los clics de una newsletter y las sesiones atribuidas en Google Analytics.

## 🗂️ Una convención sencilla para organizar tus UTM

Si vamos a utilizar UTM con frecuencia, merece la pena definir un pequeño sistema de nombres antes de empezar.

Una propuesta sencilla sería la siguiente:

| Campo | Convención | Ejemplo |
|---|---|---|
| Fuente | Nombre de la plataforma o envío | `instagram` |
| Medio | Canal de adquisición | `organic_social` |
| Campaña | Nombre descriptivo y estable | `guia_seo_2026` |
| Contenido | Ubicación o variante | `post_carrusel` |

Para una newsletter, cambiaríamos los dos primeros valores:

```text
utm_source=newsletter
utm_medium=email
utm_campaign=guia_seo_2026
utm_content=boton_principal
```

No existe una única nomenclatura universal que debamos utilizar en todos los proyectos. Lo importante es elegir valores consistentes, fáciles de interpretar y adecuados para las dimensiones de GA4 que queramos analizar.

Si trabajamos con varias personas, también resulta útil mantener un documento compartido con los nombres de las campañas y los enlaces generados. De esta forma evitaremos duplicidades y podremos comparar los resultados a lo largo del tiempo.

## 📚 Documentación oficial

- [Creador de URLs de campañas de Google Analytics](https://ga-dev-tools.google/campaign-url-builder/): herramienta para generar enlaces con parámetros UTM.
- [Creadores de URLs: recoger datos de campañas con URLs personalizadas](https://support.google.com/analytics/answer/10917952?hl=es): documentación oficial sobre los parámetros y la medición de campañas.
- [Dimensiones de fuentes de tráfico en Google Analytics 4](https://support.google.com/analytics/answer/15612152?hl=es): información sobre cómo interpreta Analytics las fuentes de tráfico y las etiquetas manuales.
