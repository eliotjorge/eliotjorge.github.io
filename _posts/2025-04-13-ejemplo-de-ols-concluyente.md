---
title: "📊 Ejemplo de resumen OLS válido para el análisis"
image:
date: 2025-04-13 19:40:00
categories: [data science, ols, estadística]
tags: [data science, ols, estadística]
render_with_liquid: false
---

En el [post anterior](https://jorgerosa.dev/posts/que-es-ols-minimos-cuadrados-ordinarios/) veíamos la explicación de regresión lineal (OLS) y al final un
[ejemplo](https://jorgerosa.dev/posts/que-es-ols-minimos-cuadrados-ordinarios/#%EF%B8%8F-representación-gráfica) del cual se podía sacar como conclusión
que **no hay relación**: el pulso **no ayuda a predecir** cuántas calorías quema una persona, al menos con estos datos.

Pero cuál sería un ejemplo de gráfica que diese como conclusión que **SÍ hay relación**.

![regresion_lineal_buena](https://github.com/user-attachments/assets/c4697a3e-4764-427e-879f-4aff39a54857)

**Cruces amarillas:** son los datos reales de personas: su pulso promedio y calorías quemadas.

**La línea verde:** encaja muy bien con los puntos, y eso nos dice que el modelo ha aprendido una relación real.


---

## 📊 `results.summary()` del nuevo modelo

```
                            OLS Regression Results                            
==============================================================================
Dep. Variable:        Calorie_Burnage   R-squared:                       0.679
Model:                            OLS   Adj. R-squared:                  0.677
Method:                 Least Squares   F-statistic:                     341.1
Date:                Sun, 13 Apr 2025   Prob (F-statistic):           1.31e-41
Time:                        16:59:12   Log-Likelihood:                -784.40
No. Observations:                 163   AIC:                             1573.
Df Residuals:                     161   BIC:                             1579.
Df Model:                           1                                         
Covariance Type:            nonrobust                                         
=================================================================================
                    coef    std err          t      P>|t|      [0.025      0.975]
---------------------------------------------------------------------------------
Intercept        38.8844     25.048      1.552      0.123     -10.580      88.349
Average_Pulse     4.6337      0.251     18.469      0.000       4.138       5.129
==============================================================================
Omnibus:                        6.502   Durbin-Watson:                   2.123
Prob(Omnibus):                  0.039   Jarque-Bera (JB):                8.179
Skew:                           0.250   Prob(JB):                       0.0167
Kurtosis:                       3.977   Cond. No.                     1.07e+03
==============================================================================
```

---

## ✅ ¿Qué nos dice este resumen?

### 🧩 **Bloque 1: Información del modelo**
- **R-squared: 0.679** → ¡Muy bueno! El modelo explica el **68% de la variación** en las calorías quemadas.
- **F-statistic: 341.1** y **Prob (F-statistic): 1.31e-41** → p-valor muy pequeño → el modelo **sí tiene sentido**.
- **AIC y BIC:** mucho menores que el ejemplo anterior → modelo más eficiente.

---

### 🔢 **Bloque 2: Coeficientes**
- **Intercept (38.88):** el valor base si el pulso fuera 0 (no muy relevante aquí).
- **Coef. de Average_Pulse = 4.63** → Esto quiere decir que **por cada aumento de 1 en el pulso promedio, se queman 4.63 calorías más**.
- **`P>|t|` para Average_Pulse es 0.000**, lo mas bajo → ¡muy significativo! si es menor de 0.05, es importante.

---

### 🧪 **Bloque 3: Diagnóstico**
- **Omnibus y JB** → algo de asimetría y curtosis, pero aceptable.
- **Durbin-Watson = 2.123** → no hay autocorrelación grave.
- **Cond. No. = 1070** → advertencia leve sobre multicolinealidad (pero solo hay una variable, así que no es un problema aquí).

---

### 📌 Conclusión:

Este es un ejemplo de **modelo bueno**. Tiene:

- Relación fuerte entre las variables.
- Coeficientes significativos.
- Diagnósticos aceptables.
