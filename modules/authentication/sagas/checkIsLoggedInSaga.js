import { call, put, select } from 'redux-saga/effects';
import Cookie from 'js-cookie';

import { getSearch } from 'app/router';

import getRememberMe from '../selectors/global/getRememberMe'
import magic from '../util/magic';

import {
  checkIsLoggedInStarted,
  checkIsLoggedInReceived,
  isLoggedIn,
} from '../slice/authenticationSlice';

export default function* checkIsLoggedInSaga() {
  const rememberMe = yield select(getRememberMe);
  const isLoggedInCookie = yield call([Cookie, Cookie.get], 'isLoggedIn');
  const magicCredential = new URLSearchParams(getSearch()).get(
    'magic_credential'
  );
  yield put(
    checkIsLoggedInStarted({ rememberMe, magicCredential, isLoggedInCookie })
  );
  if (magicCredential) { // loading signin info, no issuer, show loader
    const loggedIn = yield call([magic.auth, magic.auth.loginWithCredential]);
    const metadata = yield call([magic.user, magic.user.getMetadata]);
    yield put(checkIsLoggedInReceived(metadata));
    yield put(isLoggedIn());
  } else {
    if (rememberMe || isLoggedInCookie) {
      try {
        // loading signin info, has issuer, do not show loader, redirect if needed
        const loggedIn = yield call([magic.user, magic.user.isLoggedIn]);
        // ? 
        const metadata = yield call([magic.user, magic.user.getMetadata]);
        yield put(checkIsLoggedInReceived(metadata));
        yield put(isLoggedIn());
      } catch (e) {
        // basic error handling. Needs to be improved
        // https://magic.link/docs/api-reference/client-side-sdks/web#rpcerror
        yield put(checkIsLoggedInReceived({ issuer: null, error: e.message }));
      }
    } else {
      // we may enforce a logOut here in case the user was loggedIn, but remember me was not true
      // stop "loading" very soon because there is no reason (rememberMe or cookie) to check if the user is auth. 
      yield put(
        checkIsLoggedInReceived({ issuer: null, note: 'Remember me disabled' })
      );
    }
  }
}
