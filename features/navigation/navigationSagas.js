import { takeEvery, all, call, put, select } from 'redux-saga/effects';
import { push, path } from '../../app/router';

import {
  requestNavigation,
  redirectsStarted,
  redirectsCompleted,
} from './navigationSlice';

const issuer = (state) => state.authentication.issuer
export const isLoggedIn = (state) => !!issuer(state) 
const removeQuery = (path) => path.split("?")[0]

const findUser = (state, issuer) => state.users.users.find((user) => user.issuer == issuer)
export const getUsername = (state) => isLoggedIn(state) ? findUser(state, issuer(state)).username : null;
export const startsWithNavSlash = (action) => action.type.startsWith('nav/');

export function* navigationWatcher() {
  yield all([takeEvery(startsWithNavSlash, navigate)]);
}

export function* go(path) {
    yield put(requestNavigation(path))
}

export function* navigate(action) {
  const path = action.type.substring(3);
  yield call(push, path);
}

export function* redirects() {
  const actualPath = yield path()
  const actualPathWithoutQuery = removeQuery(actualPath)//?
  const isLogged = yield select(isLoggedIn);//?
  const username = yield select(getUsername);//?
  const infoPayload = { actualPath: actualPathWithoutQuery, isLogged, username }
  yield put(redirectsStarted(infoPayload));
  if (!username && isLogged) {
    yield put(requestNavigation('/signUp'));
  } else {
    if (isLogged) {
      switch (actualPathWithoutQuery) {
        case '/signIn':
          yield put(requestNavigation('/'));
          break;
        case '/signUp':
          yield put(requestNavigation('/'));
          break;
      }
    } else {
      switch (actualPathWithoutQuery) {
        case '/signUp':
        case '/':
          yield put(requestNavigation('/signIn'));
          break;
      }
    }
  }
  yield put(redirectsCompleted());
}
