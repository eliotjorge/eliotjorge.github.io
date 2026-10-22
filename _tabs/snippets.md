---
layout: snippet
title: Snippets
icon: fas fa-code
toc: true
order: 6
---


## Shortcode [bold]
Para poner negritas en bloques que no lo permiten por defecto. Envolver el texto que queramos en [bold]...[/bold] y se sustituirá por <strong>...</strong>

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
height="250"
%}

---

## 8 columnas display grid

{% capture grid-6-columnas_html %}

<div class="contenedor">
<div class="1">1</div>
<div class="2">2</div>
<div class="3">3</div>
<div class="4">4</div>
<div class="5">5</div>
<div class="6">6</div>
<div class="7">7</div>
<div class="8">8</div>
</div>

{% endcapture %}

{% capture grid-6-columnas_css %}

.contenedor{
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 20px;
  align-items: center;
}

.contenedor div{
border: 2px solid grey;
}

{% endcapture %}

{% include playground.html
id="grid-6-columnas"
html=grid-6-columnas_html
css=grid-6-columnas_css
height="250"
%}


---

## 1
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
  height: 250px;
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

{% capture grid_php %}

<?php

echo "Este código PHP solo se muestra como ejemplo.";

?>

{% endcapture %}

{% include playground.html
id="grid01"
html=grid_html
css=grid_css
php=grid_php
image="https://github.com/user-attachments/assets/ae571822-199b-408b-b597-bcad4f69ab6d"
height="250"
%}

## Playground 2

{% include playground.html
    id="ejemplo-php"
    html='<div class="card">Contenido HTML</div>'
    css='.card { padding: 20px; background: #eee; }'
    javascript='console.log("JavaScript ejecutado");'
    php='<?php echo "Este código solo se muestra"; ?>'
    image="https://github.com/user-attachments/assets/ae571822-199b-408b-b597-bcad4f69ab6d"
%}
