import getIsLoggedIn from './getIsLoggedIn'
it('getIsLoggedIn - return true if an issuer is set', () => {
  const state = { issuer: 'ddude' };
  expect(getIsLoggedIn(state)).toBe(true);
});