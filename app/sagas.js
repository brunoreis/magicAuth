import { all, call, fork, take } from 'redux-saga/effects';

import authenticationSagas, { watchIsSignedIn } from '../features/authentication/sagas/authenticationSagas';
import checkIsLoggedIn from "../features/authentication/sagas/checkIsLoggedIn";


import navigationWatcher from "../features/navigation/sagas/navigationWatcher";

import usersWatcher from '../features/users/sagas/usersWatcher';

export default function* sagas() {
  yield fork(navigationWatcher);
  yield fork(watchIsSignedIn);
  yield all([
    take('persist/REHYDRATE'),
    take('app/routerReady')
  ])
  yield call(checkIsLoggedIn);
  yield all([
    usersWatcher(),
    authenticationSagas(),
  ]);
}
