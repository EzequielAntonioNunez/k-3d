# 001 - Uso de Biome en lugar de ESLint/Prettier

## Contexto
El ecosistema frontend tradicionalmente ha utilizado ESLint para el linting y Prettier para el formateo. A medida que los proyectos crecen, el rendimiento de estas herramientas basadas en Node.js se degrada, ralentizando el CI/CD y la experiencia del desarrollador.

## Decisión
Adoptaremos **Biome** como la única herramienta para linting y formateo en todo el proyecto Botole.

## Consecuencias
- **Pros:** Tiempos de linting y formateo en milisegundos (basado en Rust), reducción drástica de dependencias en `package.json`, un único archivo de configuración (`biome.json`).
- **Contras:** El ecosistema de plugins es más inmaduro que el de ESLint, aunque cubre el 95% de las reglas recomendadas para React y JavaScript moderno.
