---
title: Función para validar DNI (NIF), CIF, NIE con PHP
date: 2024-07-22
description: "Aprende a validar DNI, NIF, CIF y NIE en PHP con una sola función. Descubre expresiones regulares, ejemplos de código y cómo comprobar la letra o dígito de control en identificadores españoles."
categories: [web,programacion,codigo,php,formulario]
tags: [web,programacion,codigo,php,formulario]
image: "https://github.com/user-attachments/assets/445cdfdf-6acc-4a62-b4ba-ada369e069cd"
comments: false
faq:
  - question: "¿Cómo validar un DNI o NIF en PHP?"
    answer: "Para validar un DNI/NIF se comprueba que tenga 8 dígitos seguidos de una letra de control. La letra se calcula con el módulo 23 y debe coincidir con la proporcionada en el número."

  - question: "¿Cuál es la diferencia entre DNI, NIF, CIF y NIE?"
    answer: "El DNI o NIF identifica a ciudadanos españoles, el NIE identifica a extranjeros, y el CIF corresponde a empresas y entidades jurídicas."

  - question: "¿Qué expresiones regulares se usan para validar identificadores españoles?"
    answer: "DNI/NIF: ^[0-9]{8}[A-Z]$, NIE: ^[XYZ][0-9]{7}[A-Z]$, CIF: ^[ABCDEFGHJNPQRSUVW][0-9]{7}[A-Z0-9]$, y NIE especial: ^T[0-9]{8}$."

  - question: "¿Se puede validar un CIF con PHP?"
    answer: "Sí. El algoritmo suma los dígitos pares e impares, calcula el dígito de control y lo compara con el último carácter del CIF, que puede ser una letra o un número."

  - question: "¿El NIE funciona igual que el NIF?"
    answer: "En el NIE, la letra inicial (X, Y, Z) se convierte en un número (0, 1 o 2) antes de calcular la letra de control con el mismo algoritmo que el NIF."

  - question: "¿Qué devuelve la función validDniCifNie en PHP?"
    answer: "Devuelve true si el número es válido y false si no cumple con ningún formato aceptado."
---

En este post, exploraremos una función en PHP diseñada para validar los principales formatos de identificación utilizados en España: **DNI (NIF)**, **CIF**, y **NIE**. Estos números son fundamentales para identificar tanto a personas físicas como jurídicas en procedimientos oficiales.

Si prefieres **usar JavaScript para hacer esta validación** échale un vistazo a esta entrada, **[Función para validar DNI (NIF), CIF y NIE con JavaScript](https://jorgerosa.dev/posts/funcion-para-validar-nif-nie-cif-con-javascript/)**

<div style="text-align: center;"><img src="https://media.giphy.com/media/kC9Kveaw468cPLxpYE/giphy.gif" alt="Echa un vistazo" width="300" /> </div>

## **Sintaxis**

validDniCifNie(_dni_);

Devuelve un booleano, `true` si es válido y `false` si no cumple las condiciones.

## 💡 [Explicación del código](#explicacion)

## **Código PHP**

```php
/**
 * Validar DNI (NIF), CIF, NIE
 *
 * @param string $dni Número de identificación
 *
 * @return bool Si es válido (true) o no (false)
 */
function validDniCifNie($dni) {
    $dni = strtoupper($dni); // Convertir a mayúsculas
    $letras = 'TRWAGMYFPDXBNJZSQVHLCKE';

    // Validar formato general
    if (!preg_match('/^[A-Z0-9]{9}$/', $dni)) {
        return false;
    }

    // Validar NIF estándar (8 números + 1 letra)
    if (preg_match('/^[0-9]{8}[A-Z]$/', $dni)) {
        $numero = substr($dni, 0, 8);
        $letra = substr($dni, -1);
        return $letra === $letras[$numero % 23];
    }

    // Validar NIE (X, Y, Z seguido de 7 números y una letra)
    if (preg_match('/^[XYZ][0-9]{7}[A-Z]$/', $dni)) {
        $numero = str_replace(['X', 'Y', 'Z'], ['0', '1', '2'], substr($dni, 0, 1)) . substr($dni, 1, 7);
        $letra = substr($dni, -1);
        return $letra === $letras[$numero % 23];
    }

    // Validar CIF (letra + 7 números + letra/número)
    if (preg_match('/^[ABCDEFGHJNPQRSUVW][0-9]{7}[A-Z0-9]$/', $dni)) {
        $sumaPar = 0;
        $sumaImpar = 0;

        for ($i = 1; $i <= 6; $i += 2) {
            $sumaPar += (int) $dni[$i];
        }

        for ($i = 0; $i <= 6; $i += 2) {
            $doble = (int) $dni[$i] * 2;
            $sumaImpar += $doble > 9 ? $doble - 9 : $doble;
        }

        $sumaTotal = $sumaPar + $sumaImpar;
        $control = (10 - ($sumaTotal % 10)) % 10;

        $controlEsperado = $dni[8];
        if (ctype_alpha($controlEsperado)) {
            return $controlEsperado === chr(64 + $control); // Letra como control
        } else {
            return $controlEsperado == $control; // Número como control
        }
    }

    // Validar NIE especial (T seguido de 8 caracteres)
    if (preg_match('/^T[0-9]{8}$/', $dni)) {
        return true; // Se acepta directamente
    }

    return false; // No cumple ningún formato válido
}
```

## ¿Qué hace esta función? {#explicacion}

La función `validDniCifNie` recibe como entrada un número de identificación y valida si este corresponde a un formato válido de DNI, CIF o NIE. Además, comprueba la validez del número de control (letra o dígito, dependiendo del caso) que forma parte de estos documentos.

### **Estructura básica de los identificadores**

1. **DNI/NIF (Número de Identificación Fiscal):** 8 dígitos y 1 letra de control.  
   Ejemplo: `12345678A`.

2. **NIE (Número de Identidad de Extranjero):** Comienza con `X`, `Y` o `Z`, seguido de 7 dígitos y una letra de control.  
   Ejemplo: `X1234567L`.

3. **CIF (Código de Identificación Fiscal):** Letra inicial (que indica el tipo de entidad), 7 dígitos y un carácter de control (letra o dígito).  
   Ejemplo: `A1234567H`.

4. **NIE especial:** Inicia con la letra `T` seguida de 8 dígitos.  
   Ejemplo: `T12345678`.

## **Funcionamiento del código**

### 1. **Conversión a mayúsculas**

```php
$dni = strtoupper($dni); // Convertir a mayúsculas
```
Antes de realizar cualquier validación, el código convierte el identificador a mayúsculas para uniformizar el tratamiento de los datos.

### 2. **Validar formato general**
```php
if (!preg_match('/^[A-Z0-9]{9}$/', $dni)) {
    return false;
}
```
Se verifica que el identificador tenga exactamente 9 caracteres alfanuméricos.

### **3. Validación del NIF estándar**
El código utiliza el módulo 23 para calcular la letra de control del NIF. Esta se compara con la letra proporcionada en el identificador.

```php
if (preg_match('/^[0-9]{8}[A-Z]$/', $dni)) {
    $numero = substr($dni, 0, 8);
    $letra = substr($dni, -1);
    return $letra === $letras[$numero % 23];
}
```

### **4. Validación del NIE**
Para los NIE que comienzan con X, Y o Z, se transforman estas letras en números (X = 0, Y = 1, Z = 2) y luego se calcula la letra de control.

```php
if (preg_match('/^[XYZ][0-9]{7}[A-Z]$/', $dni)) {
    $numero = str_replace(['X', 'Y', 'Z'], ['0', '1', '2'], substr($dni, 0, 1)) . substr($dni, 1, 7);
    $letra = substr($dni, -1);
    return $letra === $letras[$numero % 23];
}
```

### **5. Validación del CIF**
Para el CIF, se realizan cálculos separados sobre los dígitos en posiciones pares e impares. El carácter de control puede ser una letra o un número, y se valida en consecuencia.

```php
if (preg_match('/^[ABCDEFGHJNPQRSUVW][0-9]{7}[A-Z0-9]$/', $dni)) {
    $sumaPar = 0;
    $sumaImpar = 0;

    for ($i = 1; $i <= 6; $i += 2) {
        $sumaPar += (int) $dni[$i];
    }

    for ($i = 0; $i <= 6; $i += 2) {
        $doble = (int) $dni[$i] * 2;
        $sumaImpar += $doble > 9 ? $doble - 9 : $doble;
    }

    $sumaTotal = $sumaPar + $sumaImpar;
    $control = (10 - ($sumaTotal % 10)) % 10;

    $controlEsperado = $dni[8];
    if (ctype_alpha($controlEsperado)) {
        return $controlEsperado === chr(64 + $control); // Letra como control
    } else {
        return $controlEsperado == $control; // Número como control
    }
}
```

### **6. Validación del NIE especial**
Los NIE especiales que comienzan con T se consideran válidos sin validación adicional.

```php
if (preg_match('/^T[0-9]{8}$/', $dni)) {
    return true; // Se acepta directamente
}
```

Para hacer la **validación usando JavaScript** pásate por esta entrada **[Función para validar DNI (NIF), CIF y NIE con JavaScript](https://jorgerosa.dev/posts/funcion-para-validar-nif-nie-cif-con-javascript/)**
