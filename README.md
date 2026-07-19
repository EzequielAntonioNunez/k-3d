# Botole 3D Premium

> Premium hydration meets cutting-edge 3D visualization. An immersive product showcase built with React Three Fiber.

---

## Tech Stack

| Category       | Technology                          |
| -------------- | ----------------------------------- |
| Build          | Vite                                |
| Framework      | React 19                            |
| 3D Engine      | React Three Fiber + Drei            |
| State          | Zustand                             |
| Data Fetching  | TanStack Query                      |
| Animation      | Framer Motion                       |
| i18n           | i18next                             |
| Linting        | Biome                               |
| Unit Testing   | Vitest                              |
| E2E Testing    | Playwright                          |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run unit tests
npm run test

# Lint source code
npm run lint
```

## Architecture

The codebase is organized by domain layers, keeping 3D, layout, and reusable UI strictly separated:

```
src/
├── assets/       # Static assets (SFX sounds)
├── components/
│   ├── 3d/       # React Three Fiber scene (Bottle3D, SceneSetup, SceneFallback)
│   ├── layout/   # Structural UI (SiteHeader, MainGrid, HeroCopy, ProductList, ErrorBoundary...)
│   └── ui/       # Reusable atomic UI (Button, Typography)
├── config/       # Initialization logic (i18n, sentry)
├── hooks/        # Custom React hooks (useResponsive)
├── lib/          # Low-level utilities (WebGL detection)
├── locales/      # i18n translation files (en, es)
├── store/        # Global state (Zustand)
├── styles/       # Design tokens and global styles (tokens.css, global.css, app.css)
├── test/         # Unit tests and test setup
├── App.jsx       # Route assembly (/:lang) and UI-over-Canvas layering
└── main.jsx      # Entry point (providers: Helmet, QueryClient, Router, Suspense)
```

## Scripts

| Script         | Command                                  | Description                        |
| -------------- | ---------------------------------------- | ---------------------------------- |
| `dev`          | `vite`                                   | Start dev server with HMR          |
| `build`        | `vite build`                             | Production build                   |
| `preview`      | `vite preview`                           | Preview production build locally   |
| `lint`         | `npx @biomejs/biome check ./src`         | Lint source files with Biome       |
| `format`       | `npx @biomejs/biome check --write ./src` | Auto-fix lint issues               |
| `test`         | `vitest`                                 | Run unit tests in watch mode       |
| `test:e2e`     | `playwright test`                        | Run end-to-end tests               |
| `prepare`      | `husky`                                  | Setup Git hooks                    |

## License

Private – All rights reserved.
