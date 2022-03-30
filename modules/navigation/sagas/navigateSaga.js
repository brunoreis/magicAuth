import { call } from 'redux-saga/effects';
import { push } from '../util/router';

export default function* navigate(action) {
  const path =  action.payload.path
  yield call(push, path);
}
