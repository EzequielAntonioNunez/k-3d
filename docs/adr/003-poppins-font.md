# 003 - Poppins en lugar de Inter

## Contexto
El plan original especificaba la fuente **Inter** self-hosteada y subseteada. La referencia de diseño usa una grotesca geométrica de remates redondeados y mucho peso (el titular "Drinking Water Bottle"); Inter es una neo-grotesca más estrecha y neutra que no reproduce el carácter del diseño.

## Decisión
Se adopta **Poppins** (SIL Open Font License, Google Fonts) en pesos 400–800, self-hosteada en `public/fonts/` en formato WOFF2 con `<link rel="preload">` de los pesos críticos y `font-display: swap`. El subsetting por idioma y los `size-adjust` anti-CLS quedan como tarea de la Fase 3 del plan.

## Consecuencias
- **Pros:** Fidelidad visual con la referencia, licencia OFL sin restricciones, sin peticiones a CDN de terceros (compatible con el CSP estricto).
- **Contras:** Poppins tiene métricas distintas de las fuentes de sistema del stack de fallback, lo que exige el ajuste de métricas pendiente para un CLS perfecto; más archivos que mantener al subsetear.
