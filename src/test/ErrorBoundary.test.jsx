import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { ErrorBoundary } from '../components/layout/ErrorBoundary'

const Bomb = () => {
  throw new Error('boom')
}

test('renders children when nothing throws', () => {
  render(
    <ErrorBoundary fallback={<p>scene failed</p>}>
      <p>scene ok</p>
    </ErrorBoundary>,
  )
  expect(screen.getByText('scene ok')).toBeInTheDocument()
})

test('renders the fallback when a child throws', () => {
  // React logs boundary errors to console; keep the output clean.
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
  render(
    <ErrorBoundary fallback={<p>scene failed</p>}>
      <Bomb />
    </ErrorBoundary>,
  )
  expect(screen.getByText('scene failed')).toBeInTheDocument()
  spy.mockRestore()
})
