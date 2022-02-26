import getSignInLoading from './getSignInLoading'
it('getSignInLoading', () => {
  const state = { signInLoading: true };
  expect(getSignInLoading(state)).toBe(true);
});