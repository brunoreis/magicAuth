import { call, put, select } from 'redux-saga/effects';
import magic from '../shared/magic';
import {
  checkIsLoggedInStarted,
  checkIsLoggedInLoginReceived,
  checkIsLoggedInReceived,
  signInSuccess,
  signInFailure,
  logOutSuccess,
} from './authenticationSlice';
import { requestNavigation } from '../navigation/navigationSlice';

export const isLoggedIn = state => state.authentication.isLoggedIn
export const getRememberMe = state => state.authentication.rememberMe;

import { getUsername } from '../../app/selectors'

export function* preload() {
  if(typeof window !== 'undefined') {
    yield call([magic, magic.preload]);
  }
}

export function* checkIsLoggedIn() {
  const rememberMe = yield select(getRememberMe)
  yield put(checkIsLoggedInStarted({ rememberMe }));
  if(rememberMe) {
    try {
      const isLoggedIn = yield call([magic.user, magic.user.isLoggedIn]);
      yield put(checkIsLoggedInLoginReceived({ isLoggedIn }));
      const metadata = yield call([magic.user, magic.user.getMetadata])
      yield put(checkIsLoggedInReceived( metadata ));
    } catch(e) {
      // basic error handling. Needs to be improved
      yield put(checkIsLoggedInReceived({ issuer: null, error: e.message }));
    }
  } else {
    yield put(checkIsLoggedInReceived({ issuer: null, note: "Remember me disabled" }));
  }
}

export function* handleSignIn(action) {
  try {
    const idToken = yield call(
      [magic.auth, magic.auth.loginWithMagicLink],
      { email: action.payload.email },
      true
    );
    const metadata = yield call([magic.user, magic.user.getMetadata])
    yield put(signInSuccess(metadata));
    const username = yield select(getUsername)
    if(username) {
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
