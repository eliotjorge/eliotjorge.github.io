---
title: "Cómo limpiar automáticamente los logs de WordPress y optimizar la base de datos"
date: 2026-11-16
image: "https://github.com/user-attachments/assets/0ffa48af-6cfa-4584-a266-bf7117adba84"
description: "Aprende a limpiar automáticamente los logs de WordPress, configurar la retención de registros de AIOS y optimizar las tablas MySQL para evitar que la base de datos crezca innecesariamente."
categories: [WordPress, Seguridad, Desarrollo web]
tags: [WordPress, AIOS, All In One Security, MySQL, MariaDB, Base de datos, Logs, WooCommerce, Mantenimiento web, InnoDB]
faq:
  - question: "¿Cómo eliminar automáticamente los registros de auditoría de AIOS en WordPress?"
    answer: "Desde AIOS 5.5.0 es posible configurar el periodo de retención de los registros de auditoría directamente en el plugin. El periodo predeterminado es de 30 días, por lo que los registros antiguos se eliminan automáticamente."
  - question: "¿Es necesario pagar AIOS Premium para limitar los registros de auditoría?"
    answer: "No. AIOS incorporó la configuración de retención de registros de auditoría en su versión gratuita 5.5.0. Se puede establecer cuánto tiempo conservar los registros sin contratar la versión Premium."
  - question: "¿Cómo vaciar la tabla aiowps_audit_log sin acceder a phpMyAdmin?"
    answer: "Desde el apartado Audit Logs de All-In-One Security se puede utilizar la acción masiva Delete all para eliminar los registros conservando la estructura de la tabla."
  - question: "¿Qué diferencia hay entre borrar registros y optimizar una tabla MySQL?"
    answer: "Borrar registros elimina las filas de información, pero no siempre devuelve inmediatamente el espacio físico al sistema. La optimización de la tabla permite reorganizar su almacenamiento y recuperar espacio cuando el motor de base de datos lo permite."
  - question: "¿Qué ocurre si convierto una tabla WordPress de MyISAM a InnoDB?"
    answer: "La conversión cambia el motor de almacenamiento de la tabla, manteniendo sus registros y estructura. InnoDB ofrece transacciones, bloqueo a nivel de fila y recuperación ante errores, pero conviene realizar una copia de seguridad antes de convertirla."
  - question: "¿Es recomendable eliminar automáticamente todos los logs de WooCommerce?"
    answer: "No. WooCommerce y sus extensiones pueden almacenar registros de errores, tareas programadas, sesiones y otros datos operativos. Hay que identificar cada tabla y su función antes de aplicar una política de limpieza para no eliminar información necesaria."
---

Mantener una instalación de WordPress no consiste únicamente en actualizar plugins, revisar posibles vulnerabilidades y realizar copias de seguridad. También hay que prestar atención a algo que suele pasar bastante desapercibido: **el crecimiento de la base de datos**.

Hace poco me encontré con una situación bastante habitual en una de las webs que administro. Utilizaba [All-In-One Security (AIOS)](https://wordpress.org/plugins/all-in-one-wp-security-and-firewall/) para gestionar la seguridad de WordPress y, al revisar el escritorio, apareció un aviso del propio plugin indicando que una de sus tablas ocupaba más de 10 MB y no utilizaba el motor InnoDB.

<img width="1121" height="282" alt="imagen 1" src="https://github.com/user-attachments/assets/389f1038-35b0-43c1-a7f5-ad78f9f19172" />

La tabla afectada era:

```sql
sVc9E_aiowps_audit_log
```

El problema no era tanto su tamaño en aquel momento, sino lo que había detrás: AIOS estaba almacenando registros de auditoría continuamente y, si no se eliminaban periódicamente, la tabla seguía creciendo.

La solución manual era sencilla: entrar en los registros del plugin y eliminarlos. Pero hacerlo cada semana no parecía precisamente una buena estrategia de mantenimiento.

Vamos a ver cómo automatizar esta tarea y qué otras cuestiones conviene revisar para mantener WordPress bajo control.

## 🔍 ¿Por qué crecen tanto los logs de WordPress?

WordPress y sus plugins almacenan información sobre diferentes actividades que se producen en la web.

Dependiendo de las funcionalidades instaladas, podemos encontrar registros de:

- Intentos de acceso y autenticación.
- Cambios realizados por usuarios.
- Actividad del firewall.
- Errores PHP y problemas de ejecución.
- Peticiones que generan errores 404.
- Tareas programadas.
- Actividad de determinadas extensiones.

No todos estos registros tienen la misma finalidad ni necesitan conservarse durante el mismo tiempo.

Por ejemplo, los registros de auditoría de un plugin de seguridad pueden resultar útiles para investigar un acceso sospechoso, pero probablemente no necesitamos conservar indefinidamente cada intento fallido de inicio de sesión.

### El caso de All-In-One Security

AIOS dispone de un sistema de auditoría que registra diferentes eventos relacionados con la actividad de WordPress.

Estos registros se almacenan en una tabla propia de la base de datos, normalmente con este nombre:

```sql
wp_aiowps_audit_log
```

El prefijo `wp_` puede cambiar dependiendo de la configuración de cada instalación.

En mi caso, la tabla utilizaba un prefijo personalizado:

```sql
sVc9E_aiowps_audit_log
```

Si la web recibe bastantes peticiones o tiene varios usuarios activos, el volumen de registros puede aumentar considerablemente.

Y aquí aparece el primer problema: ¿qué sentido tiene conservar miles de registros antiguos que probablemente nunca volveremos a consultar?

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" alt="Persona revisando información y registros de una base de datos" width="300" />
</div>

## ⚙️ Automatizar la limpieza de registros de AIOS

La primera solución que se me ocurrió fue crear una tarea programada que ejecutase periódicamente una consulta SQL para eliminar los registros antiguos.

Sin embargo, antes de desarrollar nada, merece la pena revisar las posibilidades del propio plugin.

### AIOS 5.5.0: retención automática de registros

Una de las novedades más interesantes de AIOS 5.5.0, publicada en octubre de 2026, es la incorporación de una configuración específica para controlar cuánto tiempo se conservan los registros de auditoría.

Hasta entonces, una alternativa conocida era modificar el comportamiento mediante una constante en `wp-config.php`:

```php
define('AIOWPSEC_PURGE_AUDIT_LOGS_AFTER_DAYS', 30);
```

Esta constante permite establecer un periodo de conservación en días en las versiones que utilizan este mecanismo.

Pero con AIOS 5.5.0 se incorpora una configuración nativa para gestionar la retención de los registros, cuyo valor predeterminado es de 30 días.

Por tanto, si utilizamos una versión actualizada, lo primero es revisar las opciones de retención disponibles en el apartado de registros de auditoría del plugin.

La idea es sencilla:

| Configuración | Comportamiento |
|---|---|
| 7 días | Conserva una semana de registros |
| 15 días | Conserva aproximadamente medio mes |
| 30 días | Conserva un mes de actividad |
| 90 días | Conserva tres meses de actividad |

Para una web corporativa o un blog personal, 30 días pueden ser suficientes para consultar incidencias recientes sin acumular información innecesaria.

En cualquier caso, el periodo adecuado dependerá de las necesidades de auditoría y seguridad de cada proyecto.

Puedes consultar los detalles de esta funcionalidad en el [anuncio oficial de AIOS 5.5.0](https://teamupdraft.com/blog/all-in-one-security-5-5-0-release/).

### ¿Y si quiero borrar todos los registros actuales?

Configurar la retención automática evita que el problema se repita, pero no significa necesariamente que los registros antiguos que ya tenemos almacenados desaparezcan inmediatamente.

Para realizar una limpieza inicial podemos utilizar el propio panel de AIOS:

1. Acceder a **AIOS → Dashboard → Audit Logs**.
2. Localizar el desplegable de acciones masivas (*Bulk actions*).
3. Seleccionar **Delete all**.
4. Aplicar la acción y confirmar si se solicita.

<img width="1261" height="318" alt="foto2" src="https://github.com/user-attachments/assets/b0be6937-0ec0-4890-9137-ee57fbc5b8e7" />

De esta forma eliminamos los registros existentes sin tener que entrar en phpMyAdmin ni ejecutar consultas SQL.

Es importante distinguir entre vaciar una tabla y eliminarla. No debemos borrar la tabla `aiowps_audit_log`, ya que AIOS necesita su estructura para continuar almacenando registros.

## 🗄️ El aviso de InnoDB: ¿qué significa?

Volviendo al aviso que encontré en el escritorio de WordPress, AIOS también indicaba que no había podido convertir automáticamente la tabla de auditoría porque superaba los 10 MB.

El mensaje recomendaba utilizar InnoDB como motor de almacenamiento.

Pero ¿qué significa exactamente?

MySQL y MariaDB pueden utilizar diferentes motores para almacenar las tablas. Dos de los más conocidos son MyISAM e InnoDB.

| Característica | MyISAM | InnoDB |
|---|---|---|
| Transacciones | No | Sí |
| Bloqueo | A nivel de tabla | A nivel de fila |
| Claves foráneas | No | Sí |
| Recuperación ante errores | Más limitada | Más robusta |
| Uso habitual en WordPress actual | Legado | Recomendado |

InnoDB es el motor recomendado para las tablas de WordPress y permite gestionar mejor operaciones concurrentes y transacciones.

### Convertir una tabla a InnoDB

Si AIOS no consigue realizar la conversión automáticamente, podemos hacerlo mediante una consulta SQL.

Antes de nada, realizaría una copia de seguridad de la base de datos.

Después, desde phpMyAdmin, seleccionamos la base de datos y ejecutamos:

```sql
ALTER TABLE sVc9E_aiowps_audit_log
ENGINE=InnoDB;
```

La operación convierte el motor de almacenamiento manteniendo los registros existentes.

Hay que tener en cuenta que puede necesitar espacio temporal adicional y bloquear la tabla durante parte del proceso, por lo que es preferible realizarla en un momento de poca actividad.

No es necesario eliminar la tabla ni recrearla.

## 🧹 Borrar registros no siempre significa recuperar espacio

Aquí hay otro detalle interesante que conviene conocer.

Cuando eliminamos registros de una tabla MySQL, no siempre recuperamos inmediatamente todo el espacio físico que ocupaba en el disco.

Por ejemplo, podemos ejecutar:

```sql
DELETE FROM sVc9E_aiowps_audit_log;
```

La consulta elimina todas las filas, pero el almacenamiento puede seguir reservado para reutilizarse posteriormente.

Para reorganizar la tabla podemos utilizar:

```sql
OPTIMIZE TABLE sVc9E_aiowps_audit_log;
```

Esta operación permite reorganizar el almacenamiento y recuperar espacio cuando el motor lo permite.

No obstante, hay que diferenciar dos tareas:

- **DELETE:** elimina los registros.
- **OPTIMIZE TABLE:** reorganiza el almacenamiento de la tabla.

No necesitamos ejecutar `OPTIMIZE TABLE` después de cada eliminación de registros. Es una operación de mantenimiento que tiene sentido cuando se ha producido una limpieza considerable.

Además, en tablas InnoDB grandes puede implicar trabajo adicional y espacio temporal, por lo que conviene evitar ejecutarla continuamente sin necesidad.

## 🛒 ¿Qué ocurre cuando tenemos WooCommerce?

Aquí es donde el asunto se vuelve todavía más interesante.

En una instalación de WordPress con WooCommerce podemos encontrar bastantes más tablas y registros que en una web corporativa sencilla.

WooCommerce y sus extensiones gestionan diferentes tipos de información:

- Sesiones de clientes.
- Registros de errores.
- Tareas programadas mediante Action Scheduler.
- Información de pedidos.
- Datos de pagos y transacciones.
- Información de actividad de determinadas extensiones.

Es importante no confundir estos datos. No todo lo que se almacena es un log prescindible.

Por ejemplo, eliminar registros antiguos de errores puede ser razonable, pero borrar información de pedidos o tareas pendientes puede provocar problemas de funcionamiento.

También conviene revisar qué está generando realmente el crecimiento de la base de datos. No debemos asumir que cada visita a la tienda genera necesariamente un registro de auditoría de WooCommerce: depende de las funcionalidades y extensiones que tengamos instaladas.

### Identificar las tablas que más espacio ocupan

Una forma de empezar es consultar el tamaño de las tablas desde MySQL:

```sql
SELECT
    table_name AS tabla,
    engine AS motor,
    ROUND(
        (data_length + index_length) / 1024 / 1024,
        2
    ) AS tamano_mb
FROM information_schema.tables
WHERE table_schema = DATABASE()
ORDER BY data_length + index_length DESC;
```

Esta consulta muestra:

- Nombre de la tabla.
- Motor de almacenamiento.
- Tamaño aproximado en MB, incluyendo datos e índices.

Por ejemplo, podríamos obtener algo parecido a esto:

| Tabla | Motor | Tamaño |
|---|---|---:|
| wp_postmeta | InnoDB | 18,42 MB |
| wp_aiowps_audit_log | InnoDB | 14,80 MB |
| wp_actionscheduler_logs | InnoDB | 8,25 MB |
| wp_woocommerce_sessions | InnoDB | 4,10 MB |
| wp_options | InnoDB | 2,30 MB |

*Los valores son ilustrativos, no corresponden a una instalación real.*

Esta consulta resulta especialmente útil porque permite detectar qué tablas están creciendo y dónde merece la pena centrar el mantenimiento.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Revisión de datos y análisis de información" width="300" />
</div>

## 🔧 Crear un sistema de mantenimiento reutilizable

Aunque AIOS ya permite gestionar la retención de sus registros, cuando administramos varias instalaciones WordPress puede resultar interesante disponer de un sistema de mantenimiento común.

Mi planteamiento sería desarrollar un pequeño plugin propio o un *Must-Use Plugin* (MU-plugin) que centralice determinadas tareas de mantenimiento.

Por ejemplo:

```php
<?php
/**
 * Plugin Name: JR Database Maintenance
 * Description: Tareas programadas de mantenimiento de WordPress.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
```

A partir de ahí podríamos incorporar diferentes tareas:

1. Limpieza de registros temporales que ya no sean necesarios.
2. Eliminación de logs antiguos de extensiones compatibles.
3. Limpieza de sesiones caducadas.
4. Revisión de tareas fallidas de Action Scheduler.
5. Registro de las operaciones de mantenimiento realizadas.

Para programar las tareas podemos utilizar WP-Cron:

```php
if (!wp_next_scheduled('jr_database_maintenance')) {
    wp_schedule_event(
        time(),
        'daily',
        'jr_database_maintenance'
    );
}

add_action('jr_database_maintenance', function () {

    // Aquí se ejecutarían las tareas
    // de mantenimiento configuradas.

});
```

Este ejemplo únicamente registra una tarea diaria: todavía no elimina ningún dato.

Las consultas de limpieza deberían desarrollarse de forma independiente para cada tabla, comprobando previamente su estructura y los criterios de conservación.

**Un detalle importante sobre WP-Cron:** no funciona como un cron tradicional del servidor. WordPress comprueba las tareas pendientes cuando recibe visitas, por lo que una web con poco tráfico puede ejecutar las tareas con retraso.

Si necesitamos horarios fiables, podemos desactivar la ejecución automática de WP-Cron y configurar una tarea real desde el panel del alojamiento que invoque periódicamente `wp-cron.php`.

Esto permite tener un mantenimiento más predecible, especialmente en tiendas WooCommerce o instalaciones con bastante actividad.

## 📚 Referencias técnicas

- [All-In-One Security – WordPress.org](https://wordpress.org/plugins/all-in-one-wp-security-and-firewall/)
- [AIOS 5.5.0: novedades y cambios oficiales](https://teamupdraft.com/blog/all-in-one-security-5-5-0-release/)
- [MySQL: optimización de tablas](https://dev.mysql.com/doc/refman/8.4/en/optimize-table.html)
- [WordPress: documentación de WP-Cron](https://developer.wordpress.org/plugins/cron/)
- [WooCommerce: documentación de Action Scheduler](https://actionscheduler.org/)
