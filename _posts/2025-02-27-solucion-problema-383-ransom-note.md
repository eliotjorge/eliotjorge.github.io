---
title: "🐍 Python: Solución al problema '383. Ransom Note' en Python"
image: https://github.com/user-attachments/assets/2ebf3ff1-2dd0-4b0c-9142-69bd6d5b91c0
description: "Solución al problema 383 Ransom Note: aprende cómo determinar si una nota puede construirse con las letras disponibles en una revista. Explicación paso a paso y código eficiente para validar la disponibilidad de caracteres."
date: 2025-02-27
categories: [python,leetcode]
tags: [python,leetcode]
pin: false
comments: false
render_with_liquid: false
---

💡 Este es un problema interesante que nos ayuda a mejorar nuestra lógica en Python.  

🎯 **Objetivo:** Verificar si podemos construir una `ransomNote` usando las letras de `magazine`, sin repetir ninguna más veces de lo que aparece en `magazine`.  

🔹 **Ejemplo 1:**  
```python
Input: ransomNote = "a", magazine = "b"
Output: False
```
🔹 **Ejemplo 2:**  
```python
Input: ransomNote = "aa", magazine = "ab"
Output: False
```
🔹 **Ejemplo 3:**  
```python
Input: ransomNote = "aa", magazine = "aab"
Output: True
```

## 🚀 Mi solución en Python  

Para resolver el problema, seguimos un enfoque directo: recorremos cada letra de `ransomNote` y verificamos si está en `magazine`. Si está, la eliminamos (para evitar repetirla). Si no, retornamos `False`.  

```python
def canConstruct(ransomNote: str, magazine: str) -> bool:
    for letraR in ransomNote:
        if letraR in magazine:
            magazine = magazine.replace(letraR, "", 1)
        else:
            return False
    return True
```

## 🔍 Explicación paso a paso  

1️⃣ **Recorremos** cada letra `letraR` en `ransomNote`.  
2️⃣ **Comprobamos** si está en `magazine`.  
   - ✅ Si está, la eliminamos con `replace(letraR, "", 1)`.  
   - ❌ Si no está, retornamos `False`.
     
3️⃣ Si logramos recorrer todo `ransomNote`, retornamos `True` porque logramos formar la palabra.  


## ⏳ Complejidad  

🔹 Como iteramos sobre `ransomNote` y usamos `replace()`, la complejidad en el peor caso es **O(n × m)**.  
🔹 `replace()` recorre todo `magazine` en cada iteración, lo que puede ser ineficiente para cadenas largas.  

## ⚡ Optimización con `Counter`  

Para mejorar la eficiencia, podemos usar `collections.Counter` para contar las ocurrencias de cada letra en `ransomNote` y `magazine`:  

```python
from collections import Counter

def canConstruct(ransomNote: str, magazine: str) -> bool:
    countRansom = Counter(ransomNote)
    countMagazine = Counter(magazine)

    for letra, cantidad in countRansom.items():
        if countMagazine[letra] < cantidad:
            return False
    return True
```

### 🎯 Ventajas de esta versión:  
✅ **Más eficiente:** Su complejidad es **O(n + m)**, ya que construimos los contadores en **O(n) y O(m)** y luego los recorremos en **O(n)**.  
✅ **Código más claro** y fácil de leer. 
