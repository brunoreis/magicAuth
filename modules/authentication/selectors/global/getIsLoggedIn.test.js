import getIsLoggedIn from './getIsLoggedIn';
import { mainStoreKey } from '../../slice/authenticationSlice';

it('getIsLoggedIn', () => {
  const state = {
    [mainStoreKey]: {
      issuer: "dude",
    },
  };
  expect(getIsLoggedIn(state)).toBe(true);
});
