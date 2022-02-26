import getIssuer from './getIssuer';
it('getIssuer', () => {
  const issuer = 'dude';
  const state = { issuer };
  expect(getIssuer(state)).toBe(issuer);
});
