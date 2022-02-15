import { all, call, fork, take } from 'redux-saga/effects';
import authenticationSagas, {
  preload,
  checkIsLoggedIn,
} from '../features/authentication/authenticationSagas';
import { redirects, navigationWatcher, go } from '../features/navigation/navigationSagas';
import userSagas from '../features/users/usersSagas';

// I started pulverizing these sagas, but then realized they are a lot more readable together 
export default function* sagas() {
  yield fork(preload);
  yield fork(navigationWatcher);
  yield take('persist/REHYDRATE')
  yield take('app/routerReady')
  yield call(checkIsLoggedIn);
  yield call(redirects);
  yield all([
    userSagas(),
    authenticationSagas(),
  ]);
}
