import getNavigatingTo from './getNavigatingTo';
import { mainStoreKey } from '../../navigationSlice';

it('getNavigatingTo', () => {
  const path = '/signUp';
  const state = {
    [mainStoreKey]: {
        navigatingTo: path,
    },
  };
  expect(getNavigatingTo(state)).toBe(path);
})
