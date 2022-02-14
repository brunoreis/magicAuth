import { render as tlRender, screen, fireEvent } from '@testing-library/react'
import WelcomePageContainer from './WelcomePageContainer'
import { addTheme, addReduxProvider } from '../../../util/testHelpers'
import * as R from 'ramda'
import { store } from '../../../app/store'
import { receiveUsernameStart } from '../../../features/users/usersSlice'
import { checkIsLoggedInReceived } from '../../../features/authentication/authenticationSlice'

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