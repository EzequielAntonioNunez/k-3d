import { expect, test } from 'vitest'
import i18n from '../config/i18n'

test('initializes with the English fallback translations', async () => {
  await i18n.changeLanguage('en')
  expect(i18n.t('hero.cta')).toBe('Start Now')
})

test('switches to Spanish', async () => {
  await i18n.changeLanguage('es')
  expect(i18n.t('hero.cta')).toBe('Empezar ahora')
  await i18n.changeLanguage('en')
})
