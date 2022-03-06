import { all } from 'redux-saga/effects';
import sagas from './sagas';
import authenticationWatchers from 'features/authentication/sagas/authenticationWatchers';
import navigationWatchers from 'features/navigation/sagas/navigationWatchers';
import usersWatcher from 'features/users/sagas/usersWatcher';

it('preload, check log in, redirects and start other sagas', () => {
  const g = sagas();
  expect(g.next().value).toEqual(
    all([
      usersWatcher,
      authenticationWatchers,
      navigationWatchers,
    ])
  );
});
