import { render as tlRender, screen, waitFor } from '@testing-library/react'
import SignInPageContainer from './SignInPageContainer'
import { addTheme, addReduxProvider } from '../../../util/testHelpers'
import { store } from '../../../app/store'
import { getRememberMe } from '../../../features/authentication/authenticationSlice'
import * as R from 'ramda'
import userEvent from '@testing-library/user-event'

const render = R.compose(tlRender, addTheme, addReduxProvider)

describe('SignInPageContainer', () => {
  it('Given that the user filled the email and checked remember me, should set remember me to true in the store.', async () => {
    const email = 'e@mail.com'
    render(<SignInPageContainer />)
    userEvent.type(screen.getByLabelText('Your Email'), email)
    userEvent.click(screen.getByLabelText('Remember me'))
    userEvent.click(screen.getByRole('button'))
    const rememberMeStoreValue = getRememberMe(store.getState().authentication)
    expect(rememberMeStoreValue).toBe(true)
  })
})