import { takeEvery, all, call, put, select } from 'redux-saga/effects';

import Router from 'next/router';
import {
  requestNavigation,
  redirectsStarted,
  redirectsCompleted,
} from './navigationSlice';

const issuer = (state) => state.authentication.issuer
export const isLoggedIn = (state) => !!issuer(state) // how to user the slice selector here???

const findUser = (state, issuer) => state.users.users.find((user) => user.issuer == issuer)
export const getUsername = (state) => isLoggedIn(state) ? findUser(state, issuer(state)).username : null;

export const startsWithSlashNav = (action) => action.type.startsWith('nav/');

export function* navigationWatcher() {
  yield all([takeEvery(startsWithSlashNav, navigate)]);
}

export function* go(path) {
    yield put(requestNavigation(path))
}

export function* navigate(action) {
  const path = action.type.substring(3);
  yield call([Router, Router.push], path);
}

export function* redirects() {
  yield put(redirectsStarted());
  const actualPath = Router.router.asPath;
  const isLogged = yield select(isLoggedIn);
  const username = yield select(getUsername);
  if (!username && isLogged) {
    yield put(requestNavigation('/signUp'));
  } else {
    if (isLogged) {
      switch (actualPath) {
        case '/signIn':
          yield put(requestNavigation('/'));
          break;
        case '/signUp':
          yield put(requestNavigation('/'));
          break;
      }
    } else {
      switch (actualPath) {
        case '/':
          yield put(requestNavigation('/signIn'));
          break;
      }
    }
  }
  yield put(redirectsCompleted());
}
