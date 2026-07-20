import { act, renderHook } from '@testing-library/react'
import { expect, test } from 'vitest'
import { useResponsive } from '../hooks/useResponsive'

const resizeTo = (width) => {
  act(() => {
    window.innerWidth = width
    window.dispatchEvent(new Event('resize'))
  })
}

test('flags mobile, tablet and desktop from the viewport width', () => {
  const { result } = renderHook(() => useResponsive())
  // jsdom defaults to 1024px wide
  expect(result.current.isDesktop).toBe(true)
  expect(result.current.isMobile).toBe(false)

  resizeTo(500)
  expect(result.current.isMobile).toBe(true)
  expect(result.current.isDesktop).toBe(false)

  resizeTo(900)
  expect(result.current.isTablet).toBe(true)
  expect(result.current.isMobile).toBe(false)

  resizeTo(1024)
  expect(result.current.isDesktop).toBe(true)
})
