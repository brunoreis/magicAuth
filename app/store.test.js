import { checkIsLoggedInReceived } from '../features/authentication/authenticationSlice'
import { createStore, receiveUsernameThunk } from './store';
import { getUsername } from './selectors'

it('dude', () => {
    expect(true).toBe(true)
})


describe('getUserName', () => {
    it('should return null if no username is set', () => {
        const issuerId = "asdlfjasdlkfjaklsdfjlkasdjfl"
        const store = createStore()
        store.dispatch(checkIsLoggedInReceived({ issuer: issuerId }))
        expect(getUsername(store.getState())).toBeNull()
    })
})
