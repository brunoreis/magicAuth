import { all, call, fork, take } from 'redux-saga/effects';
import sagas from './sagas';
import authenticationSagas, { watchIsSignedIn } from '../features/authentication/sagas/authenticationSagas';
import checkIsLoggedIn from "../features/authentication/sagas/checkIsLoggedIn";
import { navigationWatcher } from '../features/navigation/navigationSagas';
import userSagas from '../features/users/usersSagas';

it('preload, check log in, redirects and start other sagas', () => {
  const g = sagas();
  expect(g.next().value).toEqual(fork(navigationWatcher));
  expect(g.next().value).toEqual(fork(watchIsSignedIn));
  expect(g.next().value).toEqual(
    all([
      take('persist/REHYDRATE'), 
      take('app/routerReady')
    ])
  );
  expect(g.next().value).toEqual(call(checkIsLoggedIn));
  expect(g.next().value).toEqual(
    all([
      userSagas(),
      authenticationSagas(),
    ])
  );
});
