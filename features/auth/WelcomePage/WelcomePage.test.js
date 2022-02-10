import { render as tlRender, screen } from '@testing-library/react'
import WelcomePage from './WelcomePage'
import { addTheme } from '../../../util/testHelpers'
import * as R from 'ramda'

const render = R.compose(tlRender, addTheme)

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
})