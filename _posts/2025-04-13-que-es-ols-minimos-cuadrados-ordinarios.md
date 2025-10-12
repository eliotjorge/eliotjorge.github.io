---
title: "¿Qué es OLS (Mínimos Cuadrados Ordinarios)?"
date: 2025-04-13
description: "Descubre qué es OLS (Mínimos Cuadrados Ordinarios) y cómo se utiliza en análisis estadístico para estimar relaciones entre variables de forma precisa y eficiente."
categories: [data science, ols, estadística]
tags: [data science, ols, estadística]
render_with_liquid: false
---

OLS significa **Ordinary Least Squares** en inglés, o **Mínimos Cuadrados Ordinarios** en español.

Imagina que tienes muchos puntos dibujados en un gráfico. Cada punto representa una persona y muestra:

- Cuánto fue su **pulso promedio** (`Average_Pulse`)
- Cuántas **calorías quemó** (`Calorie_Burnage`)

📈 Lo que queremos es **dibujar una línea recta** que pase lo más cerca posible de todos los puntos.  
Esa línea sirve para hacer predicciones. Por ejemplo:

> “Si alguien tiene un pulso promedio de 140, quemará más o menos X calorías.”

OLS es una técnica matemática que **busca la mejor línea recta posible**.  
Para hacerlo, **mide qué tan lejos están los puntos de la línea**, y encuentra la línea que **minimiza el error total** (los errores se elevan al cuadrado para evitar negativos y dar más peso a los errores grandes).

---

## 🐍 Ejemplo en Python paso a paso

```python
import pandas as pd
import statsmodels.formula.api as smf

# Cargar los datos desde un archivo CSV
full_health_data = pd.read_csv("data.csv", header=0, sep=",")

# Crear el modelo de regresión lineal con OLS
model = smf.ols('Calorie_Burnage ~ Average_Pulse', data = full_health_data)

# Ajustar (entrenar) el modelo con los datos
results = model.fit()

# Mostrar un resumen con los resultados
print(results.summary())
```

---

## 🧠 Explicación del código

### `import pandas as pd`
Importa la librería **pandas**, que se usa para leer y trabajar con datos en forma de tabla (como Excel).

### `import statsmodels.formula.api as smf`
Importa la librería `statsmodels`, que permite hacer modelos estadísticos como la **regresión lineal OLS**.

### `full_health_data = pd.read_csv("data.csv")`
Lee un archivo CSV llamado `data.csv`, que contiene los datos de personas: pulso promedio y calorías quemadas.

### `model = smf.ols('Calorie_Burnage ~ Average_Pulse', data=...)`
Crea un modelo OLS que quiere predecir `Calorie_Burnage` a partir de `Average_Pulse`.

🗣 Traducción:  
> "Intenta dibujar una línea que relacione el pulso promedio con las calorías quemadas."

### `results = model.fit()`
Ajusta (entrena) el modelo. Calcula cuál es la **mejor línea posible** usando los datos.

### `print(results.summary())`
Muestra el **resumen del modelo** con todos los detalles y estadísticas.

---

## 🧾 ¿Qué dice el resumen?

Aquí está lo que verás al imprimir `results.summary()`:

```
                            OLS Regression Results
==============================================================================
Dep. Variable:        Calorie_Burnage   R-squared:                       0.000
Model:                            OLS   Adj. R-squared:                 -0.006
Method:                 Least Squares   F-statistic:                   0.04975
Date:                Tue, 24 Nov 2020   Prob (F-statistic):              0.824
Time:                        12:26:11   Log-Likelihood:                -1145.8
No. Observations:                 163   AIC:                             2296.
Df Residuals:                     161   BIC:                             2302.
Df Model:                           1
Covariance Type:            nonrobust
=================================================================================
                    coef    std err          t      P>|t|      [0.025      0.975]
---------------------------------------------------------------------------------
Intercept       346.8662    160.615      2.160      0.032      29.682     664.050
Average_Pulse     0.3296      1.478      0.223      0.824      -2.588       3.247
==============================================================================
Omnibus:                      124.542   Durbin-Watson:                   1.620
Prob(Omnibus):                  0.000   Jarque-Bera (JB):              938.541
Skew:                           2.927   Prob(JB):                    1.58e-204
Kurtosis:                      13.195   Cond. No.                         811.
==============================================================================
```


---

### 🧾 Salida completa de `results.summary()` (Explicación en 3 bloques)

####🔹 **Bloque 1: Información general del modelo**
```text
                            OLS Regression Results
==============================================================================
Dep. Variable:        Calorie_Burnage   R-squared:                       0.000
Model:                            OLS   Adj. R-squared:                 -0.006
Method:                 Least Squares   F-statistic:                   0.04975
Date:                Tue, 24 Nov 2020   Prob (F-statistic):              0.824
Time:                        12:26:11   Log-Likelihood:                -1145.8
No. Observations:                 163   AIC:                             2296.
Df Residuals:                     161   BIC:                             2302.
Df Model:                           1
Covariance Type:            nonrobust
```

🧠 ¿Qué significa cada cosa?

- **Dep. Variable:** la variable que queremos predecir (en este caso, `Calorie_Burnage`)
- **R-squared (R²):** 0.000 → el modelo no explica casi nada de la variación.
- **Adj. R-squared:** como R² pero ajustado por el número de variables. Aquí también es malo.
- **F-statistic y Prob (F-statistic):** indican si el modelo completo tiene sentido. Aquí no: `p = 0.824` (mayor que 0.05).
- **Log-Likelihood, AIC, BIC:** son medidas técnicas de calidad del modelo (valores más bajos = mejor). Son útiles para comparar varios modelos.
- **No. Observations:** número de datos que se usaron (163).
- **Df Model y Df Residuals:** grados de libertad. Aquí hay 1 predictor (`Average_Pulse`), y 161 residuos.

---

#### 🔹 **Bloque 2: Tabla de coeficientes (la ecuación del modelo)**
```text
=================================================================================
                    coef    std err          t      P>|t|      [0.025      0.975]
---------------------------------------------------------------------------------
Intercept       346.8662    160.615      2.160      0.032      29.682     664.050
Average_Pulse     0.3296      1.478      0.223      0.824      -2.588       3.247
=================================================================================
```

Esto representa la ecuación de la recta:

📏 **Calorie_Burnage = 346.87 + 0.33 × Average_Pulse**

Pero:

- `P>|t|` para `Average_Pulse` es **0.824**, muy alto → **no es un predictor válido**.
-  Si es menor de **0.05**, es importante.
- El intervalo de confianza `[0.025, 0.975]` para `Average_Pulse` incluye el 0 → tampoco hay efecto claro.
- En este caso, `Average_Pulse` tiene un **p = 0.824**, lo cual significa que **es casi seguro que NO hay relación** entre pulso y calorías.

✅ El intercepto **sí es significativo** (`p = 0.032`), pero no sirve de mucho si el predictor no explica nada.


---

#### 🔹 **Bloque 3: Diagnóstico del modelo (calidad de los residuos)**
```text
Omnibus:                      124.542   Durbin-Watson:                   1.620
Prob(Omnibus):                  0.000   Jarque-Bera (JB):              938.541
Skew:                           2.927   Prob(JB):                    1.58e-204
Kurtosis:                      13.195   Cond. No.                         811.
```

🧪 Este bloque analiza si **los errores del modelo (residuos)** se comportan como deberían.

- **Omnibus, JB, Prob(JB):** pruebas de normalidad. Aquí el p-valor es muy bajo → los errores **no son normales**.
- **Skew (asimetría):** 2.927 → mucha asimetría. Idealmente debería ser 0.
- **Kurtosis:** 13.195 → muy alto. Debería estar cerca de 3.
- **Durbin-Watson:** 1.620 → mide autocorrelación. Valores cerca de 2 son aceptables.
- **Cond. No. (número de condición):** 811 → indica posible multicolinealidad. Menor de 30 = bien; más de 1000 = problema.

---

## 🖼️ Representación gráfica

![regresion_lineal_ols](https://github.com/user-attachments/assets/376a6c9e-82b7-4ad2-8752-f0c206dd3aeb)


**Cruces amarillas:** son los datos reales de personas: su pulso promedio y calorías quemadas.

**Línea roja:** es la línea que OLS ha intentado ajustar. Como puedes ver, está casi horizontal porque no hay relación clara entre los datos.

Es como si el modelo dijera:

> "Da igual el pulso, la cantidad de calorías quemadas no cambia mucho."

Por eso el R-squared era cercano a 0.

---

## 🧃 ¿En resumen sencillo?

- **OLS** es una técnica que dibuja la **mejor línea recta** entre dos cosas (por ejemplo, pulso y calorías).
- En tu código, OLS intentó encontrar esa línea.
- Pero el resultado dice que **no hay relación**: el pulso **no ayuda a predecir** cuántas calorías quema una persona, al menos con estos datos.
