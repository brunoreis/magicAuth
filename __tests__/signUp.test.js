import { render as tlRender, screen } from '@testing-library/react'
import SignUp from '@/pages/signUp'
import { addTheme } from '../util/testHelpers'
import * as R from 'ramda'

const render = R.compose(tlRender, addTheme)

describe('Sign Up', () => {
  it('Has the correct header', () => {
    render(<SignUp />)
    const heading = screen.getByRole('heading', {level: 1})
    expect(heading).toHaveTextContent('Sign Up')
  })
})