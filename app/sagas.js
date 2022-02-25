import { all } from 'redux-saga/effects';

import authenticationWatchers from '../features/authentication/sagas/authenticationWatchers';
import navigationWatchers from '../features/navigation/sagas/navigationWatchers';
import usersWatcher from 'features/users/sagas/usersWatcher';

export default function* sagas() {
  yield all([
    authenticationWatchers(),
    navigationWatchers(),
    usersWatcher(),
  ]);
}
