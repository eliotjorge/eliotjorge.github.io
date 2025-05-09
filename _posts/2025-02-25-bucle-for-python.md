---
title: "🐍 Python: Bucle FOR"
image: https://github.com/user-attachments/assets/2ebf3ff1-2dd0-4b0c-9142-69bd6d5b91c0
description: "Aprende a usar el bucle for en Python con ejemplos prácticos, incluyendo bucles anidados, uso de range(), y cómo controlar la ejecución con break y continue para optimizar tus programas."
date: 2025-02-25
categories: [python]
tags: [python]
pin: false
comments: false
render_with_liquid: false
---

## **Bucles `for` en Python**

Un bucle `for` en Python se usa para iterar sobre una secuencia (como una lista, tupla, cadena de texto, etc.) y ejecutar un bloque de código para cada elemento de esa secuencia.

### **Sintaxis básica:**
```python
for elemento in secuencia:
    # Código a ejecutar para cada elemento
```
- `elemento` es la variable que toma el valor de cada item en la secuencia.
- `secuencia` puede ser una lista, una tupla, una cadena de texto, un rango de números, entre otros.

---

## **Ejemplos de bucles `for`**

### 1. **Recorrer una lista**
```python
frutas = ["manzana", "banana", "cereza"]

for fruta in frutas:
    print(fruta)
```
**Salida:**
```
manzana
banana
cereza
```

### 2. **Recorrer una cadena de texto**
```python
mensaje = "Hola"

for letra in mensaje:
    print(letra)
```
**Salida:**
```
H
o
l
a
```

### 3. **Recorrer un rango de números (`range`)**
```python
for i in range(5):
    print(i)
```
**Salida:**
```
0
1
2
3
4
```
- `range(5)` genera los números del 0 al 4. El valor final del rango no está incluido.

### 4. **Uso de `range` con inicio y fin**
```python
for i in range(2, 8):
    print(i)
```
**Salida:**
```
2
3
4
5
6
7
```
- `range(2, 8)` genera los números del 2 al 7 (el número 8 no se incluye).

### 5. **Recorrer con `range` y paso**
```python
for i in range(0, 10, 2):
    print(i)
```
**Salida:**
```
0
2
4
6
8
```
- `range(0, 10, 2)` genera los números del 0 al 8, con un paso de 2.

---

## **Operaciones comunes dentro de un bucle `for`**

### 1. **Sumar elementos de una lista**
```python
numeros = [1, 2, 3, 4]
suma = 0

for numero in numeros:
    suma += numero

print(suma)
```
**Salida:**
```
10
```

### 2. **Contar elementos en una lista (cuenta de ocurrencias)**
```python
colores = ["rojo", "azul", "rojo", "verde"]
contador = 0

for color in colores:
    if color == "rojo":
        contador += 1

print(contador)
```
**Salida:**
```
2
```

### 3. **Modificar los elementos de una lista dentro de un `for`**
```python
numeros = [1, 2, 3, 4]

for i in range(len(numeros)):
    numeros[i] *= 2  # Multiplicamos cada número por 2

print(numeros)
```
**Salida:**
```
[2, 4, 6, 8]
```

---

## **Bucles `for` con `enumerate()`**

`enumerate()` es una función muy útil cuando necesitas tanto el **índice** como el **valor** del elemento al recorrer una secuencia.

```python
frutas = ["manzana", "banana", "cereza"]

for indice, fruta in enumerate(frutas):
    print(f"Índice: {indice}, Fruta: {fruta}")
```
**Salida:**
```
Índice: 0, Fruta: manzana
Índice: 1, Fruta: banana
Índice: 2, Fruta: cereza
```

- `enumerate()` devuelve una tupla con el índice y el valor del elemento en cada iteración.

---

## **Bucles `for` con listas de listas**

Puedes usar un bucle `for` dentro de otro para recorrer listas que contienen otras listas.

```python
matriz = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for fila in matriz:
    for columna in fila:
        print(columna)
```
**Salida:**
```
1
2
3
4
5
6
7
8
9
```

---

## **List Comprehension** con `for`

**List Comprehension** es una forma compacta y eficiente de crear listas usando un bucle `for`.

```python
cuadrados = [x**2 for x in range(5)]
print(cuadrados)
```
**Salida:**
```
[0, 1, 4, 9, 16]
```
- Esta sintaxis crea una nueva lista con los cuadrados de los números del 0 al 4.

---

## **`break` y `continue` dentro de un bucle `for`**

- **`break`**: Sale del bucle inmediatamente.
- **`continue`**: Omite el resto del código dentro del bucle y pasa a la siguiente iteración.

### Ejemplo con `break`:
```python
for i in range(10):
    if i == 5:
        break  # Sale del bucle cuando i es igual a 5
    print(i)
```
**Salida:**
```
0
1
2
3
4
```

### Ejemplo con `continue`:
```python
for i in range(5):
    if i == 2:
        continue  # Salta la iteración cuando i es igual a 2
    print(i)
```
**Salida:**
```
0
1
3
4
```
