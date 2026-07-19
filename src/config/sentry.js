// Sentry initialization
// In production, install @sentry/react and configure:
// import * as Sentry from '@sentry/react'

export const initSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if (dsn) {
    console.info('[Sentry] Initialized with DSN')
    // Sentry.init({ dsn, tracesSampleRate: 1.0 })
  } else {
    console.info('[Sentry] No DSN configured, skipping initialization')
  }
}
