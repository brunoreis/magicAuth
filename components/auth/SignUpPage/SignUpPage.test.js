import { render as tlRender, screen, fireEvent } from '@testing-library/react'
import SignUpPage from './SignUpPage'
import { addTheme } from '../../../util/testHelpers'
import {within} from '@testing-library/dom'
import * as R from 'ramda'

const render = R.compose(tlRender, addTheme)

describe('Sign Up', () => {
  it('Has the correct header', () => {
    render(<SignUpPage />)
    const heading = screen.getByRole('heading', {level: 1})
    expect(heading).toHaveTextContent('Sign Up')
  })

  it(`Shows a input with the label "Pick a username"`, ()=>{
    render(<SignUpPage />)
    const input = screen.getByLabelText('Pick a username')
    expect(input).not.toBeNull();
  })

  it("The input shows the @ adornment", ()=>{
    render(<SignUpPage />)
    const inputContainer = screen.getByTestId('usernameInput')
    const adornment = within(inputContainer).getByText('@');
    expect(adornment).not.toBeNull();
  })

  it("Shows a Create Account button", ()=>{
    render(<SignUpPage />)
    const button = screen.getByRole('button')
    expect(button.innerHTML).toBe("Create Account")
  })

  it("Shows the informed username", () => {
    render(<SignUpPage username="dude" onUsernameChange={jest.fn()}/>)
    const input = screen.getByLabelText('Pick a username')
    expect(input.value).toBe("dude")
  })

  it("Calls onUsernameChange when the user types in the input", () => {
    const onChange = jest.fn();
    render(<SignUpPage onUsernameChange={onChange} />)
    const input = screen.getByLabelText('Pick a username')
    fireEvent.change(input, {target: {value: 'dude'}})
    expect(onChange).toHaveBeenCalledWith('dude')
  })

  it("Given available is not set, shows no message", ()=>{
    render(<SignUpPage />)
    const message = screen.getByTestId('message')
    expect(message.innerHTML).toBe("")
  })

  it("Given available is true, shows available message", ()=>{
    render(<SignUpPage available={true}/>)
    const message = screen.getByTestId('message')
    expect(message.innerHTML).toBe("✔ Available!")
  })
  
  it("Given available is false, shows taken message", ()=>{
    render(<SignUpPage available={false}/>)
    const message = screen.getByTestId('message')
    expect(message.innerHTML).toBe("✘ Taken 🙁")
  })

  it("Calls onButtonClick when the button is clicked", () => {
    const onButtonClick = jest.fn();
    render(<SignUpPage onButtonClick={onButtonClick} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onButtonClick).toHaveBeenCalled()
  })
})