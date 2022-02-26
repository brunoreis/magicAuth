import getSignInLoading from './getSignInLoading';
import { mainStoreKey } from '../../authenticationSlice';

it('getSignInLoading', () => {
  const state = {
    [mainStoreKey]: {
      signInLoading: true,
    },
  };
  expect(getSignInLoading(state)).toBe(true);
});
