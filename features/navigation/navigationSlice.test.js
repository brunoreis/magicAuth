import {
  redirectsCompleted,
  redirectsStarted,
  nav,
} from './navigationSlice';

const exist = (actionCreator) => {
  actionCreator();
};

describe('existent actionCreators', () => {
  it('redirectsStarted', () => exist(redirectsStarted));
  it('redirectsCompleted', () => exist(redirectsCompleted));
  it('nav', () => exist(nav));
});
