import { put, select } from 'redux-saga/effects';
import { getIssuer, handleReceiveUsername } from './usersSagas'
import { receiveUsername } from './usersSlice';


describe('handleReceiveUsername', () => {
  it('it will call receiveUsername with username and loggedUserIssuer', () => {
    const username = "us3r"
    const loggedUserIssuer = "x345"
    const g = handleReceiveUsername({ payload: username });
    expect(g.next().value).toEqual(select(getIssuer));
    expect(g.next(loggedUserIssuer).value).toEqual(put(receiveUsername({
        username,
        loggedUserIssuer,
      })
    ));
    expect(g.next().done).toEqual(true);
  });
});
