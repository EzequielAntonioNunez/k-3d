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

  // Wait until the scene is provably static (fonts swapped, shaders warm),
  // so the only thing that can change pixels afterwards is the drag.
  await expect(async () => {
    const a = await scene.screenshot()
    await page.waitForTimeout(400)
    const b = await scene.screenshot()
    expect(a.equals(b)).toBe(true)
  }).toPass({ timeout: 10000, intervals: [500, 1000] })

  const before = await scene.screenshot()

  await page.mouse.move(startX, startY)
  await page.mouse.down()
  await page.mouse.move(startX + 280, startY - 40, { steps: 12 })
  await page.mouse.up()
  // Let the orbit damping come to rest.
  await page.waitForTimeout(1200)

  const after = await scene.screenshot()
  expect(before.equals(after)).toBe(false)
})

test('Spanish route renders localized content', async ({ page }) => {
  await page.goto('/es')
  await expect(page).toHaveURL(/.*\/es/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await expect(page.locator('#hero-title')).toContainText('Botella')
  await expect(page.getByRole('button', { name: 'Empezar ahora' })).toBeVisible()
})

test('shows the 2D fallback when WebGL is unavailable', async ({ page }) => {
  // Simulate a device without any WebGL support.
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null
  })
  await page.goto('/')
  await expect(page.getByRole('img', { name: /Matte black Botole/ })).toBeVisible()
  await expect(page.locator('canvas')).toHaveCount(0)
})
