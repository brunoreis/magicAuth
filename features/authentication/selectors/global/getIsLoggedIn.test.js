import getIsLoggedIn from './getIsLoggedIn';
import { mainStoreKey } from '../../authenticationSlice';

it('getIsLoggedIn', () => {
  const state = {
    [mainStoreKey]: {
      issuer: "dude",
    },
  };
  expect(getIsLoggedIn(state)).toBe(true);
});
