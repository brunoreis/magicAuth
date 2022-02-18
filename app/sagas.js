import { all, call, fork, take } from 'redux-saga/effects';

import authenticationSagas, { watchIsSignedIn } from '../features/authentication/sagas/authenticationSagas';
import checkIsLoggedIn from "../features/authentication/sagas/checkIsLoggedIn";


import { redirects, navigationWatcher } from '../features/navigation/navigationSagas';

import userSagas from '../features/users/usersSagas';

export default function* sagas() {
  yield fork(navigationWatcher);
  yield fork(watchIsSignedIn);
  yield all([
    take('persist/REHYDRATE'),
    take('app/routerReady')
  ])
  yield call(checkIsLoggedIn);
  yield all([
    userSagas(),
    authenticationSagas(),
  ]);
}
