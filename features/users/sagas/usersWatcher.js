import { all, takeEvery } from 'redux-saga/effects';

import go from 'features/navigation/sagas/go';

import { receiveUsername } from '../usersSlice';

export default function* usersWatcher() {
  yield all([
    takeEvery(receiveUsername().type, go, {payload: { path: "/"}}),
  ])
}

