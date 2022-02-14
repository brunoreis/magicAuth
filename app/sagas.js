import { takeEvery, all, call, fork, take, put } from 'redux-saga/effects';
import {
  preload,
  checkIsLoggedIn,
  handleSignIn,
  handleLogOut,
} from '../features/authentication/authenticationSagas';
import { redirects, navigationWatcher, go } from '../features/navigation/navigationSagas';
import { receiveUsername, receiveUsernameStart } from '../features/users/usersSlice';
import { handleReceiveUsername } from '../features/users/usersSagas';
import {
  signIn,
  logOut,
  logOutSuccess,
} from '../features/authentication/authenticationSlice';

export default function* sagas() {
  yield fork(preload);
  yield fork(navigationWatcher);
  yield take('persist/REHYDRATE')
  yield call(checkIsLoggedIn);
  yield take('app/routerReady')
  yield call(redirects);
  yield all([
    takeEvery(signIn().type, handleSignIn),
    takeEvery(receiveUsernameStart().type, handleReceiveUsername),
    takeEvery(receiveUsername().type, go, "/"),
    takeEvery(logOut().type, handleLogOut),
    takeEvery(logOutSuccess().type, go, '/signIn'),
  ]);
}
