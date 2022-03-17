import { all } from 'redux-saga/effects';
import modules from './modules';

export default function* sagas() {
  console.log({ w: modules.watchers })
  yield all(modules.watchers.map((watcher) => watcher()));
}
