# 005 - Sin slider dots y botella reescalada

## Contexto
La referencia visual (Dribbble) incluye tres dots de slider sobre la botella, y la botella 3D ocupaba ~95% del alto visible del canvas (escala 1.52). Al orbitar en vertical, el tapón y la base se cortaban contra los bordes del canvas, y la sombra de contacto (`ContactShadows`, blur 2.8) llegaba hasta el borde inferior del contenedor, donde se veía un corte justo encima del texto del footer. Los dots, además, no cambiaban nada (solo `activeSlide` en el store, sin slides reales).

## Decisión
A petición del usuario (2026-07-20):
- Eliminar los slider dots y todo su código asociado: `SliderDots.jsx`, `useStore` (solo guardaba `activeSlide`), tokens `--color-dot*`, claves i18n `scene.slide` y sus tests.
- Reescalar la botella de 1.52 a 1.4 (offset Y recalculado para mantener la base sobre la sombra) para dejar margen al orbitar.
- Bajar el target de `OrbitControls` a `[0, -0.2, 0]` y el blur de la sombra a 2 para que la sombra se desvanezca antes del borde inferior del canvas.

## Consecuencias
- **Pros:** sin clipping en ningún extremo de órbita (verificado a nivel de píxel: 0 píxeles oscuros en los bordes del canvas), ni corte visible sobre el footer; menos código muerto (store eliminado por completo).
- **Contras:** desviación respecto a la referencia visual (que sí tenía los dots). Si algún día entra un slider de productos real, habrá que reintroducir controles con estado nuevo.
