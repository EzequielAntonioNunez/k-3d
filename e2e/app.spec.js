import { expect, test } from '@playwright/test'

test('Homepage loads correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Botole 3D Premium/)
  // Expect the initial redirect to language route
  await expect(page).toHaveURL(/.*\/en/)
})

test('Bottle rotates when the scene is dragged', async ({ page }) => {
  // Freeze idle animations (bob, shadows) so only the drag can change pixels.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  const scene = page.locator('.scene-canvas')
  await scene.waitFor()
  // Wait for the deferred 3D scene to finish settling.
  await page.waitForTimeout(3500)

  const box = await scene.boundingBox()
  const startX = box.x + box.width * 0.35
  const startY = box.y + box.height * 0.6

  const before = await scene.screenshot()
  const still = await scene.screenshot()
  // Sanity check: with reduced motion the scene is static when untouched.
  expect(before.equals(still)).toBe(true)

  await page.mouse.move(startX, startY)
  await page.mouse.down()
  await page.mouse.move(startX + 280, startY - 40, { steps: 12 })
  await page.mouse.up()
  // Let the orbit damping come to rest.
  await page.waitForTimeout(1200)

  const after = await scene.screenshot()
  expect(before.equals(after)).toBe(false)
})
