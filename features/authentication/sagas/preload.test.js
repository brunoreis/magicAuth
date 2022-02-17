import { call, put } from 'redux-saga/effects';
import preload from './preload';
import { preloadMagicLinkIFrameStarted } from '../authenticationSlice';
import magic from '../../shared/magic';

describe('preload', () => {
  it('preloads magic', () => {
    const g = preload();
    expect(g.next().value).toEqual(put(preloadMagicLinkIFrameStarted()));
    expect(g.next().value).toEqual(call([magic, magic.preload]));
    expect(g.next().done).toBe(true);
  });
});
