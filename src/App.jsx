import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { SceneFallback } from './components/3d/SceneFallback'
import { SceneSetup } from './components/3d/SceneSetup'
import { ErrorBoundary } from './components/layout/ErrorBoundary'
import { HeroCopy } from './components/layout/HeroCopy'
import { HeroFooter } from './components/layout/HeroFooter'
import { MainGrid } from './components/layout/MainGrid'
import { ProductList } from './components/layout/ProductList'
import { SiteHeader } from './components/layout/SiteHeader'

const MainApp = () => {
  const { lang } = useParams()
  const { t, i18n } = useTranslation()

  // Sync route lang with i18n
  if (lang && i18n.language !== lang) {
    i18n.changeLanguage(lang)
  }

  return (
    <>
      <Helmet>
        <html lang={lang || 'en'} />
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <link rel="canonical" href={`https://botole.com/${lang || 'en'}`} />
        <link rel="alternate" hrefLang="en" href="https://botole.com/en" />
        <link rel="alternate" hrefLang="es" href="https://botole.com/es" />
      </Helmet>
      <MainGrid>
        <SiteHeader />
        <section className="hero" aria-labelledby="hero-title">
          <HeroCopy />
          <div className="hero__scene">
            <ErrorBoundary fallback={<SceneFallback />}>
              <SceneSetup />
            </ErrorBoundary>
          </div>
          <ProductList />
        </section>
        <HeroFooter />
      </MainGrid>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:lang/*" element={<MainApp />} />
    </Routes>
  )
}

export default App
