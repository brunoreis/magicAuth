import { render as tlRender, screen, fireEvent } from '@testing-library/react'
import WelcomePage from './WelcomePage'
import { addTheme, addReduxProvider } from '../../../util/testHelpers'
import * as R from 'ramda'

const render = R.compose(tlRender, addTheme, addReduxProvider)

describe('Welcome', () => {
  it('Given username is Dude, should show a heading with "Welcome, Dude"', () => {
    render(<WelcomePage username="Dude"/>)
    const heading = screen.getByRole('heading', {level: 1})
    expect(heading).toHaveTextContent('Welcome, Dude')
  })

  it('Has a 🚀', () => {
    render(<WelcomePage username="Dude"/>)
    const rockets = screen.getByText('🚀')
    expect(rockets).not.toBe(null)
  })

  it("Shows a Log Out button", ()=>{
    render(<WelcomePage />)
    const button = screen.getByRole('button')
    expect(button.innerHTML).toBe("Log Out")
  })

  // it("Calls onButtonClick when the button is clicked", () => {
  //   const onButtonClick = jest.fn();
  //   render(<WelcomePage onButtonClick={onButtonClick} />)
  //   const button = screen.getByRole('button')
  //   fireEvent.click(button)
  //   expect(onButtonClick).toHaveBeenCalled()
  // })
})