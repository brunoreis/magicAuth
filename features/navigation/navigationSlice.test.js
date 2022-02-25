import {
  redirectsCompleted,
  redirectsStarted,
  navigate,
  nav,
} from './navigationSlice';

const exist = (actionCreator) => {
  actionCreator();
};

describe('existent actionCreators', () => {
  it('navigate - action to request a navigation', () => exist(navigate));
  it('nav - called by the saga, when the navigation occours', () => exist(nav));
  it('redirectsStarted', () => exist(redirectsStarted));
  it('redirectsCompleted', () => exist(redirectsCompleted));
});
