# Despliegue

## CI/CD Pipeline
La pipeline de GitHub Actions se encarga de:
1. Checkout del código.
2. Instalación de dependencias (Node 20).
3. Verificación estricta con Biome (`npm run lint`).
4. Pruebas unitarias (`npm run test`).
5. Build de producción (`npm run build`).

## Hosting
El proyecto está optimizado para Edge Networks (Vercel, Cloudflare Pages o Netlify).
Al usar React 19 y optimizaciones estáticas, se generarán los chunks configurados en `vite.config.js`.
Asegúrate de configurar los headers de caché para la carpeta `public/` y `/assets/`.
