# Guía de Contribución

1. **Ramas**: Utiliza `feature/` o `fix/` seguido del nombre de tu tarea.
2. **Commits**: Este repositorio usa Conventional Commits y Commitlint. Formato: `tipo(ámbito): descripción`. Ej: `feat(3d): añade carga por draco`.
3. **Calidad**: Todo código debe pasar por `npx biome check` y los tests de Vitest.
4. **Arquitectura**: Mantén los componentes 3D aislados de la UI.
