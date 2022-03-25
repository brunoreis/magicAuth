import { all } from 'redux-saga/effects';
import sagas from './sagas';
import authenticationWatchersSaga from 'modules/authentication/sagas/authenticationWatchersSaga';
import navigationWatchersSaga from 'modules/navigation/sagas/navigationWatchersSaga';
import usersWatcher from 'modules/users/sagas/usersWatcher';

it('preload, check log in, redirects and start other sagas', () => {
  const g = sagas();
  expect(g.next().value).toEqual(
    all([
      usersWatcher(),
      authenticationWatchersSaga(),
      navigationWatchersSaga(),
    ])
  );
});
