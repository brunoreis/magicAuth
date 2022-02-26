import getCheckIsLoggedInLoading from './getCheckIsLoggedInLoading';
import { mainStoreKey } from '../../authenticationSlice';

it('getCheckIsLoggedInLoading', () => {
  const state = {
    [mainStoreKey]: {
        checkIsLoggedInLoading: true,
    },
  };
  expect(getCheckIsLoggedInLoading(state)).toBe(true);
});
