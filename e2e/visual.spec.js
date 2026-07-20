import { expect, test } from '@playwright/test'

// Visual regression for the home page. The project config pins the viewport
// at 1470x1092 (2x the reference shot); motion is frozen via emulateMedia so
// the only legitimate diffs are intentional design changes. Update baselines
// with: npx playwright test --project=visual --update-snapshots
test('home matches the visual baseline', async ({ page }) => {
  // Freeze idle animations (bob, shadows) — the reducedMotion context option
  // is not honored by the test runner, so emulate it explicitly per page.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/en')

  const scene = page.locator('.scene-canvas')
  await scene.waitFor()
  await page.evaluate(() => document.fonts.ready)
  // Wait for the deferred 3D scene to finish settling.
  await page.waitForTimeout(3500)

  // Wait until the scene is provably static (fonts swapped, shaders warm),
  // so the screenshot can't flake on late paints.
  await expect(async () => {
    const a = await scene.screenshot()
    await page.waitForTimeout(400)
    const b = await scene.screenshot()
    expect(a.equals(b)).toBe(true)
  }).toPass({ timeout: 10000, intervals: [500, 1000] })

  // Full page with the WebGL canvas masked: cross-run GPU noise (~4.3k px)
  // would otherwise drown the signal. Tight budget catches 1px design drift.
  await expect(page).toHaveScreenshot('home.png', {
    mask: [scene],
    maxDiffPixels: 250,
  })

  // The 3D scene itself, with a loose budget that tolerates GPU run-to-run
  // noise but still fails on gross regressions (missing/misplaced bottle).
  await expect(scene).toHaveScreenshot('scene.png', {
    maxDiffPixelRatio: 0.05,
  })
})
