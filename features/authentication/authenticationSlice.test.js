import authenticationReducer, {
  signInSuccess,
  checkIsLoggedInReceived,
  signIn,
  signInFailure,
  logOut,
  logOutSuccess,
  checkIsLoggedInStarted,
  redirectsStarted,
  redirectsCompleted,
  isLoggedIn,
  getIssuer,
} from './authenticationSlice';

const exist = (actionCreator) => {
  actionCreator()
}
describe('auth reducer', () => {
  it('should handle initial state', () => {
    expect(authenticationReducer(undefined, { type: 'unknown' })).toEqual({
      issuer: null,
    });
  });
  describe('checkIsLoggedInReceived', () => {
    it('set the issuer', () => {
      const payload = { issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'}
      const state = authenticationReducer(undefined, checkIsLoggedInReceived(payload))
      expect(isLoggedIn(state)).toBe(true)
      expect(getIssuer(state)).toBe('did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7')
    })
    it('do not set if not logged in', () => {
      const payload = { issuer: null }
      const state = authenticationReducer(undefined, checkIsLoggedInReceived(payload))
      expect(isLoggedIn(state)).toBe(false)
      expect(getIssuer(state)).toBe(null)
    })
  })
  describe('signInSuccess', () => {
    it('sets issuer if logged in', () => {
      const payload = { email: 'testemail@a.com', issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'}
      const state = authenticationReducer(undefined, signInSuccess(payload))
      expect(isLoggedIn(state)).toBe(true)
      expect(getIssuer(state)).toBe('did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7')
    })
  })
});
describe('existent actionCreators', () => {
  it('signInSuccess', () => exist(signInSuccess))
  it('checkIsLoggedInReceived', () => exist(checkIsLoggedInReceived))
  it('signIn', () => exist(signIn))
  it('signInFailure', () => exist(signInFailure))
  it('logOut', () => exist(logOut))
  it('logOutSuccess', () => exist(logOutSuccess))
  it('checkIsLoggedInStarted', () => exist(checkIsLoggedInStarted))
  it('redirectsStarted', () => exist(redirectsStarted))
  it('redirectsCompleted', () => exist(redirectsCompleted))
})
describe('selectors', () => {
  it('isLoggedIn', () => {
    const initialState = authenticationReducer(undefined, {})
    expect(isLoggedIn(initialState)).toBe(false)
  })
})
