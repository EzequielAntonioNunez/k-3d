import { useTranslation } from 'react-i18next'
import { useStore } from '../../store/useStore'

const SLIDES = [0, 1, 2]

export const SliderDots = () => {
  const { t } = useTranslation()
  const activeSlide = useStore((state) => state.activeSlide)
  const setActiveSlide = useStore((state) => state.setActiveSlide)

  return (
    <ul className="slider-dots" aria-label="Product slides">
      {SLIDES.map((index) => (
        <li key={index}>
          <button
            type="button"
            className="slider-dots__btn"
            aria-label={t('scene.slide', { index: index + 1 })}
            aria-current={activeSlide === index}
            onClick={() => setActiveSlide(index)}
          />
        </li>
      ))}
    </ul>
  )
}
