import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { Button } from '../components/ui/Button'

// SFX is irrelevant here; howler needs real audio hardware.
vi.mock('use-sound', () => ({ default: () => [vi.fn()] }))

test('renders children with the pill variant by default', () => {
  render(<Button>Start Now</Button>)
  expect(screen.getByRole('button', { name: 'Start Now' })).toHaveClass('btn-pill')
})

test('applies the circle variant and a custom className', () => {
  render(
    <Button variant="circle" className="extra" aria-label="Play video">
      ▶
    </Button>,
  )
  expect(screen.getByRole('button', { name: 'Play video' })).toHaveClass('btn-circle', 'extra')
})

test('calls onClick when clicked', () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Click</Button>)
  fireEvent.click(screen.getByRole('button', { name: 'Click' }))
  expect(onClick).toHaveBeenCalledTimes(1)
})
