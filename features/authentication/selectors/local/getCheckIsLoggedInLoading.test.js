import getCheckIsLoggedInLoading from './getCheckIsLoggedInLoading'
it('getCheckIsLoggedInLoading', () => {
  const state = { checkIsLoggedInLoading: true };
  expect(getCheckIsLoggedInLoading(state)).toBe(true);
});