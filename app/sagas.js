import { all, call, fork, take } from 'redux-saga/effects';

import authenticationSagas, { watchIsLoggedIn } from '../features/authentication/sagas/authenticationSagas';
import checkIsLoggedIn from "../features/authentication/sagas/checkIsLoggedIn";


import { redirects, navigationWatcher } from '../features/navigation/navigationSagas';

import userSagas from '../features/users/usersSagas';

export default function* sagas() {
  yield fork(navigationWatcher);
  yield fork(watchIsLoggedIn);
  yield take('persist/REHYDRATE')
  yield take('app/routerReady')
  yield call(checkIsLoggedIn);
  yield call(redirects);
  yield all([
    userSagas(),
    authenticationSagas(),
  ]);
}
