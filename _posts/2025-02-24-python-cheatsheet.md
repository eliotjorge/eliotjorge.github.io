---
title: "🐍 Python cheatsheet"
image: https://github.com/user-attachments/assets/b98d2abb-0ce1-4ffc-8524-a1190acc75cb
date: 24-02-2025
categories: [python,cheatsheet]
tags: [python,cheatsheet]
pin: false
comments: false
render_with_liquid: false
---


## 1. 📝 **Sintaxis básica**

#### **Comentarios**
  ```python
  # Esto es un comentario de una sola línea
  ```
  Para comentarios de varias líneas puedes usar comillas triples:
  ```python
  """
  Esto es un comentario
  de varias líneas
  """
  ```

#### **Impresión en consola**
  ```python
  print("Hola, mundo!")
  ```

  ```python
  x = "mundo"
  print(f"Hola, {x}")
  ```

  ```python
  x = "Hola"
  y = "mundo"
  
  print(f"{x}, {y}")
  ```

## 2. 🎭 **Variables y tipos de datos**

#### **Asignación de variables**
  ```python
  x = 10
  nombre = "Juan"
  ```

#### **Tipos de datos comunes**
  ```python
  entero = 5          # 🔢 Integer
  flotante = 3.14     # 🔢 Float
  texto = "Hola"      # 📝 String
  booleano = True     # ✅ Boolean
  lista = [1, 2, 3]   # 📜 List
  tupla = (1, 2, 3)   # 🎭 Tuple
  conjunto = {1, 2}   # 🧩 Set
  diccionario = {"clave": "valor"}  # 📖 Dictionary
  ```

## 3. ➕ **Operadores**

#### **Aritméticos**
  
  ```python
  +   # Suma
  -   # Resta
  *   # Multiplicación
  /  # ➗ División (siempre retorna un float)
  //  # 🔢 División entera (sin decimales)
  %   # ♻ Módulo (resto de la división)
  **  # 🔥 Exponentes
  ```

#### **Relacionales**
  ```python
  ==  # 🤝 Igual a
  !=  # ❌ Diferente de
  <   # ⬅ Menor que
  >   # ➡ Mayor que
  <=  # 🔽 Menor o igual que
  >=  # 🔼 Mayor o igual que
  ```

#### **Lógicos**
  ```python
  and  # 🔗 Y
  or   # 🔀 O
  not  # 🚫 Negación
  ```

## 4. 🔄 **Estructuras de control**

#### **Condicionales (if, elif, else)**
  ```python
  if x > 0:
      print("Positivo")
  elif x < 0:
      print("Negativo")
  else:
      print("Cero")
  ```

#### **Bucles (for y while)**
  - **Bucle `for`**:
    ```python
    for i in range(5):  # range(5) va de 0 a 4
        print(i)
    ```

  - **Bucle `while`**:
    ```python
    contador = 0
    while contador < 5:
        print(contador)
        contador += 1
    ```

## 5. 📌 **Funciones**

#### **Definir una función**
  ```python
  def saludar(nombre):
      print(f"Hola, {nombre}!")
  ```

#### **Llamar a la función**
  ```python
  saludar("Juan")
  ```

#### **Funciones con valor de retorno**
  ```python
  def sumar(a, b):
      return a + b
  resultado = sumar(3, 4)
  print(resultado)
  ```

## 6. 📜 **Listas y colecciones**

#### **Crear una lista**
  ```python
  lista = [1, 2, 3, 4]
  ```

#### **Acceder a elementos de una lista**
  ```python
  print(lista[0])   # Primer elemento
  print(lista[-1])  # Último elemento
  ```

#### **Agregar y quitar elementos**
  ```python
  lista.append(5)   # Agrega al final
  lista.remove(3)   # Elimina el primer 3
  ```

#### **Recorrer una lista**
  ```python
  for item in lista:
      print(item)
  ```

## 7. 📖 **Diccionarios**

#### **Crear un diccionario**
  ```python
  diccionario = {"clave1": "valor1", "clave2": "valor2"}
  ```

#### **Acceder a un valor por su clave**
  ```python
  print(diccionario["clave1"])  # Imprime "valor1"
  ```

#### **Agregar un nuevo par clave-valor**
  ```python
  diccionario["clave3"] = "valor3"
  ```

#### **Recorrer un diccionario**
  ```python
  for clave, valor in diccionario.items():
      print(clave, valor)
  ```

## 8. ⚠ **Manejo de errores (excepciones)**

#### **Bloques `try` y `except`**
  ```python
  try:
      x = 10 / 0
  except ZeroDivisionError:
      print("No puedes dividir entre cero")
  ```

## 9. 📦 **Importar módulos**

#### **Importar un módulo**
  ```python
  import math
  print(math.sqrt(16))  # Raíz cuadrada de 16
  ```

#### **Importar una función específica**
  ```python
  from math import sqrt
  print(sqrt(16))
  ```

## 10. 🚀 **Otros conceptos útiles**

#### **List Comprehension** (para crear listas de manera compacta)
  ```python
  cuadrados = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]
  ```

#### **Zip** (combinar dos listas)
  ```python
  lista1 = [1, 2, 3]
  lista2 = ['a', 'b', 'c']
  combinados = zip(lista1, lista2)  # [(1, 'a'), (2, 'b'), (3, 'c')]
  ```

#### **Enumerate** (obtener índice y valor al iterar)
  ```python
  lista = ['a', 'b', 'c']
  for i, valor in enumerate(lista):
      print(i, valor)
  ```

## 11. 🛠 **Métodos comunes de las listas**

#### **`append()`**: Agregar un elemento al final de la lista
  ```python
  lista.append(4)
  ```

#### **`remove()`**: Eliminar un valor de la lista
  ```python
  lista.remove(3)
  ```

#### **`pop()`**: Eliminar un elemento por su índice
  ```python
  lista.pop(2)  # Elimina el tercer elemento
  ```

#### **`sort()`**: Ordenar la lista
  ```python
  lista.sort()  # Ordena de menor a mayor
  ```

## 12. 🪛 **Métodos útiles**



#### `max()` 📈

La función `max()` en Python se utiliza para encontrar el **valor máximo** de un conjunto de elementos. Puede tomar uno o más argumentos, y devuelve el elemento más grande. 🏆 Si se le pasa una lista, tupla o cualquier tipo de iterable, devuelve el elemento con el valor más alto. ¡Es como encontrar el campeón de una competencia! 🥇

##### Sintaxis:

```python
max(iterable, *[, key, default])
```

- **iterable**: Es la colección de elementos de la que queremos obtener el valor máximo (puede ser una lista, tupla, conjunto, etc.) 🔢.
- **key**: (Opcional) Una función que se utiliza para extraer una clave de comparación de cada elemento. 🔍
- **default**: (Opcional) Un valor a devolver si el iterable está vacío. ❌

##### Ejemplos:

1. **Uso básico** 🧑‍💻:

```python
numbers = [1, 5, 3, 9, 2]
print(max(numbers))  # Salida: 9
```

En este caso, la función devuelve **9**, que es el valor más grande de la lista. 🚀

2. **Con varios argumentos**:

```python
print(max(1, 5, 3, 9, 2))  # Salida: 9
```

¡También puedes pasarle varios números directamente! 🎉

3. **Uso con el parámetro `key`** 🔑:

Si tenemos una lista de tuplas y queremos obtener la tupla con el número más alto en la **segunda** posición:

```python
pairs = [(1, 2), (3, 4), (5, 1)]
print(max(pairs, key=lambda x: x[1]))  # Salida: (3, 4)
```

En este caso, `max()` encuentra la tupla `(3, 4)` porque **4** es el valor más alto en la segunda posición. 🎯

4. **Uso con el parámetro `default`** ⚠️:

Si el iterable está vacío, podemos especificar un valor por defecto para evitar errores:

```python
print(max([], default="No hay elementos"))  # Salida: No hay elementos
```

¡Sin miedo a los errores! Si la lista está vacía, devuelve un valor por defecto. 😅
