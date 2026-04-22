Tengo una placa ESP32-C3-MINI-1U la cual viene con una pantalla táctil capacitiva de 1.28 pulgadas con forma redonda, tiene una resolución de 240x240px. Como salidas de GPIO tiene el pin8 y los puertos TX y RX que pueden emplearse como GPIO 21 y 20 respectivamente. Quiero emplearla en mi coche de carburación con un motor de 4 cilindros y 4 tiempos el cual emplea una bobina para generar la chispa de las bujías y de donde sacaré los pulsos para las revoluciones por minuto mediante un circuito compuesto por un optoacoplador. Empleando la librería LVGL quiero que generes 4 pantallas única y exclusivamente, para este módulo de esp32 + pantalla redonda y un overlay que ponga toda la pantalla roja a modo de shift-light cuando se alcancen las RPMs especificadas en un menú de configuración donde se podrá activar o desactivar que aparezca el overlay y las RPMs a las que queremos que aparezca este overlay rojo.

primera pantalla (pantalla principal): Reloj digital en el centro de la pantalla y debajo el clima y en la parte superior ocupando 1/4 parte aporximadamente y  siguiendo la curvatura de la pantalla 10 "leds" simulados verdes que se vayan encendiendo a medida que aumentan las RPMS y el primero de ellos rojo. Cuando se encienda la pantalla por primera vez los leds harán un barrido.

segunda pantalla: control de música 3 botones, pista anterior, play/pause, pista siguiente, en ese orden de izquierda a derecha.

Tercera pantalla: si se ha habilitado, indicaciones GPS esquemáticas. En la parte superior de esta pantalla un reloj digital pequeño, abajo los iconos de las direcciones por ejemplo una flecha recta si hay que seguir recto, una flecha hacia la izquierda si hay que girar a la izquiera, si hay que coger una rotonda y salir por la tercera salida una icono de rotonda y en el centro y 3, si hay que salir de la autopista por la salida 34 un icono de desvío y debajo el número 34.

Cuarta pantalla: ajustes para activar o desactivar la navegación, activar o desactivar el overlay de shift-light, por defecto activados, y en caso de estar activo un selector dropdown con incrementos de 500 empezando en 1000 y terminando de 6000 que se usará para especificar a qué RPMs aparecerá el overlay rojo que actúa como shift-light.

La comunicación entre pantalla y teléfono se realizará mediante la app Chronos que será la encargada de enviar las indicaciones GPS, recibir las órdenes del reproductor de música entre otras funciones.

La navegación entre pantallas se hará mediante barrido con el dedo, no mediante tap.

No tiene que tener cambio de esferas, ni juegos.

El archivo .bin para el ESP32 se compilará con la extensión platformio de vscode

Se subirá el código a github para mantener un flujo de trabajo CI/CD y que no se pierda el código
