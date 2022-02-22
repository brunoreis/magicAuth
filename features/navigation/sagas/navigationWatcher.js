import { takeEvery, all } from 'redux-saga/effects';

import navigate from './navigate';

export const startsWithNavSlash = (action) => action.type.startsWith('nav/');


// it looks like all the actions here can be simplified into one single action
export default function* navigationWatcher() {
  yield all([takeEvery(startsWithNavSlash, navigate)]);
}
