import { render as tlRender, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as R from 'ramda'

import store from 'app/store'
import { addTheme, addReduxProvider } from 'util/testHelpers'
import getRememberMe from 'features/authentication/selectors/global/getRememberMe'

import SignInPageContainer from './SignInPageContainer'

const render = R.compose(tlRender, addTheme, addReduxProvider)

describe('SignInPageContainer', () => {
  it('Given that the user filled the email and checked remember me, should set remember me to true in the store.', async () => {
    const email = 'e@mail.com'
    render(<SignInPageContainer />)
    userEvent.type(screen.getByLabelText('Your Email'), email)
    userEvent.click(screen.getByLabelText('Remember me'))
    userEvent.click(screen.getByRole('button'))
    const rememberMeStoreValue = getRememberMe(store.getState())
    expect(rememberMeStoreValue).toBe(true)
  })
})