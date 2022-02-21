import { call } from 'redux-saga/effects';
import { push } from 'app/router';


export default function* navigate(action) {
  const path = action.type.substring(3);
  yield call(push, path);
}
