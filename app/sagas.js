import { all } from 'redux-saga/effects';
import modules from './modules';

export default function* sagas() {
  yield all(modules.watchers);
}
