import authenticationReducer, {
  signInSuccess,
  isLoggedIn,
  checkIsLoggedInReceived,
  getIssuer,
  getEmail,
} from './authenticationSlice';

describe('auth reducer', () => {
  it('should handle initial state', () => {
    expect(authenticationReducer(undefined, { type: 'unknown' })).toEqual({
      isLoggedIn: false,
      loggedUser: {
        issuer: null,
        email: null
      }
    });
  });
  describe('checkIsLoggedInReceived', () => {
    it('sets isLoggedIn', () => {
      const state = authenticationReducer(undefined, checkIsLoggedInReceived(true))
      expect(isLoggedIn(state)).toBe(true)  
    })
  })
  describe('signInSuccess', () => {
    it('sets issuer and email', () => {
      const metadata = { email: 'testemail@a.com', issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'}
      const state = authenticationReducer(undefined, signInSuccess(metadata))
      expect(getIssuer(state)).toBe('did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7')  
      expect(getEmail(state)).toBe('testemail@a.com')  
    })
  })
});
describe('selectors', () => {
  it('isLoggedIn', () => {
    const initialState = authenticationReducer(undefined, {})
    expect(isLoggedIn(initialState)).toBe(false)
  })
})
