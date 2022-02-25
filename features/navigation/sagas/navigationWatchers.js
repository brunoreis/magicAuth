import { all, takeEvery } from 'redux-saga/effects';

import { navigate } from '../navigationSlice';
import go from './go';

export default function* navigationWatchers() {
  yield all([
    takeEvery(navigate().type, go),
  ])
}