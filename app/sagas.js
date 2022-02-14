import { takeEvery, all, call, fork, put, take } from 'redux-saga/effects';
import {
  preload,
  checkIsLoggedIn,
  handleSignIn,
  handleLogOut,
} from '../features/authentication/authenticationSagas';
import { redirects, navigationWatcher, go } from '../features/navigation/navigationSagas';
import { requestNavigation } from '../features/navigation/navigationSlice';
import { receiveUsername } from '../features/users/usersSlice';
import {
  signIn,
  logOut,
  logOutSuccess,
} from '../features/authentication/authenticationSlice';

export default function* sagas() {
  yield fork(preload);
  yield fork(navigationWatcher);
  yield call(checkIsLoggedIn);
  yield call(redirects);
  yield all([
    takeEvery(signIn().type, handleSignIn),
    takeEvery(receiveUsername().type, call(go,"/")),
    //takeEvery(signInSuccess().type, go('/')),
    takeEvery(logOut().type, handleLogOut),
    takeEvery(logOutSuccess().type, call(go,'/signIn')),
  ]);
}
