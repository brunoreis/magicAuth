import {  renderHook, act } from '@testing-library/react-hooks'
import useDebouncedValidEmailErrorMessage, { INVALID_EMAIL_MESSAGE } from './useDebouncedValidEmailErrorMessage'

describe('useDebouncedValidEmailErrorMessage', () => {
  it('Will validate the email and return a delayed message', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDebouncedValidEmailErrorMessage("invalidEmail"))
    act(() => {
        expect(result.current).toBe("")
    })
    await waitForNextUpdate()
    expect(result.current).toBe(INVALID_EMAIL_MESSAGE)
  })
})