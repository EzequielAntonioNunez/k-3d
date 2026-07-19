import { useTranslation } from 'react-i18next'

const MouseIcon = () => (
  <svg viewBox="0 0 26 40" aria-hidden="true" focusable="false">
    <rect
      x="1.5"
      y="1.5"
      width="23"
      height="37"
      rx="11.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    />
    <rect
      className="scroll-indicator__wheel"
      x="10.5"
      y="9"
      width="5"
      height="8"
      rx="2.5"
      fill="currentColor"
    />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 50 12" aria-hidden="true" focusable="false">
    <path
      d="M0 6 H45 M39 1 L45 6 L39 11"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const HeroFooter = () => {
  const { t } = useTranslation()

  return (
    <footer className="site-footer">
      <div className="scroll-indicator">
        <MouseIcon />
        <span>{t('footer.scrollDown')}</span>
      </div>
      <p className="footer-note">
        {t('footer.notePre')} <strong>{t('footer.noteStrong')}</strong> {t('footer.notePost')}
      </p>
      <a className="discover-more" href="#discover" aria-label={t('footer.discoverAria')}>
        <span>
          {t('footer.discover1')} {t('footer.discover2')}
        </span>
        <ArrowIcon />
      </a>
    </footer>
  )
}
