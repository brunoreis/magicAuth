import { call } from 'redux-saga/effects';
import { push } from 'app/router';

export default function* navigate(action) {
  const path =  action.payload.path
  yield call(push, path);
}
