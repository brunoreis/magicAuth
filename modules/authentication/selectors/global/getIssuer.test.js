import getIssuer from './getIssuer';
import { mainStoreKey } from '../../slice/authenticationSlice';

it('getIssuer', () => {
  const issuer = "dude"
  const state = {
    [mainStoreKey]: {
      issuer,
    },
  };
  expect(getIssuer(state)).toBe(issuer);
});
