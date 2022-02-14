import { call, put, select } from 'redux-saga/effects';
import magic from '../shared/magic';
import {
  checkIsLoggedInStarted,
  checkIsLoggedInReceived,
  signInSuccess,
  signInFailure,
  logOutSuccess,
} from './authenticationSlice';
import { requestNavigation } from '../navigation/navigationSlice';

export const isLoggedIn = state => state.authentication.isLoggedIn
import { getUsername } from '../../app/selectors'

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
