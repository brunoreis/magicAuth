import * as R from 'ramda'
import { render as tlRender, screen } from '@testing-library/react'

import { addTheme } from 'util/testHelpers'
import addReduxProvider from "util/testHelpers/addReduxProvider"
import { buildStore } from 'app/store';

import WelcomePage from './WelcomePage'

const render = R.compose(tlRender, addTheme)
const Component = R.compose(addReduxProvider)(WelcomePage)

describe('Welcome', () => {
  it('Given username is Dude, should show a heading with "Welcome, Dude"', () => {
    let store = buildStore();
    render(<Component store={store} username="Dude" />);
    const heading = screen.getByRole('heading', {level: 1})
    expect(heading).toHaveTextContent('Welcome, Dude')
  })

  it('Has a 🚀', () => {
    let store = buildStore();
    render(<Component store={store} username="Dude" />);
    const rockets = screen.getByText('🚀')
    expect(rockets).not.toBe(null)
  })

  it("Shows a Log Out button", ()=>{
    let store = buildStore();
    render(<Component store={store} username="Dude" />);
    const button = screen.getByRole('button')
    expect(button.innerHTML).toBe("Log Out")
  })
})