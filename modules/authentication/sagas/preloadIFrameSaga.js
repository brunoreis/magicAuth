import { call } from 'redux-saga/effects';

import magic from '../util/magic';

export default function* preloadIFrameSaga() {
  if (typeof window !== 'undefined') {
    yield call([magic, magic.preload]);
  }
}
