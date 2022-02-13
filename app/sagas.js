import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
import {
  preload,
  checkIsLoggedIn,
  handleSignIn,
  handleLogOut,
} from '../features/authentication/authenticationSagas';
import { redirects } from '../features/navigation/navigationSagas';
import { requestNavigation } from '../features/navigation/navigationSlice';
import {
  signIn,
  signInSuccess,
  logOut,
  logOutSuccess,
} from '../features/authentication/authenticationSlice';

export default function* sagas() {
  yield fork(preload);
  yield call(checkIsLoggedIn);
  yield call(redirects);
  yield all([
    takeEvery(signIn().type, handleSignIn),
    takeEvery(signInSuccess().type, put(requestNavigation('/'))),
    takeEvery(logOut().type, handleLogOut),
    takeEvery(logOutSuccess().type, put(requestNavigation('/signIn'))),
  ]);
}
