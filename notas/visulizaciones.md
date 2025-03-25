Hay una librería que te permite poner tags en tu página que no requiere de bases de datos, se vale de js se llama "busuanzi"
https://github.com/soxft/busuanzi

La forma de instalarla es entre otras formas cargando en un etiqueta script la librería con  "<script async src="https://busuanzi.9420.ltd/js"></script>"

El problema es que nos interesa que slagan las visualizaciones dentro de cada post, por lo que hay que pegar ese script en algún lugar que sólo se cargue en los post, no en la home

El mejor sitio que encontré es _laytouts/full-width.html

Una vez cargada la librería, hay que hacer que salga el propio contador y nos da la opción de poner un icono y como yo tengo cargada la fontawesome pondremo un ojo.

Quiero que salga a la derecha del autor del post así que en _layouts/post.html pegamos:
 <!-- HITS visulaizaciones-->
    <span id="busuanzi_container_page_pv">
        <i class="fa-solid fa-eye"></i>  <span id="busuanzi_page_pv"></span>
    </span>
      <!-- ENDI HITS -->

      justo encima de la carga de la foto, depués de fecha de úlitma actualización
