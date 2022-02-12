import { takeEvery, all, call, put } from 'redux-saga/effects';
import Router from 'next/router';

export const startsWithSlashNav = (action) => action.type.startsWith('nav/')

export function* navigation() {
  yield all([
    takeEvery(startsWithSlashNav, nav), // not sure about this, but it sure makes the history clear
  ]);
}

export function* nav(action) {
  const path = action.type.substring(3);
  yield call([Router, Router.push], path);
}

export function* navigateTo(path) {
  yield put({ type: `nav${path}` });
}
