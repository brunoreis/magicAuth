import { call, put } from 'redux-saga/effects';
import handleLogOut from './handleLogOut';
import { logOutSuccess } from '../authenticationSlice';
import magic from '../../shared/magic';
import Cookie from 'js-cookie'

describe('handleLogOut', () => {
  it('it will log out and dispatches auth/logOutEnd', () => {
    const g = handleLogOut();
    expect(g.next().value).toEqual(call([magic.user, magic.user.logout]));
    expect(g.next().value).toEqual(call([Cookie, Cookie.remove], 'isLoggedIn'));
    expect(g.next().value).toEqual(put(logOutSuccess()));
  });
});
