import { all, call, fork, take } from 'redux-saga/effects';

import authenticationWatchers from '../features/authentication/sagas/authenticationWatchers';
import isSignedInWatcher from '../features/authentication/sagas/isSignedInWatcher';
import checkIsLoggedIn from "features/authentication/sagas/checkIsLoggedIn";
import navigationWatcher from "features/navigation/sagas/navigationWatcher";
import usersWatcher from 'features/users/sagas/usersWatcher';

export default function* sagas() {
  yield fork(navigationWatcher);
  yield fork(isSignedInWatcher);
  yield all([
    take('persist/REHYDRATE'),
    take('app/routerReady')
  ])
  yield call(checkIsLoggedIn);
  yield all([
    usersWatcher(),
    authenticationWatchers(),
  ]);
}
