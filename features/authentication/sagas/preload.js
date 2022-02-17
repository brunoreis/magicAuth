import { call, put } from 'redux-saga/effects';
import magic from '../../shared/magic';
import { preloadMagicLinkIFrameStarted } from '../authenticationSlice';


export default function* preload() {
  if (typeof window !== 'undefined') {
    yield put(preloadMagicLinkIFrameStarted());
    yield call([magic, magic.preload]);
  }
}
