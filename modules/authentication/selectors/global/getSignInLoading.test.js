import getSignInLoading from './getSignInLoading';
import { mainStoreKey } from '../../slice/authenticationSlice';

it('getSignInLoading', () => {
  const state = {
    [mainStoreKey]: {
      signInLoading: true,
    },
  };
  expect(getSignInLoading(state)).toBe(true);
});
