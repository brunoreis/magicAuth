import { all, takeLatest } from 'redux-saga/effects';

import { navigate } from '../navigationSlice';
import go from './go';

export default function* navigationWatchers() {
  yield all([
    takeLatest(navigate().type, go),
  ])
}