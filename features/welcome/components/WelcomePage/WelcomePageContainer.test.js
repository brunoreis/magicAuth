import { render as tlRender, screen } from '@testing-library/react'
import * as R from 'ramda'

import { addTheme } from 'util/testHelpers'
import addReduxProvider from "util/testHelpers/addReduxProvider"
import { buildStore } from 'app/store';

// this should not depend on these events to be tested:
import { receiveUsername } from 'features/users/usersSlice'
import { addUser } from 'features/users/usersSlice'

import WelcomePageContainer from './WelcomePageContainer'

const render = R.compose(tlRender, addTheme)
const Component = R.compose(addReduxProvider)(WelcomePageContainer)

describe('WelcomePageContainer', () => {
  // I may think about a better way to init data, these dispatches seems too coupled
  it('should show the correct username.', () => {
    const issuer = "asdlfjasdlkfjaklsdfjlkasdjfl"
    const email = "e@mail.com"
    const username = "dude"
    let store = buildStore()
    store.dispatch({ type: 'persist/REHYDRATE'})
    store.dispatch({ type: 'app/routerReady'})
    
    // remove this: 
    store.dispatch(addUser({ issuer, email }))
    store.dispatch(receiveUsername({ username, issuer }))
    render(<Component store={store} users={{username}} />)
    const text = screen.getByText(`Welcome, ${username}`)
    expect(text).not.toBeNull()
  })

})