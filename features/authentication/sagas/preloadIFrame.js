import { call, put } from 'redux-saga/effects';

import magic from '../util/magic';
import { preloadMagicLinkIFrameStarted } from '../authenticationSlice';

export default function* preloadIFrame() {
  if (typeof window !== 'undefined') {
    yield put(preloadMagicLinkIFrameStarted());
    yield call([magic, magic.preload]);
  }
}
