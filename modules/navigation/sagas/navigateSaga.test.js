import { call } from 'redux-saga/effects';
import { push } from 'app/router';

import navigateSaga from './navigateSaga';

describe('navigateSaga', () => {
  it('calls Next navigation', () => {
    const path = '/dude';
    const g = navigateSaga({ payload: { path } });
    expect(g.next().value).toEqual(call(push, path));
    expect(g.next().done).toBe(true);
  });
});
