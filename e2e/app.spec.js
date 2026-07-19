import { expect, test } from '@playwright/test'

test('Homepage loads correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Botole 3D Premium/)
  // Expect the initial redirect to language route
  await expect(page).toHaveURL(/.*\/en/)
})
