import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Typography } from '../components/ui/Typography'

test('Typography renders correctly', () => {
  render(<Typography variant="h1">Botole Premium</Typography>)
  expect(screen.getByText('Botole Premium')).toBeDefined()
})
