import { call, put } from 'redux-saga/effects';
import Cookie from 'js-cookie';

import magic from '../../shared/magic';
import { logOutSuccess } from '../authenticationSlice';
import removeCookieAndLogoutFromMagicLink from './removeCookieAndLogoutFromMagicLink';

it('it will log out and dispatches auth/logOutEnd', () => {
  const g = removeCookieAndLogoutFromMagicLink();
  expect(g.next().value).toEqual(call([magic.user, magic.user.logout]));
  expect(g.next().value).toEqual(call([Cookie, Cookie.remove], 'isLoggedIn'));
  expect(g.next().value).toEqual(put(logOutSuccess()));
});
