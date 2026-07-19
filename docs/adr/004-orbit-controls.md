# 004 - Botella manipulable con OrbitControls

## Contexto
La primera versión de la escena rotaba la botella de forma pasiva siguiendo el puntero del ratón por toda la ventana. El requisito cambió a "producto 3D que el usuario pueda mover" (arrastre directo sobre la botella). Las opciones eran: `OrbitControls` de drei (órbita de cámara), `PresentationControls` (rotación del objeto con snap-back) o un handler de drag a medida.

## Decisión
Se adopta **`OrbitControls`** con damping (inercia), azimut libre 360°, ángulo polar limitado para no ver bajo el suelo, y zoom/pan desactivados para proteger el layout. La rotación pasiva por puntero se eliminó (conflicto de inputs); el flotado idle se mantiene salvo con `prefers-reduced-motion`. El contenedor deja de ser `aria-hidden` y pasa a `role="img"` con `aria-label` traducido.

## Consecuencias
- **Pros:** Interacción estándar de visor de producto, táctil lista sin código extra (`touch-action` gestionado por three), cámara y sombras coherentes durante la órbita.
- **Contras:** El objetivo de órbita es el origen y la botella flota ±0.26 unidades sobre él (inapreciable en azimut, leve en polar); sin zoom se sacrifica la inspección de detalle — reevaluar si entra un modelo GLB con más detalle.
