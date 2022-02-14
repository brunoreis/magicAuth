import authenticationReducer, { checkIsLoggedInReceived } from '../features/authentication/authenticationSlice'
import { store, receiveUsernameThunk, getUsername } from './store';

describe('receiveUsernameThunk', (username) => {
    it.only('injects the issuer in the action', () => {
        const issuerId = "asdlfjasdlkfjaklsdfjlkasdjfl"
        const user = "dude"
        store.dispatch(checkIsLoggedInReceived({ issuer: issuerId }))
        store.dispatch(receiveUsernameThunk(user))
        expect(getUsername(store.getState())).toBe(user)
    })
})