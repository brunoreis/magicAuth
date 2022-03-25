import { all, takeEvery } from 'redux-saga/effects';

import go from 'modules/navigation/sagas/navigateSaga';

import { receiveUsername } from '../slice/usersSlice';

export default function* usersWatcher() {
  yield all([
    takeEvery(receiveUsername().type, go, {payload: { path: "/"}}),
  ])
}

