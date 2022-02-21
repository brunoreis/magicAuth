import { put } from 'redux-saga/effects';
import { requestNavigation } from '../navigationSlice';


export default function* go(path) {
  yield put(requestNavigation(path));
}
