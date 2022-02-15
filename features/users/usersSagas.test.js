import { put, select, call } from 'redux-saga/effects';
import { getUsernameIsAvailable } from '../../app/selectors';
import { getIssuer, callReceiveUsernameWithTheLoggedUserIssuer } from './usersSagas'
import { receiveUsername } from './usersSlice';


describe('callReceiveUsernameWithTheLoggedUserIssuer', () => {
  it('it will call receiveUsername with username and loggedUserIssuer', () => {
    const username = "us3r"
    const loggedUserIssuer = "x345"
    const isTaken = true
    const mockedSelector = () => {}
    const g = callReceiveUsernameWithTheLoggedUserIssuer({ payload: username });
    expect(g.next().value).toEqual(select(getIssuer));
    expect(g.next(loggedUserIssuer).value).toEqual(call(getUsernameIsAvailable, username));
    expect(g.next(mockedSelector).value).toEqual(select(mockedSelector));
    expect(g.next(isTaken).value).toEqual(put(receiveUsername({
        username,
        loggedUserIssuer,
      })
    ));
    expect(g.next().done).toEqual(true);
  });

  it('it will do nothing if the username is taken', () => {
    const username = "us3r"
    const loggedUserIssuer = "x345"
    const isTaken = false
    const mockedSelector = () => {}
    const g = callReceiveUsernameWithTheLoggedUserIssuer({ payload: username });
    expect(g.next().value).toEqual(select(getIssuer));
    expect(g.next(loggedUserIssuer).value).toEqual(call(getUsernameIsAvailable, username));
    expect(g.next(mockedSelector).value).toEqual(select(mockedSelector));
    expect(g.next().done).toEqual(true);
  });

});
