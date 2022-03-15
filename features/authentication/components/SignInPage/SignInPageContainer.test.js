import { render as tlRender, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as R from 'ramda'

import { addTheme } from 'util/testHelpers'
import addReduxProvider from "util/testHelpers/addReduxProvider"
import getRememberMe from 'features/authentication/selectors/global/getRememberMe'
import { buildStore } from 'app/store';

import SignInPageContainer from './SignInPageContainer'

const render = R.compose(tlRender, addTheme)
const Component = R.compose(addReduxProvider)(SignInPageContainer)
jest.setTimeout(50000)
describe.only('SignInPageContainer', () => {
  it('Given that the user filled the email and checked remember me, should set remember me to true in the store.', async () => {
    const email = 'bruno.p.reis@gmail.com'
    const store = buildStore();
    render(<Component store={store}/>)
    userEvent.type(screen.getByLabelText('Your Email'), email)
    userEvent.click(screen.getByLabelText('Remember me'))
    userEvent.click(screen.getByRole('button'))
    const rememberMeStoreValue = getRememberMe(store.getState())
    expect(rememberMeStoreValue).toBe(true)
    // await waitFor(() => expect(true).toBe(false), { timeout: 50000 })
  })
})