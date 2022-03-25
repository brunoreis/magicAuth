import getAuthUserEmail from './getAuthUserEmail';
import { mainStoreKey } from '../../slice/authenticationSlice';

it('getAuthUserEmail', () => {
  const email = "dude@dude.com"
  const state = {
    [mainStoreKey]: {
        email,
    },
  };
  expect(getAuthUserEmail(state)).toBe(email);
});
