import { afterEach, expect, test, vi } from 'vitest'
import { isWebGLAvailable } from '../lib/webgl'

afterEach(() => {
  vi.restoreAllMocks()
  delete window.WebGLRenderingContext
})

test('returns false when WebGL contexts are unavailable', () => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
  expect(isWebGLAvailable()).toBe(false)
})

test('returns true when a webgl2 context is available', () => {
  window.WebGLRenderingContext = class {}
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation((type) =>
    type === 'webgl2' ? {} : null,
  )
  expect(isWebGLAvailable()).toBe(true)
})
