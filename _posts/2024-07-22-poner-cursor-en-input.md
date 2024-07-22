---
title: ¿Cómo poner el cursor en un input con JavaScript
date: 22-07-2024
categories: [web,programacion,codigo,js,javascript,html,css,formulario,donaciones,olvidados,woocommerce,wordpress]
tags: [web,programacion,codigo,js,javascript,html,css]
pin: false
comments: false
render_with_liquid: false
---

En el formulario de donaciones de la ONG, querían hacer que cuando se seleccionase la camtidad o le dieses al enter después de introducir la cantidad personalizada
en el input correspondiente, el cursor se fuese al campo de "Nombre", igual que los formularios de las grandes ONGs.

Aquí una solución en JavaScript y jQuery.

Javascript
```javascript
document.getElementById(frmObj.id).focus();
document.getElementById(frmObj.id).select();
```

jQuery
```jquery
$("#textboxID").focus();
```

[Link foro Stackoverflow](https://stackoverflow.com/a/10894719)
