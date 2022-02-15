import { takeEvery, all, call, fork, take } from 'redux-saga/effects';
import {
  preload,
  checkIsLoggedIn,
  handleSignIn,
  handleLogOut,
} from '../features/authentication/authenticationSagas';
import { redirects, navigationWatcher, go } from '../features/navigation/navigationSagas';
import userSagas from '../features/users/usersSagas';
import {
  signIn,
  logOut,
  logOutSuccess,
} from '../features/authentication/authenticationSlice';

// I started pulverizing these sagas, but then realized they are a lot more readable together 
export default function* sagas() {
  yield fork(preload);
  yield fork(navigationWatcher);
  yield take('persist/REHYDRATE')
  yield take('app/routerReady')
  yield call(checkIsLoggedIn);
  yield call(redirects);
  yield all([
    takeEvery(signIn().type, handleSignIn),
    userSagas(),
    takeEvery(logOut().type, handleLogOut),
    takeEvery(logOutSuccess().type, go, '/signIn'),
  ]);
}
