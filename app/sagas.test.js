import { all, call, fork, take } from 'redux-saga/effects';
import sagas from './sagas';
import authenticationSagas, { watchIsSignedIn } from '../features/authentication/sagas/authenticationSagas';
import checkIsLoggedIn from "../features/authentication/sagas/checkIsLoggedIn";
import navigationWatcher from "../features/navigation/sagas/navigationWatcher";
import usersWatcher from '../features/users/sagas/usersWatcher';

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
      usersWatcher(),
      authenticationSagas(),
    ])
  );
});
