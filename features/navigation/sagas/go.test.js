import {  call, put } from 'redux-saga/effects';
import { push } from 'app/router';

import { nav } from '../navigationSlice';
import go from './go';



it('navigate and emit action with type nav[path]', () => {
  const path = "/dude"
  const g = go(path);
  expect(g.next().value).toEqual( call(push, path) );
  expect(g.next().value).toEqual( put(nav(path)) );
  expect(g.next().done).toBe(true);
});

