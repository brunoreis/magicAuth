import {  all, takeEvery } from 'redux-saga/effects';
import navigate from './navigate';

import navigationWatcher, { 
  startsWithNavSlash,
} from "./navigationWatcher";

it('redirects actions into sagas', () => {
  const g = navigationWatcher();
  expect(g.next().value).toStrictEqual(
    all([takeEvery(startsWithNavSlash, navigate)])
  );
  expect(g.next().done).toBe(true);
});

