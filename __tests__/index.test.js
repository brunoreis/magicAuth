import { render as tlRender, screen } from '@testing-library/react'
import Home from '@/pages/index'
import { addTheme } from '../util/testHelpers'
import * as R from 'ramda'

const render = R.compose(tlRender, addTheme)

describe('Home', () => {
  it('Has a heading with "Welcome"', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {level: 1})
    expect(heading).toHaveTextContent('Welcome,')
  })
})