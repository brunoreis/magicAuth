import { render as tlRender, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { addTheme } from 'util/testHelpers'
import addReduxProvider from "util/testHelpers/addReduxProvider"
import * as R from 'ramda'
import { buildStore } from 'modules/app/store';

import { addUser } from 'modules/users/slice/usersSlice'

import getUser from '../../selectors/global/getUser'
import SignUpPageContainer from './SignUpPageContainer'


const Component = R.compose(addReduxProvider)(SignUpPageContainer)
const render = R.compose(tlRender, addTheme)

describe('SignUpPageContainer', () => {
  it('Given that the user filled the username, should set the username in the store when the button is clicked.', () => {
    const username = "dude"; 
    const issuer = "xpto";
    const email = "xpto@gmail.com"
    let store = buildStore();
    render(<Component  store={store} authentication={{ issuer, email }} />)
    store.dispatch(addUser({ issuer, email }))
    const input = screen.getByLabelText('Pick a username')
    userEvent.type(input, username)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(getUser(issuer)(store.getState()).username).toBe(username)
  })
})