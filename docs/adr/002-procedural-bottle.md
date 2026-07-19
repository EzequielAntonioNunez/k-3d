# 002 - Botella 3D procedural en lugar de modelo GLTF

## Contexto
El plan original preveía integrar un modelo GLTF/GLB gratuito de una botella con compresión Draco/meshopt. No se encontró ningún asset con la silueta exacta de la referencia de diseño (cuerpo recto, hombro suave, tapón plano metálico) y con licencia clara. Además, cualquier GLB añade peso de red y un pipeline de optimización para lo que, en esencia, es una figura de revolución.

## Decisión
La botella se construye de forma **procedural** en `src/components/3d/Bottle3D.jsx` con `THREE.LatheGeometry` (perfil de revolución paramétrico para cuerpo y tapón), materiales `MeshPhysicalMaterial` (negro mate / metal cepillado) y una textura de cepillado generada localmente en un `<canvas>` (sin descargas). Si en el futuro entra un modelo real, el pipeline de optimización y licencias queda especificado en `implementation_plan.md` §5.

## Consecuencias
- **Pros:** Cero bytes de asset 3D descargado (mejor LCP/TBT que cualquier GLB comprimido), ajuste al pixel de la referencia por parámetros (`CAP_TOP`, radios, curva del hombro), sin dependencia de licencias de terceros.
- **Contras:** La silueta es una aproximación artesanal; detalles que un modelo esculpido daría (grabados, relieve del logo) no son viables sin pasar a un GLB.
