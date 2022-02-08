import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

describe('Home', () => {
  it('Has a heading with "Welcome"', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {level: 1})
    expect(heading).toHaveTextContent('Welcome,')
  })
})