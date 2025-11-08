---
title: "Cómo solucioné el problema de los Colores Globales de Divi tras migrar WordPress"
description: "Cómo arreglar los colores globales de Divi cuando desaparecen después de una migración de WordPress. Explico el fallo, por qué ocurre y la solución real que me funcionó, copiando directamente el campo et_divi entre bases de datos."
date: 2025-11-07
image: "https://github.com/user-attachments/assets/a0dd56d2-7a57-4b41-a818-a3c347eda1fc"
categories: [Wordpress, Divi]
tags: [Divi, Wordpress, migraciones, colores globales]
faq:
  - question: "¿Por qué desaparecen los colores globales de Divi después de migrar una web?"
    answer: "Porque Divi guarda esos colores en un bloque serializado dentro de la tabla wp_options. Si ese bloque se corrompe o se exporta mal desde phpMyAdmin, las referencias a los colores globales dejan de existir."
  - question: "¿Cómo restaurar los colores globales de Divi sin rehacerlos manualmente?"
    answer: "La solución más rápida y fiable es copiar el campo et_divi de la base de datos original y pegarlo directamente en la instalación de destino, sustituyendo el valor completo."
  - question: "¿Se rompe algo de la web si reemplazo el valor completo de et_divi?"
    answer: "En general no, siempre que copies el valor tal cual. Ese campo contiene estilos, presets y ajustes del tema, así que restaurarlo corrige la pérdida de colores globales y otros ajustes asociados."
---

# Cómo solucioné el problema de los Colores Globales de Divi tras migrar WordPress

A veces una migración parece sencilla hasta que no lo es 😅.  
Estaba moviendo una web hecha con **WordPress + Divi** desde mi servidor de desarrollo al servidor del cliente. Todo funcionaba… excepto algo bastante llamativo: **los colores globales no existían**.

Los módulos que tenían colores globales asignados aparecían con color transparente y, al pasar por encima, Divi mostraba valores del tipo:

```

gcid-e08b5268-b4ff4618-b2bc-5475735831e8

```

Ese tipo de ID es normal en Divi: es la forma que tiene de referenciar internamente un color global.  
El problema era que **Divi ya no tenía ninguna definición para esos IDs**, así que para él eran colores “fantasma”.

<div style="text-align: center;">
<img src="https://media.giphy.com/media/P3gCL7t3cbOWUN8ma7/giphy.gif" alt="Chequeado y aprobado" width="300" />
</div>

---

## Qué estaba pasando realmente

Divi no almacena los colores globales en cada página.  
Los guarda en un bloque enorme dentro de la tabla `wp_options`, en un registro llamado:

```

et_divi

```

Ese campo contiene:

- presets  
- colores globales  
- custom CSS  
- configuraciones del tema  
- flags internos  
- y un buen puñado de cosas más

Todo empaquetado dentro de una cadena **serializada**.  
Y aquí está la clave.

### ✅ Cuando exportas desde phpMyAdmin, esa serialización puede romperse

Si haces una migración manual (FTP + export SQL), hay dos puntos delicados:

- phpMyAdmin no siempre mantiene intacta la serialización  
- si editas el archivo SQL para cambiar rutas, puedes romper accidentalmente la estructura  
- algunos caracteres especiales dentro del JSON interno pueden hacer que Divi ignore los colores globales

Y cuando eso ocurre… Divi “pierde la memoria”.

---

## La solución: copiar *tal cual* el campo `et_divi` de un servidor al otro

Después de revisar:

- exportaciones de Divi  
- ajustes del tema  
- presets globales  
- caché estática  
- regeneración CSS  

…nada funcionaba. Los colores globales seguían sin aparecer.

La solución real fue mucho más directa de lo que esperaba:

### ✅ Copié **todo** el contenido del campo `et_divi` desde la base de datos del servidor de desarrollo y lo pegué directamente en el servidor de producción.

Sin modificar nada.  
Sin editar.  
Sin tocar rutas internas.  
Simplemente sustituir un valor por otro.

En cuanto lo guardé y limpié la caché estática de Divi, **todos los colores globales reaparecieron completos y los módulos volvieron a funcionar como antes**.

Me lo tomé como una pequeña victoria técnica del día 😄  
A veces, lo más simple es lo que mejor funciona.

---

## Ejemplo: dónde está exactamente este campo en la base de datos

En phpMyAdmin:

1. Seleccionas la base de datos.  
2. Abres la tabla:

```
wp_options
```

(o el prefijo que uses)
3. Buscas la opción: 

```
option_name = et_divi
```

4. Haces clic en **Editar**.  
5. Ahí verás un bloque enorme parecido a:

```txt
a:119:{
s:29:"presets_storage_migrated_flag";b:1;
s:23:"builder_custom_defaults";O:8:"stdClass":0:{}
...
s:15:"divi_custom_css";s:24672:" /* todo tu CSS */ ";
...
}
````

Ese bloque contiene literalmente todo lo que Divi necesita para reconstruir tus colores globales.

---

## ¿Es seguro reemplazarlo?

Sí, si se copia tal cual de una instalación que funciona.
**Divi regenerará automáticamente sus assets y CSS** una vez guardes los cambios.

Por supuesto, conviene hacer una copia de seguridad antes.
Pero en mi caso —y seguramente en el tuyo— fue la solución perfecta.

---

## Pequeño consejo para futuras migraciones

Si haces muchas webs con Divi, quizá te ahorre tiempo usar un plugin preparado para manejar datos serializados:

✅ **WP Migrate Lite**
✅ **All-in-One WP Migration**
✅ **Duplicator**

Estos plugins manejan automáticamente serialización, rutas y reemplazos internos sin romper nada.

Aunque conocer el “truco” del campo `et_divi` merece la pena 😉.

<div style="text-align: center;">
<img src="https://media.giphy.com/media/NWpTZunsRRaJor5KD1/giphy.gif" alt="Problema resuelto" width="300" />
</div>
