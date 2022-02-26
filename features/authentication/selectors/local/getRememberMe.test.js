import getRememberMe from './getRememberMe'
it('getRememberMe', () => {
  const state = { rememberMe: true };
  expect(getRememberMe(state)).toBe(true);
});
