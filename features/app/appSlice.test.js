import appReducer, { getIsLoading } from './appSlice';
import {
  redirectsCompleted,
} from '../navigation/navigationSlice';


describe('reducers', () => {
  it('has loading true as initial state', () => {
    let state = appReducer(undefined, {});
    expect(state).toEqual({
      loading: true
    });
  })
  describe('redirectsCompleted', ()=> {
    it('set loading to false on redirectsCompleted', () => {
      let state = appReducer(undefined, redirectsCompleted());
      expect(getIsLoading(state)).toBe(false)
    });
  })
});

