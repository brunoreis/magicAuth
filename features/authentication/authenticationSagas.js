import { call, put, select, all, takeEvery } from 'redux-saga/effects';
import magic from '../shared/magic';
import { getSearch } from '../../app/router'

import {
  signIn,
  logOut,
  logOutSuccess,
  checkIsLoggedInStarted,
  checkIsLoggedInLoginReceived,
  checkIsLoggedInReceived,
  signInSuccess,
  signInFailure,
  preloadMagicLinkIFrame,
  preloadMagicLinkIFrameStarted
} from './authenticationSlice';
import { requestNavigation } from '../navigation/navigationSlice';
import { go } from '../navigation/navigationSagas';

export const isLoggedIn = (state) => state.authentication.isLoggedIn;
export const getRememberMe = (state) => state.authentication.rememberMe;

import { getUsername } from '../../app/selectors';

export default function* authenticationSagas() {
  yield all([
    takeEvery(signIn().type, handleSignIn),
    takeEvery(logOut().type, handleLogOut),
    takeEvery(logOutSuccess().type, go, '/signIn'),
    takeEvery(preloadMagicLinkIFrame().type, preload),
  ]);
}
export function* preload() {
  if (typeof window !== 'undefined') {
    yield put(preloadMagicLinkIFrameStarted())
    yield call([magic, magic.preload]);
  }
}

export function* handleSignIn(action) {
  try {
    yield call(
      [magic.auth, magic.auth.loginWithMagicLink],
      { 
        email: action.payload.email,
        redirectURI: action.payload.redirectURI
      },
      true
    );
    const metadata = yield call([magic.user, magic.user.getMetadata]);
    yield put(signInSuccess(metadata));
    const username = yield select(getUsername);
    if (username) {
      yield put(requestNavigation('/'));
    } else {
      yield put(requestNavigation('/signUp'));
    }
  } catch (e) {
    yield put(signInFailure());
  }
}

export function* handleLogOut() {
  yield call([magic.user, magic.user.logout]);
  yield put(logOutSuccess());
}


export function* checkIsLoggedIn() {
  const rememberMe = yield select(getRememberMe);
  const magicCredential = new URLSearchParams(getSearch()).get('magic_credential')
  yield put(checkIsLoggedInStarted({ rememberMe, magicCredential }));
  if(magicCredential) {
    const isLoggedIn = yield call([magic.auth, magic.auth.loginWithCredential]);
    yield put(checkIsLoggedInLoginReceived({ isLoggedIn, method: 'loginWithCredential' }));
    const metadata = yield call([magic.user, magic.user.getMetadata]);
    yield put(checkIsLoggedInReceived(metadata));
  } else {
    if (rememberMe) {
      try {
        const isLoggedIn = yield call([magic.user, magic.user.isLoggedIn]);
        yield put(checkIsLoggedInLoginReceived({ isLoggedIn, method: 'isLoggedIn' }));
        const metadata = yield call([magic.user, magic.user.getMetadata]);
        yield put(checkIsLoggedInReceived(metadata));
      } catch (e) {
        // basic error handling. Needs to be improved
        yield put(checkIsLoggedInReceived({ issuer: null, error: e.message }));
      }
    } else {
      yield put(
        checkIsLoggedInReceived({ issuer: null, note: 'Remember me disabled' })
      );
    }
  }
}

