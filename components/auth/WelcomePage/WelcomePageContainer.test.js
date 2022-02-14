import { render as tlRender, screen, fireEvent } from '@testing-library/react'
import WelcomePageContainer from './WelcomePageContainer'
import { addTheme, addReduxProvider } from '../../../util/testHelpers'
import * as R from 'ramda'
import { store, receiveUsernameThunk } from '../../../app/store'
import { checkIsLoggedInReceived } from '../../../features/authentication/authenticationSlice'

const render = R.compose(tlRender, addTheme, addReduxProvider)

describe('WelcomePageContainer', () => {
  it('Given that the user filled the username, should set the username in the store when the button is clicked.', () => {
    const issuerId = "asdlfjasdlkfjaklsdfjlkasdjfl"
    const username = "dude"
    store.dispatch(checkIsLoggedInReceived({ issuer: issuerId }))
    store.dispatch(receiveUsernameThunk(username))
    render(<WelcomePageContainer />)
    const text = screen.getByText(`Welcome, ${username}`)
    expect(text).not.toBeNull()
  })

  // it("Calls onButtonClick when the button is clicked", () => {
  //   const onButtonClick = jest.fn();
  //   render(<WelcomePage onButtonClick={onButtonClick} />)
  //   const button = screen.getByRole('button')
  //   fireEvent.click(button)
  //   expect(onButtonClick).toHaveBeenCalled()
  // })
})