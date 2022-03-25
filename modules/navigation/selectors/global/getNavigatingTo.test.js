import getNavigatingTo from './getNavigatingTo';
import { mainStoreKey } from '../../slice/slice';

describe('getNavigatingTo', () => {
  it('returns the last path to where a navigation was requested', () => {
    const path = '/signUp';
    const state = {
      [mainStoreKey]: {
        navigatingTo: path,
      },
    };
    expect(getNavigatingTo(state)).toBe(path);
  });
});
