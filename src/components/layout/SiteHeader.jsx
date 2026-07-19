import { useTranslation } from 'react-i18next'

export const SiteHeader = () => {
  const { t } = useTranslation()

  return (
    <header className="site-header">
      <a className="logo" href="/" aria-label="Botole — home">
        Botole
      </a>
      <nav className="site-nav" aria-label={t('nav.ariaLabel')}>
        <ul className="site-nav__list">
          <li>
            <a className="site-nav__link" href="#home" aria-current="page">
              {t('nav.home')}
            </a>
          </li>
          <li>
            <a className="site-nav__link" href="#product">
              {t('nav.product')}
            </a>
          </li>
          <li>
            <a className="site-nav__link" href="#pricing">
              {t('nav.pricing')}
            </a>
          </li>
        </ul>
      </nav>
      <a className="contact-pill" href="#contact">
        {t('nav.contact')}
      </a>
    </header>
  )
}
