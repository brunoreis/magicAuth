import getRememberMe from './getRememberMe';
import { mainStoreKey } from '../../slice/authenticationSlice';

it('getRememberMe', () => {
  const state = {
    [mainStoreKey]: {
      rememberMe: true,
    },
  };
  expect(getRememberMe(state)).toBe(true);
});
