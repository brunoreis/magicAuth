import { takeEvery, all } from 'redux-saga/effects';

import navigate from './navigate';

export const startsWithNavSlash = (action) => action.type.startsWith('nav/');

export default function* navigationWatcher() {
  yield all([takeEvery(startsWithNavSlash, navigate)]);
}
