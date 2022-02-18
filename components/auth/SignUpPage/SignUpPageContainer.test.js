import { render as tlRender, screen, fireEvent } from '@testing-library/react'
import SignUpPageContainer from './SignUpPageContainer'
import { addTheme, addReduxProvider } from '../../../util/testHelpers'
import * as R from 'ramda'
import store from '../../../app/store'
import { getUsername } from '../../../app/selectors'
import { checkIsLoggedInReceived } from '../../../features/authentication/authenticationSlice'
import userEvent from '@testing-library/user-event'

const render = R.compose(tlRender, addTheme, addReduxProvider)

const metadata = {
    email: 'doesnot@matter.com',
    issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
}

const addLoggedUserToTheStore = () => store.dispatch(checkIsLoggedInReceived(metadata))

describe('SignUpPageContainer', () => {
  // I may think about a better way to init data, these dispatches seems too coupled
  it('Given that the user filled the username, should set the username in the store when the button is clicked.', () => {
    const username = "dude"; 
    store.dispatch({ type: 'persist/REHYDRATE'})
    store.dispatch({ type: 'app/routerReady'})
    addLoggedUserToTheStore()
    render(<SignUpPageContainer />)
    const input = screen.getByLabelText('Pick a username')
    userEvent.type(input, username)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(getUsername(store.getState())).toBe(username)
  })
})