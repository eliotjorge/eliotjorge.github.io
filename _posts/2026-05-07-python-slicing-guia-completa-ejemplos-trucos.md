---
title: "Python Slicing: Guía completa con ejemplos y trucos útiles"
description: "Aprende Python slicing paso a paso con ejemplos prácticos: invertir strings, recorrer listas, trucos de entrevistas y casos reales explicados de forma clara."
image: "https://github.com/user-attachments/assets/766a2b2a-443f-42e7-aa7a-e8f7b1127ce3"
date: 2026-05-07
categories: [python,programacion,guia]
tags: [python,slicing,strings,listas,algoritmos,leetcode]
faq:
  - question: "¿Qué es slicing en Python?"
    answer: "Slicing en Python es una técnica para acceder a partes de una secuencia como strings, listas o tuplas utilizando la sintaxis [inicio:fin:paso]."
  - question: "¿Qué significa [::-1] en Python?"
    answer: "La expresión [::-1] invierte una secuencia en Python, recorriéndola desde el final hasta el principio."
  - question: "¿Cuál es la diferencia entre [::1] y [::-1]?"
    answer: "[::1] recorre la secuencia normalmente sin cambios, mientras que [::-1] la invierte completamente."
  - question: "¿Se puede usar slicing en listas y strings?"
    answer: "Sí, slicing funciona con cualquier tipo de secuencia en Python como listas, strings y tuplas."
---

## Python slicing: entenderlo bien cambia cómo escribes código

Hay un momento cuando estás aprendiendo Python en el que ves algo como esto:

```python
texto[::-1]
````

Y piensas: *vale… esto hace algo… pero ¿qué está pasando aquí?* 🤔

A partir de ahí empiezas a ver slicing en todas partes. Y no es casualidad: es una de esas herramientas pequeñas que, bien usadas, te simplifican muchísimo el código.

---

## La base: cómo funciona slicing

La estructura es siempre esta:

```python
[inicio:fin:paso]
```

* `inicio`: desde dónde empiezas
* `fin`: hasta dónde llegas (sin incluirlo)
* `paso`: cada cuánto avanzas

Ejemplo simple:

```python
s = "abcdef"
print(s[1:4])  # "bcd"
```

---

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/ccRdPf8zWkivm/giphy.gif" alt="persona entendiendo código paso a paso" width="300" />
</div>

---

## El famoso [::-1]

```python
texto = "python"
print(texto[::-1])  # "nohtyp"
```

Aquí pasa algo interesante:

* no defines inicio → empieza desde el final
* no defines fin → llega hasta el principio
* `paso = -1` → va hacia atrás

Resultado: inviertes la cadena 🔁

---

## [::1] vs [::-1]

```python
texto = "hola"

print(texto[::1])   # "hola"
print(texto[::-1])  # "aloh"
```

* `[::1]` → recorrido normal
* `[::-1]` → recorrido inverso

---

## Saltar elementos

Esto es más útil de lo que parece:

```python
nums = [0, 1, 2, 3, 4, 5]
print(nums[::2])  # [0, 2, 4]
```

Te quedas con uno sí, uno no.

Y en reversa:

```python
print(nums[::-2])  # [5, 3, 1]
```

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/bgxQDCg1hdvJm/giphy.gif" alt="patron saltando elementos en lista" width="300" />
</div>

---

## Quitar elementos fácilmente

Quitar el último:

```python
nums = [1, 2, 3, 4]
print(nums[:-1])  # [1, 2, 3]
```

Quitar el primero:

```python
print(nums[1:])  # [2, 3, 4]
```

Son pequeños detalles, pero hacen el código mucho más limpio.

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/q1yJeXsZ3BWvI7xwLv/giphy.gif" alt="quitando elementos en lista" width="300" />
</div>

---

## Copiar listas sin liarla

```python
nums = [1, 2, 3]
copia = nums[:]
```

Esto crea una copia real (no una referencia).

Muy típico en preguntas de entrevistas ⚠️

---

## Palíndromos en una línea

Este patrón aparece muchísimo:

```python
def is_palindrome(s):
    return s == s[::-1]
```

Simple, directo y difícil de mejorar.

---

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" alt="codigo funcionando perfectamente" width="300" />
</div>

---

## Rotar listas (nivel entrevista)

Este ya sube un poco el nivel:

```python
nums = [1, 2, 3, 4, 5]
k = 2

rotated = nums[-k:] + nums[:-k]
print(rotated)  # [4, 5, 1, 2, 3]
```

Lo que haces:

* coges los últimos `k`
* los pones delante
* añades el resto

---

## Invertir solo una parte

```python
nums = [1, 2, 3, 4, 5]
nums[1:4] = nums[1:4][::-1]

print(nums)  # [1, 4, 3, 2, 5]
```

Esto ya es de los que hacen que alguien mire tu código con más atención 👀

---

## Qué hacen [:1], [:2] o [:3]

Aquí ya no estás usando el `paso`, sino el valor de `fin`.

Por ejemplo:

```python
nums = [0, 1, 2, 3, 4, 5]

print(nums[:1])  # [0]
print(nums[:2])  # [0, 1]
print(nums[:3])  # [0, 1, 2]
```

Lo que significa realmente es:

```python
[inicio:fin]
```

Como no indicas `inicio`, Python empieza automáticamente desde el principio.

Y hay un detalle importante:

> el índice final nunca se incluye

Por eso:

* `[:1]` → coge solo el índice `0`
* `[:2]` → coge `0` y `1`
* `[:3]` → coge `0`, `1` y `2`

---

<div style="text-align: center;">
  <img src="https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif" alt="explicacion visual de slicing en python" width="300" />
</div>

---

También puedes combinarlo con `paso`:

```python
nums[:5:2]
# [0, 2, 4]
```

Aquí haces:

* desde el principio
* hasta el índice 5 (sin incluirlo)
* saltando de 2 en 2

---

## Idea mental que me funciona

Cada vez que veo slicing, lo reduzco a esto:

> inicio → fin → paso

Y dos reglas rápidas:

* el `fin` nunca se incluye
* los índices negativos empiezan desde el final
* si falta `inicio` → empieza desde el principio
* si falta `fin` → llega hasta el final
* si falta `paso` → avanza de 1 en 1
