import { render as tlRender, screen, fireEvent } from '@testing-library/react'
import SignInPageContainer from './SignInPageContainer'
import { addTheme, addReduxProvider } from '../../../util/testHelpers'
import { store } from '../../../app/store'
import { getRememberMe } from '../../../features/authentication/authenticationSlice'
import * as R from 'ramda'

const render = R.compose(tlRender, addTheme, addReduxProvider)

describe('SignInPageContainer', () => {
  it('Given that the user filled the email and checked remember me, should set remember me to true in the store.', () => {
    const onButtonClick = jest.fn();
    const email = 'e@mail.com'
    render(<SignInPageContainer onButtonClick={onButtonClick} />)
    const button = screen.getByRole('button')
    const input = screen.getByLabelText('Your Email')
    fireEvent.change(input, {target: {value: email}})
    const toggle = screen.getByLabelText('Remember me')
    fireEvent.click(toggle)
    fireEvent.click(button)
    const rememberMe = getRememberMe(store.getState().authentication)
    expect(rememberMe).toBe(true)
  })
})