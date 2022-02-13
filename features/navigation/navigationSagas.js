import { takeEvery, all, call, put, select } from 'redux-saga/effects'
import Router from 'next/router'
import { requestNavigation } from './navigationSlice'
import {
  redirectsStarted,
  redirectsCompleted,
  isLoggedIn
} from '../authentication/authenticationSlice';

export const startsWithSlashNav = (action) => action.type.startsWith('nav/')

export function* navigation() {
  yield all([
    takeEvery(startsWithSlashNav, navigate), 
  ]);
}

export function* navigate(action) {
  const path = action.type.substring(3);
  yield call([Router, Router.push], path);
}

export function* redirects() {
  yield put(redirectsStarted())
  const actualPath = Router.router.asPath
  const isLogged = yield select(isLoggedIn)
  if(isLogged) {
      switch(actualPath) {
          case '/signIn': yield put(requestNavigation('/')); 
              break;
          case '/signUp': yield put(requestNavigation('/')); break;
      }
  } else {
      switch(actualPath) {
          case '/': yield put(requestNavigation('/signIn')); break;
      }
  }
  yield put(redirectsCompleted())
}
