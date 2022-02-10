import { render as tlRender, screen, fireEvent } from '@testing-library/react'
import SignUpPageContainer from './SignUpPageContainer'
import { addTheme } from '../../../util/testHelpers'
import * as R from 'ramda'

const render = R.compose(tlRender, addTheme)

describe('SignUpPageContainer', () => {
  it('Given that the user filled the username, should return these values when the button is clicked.', () => {
    const onButtonClick = jest.fn();
    render(<SignUpPageContainer onButtonClick={onButtonClick} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onButtonClick).toHaveBeenCalledWith({
      username: '',
    })
    const input = screen.getByLabelText('Pick a username')
    fireEvent.change(input, {target: {value: 'dude'}})
    fireEvent.click(button)
    expect(onButtonClick).toHaveBeenCalledWith({
        username: 'dude',
    })
  })
})