import { all, call, fork, take } from 'redux-saga/effects';
import sagas from './sagas';
import authenticationWatchers from '../features/authentication/sagas/authenticationWatchers';
import isSignedInWatcher from '../features/authentication/sagas/isSignedInWatcher';
import checkIsLoggedIn from "../features/authentication/sagas/checkIsLoggedIn";
import usersWatcher from '../features/users/sagas/usersWatcher';

it('preload, check log in, redirects and start other sagas', () => {
  const g = sagas();
  expect(g.next().value).toEqual(fork(isSignedInWatcher));
  expect(g.next().value).toEqual(
    all([
      take('persist/REHYDRATE'), 
      take('app/routerReady')
    ])
  );
  expect(g.next().value).toEqual(call(checkIsLoggedIn));
  expect(g.next().value).toEqual(
    all([
      usersWatcher(),
      authenticationWatchers(),
    ])
  );
});
