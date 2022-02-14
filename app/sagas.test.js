import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
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
import { receiveUsername, receiveUsernameStart } from '../features/users/usersSlice';
import { handleReceiveUsername } from '../features/users/usersSagas';

it('preload, check log in, redirects and start other sagas', () => {
  const g = sagas();
  expect(g.next().value).toEqual(fork(preload));
  expect(g.next().value).toEqual(fork(navigationWatcher));
  expect(g.next().value).toEqual(call(checkIsLoggedIn));
  expect(g.next().value).toEqual(call(redirects));
  expect(g.next().value).toEqual(
    all([
      takeEvery(signIn().type, handleSignIn),
      takeEvery(receiveUsernameStart().type, handleReceiveUsername),
      takeEvery(receiveUsername().type, go, "/"),
      takeEvery(logOut().type, handleLogOut),
      takeEvery(logOutSuccess().type, go , '/signIn'),
    ])
  );
});
