import { call, put } from 'redux-saga/effects';
import Cookie from 'js-cookie'

import magic from '../util/magic';
import { logOutSuccess } from '../authenticationSlice';

export default function* removeCookieAndLogoutFromMagicLink() {
  yield call([magic.user, magic.user.logout]);
  yield call([Cookie, Cookie.remove], 'isLoggedIn');
  yield put(logOutSuccess());
}
