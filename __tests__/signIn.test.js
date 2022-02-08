import { render as tlRender, screen } from '@testing-library/react'
import SignIn from '@/pages/signIn'
import {within} from '@testing-library/dom'
import { addTheme } from '../util/testHelpers'
import * as R from 'ramda'

const render = R.compose(tlRender, addTheme)

describe('Sign In', () => {
  it('Shows a "Sign In" header', () => {
    render(<SignIn />)
    const heading = screen.getByRole('heading', {level: 1})
    expect(heading.innerHTML).toBe('Sign In')
  })

  const inputLabelText = "Your Email";
  it(`Shows a input with the label "${inputLabelText}"`, ()=>{
    render(<SignIn />)
    const input = screen.getByLabelText(inputLabelText)
    expect(input).not.toBeNull();
  })

  it(`The input shows the @ adornment`, ()=>{
    render(<SignIn />)
    const inputContainer = screen.getByTestId('emailInput')
    const adornment = within(inputContainer).getByText('@');
    expect(adornment).not.toBeNull();
  })

  it(`Shows a Sign In / Sign Up button`, ()=>{
    render(<SignIn />)
    const inputContainer = screen.getByRole('button')
    
  })
})