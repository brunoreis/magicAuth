import { render, screen } from '@testing-library/react'
import SignIn from '@/pages/signIn'

describe('Sign In', () => {
  it('Has the correct header', () => {
    render(<SignIn />)
    const heading = screen.getByRole('heading', {level: 1})
    expect(heading).toHaveTextContent('Sign In')
  })
})