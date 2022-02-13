import authenticationReducer, {
  logIn,
  isLoggedIn,
  checkIsLoggedInReceived,
} from './authenticationSlice';

describe('auth reducer', () => {
  it('should handle initial state', () => {
    expect(authenticationReducer(undefined, { type: 'unknown' })).toEqual({
      isLoggedIn: false
    });
  });
  describe('checkIsLoggedInReceived', () => {
    it('sets isLoggedIn', () => {
      const state = authenticationReducer(undefined, checkIsLoggedInReceived(true))
      expect(isLoggedIn(state)).toBe(true)  
    })
  })
});
describe('selectors', () => {
  it('isLoggedIn', () => {
    const initialState = authenticationReducer(undefined, {})
    expect(isLoggedIn(initialState)).toBe(false)
  })
})
