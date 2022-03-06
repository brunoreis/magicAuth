import {
  navigate,
  nav,
} from './navigationSlice';
import reducer from './navigationSlice'

const exist = (actionCreator) => {
  actionCreator();
};

it('should handle initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    navigatingTo: null,
  });
});

describe('navigate', () => {
  it('sets navigatingTo', () => {
    const path = '/signIn'
    let state = reducer(undefined, navigate({ path }))
    expect(state.navigatingTo).toBe(path)
  })
})


describe('existent actionCreators', () => {
  it('navigate - action to request a navigation', () => exist(navigate));
  it('nav - called by the saga, when the navigation occours', () => exist(nav));
});
