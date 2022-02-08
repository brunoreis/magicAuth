import { render, screen } from '@testing-library/react'
import SignUp from '@/pages/signUp'

describe('Sign Up', () => {
  it('Has the correct header', () => {
    render(<SignUp />)
    const heading = screen.getByRole('heading', {level: 1})
    expect(heading).toHaveTextContent('Sign Up')
  })
})