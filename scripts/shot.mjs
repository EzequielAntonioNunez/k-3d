// Screenshot the running app with the system Chrome (no Playwright browser download).
// Usage: node scripts/shot.mjs [url] [out.png] [width] [height]
import { chromium } from 'playwright'

const url = process.argv[2] || 'http://localhost:5173/en'
const out = process.argv[3] || 'shot.png'
const width = Number(process.argv[4] || 1470)
const height = Number(process.argv[5] || 1092)

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width, height } })
await page.goto(url, { waitUntil: 'networkidle' })
// wait for fonts + the deferred 3D scene to settle
await page.waitForTimeout(3500)
await page.screenshot({ path: out })
await browser.close()
console.log(`saved ${out} (${width}x${height})`)
