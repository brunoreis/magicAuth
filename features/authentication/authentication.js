import { call, put } from 'redux-saga/effects';
import magic from '../shared/magic';
import Router from 'next/router';
import {
  checkIsLoggedInStarted,
  checkIsLoggedInReceived,
  signInSuccess,
  signInFailure,
  logOutSuccess,
} from './authenticationSlice';
import { nav } from '../navigation/navigationSlice';

export const isLoggedIn = state=> state.authentication.isLoggedIn

// --------

export function* preload() {
  yield call([magic, magic.preload]);
}

export function* checkIsLoggedIn() {
  yield put(checkIsLoggedInStarted());
  const isLoggedIn = yield call([magic.user, magic.user.isLoggedIn]);
  const metadata = yield call([magic.user, magic.user.getMetadata])
  yield put(checkIsLoggedInReceived( metadata ));
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
  } catch (e) {
    yield put(signInFailure());
  }
}

export function* handleLogOut() {
  yield call([magic.user, magic.user.logout]);
  yield put(logOutSuccess());
}
