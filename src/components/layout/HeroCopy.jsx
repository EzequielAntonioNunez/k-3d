import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'

const PlayIcon = () => (
  <svg viewBox="0 0 12 14" aria-hidden="true" focusable="false">
    <path d="M0 0 L12 7 L0 14 Z" fill="currentColor" />
  </svg>
)

export const HeroCopy = () => {
  const { t } = useTranslation()

  return (
    <div className="hero__copy">
      <h1 className="hero__title" id="hero-title">
        <span>{t('hero.title1')}</span>
        <span>{t('hero.title2')}</span>
        <span>{t('hero.title3')}</span>
      </h1>
      <p className="hero__sub">{t('hero.sub')}</p>
      <div className="hero__cta">
        <Button variant="pill">{t('hero.cta')}</Button>
        <Button variant="circle" aria-label={t('hero.play')}>
          <PlayIcon />
        </Button>
      </div>
    </div>
  )
}
