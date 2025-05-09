---
title: "Big O Notation: Qué es y cómo afecta el rendimiento de tu código"
date: 2025-02-28
description: "Entiende qué es la notación Big-O y cómo afecta al rendimiento de los algoritmos. Aprende a analizar la complejidad temporal para optimizar tus programas y tomar mejores decisiones en desarrollo de software."
categories: [programacion,desarrollo,algoritmos,rendimiento]
tags: [programacion,desarrollo,algoritmos,rendimiento]
pin: false
comments: false
render_with_liquid: false
---

## **¿Qué es la notación Big O?**  
La notación **Big O** 📈 se usa para describir el **rendimiento de un algoritmo** en términos de:  
✅ **Tiempo de ejecución** ⏳  
✅ **Uso de memoria** 📦  

Nos ayuda a entender cómo se comporta un algoritmo cuando la entrada **crece mucho** 📊.  


## 🧐 **¿Qué significa O(n)?**  
La notación **O(f(n))** describe **cómo aumenta el número de operaciones** cuando la entrada crece.  

Ejemplo con **O(n) (complejidad lineal) 🔄**:  
Si tu algoritmo es **O(n)**, significa que **cada elemento de la entrada se procesa una vez**.  

📌 Si la entrada tiene **10** elementos → Hace ~**10** operaciones.  
📌 Si la entrada tiene **1,000** elementos → Hace ~**1,000** operaciones.  

Código de ejemplo:  

```python
def imprimir_elementos(lista):
    for elemento in lista:  # Se ejecuta una vez por cada elemento
        print(elemento)  

# Si lista tiene 5 elementos, se hacen 5 operaciones → O(n)
# Si lista tiene 1000 elementos, se hacen 1000 operaciones → O(n)
```

🟢 **Este algoritmo es eficiente porque solo recorre la lista una vez.**  

## 📊 **Tipos comunes de Big O y su significado**  

| Notación Big O | Complejidad | Ejemplo |
|--------------|------------|--------|
| **O(1)** | Constante | Acceder a un elemento por su índice en una lista |
| **O(n)** | Lineal | Recorrer una lista con un bucle |
| **O(n²)** | Cuadrática | Doble bucle anidado |
| **O(log n)** | Logarítmica | Búsqueda binaria |
| **O(n log n)** | Quasilineal | Algoritmos de ordenamiento eficientes como mergesort |

👉 Cuanto más baja la complejidad, **más rápido y eficiente** es el algoritmo.  

## 🤯 **Ejemplo de complejidad O(n × m)**  
Si tienes dos listas y las comparas con **dos bucles anidados**, la complejidad es **O(n × m)** porque **cada elemento de una lista se compara con todos los elementos de la otra**.  

```python
def comparar_listas(lista1, lista2):
    for i in lista1:  # 🔄 Se ejecuta n veces
        for j in lista2:  # 🔄 Se ejecuta m veces por cada i
            print(i, j)  

# Si lista1 tiene 10 elementos y lista2 tiene 5 → O(10 × 5) = O(50)
# En general, la complejidad es O(n × m)
```

🛑 **Si ambas listas son grandes, este algoritmo puede ser lento** 🐢, ya que crece proporcionalmente a \( n \times m \).  

### 🎯 **Resumen rápido**  
✅ **Big O describe cómo escala un algoritmo** cuando la entrada crece.  
✅ **O(n) significa que el tiempo crece linealmente con la entrada**.  
✅ **O(n × m) significa que depende de dos factores (ejemplo: dos listas)**.  
✅ Cuanto menor sea la complejidad, **más rápido es el algoritmo** 🚀.
