import { render as tlRender , screen } from '@testing-library/react'
import * as R from 'ramda'

import { addTheme } from 'util/testHelpers'

import Button from './Button'

const render = R.compose(tlRender, addTheme)

describe('Button', () => {
  // I may think about a better way to init data, these dispatches seems too coupled
  it('show button text', () => {
    const buttonText = "Button Text"
    render(<Button>{ buttonText }</Button>)
    const button = screen.getByText(buttonText)
    expect(button).toBeTruthy()
  })

  describe('loading', () => {
    it('show loading text', () => {
        const buttonText = "Button Text"
        render(<Button loading>{ buttonText }</Button>)
        const button = screen.queryByText(buttonText)
        expect(button).toBeFalsy()
    })

    it('show loading', () => {
        const buttonText = "Button Text"
        const loadingText = "...loading..."
        render(<Button loading>{ buttonText }</Button>)
        const button = screen.getByText(loadingText)
        expect(button).toBeTruthy()
    })
  })
})