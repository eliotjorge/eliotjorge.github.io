---
title: "🐍 Python: Linked Lists (listas enlazadas)"
image: https://github.com/user-attachments/assets/2ebf3ff1-2dd0-4b0c-9142-69bd6d5b91c0
description: "Aprende qué son las listas enlazadas y cómo implementarlas en Python. Tutorial paso a paso para crear nodos, insertar elementos al inicio y al final, y recorrer la lista de forma sencilla."
date: 2025-02-26
categories: [python]
tags: [python]
pin: false
comments: false
render_with_liquid: false
---

Las **Linked Lists** (listas enlazadas) son una estructura de datos fundamental en programación. Se diferencian de las listas normales de Python (`list`) en cómo almacenan y organizan los datos en memoria.

---

## 📌 ¿Qué es una Linked List?
Es una colección de nodos donde cada nodo contiene dos partes:
1. **Un valor** (dato almacenado).
2. **Un puntero al siguiente nodo** (referencia al siguiente elemento de la lista).

En lugar de estar almacenados en una sola área de memoria continua (como las listas de Python), los elementos de una Linked List están dispersos en memoria y se conectan mediante punteros.

Ejemplo visual de una lista enlazada simple:

```
[10 | *] --> [20 | *] --> [30 | None]
```
Cada nodo tiene un valor y una referencia al siguiente nodo.

---

## 📌 Tipos de Linked Lists
1. **Singly Linked List (Lista enlazada simple)**: Cada nodo apunta al siguiente.
2. **Doubly Linked List (Lista doblemente enlazada)**: Cada nodo apunta al siguiente y al anterior.
3. **Circular Linked List (Lista circular enlazada)**: El último nodo apunta al primero.

---

## 📌 ¿Para qué sirven?
- Son útiles cuando se necesita insertar o eliminar elementos con frecuencia, ya que estas operaciones son más eficientes en una lista enlazada que en una lista de Python (`list`).
- Se usan en estructuras como **colas, pilas, grafos** y en la implementación de memoria dinámica.
- Son ideales cuando no se conoce el tamaño de los datos de antemano y no se quiere reservar un bloque fijo de memoria.

---

## 📌 ¿Cómo se implementa en Python?
Python no tiene una estructura de datos de Linked List incorporada como en otros lenguajes (C, Java), pero podemos implementarlas con clases:

```python
class Node:
    def __init__(self, data):
        self.data = data  # Dato almacenado
        self.next = None  # Puntero al siguiente nodo

class LinkedList:
    def __init__(self):
        self.head = None  # Primer nodo (cabeza de la lista)

    def append(self, data):
        """Añade un nuevo nodo al final"""
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node

    def display(self):
        """Imprime la lista enlazada"""
        temp = self.head
        while temp:
            print(temp.data, end=" -> ")
            temp = temp.next
        print("None")

# Ejemplo de uso:
ll = LinkedList()
ll.append(10)
ll.append(20)
ll.append(30)

ll.display()  # Salida: 10 -> 20 -> 30 -> None
```

---

## 📌 ¿Cuándo usar Linked List vs List de Python?
| Característica | List (Python) | Linked List |
|---|---|---|
| Acceso por índice | Rápido (`O(1)`) | Lento (`O(n)`) |
| Inserción/Eliminación | Lenta si es en medio (`O(n)`) | Rápida en cualquier posición (`O(1)` si ya tienes la referencia) |
| Uso de memoria | Ocupa más por preasignación | Menos, ya que asigna solo lo necesario |
| Implementación | Fácil (`list.append()`) | Requiere definir nodos y punteros |

| Priority apples | Second priority | Third priority |
|-------|--------|---------|
| ambrosia | gala | red delicious |
| pink lady | jazz | macintosh |
| honeycrisp | granny smith | fuji |

En Python, la estructura de `list` es lo suficientemente eficiente para la mayoría de los casos, pero las Linked Lists son útiles cuando se necesita optimizar inserciones y eliminaciones en estructuras más dinámicas.
