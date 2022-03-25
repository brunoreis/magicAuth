import { call, put } from 'redux-saga/effects';
import Cookie from 'js-cookie';

import magic from '../util/magic';
import { logOutSuccess } from '../slice/authenticationSlice';
import removeCookieAndLogoutFromMagicLinkSaga from './removeCookieAndLogoutFromMagicLinkSaga';

describe('removeCookieAndLogoutFromMagicLinkSaga', () => {
  it('it will log out and dispatches auth/logOutEnd', () => {
    const g = removeCookieAndLogoutFromMagicLinkSaga();
    expect(g.next().value).toEqual(call([magic.user, magic.user.logout]));
    expect(g.next().value).toEqual(call([Cookie, Cookie.remove], 'isLoggedIn'));
    expect(g.next().value).toEqual(put(logOutSuccess()));
  });
})
