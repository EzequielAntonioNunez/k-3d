import { useTranslation } from 'react-i18next'

export const SceneFallback = ({ className = 'scene-fallback' }) => {
  const { t } = useTranslation()
  return (
    <div className={className}>
      <img
        src="/images/bottle-fallback.webp"
        alt={t('scene.bottleAlt')}
        width="450"
        height="1475"
      />
    </div>
  )
}
