---
title: No funcionan los eventos de ratón con JS en DIVI(Wordpress) - RESUELTO
date: 2024-06-28
categories: [web,programacion,codigo,wordpress,divi,js,javascript,html,css,solucion]
tags: [web,programacion,codigo,wordpress,divi,js,javascript,html,css,solucion]
render_with_liquid: false
---

Haciendo la web de [IICG](https://iicg-urjc.es) quería hacer que al pasar con el ratón sobre las fotos de las bombillas, o sobre los elementos del menú.

La idea es añadir unos enventos `moseover` y `mouseout` y llamar a una función que modifique el atributo `src` de la foto para poner la que está encendida, y cambiar de color el elemento del menú.

El problema es que DIVI tiene una opción de hacer etiquetas `img` responsive, por lo que no hay sólo un `src`, sino que hay tambien un `srcset` y al pasar con el ratón, la foto no se cambiaba.

```html
<img loading="lazy" decoding="async" width="352" height="157" src="https://laclavegrafica.es/acciona-construccion.jpg" alt="" title="acciona-construccion" srcset="https://laclavegrafica.es/acciona-construccion.jpg 352w, https://laclavegrafica.es/acciona-construccion-300x134.jpg 300w" sizes="(max-width: 352px) 100vw, 352px" class="wp-image-618">
```

El código que se ha empleado para hacer el efecto es el siguiente:

```javascript
let bombilla1 = document.querySelector(".bombilla-1 img"); //insituto

let menuinstituto = document.querySelector("#home-instituto a");

bombilla1.addEventListener("mouseover", enciendeBombilla1);
bombilla1.addEventListener("mouseout", apagaBombilla1);


menuinstituto.addEventListener("mouseover", enciendeBombilla1);
menuinstituto.addEventListener("mouseout", apagaBombilla1);


function enciendeBombilla1(){
    bombilla1.src = "https://iicg-urjc.es/bombilla1-encendida.png";
    menuinstituto.style.color = "#8cc542";
    console.log("enciende 1");
}
    
function apagaBombilla1(){
    bombilla1.src = "https://iicg-urjc.es/bombilla1.png";
    menuinstituto.style.color = "#87868a";
}	
```
⚠️ **IMPORTANTE**

Para hacer que funcionase esto en DIVI hay que desactivar la opción de hacer que las imágenes sean responsive, para ello nos vamos a **DIVI > Opciones del tema > General > Habilitar imágenes receptivas** y desactivamos esta opción.
