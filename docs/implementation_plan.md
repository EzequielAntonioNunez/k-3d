# Botole 3D — Plan de Arquitectura e Implementación

> Documento vivo. Última actualización: 2026-07-20 (slider dots eliminados y botella reescalada, ver ADR 005).
> Leyenda de estado: ✅ hecho · 🔶 parcial · ❌ pendiente · 📝 decisión registrada (ADR)

---

## 0. Fuentes de verdad

| Qué | Dónde |
|---|---|
| Referencia visual (única verdad de diseño) | `Outstanding web design Aberdeen … .jpg` (735×546, Dribbble shot) |
| Viewport de trabajo | **1470×1092** (2× exacto de la referencia) |
| Captura de comparación | `node scripts/shot.mjs http://localhost:5173/en shot.png 1470 1092` |
| Tokens de diseño | `src/styles/tokens.css` + `DESIGN.md` |
| Decisiones de arquitectura | `docs/adr/` (un ADR por cambio de rumbo, ver §2) |

Regla de oro: si el código y este plan discrepan, **o se corrige el código o se registra la desviación en un ADR**. Nunca queda en el aire.

---

## 1. Estado real del proyecto

### Hecho y verificado

- ✅ Scaffolding Vite + React 19, dependencias instaladas y fijadas (`package-lock.json`).
- ✅ Infraestructura: `tokens.css`, React Router con rutas localizadas `/en` `/es`, i18next con detección de idioma, Biome 2.5.4, Husky + lint-staged + commitlint.
- ✅ Layout completo: header, hero grid (1.22fr/1.01fr/1fr), lista de productos, footer. Pase **pixel-perfect** contra la referencia (tipografía, posiciones, círculo blanco detrás de la botella).
- ✅ Botella 3D procedural (`LatheGeometry`, sin assets externos) con materiales mate/metal, **arrastrable** (OrbitControls con damping, sin zoom/pan) y test E2E de arrastre.
- ✅ `prefers-reduced-motion` respetado (animaciones idle desactivadas).
- ✅ ErrorBoundary + fallback WebP sin WebGL; carga diferida del canvas tras el primer paint.
- ✅ Fuentes Poppins self-hosteadas (400–800) con preload.
- ✅ CSP meta estricto, `robots.txt`, `sitemap.xml`, canonical + hreflang por ruta.
- ✅ PWA vía `vite-plugin-pwa` (generateSW, precache de assets).
- ✅ CI básico (`.github/workflows/ci.yml`): lint → unit tests → build.
- ✅ Commit inicial `c43fceb`; hooks de pre-commit y commit-msg operativos.
- ✅ Verificación actual: `npm run lint` ✅ · `vitest run --coverage` ✅ (96.2% líneas) · `npm run build` ✅ · Playwright chromium 4/4 ✅ (2 pasadas `--retries=0`).

### Parcial

- 🔶 **PWA**: falta iconos 192/512 del manifest, estrategia de actualización del SW y página offline.
- 🔶 **SEO**: falta JSON-LD (`Product`), meta Open Graph/Twitter y og-image 1200×630.
- 🔶 **CI**: visual regression ✅ (Fase 2); sin Lighthouse budgets, sin `npm audit`.

### Pendiente

- ❌ **Sentry**: `src/config/sentry.js` es un stub; `@sentry/react` no instalado. Falta setup completo (DSN en `.env`, release tagging, sourcemaps en CI).
- ❌ **Favicons reales**: `favicon.ico`, `apple-touch-icon.png`, iconos 192/512 del manifest (solo existe `favicon.svg`).
- ❌ **Analítica + consentimiento GDPR** (obligatorio en la UE si hay tracking).
- ❌ **Spec y QA de móvil/tablet**: la referencia es desktop; los breakpoints actuales (62rem/44rem) no tienen spec ni validación visual. Gestos táctiles del 3D sin criterio.
- ❌ **Auditoría WCAG 2.2 AA**: teclado, foco visible, contraste medido, pase con lector de pantalla.
- ❌ **Matriz de navegadores**: probar Firefox/WebKit del E2E (requiere `npx playwright install`), quirks de Safari (`anisotropy`, WebGL2).
- ❌ **Releases**: semantic-release o changesets (commitlint solo no genera changelog).
- ❌ **Target de despliegue**: definir (Vercel / Azure Static Web Apps), previews por PR, dominio, cabeceras de caché.
- ❌ **TanStack Query**: montado pero sin una sola query → usarlo en una feature real o retirarlo (decisión pendiente).
- ❌ **Formularios React 19** (`useOptimistic`/`useActionState`): sin forms en la app; decidir si entra un newsletter/CTA o se descarta del alcance.
- ❌ **LICENSE** (README declara privado; falta el archivo o la confirmación).

### Decisiones que cambiaron el plan original (documentar en `docs/adr/`)

- 📝 **002 — Botella procedural en vez de GLTF**: el plan pedía un `.glb` gratuito con Draco. No se encontró asset con la silueta exacta de la referencia y licencia clara → geometría procedural (`LatheGeometry`), cero bytes de descarga. Draco/meshopt quedan descartados salvo que entre un modelo real.
- 📝 **003 — Poppins en vez de Inter**: la referencia usa grotesca geométrica; Poppins (OFL, Google Fonts) casa mejor. Self-hosted, subset pendiente (§5).
- 📝 **004 — OrbitControls + escena fija**: el follow-passive del ratón se eliminó al hacer la botella arrastrable (conflicto de input). Zoom/pan desactivados para proteger el layout.
- 📝 **005 — Sin slider dots y botella reescalada**: los dots de la referencia no tenían función real y la botella se cortaba al orbitar (la sombra llegaba al borde del canvas). Eliminados dots + store, escala 1.52 → 1.4, target de cámara bajado.
- 📝 Workspace real: `Documents/Repositorios/Projects/agy/botole-app` (no la ruta scratch de `.gemini` que decía el plan original).

---

## 2. ADRs obligatorios

Todo cambio de rumbo se registra en `docs/adr/NNN-titulo.md` con: contexto, opciones, decisión, consecuencias. Creados: **001**–**005**. Formato: el de `001-use-biome.md`.

---

## 3. Fases y criterios de aceptación (Definition of Done)

Cada fase solo se da por cerrada cuando su "Hecho cuando" se verifica con comandos reales.

### Fase 1 — Calidad de tests ✅ (2026-07-19)
- [x] Umbrales en `vitest.config.js`: `coverage: { lines: 70, functions: 70, statements: 70 }` en `src/**` excluyendo `components/3d` (WebGL no testeable en jsdom).
- [x] Tests unitarios: `i18n` (cambia idioma), `Button` (variantes + onClick, use-sound mockeado), `ErrorBoundary` (fallback ante error), `isWebGLAvailable` (contexto mockeado), `useResponsive`, `Typography` y `App` (render completo + redirect). (Los tests de `useStore`/dots se retiraron con el slider, ver ADR 005.)
- [x] E2E adicionales: ruta `/es` renderiza en español; fallback 2D aparece con WebGL deshabilitado (`getContext` stubbeado a `null`).
- **Resultado**: 13 unit tests en 7 archivos, cobertura 96.2% líneas / 95.8% funciones ✅ · Playwright 4/4, dos pasadas consecutivas con `--retries=0` ✅.
- Nota: el test de arrastre espera escena estática con `expect(...).toPass()` (fuentes + shaders) antes de comparar píxeles — evita flakes por timing.

### Fase 2 — Visual regression en CI ✅ (2026-07-20)
- [x] `toHaveScreenshot()` en Playwright para `/en` (viewport 1470×1092, animaciones congeladas vía `page.emulateMedia({ reducedMotion: 'reduce' })` — el runner de Playwright 1.61 **ignora** la opción de contexto `reducedMotion`; hay que emularla por página).
- [x] Dos aserciones calibradas con medición real: página completa con el canvas enmascarado (`maxDiffPixels: 250` → un cambio de +1px en `--text-h1` falla con 838px) y escena 3D (`maxDiffPixelRatio: 0.05` → tolera el ruido GPU entre sesiones, medido en ~4.3k px, pero caza regresiones groseras).
- [x] Textura del tapón determinista (PRNG mulberry32 con seed en `Bottle3D.jsx`) — antes usaba `Math.random()` y rompería los snapshots.
- [x] Snapshots versionados en `e2e/__snapshots__/` (win32 + linux, esta última generada con Docker `mcr.microsoft.com/playwright`); actualización solo vía `--update-snapshots` explícito o workflow manual `update-snapshots.yml`.
- [x] Job `visual` en `ci.yml` (Chromium con `--with-deps`, artefacto `visual-diff` en fallo); triggers de CI corregidos a `main` + `master` (antes solo `main` y el repo usa `master` → CI nunca corría).
- **Resultado**: 1px en `--text-h1` rompe el test ✅ · build sin cambios pasa ✅ (local, Docker linux y CI).

### Fase 3 — Assets reales
- [ ] Generar `favicon.ico` (16/32/48), `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png` desde `favicon.svg` (script con `sharp` en `scripts/` o realfavicongenerator) y referenciarlos en `index.html` + `manifest.json`.
- [ ] Subset de Poppins: `pyftsubset` por idioma (latin + latin-ext), `font-display: swap`, y métricas override (`size-adjust`) para CLS ≈ 0.
- [ ] Licencias de `hover.mp3`/`click.mp3` documentadas en `docs/assets.md` (origen, licencia).
- **Hecho cuando**: Lighthouse no reporta iconos ausentes y `npm run build` incluye los assets en `dist/`.

### Fase 4 — SEO de producto y social
- [ ] JSON-LD `Product` en `index.html` (nombre, descripción, imagen, marca).
- [ ] Meta OG/Twitter por ruta (`react-helmet-async`): `og:title`, `og:description`, `og:image`, `og:locale` (en_US/es_ES).
- [ ] `og-image.png` 1200×630 generada desde la propia app (`scripts/shot.mjs` con viewport 1200×630).
- **Hecho cuando**: el validador de Open Graph muestra la card correcta para `/en` y `/es`.

### Fase 5 — Responsive / móvil
- [ ] Spec escrita en `DESIGN.md`: composición para <62rem y <44rem (orden de secciones, tamaño de botella, lista de productos).
- [ ] QA visual a 390×844 y 768×1024 con `scripts/shot.mjs`.
- [ ] Criterio táctil del 3D: drag de un dedo rota; la página hace scroll fuera del canvas; sin pinch-zoom.
- **Hecho cuando**: screenshots móvil/tablet adjuntos al PR y aprobados contra la spec.

### Fase 6 — Observabilidad
- [ ] `@sentry/react` instalado; init en `config/sentry.js` con `VITE_SENTRY_DSN` (documentado en `.env.example`); release = versión de `package.json`; sourcemaps subidos en CI (secreto `SENTRY_AUTH_TOKEN`).
- [ ] Analítica: elegir Plausible o GA4; **banner de consentimiento GDPR** antes de cargar el script; eventos: `cta_start`, `bottle_drag`, `discover_click`.
- **Hecho cuando**: un error forzado en staging aparece en Sentry con sourcemap legible, y la analítica no carga sin consentimiento.

### Fase 7 — Accesibilidad (WCAG 2.2 AA)
- [ ] Auditoría de contraste medida (texto ≥ 4.5:1, `--color-muted-light` incluido).
- [ ] Teclado: todos los controles alcanzables con foco visible (nav, CTA, discover).
- [ ] Pase con NVDA/VoiceOver: landmarks, `role="img"` del visor 3D con su `aria-label` traducido.
- **Hecho cuando**: checklist WCAG en `docs/` marcada y axe-core (Playwright) sin violaciones serious/critical.

### Fase 8 — Performance budgets + Lighthouse CI
- [ ] `@lhci/cli` en CI contra la build: Performance ≥ 90 (exigir 100 en SEO/a11y/best-practices; en performance el 3D lo fija el budget).
- [ ] Budgets: JS inicial < 300 KB gzip (three.js en chunk diferido ✅ actual), LCP < 2.5 s en 4G, CLS < 0.05, TBT < 200 ms.
- **Hecho cuando**: `lhci autorun` pasa en CI con esos umbrales.

### Fase 9 — Release y despliegue
- [ ] Target elegido y documentado en `docs/deployment.md` (Vercel o Azure SWA): build command, output `dist/`, cabeceras (`Cache-Control` largo para `/assets/*`, SW sin caché), HTTPS/dominio.
- [ ] Preview deployment por PR.
- [ ] semantic-release (o changesets): versión, tag y changelog automáticos desde conventional commits.
- **Hecho cuando**: un merge a `main` despliega solo y publica release con changelog.

### Fase 10 — Decisiones de alcance pendientes
- [ ] TanStack Query: integrarlo en una feature real (p.ej. config remota de productos) o eliminar la dependencia y el provider.
- [ ] Formularios React 19: newsletter con `useActionState` + `useOptimistic`, o declarar fuera de alcance.
- [ ] LICENSE: confirmar "privado" o añadir archivo.
- **Hecho cuando**: cada punto tiene ADR o implementación, y el plan queda sin 🔶 ni ❌.

---

## 4. Metodología pixel-perfect (obligatoria en cambios visuales)

1. Sirve en 1470×1092 (2× de la referencia) y captura con `scripts/shot.mjs`.
2. Compara contra la referencia **a ojo y con medidas relativas**: botella 16%→79% de alto, centro de botella ≈ 52% de ancho, título 30%→54%, lista 36%→59% vertical, disco blanco Ø ≈ 22vw centrado tras la botella.
3. Antes de dar por bueno un cambio visual, adjunta la captura en el PR.
4. Si Vite dev sirve CSS vacío o HMR se corrompe: matar el proceso en 5173 y `rm -rf node_modules/.vite` (ver §7).

## 5. Pipeline de assets

- **Fuentes**: Poppins (OFL). Subset con `pyftsubset --layout-features='*' --unicodes=U+0000-024F`. Guardar originales fuera de `public/` si se regeneran.
- **Iconos**: un solo `scripts/generate-icons.mjs` (sharp) que emite todos los tamaños desde `public/favicon.svg`.
- **Modelos 3D** (si algún día entra un GLB): licencia CC0/CC-BY anotada en `docs/assets.md`, optimizar con `gltf-transform optimize input.glb output.glb --compress draco`, cargar con `useGLTF` + draco decoder local.
- **Sonidos**: solo SFX con licencia libre, registrados en `docs/assets.md`.

## 6. Git y CI

- **Ramas**: trunk-based — `main` protegida, features en `feat/*` con PR, squash merge.
- **Commits**: conventional (commitlint lo fuerza); pre-commit corre Biome vía lint-staged.
- **⚠️ Biome**: `biome.json` **no admite comentarios `//`** (la config se ignora entera sin error visible). Justificaciones de overrides van en este plan o en `docs/`, no en el JSON.
- **Pipeline CI** (objetivo Fase 2/8): `lint → unit (con cobertura) → build → visual regression → lighthouse-ci → npm audit (nivel high)`. Hoy activo: lint → unit → build.

## 7. Problemas conocidos (troubleshooting)

| Síntoma | Causa | Fix |
|---|---|---|
| Página sin estilos en dev | caché de Vite corrupta / proceso zombie en 5173 | `taskkill //PID <pid> //F` + `rm -rf node_modules/.vite` + reiniciar |
| Biome ignora `biome.json` | comentarios `//` en el archivo | quitar comentarios (ver §6) |
| E2E no encuentra navegador | browsers de Playwright no instalados | proyecto `chromium` usa `channel: 'chrome'` (Chrome del sistema); para firefox/webkit: `npx playwright install` |

## 8. Definition of Done global del proyecto

1. `npm run lint`, `vitest run --coverage`, `npm run build`, `playwright test` — todo verde local y en CI.
2. Lighthouse CI dentro de budgets (Fase 8).
3. Cero 🔶/❌ en §1; cada desviación con ADR.
4. README, `DESIGN.md`, `docs/` y este plan describen el proyecto **como es**, no como fue ideado.
5. Release publicada con changelog generado desde commits.
