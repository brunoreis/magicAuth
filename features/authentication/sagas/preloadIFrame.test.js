import { call, put } from 'redux-saga/effects';

import magic from '../util/magic';
import { preloadMagicLinkIFrameStarted } from '../authenticationSlice';
import preload from './preloadIFrame';

describe('preload', () => {
  it('preloads magic', () => {
    const g = preload();
    expect(g.next().value).toEqual(put(preloadMagicLinkIFrameStarted()));
    expect(g.next().value).toEqual(call([magic, magic.preload]));
    expect(g.next().done).toBe(true);
  });
});
