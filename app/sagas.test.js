import { takeEvery, all, call, fork, take } from 'redux-saga/effects';
import sagas from './sagas';
import {
  signIn,
  logOut,
  logOutSuccess,
} from '../features/authentication/authenticationSlice';
import {
  handleSignIn,
  handleLogOut,
  preload,
  checkIsLoggedIn,
} from '../features/authentication/authenticationSagas';
import { redirects, navigationWatcher } from '../features/navigation/navigationSagas';
import { go } from '../features/navigation/navigationSagas';
import userSagas from '../features/users/usersSagas';

it('preload, check log in, redirects and start other sagas', () => {
  const g = sagas();
  expect(g.next().value).toEqual(fork(preload));
  expect(g.next().value).toEqual(fork(navigationWatcher));
  expect(g.next().value).toEqual(take('persist/REHYDRATE'));
  expect(g.next().value).toEqual(take('app/routerReady'));
  expect(g.next().value).toEqual(call(checkIsLoggedIn));
  expect(g.next().value).toEqual(call(redirects));
  expect(g.next().value).toEqual(
    all([
      takeEvery(signIn().type, handleSignIn),
      userSagas(),
      takeEvery(logOut().type, handleLogOut),
      takeEvery(logOutSuccess().type, go , '/signIn'),
    ])
  );
});
