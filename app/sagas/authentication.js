import { takeEvery, all, call, put, fork, select } from 'redux-saga/effects';
import { navigateTo } from './navigation';
import magic from './shared/magic';
import Router from 'next/router';
import {
  checkIsLoggedInStarted,
  checkIsLoggedInReceived,
  signIn,
  signInSuccess,
  signInFailure,
  logOut,
  logOutSuccess,
  redirectsStarted,
  redirectsCompleted,
} from '../../features/authentication/authenticationSlice';
import { nav } from '../../features/authentication/navigationSlice';

export const isLoggedIn = state=> state.authentication.isLoggedIn

export function* authentication() {
  yield fork(preload);
  yield call(checkIsLoggedIn);
  yield call(redirects)
  yield all([
    takeEvery(signIn().type, handleSignIn),
    takeEvery(signInSuccess().type, navigateTo, '/'),
    takeEvery(logOut().type, handleLogOut),
    takeEvery(logOutSuccess().type, navigateTo, '/signIn'),
  ]);
}

// --------

export function* preload() {
  yield call([magic, magic.preload]);
}

export function* checkIsLoggedIn() {
  yield put(checkIsLoggedInStarted());
  const isLoggedIn = yield call([magic.user, magic.user.isLoggedIn]);
  yield put(checkIsLoggedInReceived(isLoggedIn));
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

export function* redirects() {
  yield put(redirectsStarted())
  const actualPath = Router.router.asPath
  const isLogged = yield select(isLoggedIn)
  if(isLogged) {
      switch(actualPath) {
          case '/signIn': yield put(nav('/')); 
              break;
          case '/signUp': yield put(nav('/')); break;
      }
  } else {
      switch(actualPath) {
          case '/': yield put(nav('/signIn')); break;
      }
  }
  yield put(redirectsCompleted())
}
