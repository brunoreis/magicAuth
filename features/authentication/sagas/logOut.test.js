import { call, put } from 'redux-saga/effects';
import handleLogOut from './handleLogOut';
import { logOutSuccess } from '../authenticationSlice';
import magic from '../../shared/magic';

describe('logOut', () => {
  it('it will log out and dispatches auth/logOutEnd', () => {
    const g = handleLogOut();
    expect(g.next().value).toEqual(call([magic.user, magic.user.logout]));
    expect(g.next().value).toEqual(put(logOutSuccess()));
  });
});
