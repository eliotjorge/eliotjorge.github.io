---
title: "Ejemplo playground diaplay grid"
description: ""
date: 2026-07-06
image: ""
categories: []
tags: []
---

# Playground

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
    "nav  main"
    "foot  foot";
  grid-template-rows: 50px 1fr 30px;
  grid-template-columns: 150px 1fr;
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
height="180"
%}
