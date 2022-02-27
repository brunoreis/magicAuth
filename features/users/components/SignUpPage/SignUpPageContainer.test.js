import { render as tlRender, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { addTheme, addReduxProvider } from 'util/testHelpers'
import * as R from 'ramda'

import store from 'app/store'
import { addUser } from 'features/users/usersSlice'

import getUser from '../../selectors/global/getUser'
import SignUpPageContainer from './SignUpPageContainer'

const render = R.compose(tlRender, addTheme, addReduxProvider)

describe('SignUpPageContainer', () => {
  it('Given that the user filled the username, should set the username in the store when the button is clicked.', () => {
    const username = "dude"; 
    const issuer = "xpto";
    const email = "xpto@gmail.com"
    store.dispatch(addUser({ issuer, email }))
    expect(getUser(store.getState()).username).toBe(undefined)
    render(<SignUpPageContainer authentication={{ issuer, email }} />)
    const input = screen.getByLabelText('Pick a username')
    userEvent.type(input, username)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(getUser(issuer)(store.getState()).username).toBe(username)
  })
})