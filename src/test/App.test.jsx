import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import App from '../App'
import '../config/i18n'

const renderApp = (route = '/en') =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </HelmetProvider>,
  )

test('redirects / to /en and renders the hero', () => {
  renderApp('/')
  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading).toHaveTextContent('Drinking')
  expect(heading).toHaveTextContent('Water')
  expect(heading).toHaveTextContent('Bottle')
})

test('renders the product list and the 2D fallback without WebGL', () => {
  renderApp()
  expect(screen.getByText('Travel Tumbler')).toBeInTheDocument()
  expect(screen.getByText('Active Tumbler')).toBeInTheDocument()
  // jsdom has no WebGL context, so the scene degrades to the 2D image
  expect(screen.getByRole('img', { name: /Matte black Botole/ })).toBeInTheDocument()
})
