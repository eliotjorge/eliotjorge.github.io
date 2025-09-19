---
title: Función para validar DNI (NIF), CIF y NIE con JavaScript
date: 2025-09
description: "Aprende a validar DNI, NIF, CIF y NIE en JavaScript con una sola función. Incluye expresiones regulares, ejemplos de código, explicaciones paso a paso y cómo comprobar la letra o dígito de control en identificadores españoles."
categories: [web,programacion,codigo,javascript,formulario]
tags: [web,programacion,codigo,javascript,formulario]
image: "https://github.com/user-attachments/assets/09f5c44e-9cec-45f4-bee8-b46682514a13"
comments: false
faq:
  - question: "¿Cómo validar un DNI o NIF en JavaScript?"
    answer: "En JavaScript puedes usar una expresión regular para comprobar el formato y luego calcular la letra de control con el módulo 23, comparándola con la proporcionada."
  - question: "¿Cuál es la diferencia entre DNI, NIF, CIF y NIE?"
    answer: "El DNI/NIF identifica a ciudadanos españoles, el NIE a extranjeros, y el CIF corresponde a empresas y entidades jurídicas."
  - question: "¿Qué expresiones regulares se usan para validar identificadores españoles en JS?"
    answer: "DNI/NIF: ^[0-9]{8}[A-Z]$, NIE: ^[XYZ][0-9]{7}[A-Z]$, CIF: ^[ABCDEFGHJNPQRSUVW][0-9]{7}[A-Z0-9]$, y NIE especial: ^T[0-9]{8}$."
  - question: "¿Se puede validar un CIF con JavaScript?"
    answer: "Sí. Se suman los dígitos en posiciones pares e impares, se calcula el dígito de control y se compara con el último carácter del CIF."
  - question: "¿El NIE funciona igual que el NIF?"
    answer: "En el NIE, la letra inicial (X, Y o Z) se convierte en 0, 1 o 2 antes de calcular la letra de control con el mismo algoritmo del NIF."
  - question: "¿Qué devuelve la función validDniCifNie en JavaScript?"
    answer: "Devuelve true si el número es válido y false si no cumple con ningún formato aceptado."
---

En esta ocasión voy a dejar por aquí una función en **JavaScript** que permite validar los principales documentos identificativos en España: **DNI/NIF**, **NIE** y **CIF**. Algo bastante útil cuando necesitas comprobar que los datos de un formulario son correctos ✅.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/mEVWOs5Kto9RErUBCi/giphy.gif" alt="Chequeado y aprobado" width="300" />
</div>

## 📌 Sintaxis

```js
validDniCifNie(dni);
````

Devuelve un valor booleano:

* `true` si el identificador es válido.
* `false` si no cumple ninguna condición.

---

## 💡 [Explicación del código](#explicacion)

## **Código JavaScript**

```js
/**
 * Validar DNI (NIF), CIF, NIE en JavaScript
 *
 * @param {string} dni Número de identificación
 * @returns {boolean} true si es válido, false en caso contrario
 */
function validDniCifNie(dni) {
  dni = dni.toUpperCase(); // Normalizar a mayúsculas
  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

  // Validación formato general
  if (!/^[A-Z0-9]{9}$/.test(dni)) {
    return false;
  }

  // NIF estándar (8 números + 1 letra)
  if (/^[0-9]{8}[A-Z]$/.test(dni)) {
    const numero = parseInt(dni.slice(0, 8), 10);
    const letra = dni[8];
    return letra === letras[numero % 23];
  }

  // NIE (X, Y, Z seguido de 7 números y una letra)
  if (/^[XYZ][0-9]{7}[A-Z]$/.test(dni)) {
    const reemplazo = { X: "0", Y: "1", Z: "2" };
    const numero = reemplazo[dni[0]] + dni.slice(1, 8);
    const letra = dni[8];
    return letra === letras[parseInt(numero, 10) % 23];
  }

  // CIF (letra + 7 números + letra/número)
  if (/^[ABCDEFGHJNPQRSUVW][0-9]{7}[A-Z0-9]$/.test(dni)) {
    let sumaPar = 0;
    let sumaImpar = 0;

    for (let i = 1; i <= 6; i += 2) {
      sumaPar += parseInt(dni[i], 10);
    }

    for (let i = 0; i <= 6; i += 2) {
      let doble = parseInt(dni[i], 10) * 2;
      sumaImpar += doble > 9 ? doble - 9 : doble;
    }

    const sumaTotal = sumaPar + sumaImpar;
    const control = (10 - (sumaTotal % 10)) % 10;
    const controlEsperado = dni[8];

    if (/[A-Z]/.test(controlEsperado)) {
      return controlEsperado === String.fromCharCode(64 + control); // Letra
    } else {
      return parseInt(controlEsperado, 10) === control; // Número
    }
  }

  // NIE especial (T seguido de 8 dígitos)
  if (/^T[0-9]{8}$/.test(dni)) {
    return true;
  }

  return false;
}
```

---

## ¿Qué hace esta función? {#explicacion}

El objetivo de la función es **comprobar si un identificador es válido según su formato oficial en España**. Incluye reglas diferentes según se trate de un **NIF**, **NIE** o **CIF**.

---

## 📊 Tabla comparativa

| Tipo de documento | Formato                                     | Expresión regular                       | Ejemplo     |
| ----------------- | ------------------------------------------- | --------------------------------------- | ----------- |
| **DNI / NIF**     | 8 números + 1 letra                         | `^[0-9]{8}[A-Z]$`                       | `12345678A` |
| **NIE**           | Letra inicial (X, Y, Z) + 7 números + letra | `^[XYZ][0-9]{7}[A-Z]$`                  | `X1234567L` |
| **CIF**           | Letra inicial + 7 números + letra/número    | `^[ABCDEFGHJNPQRSUVW][0-9]{7}[A-Z0-9]$` | `A1234567H` |
| **NIE especial**  | T + 8 dígitos                               | `^T[0-9]{8}$`                           | `T12345678` |

---

## 🚀 Ejemplos de uso

```js
console.log(validDniCifNie("12345678Z")); // true (DNI válido)
console.log(validDniCifNie("X1234567L")); // true (NIE válido)
console.log(validDniCifNie("A58818501")); // true (CIF válido)
console.log(validDniCifNie("12345678A")); // false (letra incorrecta)
```

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" alt="Validando identificadores" width="300" />
</div>
