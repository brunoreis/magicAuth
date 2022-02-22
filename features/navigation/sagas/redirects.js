import { put, select, call } from 'redux-saga/effects';

import { path } from 'app/router';

import go from './go';

import {
  redirectsStarted,
  redirectsCompleted
} from '../navigationSlice';

const issuer = (state) => state.authentication.issuer
const findUser = (state, issuer) => state.users.users.find((user) => user.issuer == issuer)
export const isLoggedIn = (state) => !!issuer(state) 
export const getUsername = (state) => isLoggedIn(state) ? findUser(state, issuer(state)).username : null;
export const removeQuery = (path) => path.split("?")[0]


export default function* redirects() {
  const actualPath = yield path();
  const actualPathWithoutQuery = removeQuery(actualPath);
  const isLogged = yield select(isLoggedIn);
  const username = yield select(getUsername);
  const infoPayload = { actualPath: actualPathWithoutQuery, isLogged, username };
  yield put(redirectsStarted(infoPayload));
  if (!username && isLogged) {
    yield call(go,'/signUp');
  } else {
    if (isLogged) {
      switch (actualPathWithoutQuery) {
        case '/signIn':
          yield call(go,'/');
          break;
        case '/signUp':
          yield call(go,'/');
          break;
      }
    } else {
      switch (actualPathWithoutQuery) {
        case '/signUp':
        case '/':
          yield call(go,'/signIn');
          break;
      }
    }
  }
  yield put(redirectsCompleted());
}
