---
title: Ocultar opción de checkbox en Contact Form 7 una vez alcanzado un número CF7 en Wordpress.
date: 2024-11-26
image: https://www.bubuku.com/wp-content/uploads/2023/01/formularios-contact-form-7_th.png
categories: [web,programacion,codigo,php,formulario,wordpress,cf7]
tags: [web,programacion,codigo,php,formulario,wordpress,cf7]
pin: false
comments: false
render_with_liquid: false
---
# Ocultar opción de checkbox en Contact Form 7 una vez alcanzado un número CF7 en Wordpress.

En este tutorial, vamos a aprender a limitar el número de inscripciones para una actividad en un formulario de Contact Form 7 en WordPress. En nuestro caso, limitaremos las inscripciones a las **Conferencias y promoción turística** a 50 participantes. Una vez alcanzado ese límite, la opción de "Conferencias y promoción turística" se eliminará automáticamente del formulario, y se mostrará un mensaje informando a los usuarios que las inscripciones están cerradas.

## Paso 1: Código en `functions.php`

Primero, necesitaremos modificar el archivo `functions.php` de tu tema para manejar el contador de inscripciones. Esto se puede hacer usando la función `get_option()` y `update_option()` de WordPress para almacenar el número de inscripciones en la base de datos.

Añade el siguiente código en el archivo `functions.php` de tu tema:

```php
// Filtra los elementos del formulario antes de enviarlos (para quitar la opción si está lleno)
function ocultar_conferencia_si_lleno($content) {
    // Obtener el formulario actual
    $formulario_actual = WPCF7_ContactForm::get_current();
	$inscripciones_conf = get_option('inscripciones_conferencia_jorge', 0);
    
    // Verificar si es el formulario específico (por ID o título)
    if ($formulario_actual && $formulario_actual->id == '2464') { // Aseguramos que es el formulario con el ID correcto
        
        // Comprobar si estamos en el formulario correcto y si la opción "Conferencias" está presente
        if (strpos($content, 'name="motivos[]"') !== false) {
			
			// Si ya se alcanzaron las 50 inscripciones, no permitir más
			if ($inscripciones_conf >= 50) {
				// Quitar la opción de Conferencia del checkbox (solo esa opción)
                $content = preg_replace('/<label>\s*<input[^>]*type="checkbox"[^>]*name="motivos\[\]"[^>]*value="Conferencias y promoción turística"[^>]*>\s*<span[^>]*class="wpcf7-list-item-label"[^>]*>\s*Conferencias y promoción turística\s*<\/span>\s*<\/label>/', '', $content);
			}
        }
    }
    return $content;
}

// Función que se ejecuta antes de enviar el formulario para contar las inscripciones
function contar_inscripciones_conferencias_al_enviar($contact_form) {
	
	 $inscripciones_conf = get_option('inscripciones_conferencia_jorge', 0); // Obtiene el número de inscripciones (valor por defecto 0)
	
    // Verificar que el formulario sea el correcto (por ID)
    if ($contact_form->id() == 2464) {
        // Obtener los datos enviados del formulario
        $submitted_data = WPCF7_Submission::get_instance()->get_posted_data();

        // Verificar si "Conferencias y promoción turística" está presente en el array motivos
        if (!empty($submitted_data['motivos']) && is_array($submitted_data['motivos'])) {
            if (in_array('Conferencias y promoción turística', $submitted_data['motivos'])) {
				
				if($inscripciones_conf <= 50){
					$inscripciones_conf++;
        			update_option('inscripciones_conferencia_jorge', $inscripciones_conf); // Guarda el nuevo número
				}
				
         // Si no hay plazas disponibles, invalidar el formulario (por si acaso tenia el formu abierto y no se ha eliminado la opción)
                if ($inscripciones_conf >=50) {
                    add_filter('wpcf7_validate', function($result) {
                        $result->invalidate(null, 'El aforo de la conferencia ya está completo.');
                        return $result;
                    });
                }
            }
        }
    }
}

// Añadir el filtro para modificar el formulario cuando se muestre en la página
add_filter('wpcf7_form_elements', 'ocultar_conferencia_si_lleno');

// Hook para contar las inscripciones cuando el formulario se envía
add_action('wpcf7_before_send_mail', 'contar_inscripciones_conferencias_al_enviar');
```

### Explicación del Código

Con `if ($formulario_actual && $formulario_actual->id == '2464') {` comprobamos que el formulario al que estamos escuchando tiene el `ID` del que corresponda. El `ID` no es el que nos aparece en el la columna de administración del plugin, sino que tenemos que buscarlo en la URL cuando lo estemos editando. Por ejemplo aleditar el formulario la URL es esta `[WEB]/wp-admin/admin.php?page=wpcf7&post=2464&action=edit` el `ÌD` de este formulario es 2464

Contar las inscripciones:

Usamos `get_option('inscripciones_conferencia_jorge', 0)` para recuperar el número actual de inscripciones. Si no existe, se asigna un valor predeterminado de 0.

Si el número de inscripciones alcanza 50, la función devuelve false, lo que impide que se registren más inscripciones.

Si hay menos de 50 inscripciones, incrementamos el contador y lo guardamos con `update_option('inscripciones_conferencia_jorge', $inscripciones)`.

Filtrar y ocultar la opción de "Conferencias y promoción turística": Usamos `preg_replace()` para eliminar la opción de "Conferencias y promoción turística" del formulario si ya se ha alcanzado el límite de inscripciones.

### Explicación del patrón:

- `<label[^>]*>`: Coincide con cualquier etiqueta <label>, permitiendo atributos dentro de la etiqueta.
- `\s*`: Permite cualquier espacio extra antes o después de la palabra "Conferencias".
- `Conferencias y promoción turística`: Coincide exactamente con la palabra "Conferencias y promoción turística".
- `\s*<\/label>`: Asegura que la coincidencia también incluye cualquier espacio extra antes de cerrar la etiqueta `</label>`.
Este patrón es más preciso y evita que otras opciones sean eliminadas.

## Paso 2: Formulario de Contact Form 7
Aquí tienes el código de tu formulario en Contact Form 7. Asegúrate de que el campo checkbox[] esté configurado correctamente para que podamos buscar y manipular la opción "Conferencias".

```html
<div id="responsive-form" class="clearfix">

  <div class="form-row">
    <div class="column-half">[text* nombre class:campo-entrada placeholder "Nombre"]</div>
    <div class="column-half">[text* apellidos class:campo-entrada placeholder "Apellidos"]</div>
  </div>

  <div class="form-row">
    <div class="column-half">[email* email class:campo-entrada placeholder "Email"]</div>
    <div class="column-half">[text* telefono class:campo-entrada placeholder "Teléfono"]</div>
  </div>

  <div class="form-row">
    <div class="column-full">
      <span style="font-weight:bold">Quiero participar en:</span>
      [checkbox* motivos class:checkmotivos use_label_element "Concurso de cocina" "Exposición de Arte" "Conciertos de Música" "Concurso de Fotografía" "Intercambio de Idiomas" "Conferencias y promoción turística" "Cortometraje" "Otros"]
    </div>
  </div>

  [textarea comentarios x1 class:campo-entrada placeholder "Comentarios"] Comentarios [/textarea]

  [submit class:et_pb_button "Enviar"]
</div>
```
### Explicación del Formulario

Campos requeridos:

- **nombre**: Campo de texto para el nombre del participante.
- **apellidos**: Campo de texto para los apellidos.
- **email**: Campo de texto para el correo electrónico.
- **telefono**: Campo de texto para el teléfono de contacto.
- **checkbox[]**: Este es el campo de selección donde los usuarios pueden elegir en qué actividades desean participar. Asegúrate de que la opción "Conferencias" esté presente en el formulario y que etenga la propiedad `use_label_element`

Mostrar el mensaje de inscripciones cerradas
Una vez que la opción de "Conferencias y promoción turística" sea eliminada, agregamos un mensaje al final del formulario para informar a los usuarios de que las inscripciones para las conferencias ya están completas:

## Resumen
Con estos pasos, hemos creado un sistema para gestionar las inscripciones de un evento (conferencias) y asegurarnos de que solo se puedan inscribir un máximo de 50 personas. Una vez alcanzado el límite de inscripciones, la opción de "Conferencias y promoción turística" desaparece del formulario y se muestra un mensaje indicando que las inscripciones están cerradas.

**Funciones PHP**: Usamos funciones de WordPress para almacenar y controlar las inscripciones.

**Formulario CF7**: Modificamos el formulario para incluir una opción de selección de actividades.

**Expresión regular con `preg_replace()`**: Ajustamos la expresión regular para eliminar correctamente la opción de "Conferencias y promoción turística" sin afectar otras partes del formulario.
