import { render as tlRender, screen, fireEvent } from '@testing-library/react'
import SignInPageContainer from './SignInPageContainer'
import { addTheme } from '../../../util/testHelpers'
import * as R from 'ramda'

const render = R.compose(tlRender, addTheme)

describe('SignInPageContainer', () => {
  it('Given that the user filled the email and checked remember me, should return these values when the button is clicked.', () => {
    const onButtonClick = jest.fn();
    render(<SignInPageContainer onButtonClick={onButtonClick} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onButtonClick).toHaveBeenCalledWith({
      email: '',
      rememberMe: false
    })
    const input = screen.getByLabelText('Your Email')
    fireEvent.change(input, {target: {value: 'e@mail.com'}})
    const toggle = screen.getByLabelText('Remember me')
    fireEvent.click(toggle)
    fireEvent.click(button)
    expect(onButtonClick).toHaveBeenCalledWith({
        email: 'e@mail.com',
        rememberMe: true
    })
  })
})