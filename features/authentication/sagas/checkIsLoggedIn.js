import { call, put, select } from 'redux-saga/effects';
import magic from '../../shared/magic';
import { getSearch } from '../../../app/router';
import {
  checkIsLoggedInStarted,
  checkIsLoggedInLoginReceived,
  checkIsLoggedInReceived,
  isLoggedIn,
} from '../authenticationSlice';
import { applicationLoaded } from '../../loading/loadingSlice';
import { getRememberMe } from './authenticationSagas';
import { redirects } from '../../navigation/navigationSagas'

import Cookie from 'js-cookie';


export default function* checkIsLoggedIn() {
  const rememberMe = yield select(getRememberMe);
  const isLoggedInCookie = yield call([Cookie, Cookie.get], 'isLoggedIn');
  const magicCredential = new URLSearchParams(getSearch()).get(
    'magic_credential'
  );
  yield put(
    checkIsLoggedInStarted({ rememberMe, magicCredential, isLoggedInCookie })
  );

  if (magicCredential) {
    const loggedIn = yield call([magic.auth, magic.auth.loginWithCredential]);
    yield put(
      checkIsLoggedInLoginReceived({
        isLoggedIn: loggedIn,
        method: 'loginWithCredential',
      })
    );
    const metadata = yield call([magic.user, magic.user.getMetadata]);
    yield put(checkIsLoggedInReceived(metadata));
    yield put(isLoggedIn());
    yield put(applicationLoaded());
    yield call(redirects)
  } else {
    if (rememberMe || isLoggedInCookie) {
      try {
        yield call(redirects)
        yield put(applicationLoaded())
        const loggedIn = yield call([magic.user, magic.user.isLoggedIn]);
        yield put(
          checkIsLoggedInLoginReceived({
            isLoggedIn: loggedIn,
            method: 'isLoggedIn',
          })
        );
        const metadata = yield call([magic.user, magic.user.getMetadata]);
        yield put(checkIsLoggedInReceived(metadata));
        yield put(isLoggedIn());
        yield call(redirects)
      } catch (e) {
        // basic error handling. Needs to be improved
        // https://magic.link/docs/api-reference/client-side-sdks/web#rpcerror
        yield put(checkIsLoggedInReceived({ issuer: null, error: e.message }));
        yield put(applicationLoaded());
      }
    } else {
      // we may enforce a logOut here in case the user was loggedIn, but remember me was not true
      yield put(
        checkIsLoggedInReceived({ issuer: null, note: 'Remember me disabled' })
      );
      yield call(redirects)
      yield put(applicationLoaded());
    }
  }
}
