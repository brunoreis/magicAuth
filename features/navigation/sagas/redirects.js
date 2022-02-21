import { put, select } from 'redux-saga/effects';
import { path } from '../../../app/router';
import {
  requestNavigation,
  redirectsStarted,
  redirectsCompleted
} from '../navigationSlice';
import { removeQuery, isLoggedIn, getUsername } from './navigationSagas';


export default function* redirects() {
  const actualPath = yield path();
  const actualPathWithoutQuery = removeQuery(actualPath);
  const isLogged = yield select(isLoggedIn);
  const username = yield select(getUsername);
  const infoPayload = { actualPath: actualPathWithoutQuery, isLogged, username };
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
