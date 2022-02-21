import { render as tlRender, screen } from '@testing-library/react'
import * as R from 'ramda'

import { addTheme, addReduxProvider } from 'util/testHelpers'
import store from 'app/store'
// this should not depend on these events to be tested:
import { receiveUsernameStart } from 'features/users/usersSlice'
import { checkIsLoggedInReceived } from 'features/authentication/authenticationSlice'

import WelcomePageContainer from './WelcomePageContainer'

const render = R.compose(tlRender, addTheme, addReduxProvider)

describe('WelcomePageContainer', () => {
  // I may think about a better way to init data, these dispatches seems too coupled
  it('should show the correct username.', () => {
    const issuerId = "asdlfjasdlkfjaklsdfjlkasdjfl"
    const username = "dude"
    store.dispatch({ type: 'persist/REHYDRATE'})
    store.dispatch({ type: 'app/routerReady'})
    store.dispatch(checkIsLoggedInReceived({ issuer: issuerId }))
    store.dispatch(receiveUsernameStart(username))
    render(<WelcomePageContainer />)
    const text = screen.getByText(`Welcome, ${username}`)
    expect(text).not.toBeNull()
  })

})