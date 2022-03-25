import { all, takeLatest } from 'redux-saga/effects';

import { navigate } from '../slice/slice';
import navigateSaga from './navigateSaga';

export default function* navigationWatchersSaga() {
  yield all([
    takeLatest(navigate().type, navigateSaga),
  ])
}