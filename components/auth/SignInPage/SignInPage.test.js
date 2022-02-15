import { render as tlRender, screen, fireEvent } from '@testing-library/react'
import SignInPage from './SignInPage'
import {within} from '@testing-library/dom'
import { addTheme } from '../../../util/testHelpers'
import * as R from 'ramda'
import userEvent from '@testing-library/user-event'

const render = R.compose(tlRender, addTheme)

describe('SignIn Page', () => {
  it('Shows a "Sign In" header', () => {
    render(<SignInPage />)
    const heading = screen.getByRole('heading', {level: 1})
    expect(heading.innerHTML).toBe('Sign In')
  })

  it(`Shows a input with the label "Your Email"`, ()=>{
    render(<SignInPage />)
    const input = screen.getByLabelText('Your Email')
    expect(input).not.toBeNull();
  })

  it("The input shows the @ adornment", ()=>{
    render(<SignInPage />)
    const inputContainer = screen.getByTestId('emailInput')
    const adornment = within(inputContainer).getByText('@');
    expect(adornment).not.toBeNull();
  })

  it("Shows a Sign In / Sign Up button", ()=>{
    render(<SignInPage />)
    const button = screen.getByRole('button')
    expect(button.innerHTML).toBe("Sign In / Sign Up")
  })

  it("Calls onButtonClick when the button is clicked", () => {
    const onButtonClick = jest.fn();
    render(<SignInPage onButtonClick={onButtonClick} canSubmit={true}/>)
    userEvent.click(screen.getByRole('button'))
    userEvent.type(screen.getByLabelText('Your Email'), '44')
    expect(onButtonClick).toHaveBeenCalled();
  })

  it("Do not calls onButtonClick if canSubmit is false", () => {
    const onButtonClick = jest.fn();
    render(<SignInPage onButtonClick={onButtonClick} canSubmit={false}/>)
    userEvent.click(screen.getByRole('button'))
    expect(onButtonClick).not.toHaveBeenCalled()
  })

  it("Shows the informed email", () => {
    render(<SignInPage email="partial@" onEmailChange={()=>{}}/>)
    const input = screen.getByLabelText('Your Email')
    expect(input.value).toBe("partial@")
  })

  it("Calls onEmailChange when the user types in the input", () => {
    const onChange = jest.fn();
    render(<SignInPage onEmailChange={onChange} />)
    userEvent.type(screen.getByLabelText('Your Email'), '44')
    expect(onChange).toHaveBeenCalledWith('44')
  })

  it("Calls onRememberMeToggle when the toggle is clicked", () => {
    const onRememberMeToggle = jest.fn();
    render(<SignInPage onRememberMeToggle={onRememberMeToggle} />)
    userEvent.click(screen.getByLabelText('Remember me'))
    expect(onRememberMeToggle).toHaveBeenCalled()
  })

  it("Show correct rememberMe value", () => {
    const {rerender} = render(<SignInPage rememberMe={true} onRememberMeToggle={jest.fn()} />)
    let toggle = screen.getByLabelText('Remember me')
    expect(toggle.checked).toBe(true)
    rerender(addTheme(<SignInPage rememberMe={false} onRememberMeToggle={jest.fn()} />))
    toggle = screen.getByLabelText('Remember me')
    expect(toggle.checked).toBe(false)
  })

})