import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
import sagas from './sagas';
import {
  signIn,
  signInSuccess,
  logOut,
  logOutSuccess,
} from '../features/authentication/authenticationSlice';
import {
  handleSignIn,
  handleLogOut,
  preload,
  checkIsLoggedIn,
} from '../features/authentication/authenticationSagas';
import { redirects } from '../features/navigation/navigationSagas';
import { requestNavigation } from '../features/navigation/navigationSlice';

it('preload, check log in, redirects and start other sagas', () => {
  const g = sagas();
  expect(g.next().value).toEqual(fork(preload));
  expect(g.next().value).toEqual(call(checkIsLoggedIn));
  expect(g.next().value).toEqual(call(redirects));
  expect(g.next().value).toEqual(
    all([
      takeEvery(signIn().type, handleSignIn),
      takeEvery(signInSuccess().type, put(requestNavigation('/signIn'))),
      takeEvery(logOut().type, handleLogOut),
      takeEvery(logOutSuccess().type, put(requestNavigation('/signIn'))),
    ])
  );
});
