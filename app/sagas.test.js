import { all } from 'redux-saga/effects';
import sagas from './sagas';
import authenticationWatchersSaga from 'modules/authentication/sagas/authenticationWatchersSaga';
import navigationWatchersSaga from 'modules/navigation/sagas/navigationWatchersSaga';
import usersWatcherSaga from 'modules/users/sagas/usersWatcherSaga';

describe('sagas', () => {
  it('preload, check log in, redirects and start other sagas', () => {
    const g = sagas();
    expect(g.next().value).toEqual(
      all([
        usersWatcherSaga(),
        authenticationWatchersSaga(),
        navigationWatchersSaga(),
      ])
    );
  });
})
