import { checkIsLoggedInReceived } from '../features/authentication/authenticationSlice'
import { createStore, receiveUsernameThunk } from './store';
import { getUsername } from './selectors'

describe('receiveUsernameThunk', () => {
    it('injects the issuer in the action', () => {
        const issuerId = "asdlfjasdlkfjaklsdfjlkasdjfl"
        const user = "dude"
        const store = createStore();
        store.dispatch(checkIsLoggedInReceived({ issuer: issuerId }))
        store.dispatch(receiveUsernameThunk(user))
        expect(getUsername(store.getState())).toBe(user)
    })
})

describe('getUserName', () => {
    it('should return null if no username is set', () => {
        const issuerId = "asdlfjasdlkfjaklsdfjlkasdjfl"
        const store = createStore()
        store.dispatch(checkIsLoggedInReceived({ issuer: issuerId }))
        expect(getUsername(store.getState())).toBeNull()
    })
})

