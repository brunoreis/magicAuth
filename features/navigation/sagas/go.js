import { put, call } from 'redux-saga/effects';
import { push } from 'app/router';

import { nav } from '../navigationSlice';

export default function* go(action) {
  console.log('go', action)
  const path =  action.payload.path
  yield call(push, path);
  yield put(nav(path));
}
