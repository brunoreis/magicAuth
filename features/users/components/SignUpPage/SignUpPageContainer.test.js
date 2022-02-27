import { render as tlRender, screen, fireEvent } from '@testing-library/react'
import SignUpPageContainer from './SignUpPageContainer'
import { addTheme, addReduxProvider } from 'util/testHelpers'
import * as R from 'ramda'
import store from 'app/store'
import { checkIsLoggedInReceived } from 'features/authentication/authenticationSlice'
import userEvent from '@testing-library/user-event'
import getUser from '../../selectors/global/getUser'

const render = R.compose(tlRender, addTheme, addReduxProvider)

const addLoggedUserToTheStore = (issuer) => store.dispatch(checkIsLoggedInReceived({ issuer }))

describe('SignUpPageContainer', () => {
  it('Given that the user filled the username, should set the username in the store when the button is clicked.', () => {
    const username = "dude"; 
    const issuer = "xpto";
    addLoggedUserToTheStore(issuer)
    expect(getUser(store.getState()).username).toBe(undefined)
    render(<SignUpPageContainer authentication={{ issuer }} />)
    const input = screen.getByLabelText('Pick a username')
    userEvent.type(input, username)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(getUser(issuer)(store.getState()).username).toBe(username)
  })
})