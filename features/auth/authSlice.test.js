import authReducer, {
  logIn
} from './authSlice';

describe('auth reducer', () => {
  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      loggedIn: false
    });
  });

  // it('should handle increment', () => {
  //   const actual = authReducer(initialState, increment());
  //   expect(actual.value).toEqual(4);
  // });
});
