import { call } from 'redux-saga/effects';

import magic from '../util/magic';
import preloadIFrameSaga from './preloadIFrameSaga';

describe('preloadIFrameSaga', () => {
  it('preloadIFrameSaga preloads the magic login iFrame', () => {
    const g = preloadIFrameSaga();
    expect(g.next().value).toEqual(call([magic, magic.preload]));
    expect(g.next().done).toBe(true);
  });
});
