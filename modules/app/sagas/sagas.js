import { all } from 'redux-saga/effects';
import modules from 'modules/app/modules';

export default function* sagas() {
  yield all(modules.sagaWatchers.map((watcher) => watcher()));
}
