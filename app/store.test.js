import { checkIsLoggedInReceived } from '../features/authentication/authenticationSlice'
import store, { receiveUsernameThunk } from './store';
import { getUsername } from './selectors'

it('dude', () => {
    expect(true).toBe(true)
})


describe('getUserName', () => {
    it('should return null if no username is set', () => {
        const issuerId = "asdlfjasdlkfjaklsdfjlkasdjfl"
        store.dispatch(checkIsLoggedInReceived({ issuer: issuerId }))
        expect(getUsername(store.getState())).toBeNull()
    })
})
