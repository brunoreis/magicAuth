import authenticationReducer, {
  signInSuccess,
  checkIsLoggedInReceived,
  signIn,
  signInFailure,
  logOut,
  logOutSuccess,
  checkIsLoggedInStarted,
  getIsLoggedIn,
  getIssuer,
  getRememberMe,
  preloadMagicLinkIFrame,
  preloadMagicLinkIFrameStarted
} from './authenticationSlice';


const exist = (actionCreator) => {
  actionCreator()
}
describe('authentication reducer', () => {
  it('should handle initial state', () => {
    expect(authenticationReducer(undefined, { type: 'unknown' })).toEqual({
      issuer: null,
      rememberMe: false,
      loading: false
    });
  });
  describe('checkIsLoggedInReceived', () => {
    it('set the issuer', () => {
      const payload = { issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'}
      const state = authenticationReducer(undefined, checkIsLoggedInReceived(payload))
      expect(getIsLoggedIn(state)).toBe(true)
      expect(getIssuer(state)).toBe('did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7')
    })
    it('do not set if not logged in', () => {
      const payload = { issuer: null }
      const state = authenticationReducer(undefined, checkIsLoggedInReceived(payload))
      expect(getIsLoggedIn(state)).toBe(false)
      expect(getIssuer(state)).toBe(null)
    })
  })
  describe('signIn', () => {
    it('sets rememberMe', () => {
      let state = authenticationReducer(undefined, signIn({ rememberMe: false }))
      expect(getRememberMe(state)).toBe(false)
      state = authenticationReducer(undefined, signIn({ rememberMe: true }))
      expect(getRememberMe(state)).toBe(true)
    })
    
  })
  describe('signInSuccess', () => {
    it('sets issuer if logged in', () => {
      const payload = { email: 'testemail@a.com', issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'}
      const state = authenticationReducer(undefined, signInSuccess(payload))
      expect(getIsLoggedIn(state)).toBe(true)
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
  it('preloadMagicLinkIFrame', () => exist(preloadMagicLinkIFrame))
  it('preloadMagicLinkIFrameStarted', () => exist(preloadMagicLinkIFrameStarted))
})
describe('selectors', () => {
  it('isLoggedIn', () => {
    const initialState = authenticationReducer(undefined, {})
    expect(getIsLoggedIn(initialState)).toBe(false)
  })
})
