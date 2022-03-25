import { navigate } from './slice';

import reducer from './slice';

describe('navigation.slice', () => {
  describe('initial state', () => {
    const state = reducer(undefined, {});
    it('navigatingTo should be null', () => {
      expect(state.navigatingTo).toBe(null);
    });
  });

  describe('actions', () => {
    describe('navigate', () => {
      it('sets navigatingTo with the path value', () => {
        const path = '/signIn';
        const action = navigate({ path });
        let state = reducer(undefined, action);
        expect(state.navigatingTo).toBe(path);
      });
    });
  });
});
