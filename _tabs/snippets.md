---
layout: snippet
title: Snippets
icon: fas fa-code
toc: true
order: 6
---


## Shortcode [bold]
Para poner negritas en bloques que no lo permiten por defecto.

{% capture playground-bold_html %}

<div class="toggle_item">
<div class="title">
<h1>[bold]Esto es bold[/bold] Esto no lo es</h1>
</div>
</div>

{% endcapture %}

{% capture playground-bold_javascript %}

jQuery(function($) {

    $('.toggle_item .title').each(function() {

        var $title = $(this);
        var html = $title.html();

        html = html.replace(
            /\[bold\](.*?)\[\/bold\]/g,
            '<strong style="margin-right:10px;">$1</strong>'
        );

        $title.html(html);

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
