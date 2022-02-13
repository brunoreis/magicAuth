import {
  requestNavigation,
  redirectsCompleted,
  redirectsStarted,
} from './navigationSlice';

const exist = (actionCreator) => {
  actionCreator();
};

describe('existent actionCreators', () => {
  it('requestNavigation should form the type with the path', () => {
    let a1 = requestNavigation('/');
    expect(a1).toEqual({ type: 'nav/'})
    let a2 = requestNavigation('/signUp');
    expect(a2).toEqual({ type: 'nav/signUp'})
  });
  it('redirectsStarted', () => exist(redirectsStarted));
  it('redirectsCompleted', () => exist(redirectsCompleted));
});
