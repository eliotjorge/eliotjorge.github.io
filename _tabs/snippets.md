---
layout: snippet
title: Snippets
icon: fas fa-code
toc: true
order: 6
---


## Shortcode [bold]
Para poner negritas en bloques que no lo permiten por defecto. Envolver el texto que queramos en [bold]...[/bold] y se sustituirá por \<strong\>...\</strong\>

{% capture playground-bold_html %}
<div class="toggle_item">
<div class="title">
<p>[bold]Esto es bold[/bold] Esto no lo es</p>
</div>
</div>
{% endcapture %}

{% capture playground-bold_javascript %}
document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.toggle_item .title').forEach(function (title) {

        let html = title.innerHTML;

        html = html.replace(
            /\[bold\](.*?)\[\/bold\]/g,
            '<strong style="margin-right:10px;">$1</strong>'
        );

        title.innerHTML = html;

    });

});
{% endcapture %}

{% include playground.html
id="playground-bold"
html=playground-bold_html
javascript=playground-bold_javascript
height="100"
%}

---

## 8 columnas display grid

{% capture grid-8-columnas_html %}

<div class="contenedor">
<div class="1"><p>1</p></div>
<div class="2"><p>2</p></div>
<div class="3"><p>3</p></div>
<div class="4"><p>4</p></div>
<div class="5"><p>5</p></div>
<div class="6"><p>6</p></div>
<div class="7"><p>7</p></div>
<div class="8"><p>8</p></div>
</div>

{% endcapture %}

{% capture grid-8-columnas_css %}

.contenedor{
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 20px;
  align-items: center;
}

p{
text-align:center;
font-family: Lato, "Microsoft Yahei", sans-serif;
}

.contenedor div{
border: 2px solid grey;
}

{% endcapture %}

{% include playground.html
id="grid-8-columnas"
html=grid-8-columnas_html
css=grid-8-columnas_css
height="100"
%}


---

## Display Grid
{% capture grid_html %}

<section id="page">
  <header>Header</header>
  <nav>Navigation</nav>
  <main>Main area</main>
  <footer>Footer</footer>
</section>

{% endcapture %}

{% capture grid_css %}

#page {
  display: grid;
  width: 100%;
  height: 220px;
  grid-template-areas:
    "head head"
    "main nav"
    "foot  foot";
  grid-template-rows: 50px 1fr 30px;
  grid-template-columns: 1fr 150px;
}

#page > header {
  grid-area: head;
  background-color: #8ca0ff;
}

#page > nav {
  grid-area: nav;
  background-color: #ffa08c;
}

#page > main {
  grid-area: main;
  background-color: #ffff64;
}

#page > footer {
  grid-area: foot;
  background-color: #8cffa0;
}

{% endcapture %}


{% include playground.html
id="grid01"
html=grid_html
css=grid_css
php=grid_php
height="250"
%}


## Ocultar elemento dependiendo del idioma de la web

Dar clase **titulo-es**, **titulo-en**, **titulo-zh** al elemento que queremos que se oculte en función del idioma en el que aparezca la web. Útil para página que sean iguales en todos los idiomas salvo el título, por ejemplo "Patrocinadores", y que tenga cambios constantes. De esta manera sólo se hace una página para los 3 idiomas y si hay que m,odificar algo con hacerlo una vez es suficiente.

El 'lang' se coge de la eqtiqueda '<html>' del principio de la web.
 
```css

/*PATRO IDIOMAS*/
/* ===== ESPAÑOL ===== */
html[lang^="es"] .titulo-en,
html[lang^="es"] .titulo-zh {
  display: none;
}

/* ===== INGLÉS ===== */
html[lang^="en"] .titulo-es,
html[lang^="en"] .titulo-zh {
  display: none;
}

/* ===== CHINO ===== */
html[lang^="zh"] .titulo-es,
html[lang^="zh"] .titulo-en {
  display: none;
}

```

## Playground 2

{% include playground.html
    id="ejemplo-php"
    html='<div class="card">Contenido HTML</div>'
    css='.card { padding: 20px; background: #eee; }'
    javascript='console.log("JavaScript ejecutado");'
    php='<?php echo "Este código solo se muestra"; ?>'
    image="https://github.com/user-attachments/assets/ae571822-199b-408b-b597-bcad4f69ab6d"
%}
