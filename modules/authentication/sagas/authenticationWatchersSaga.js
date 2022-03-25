import { all, takeEvery, call, take } from 'redux-saga/effects';

import {
  signIn,
  logOut,
  preloadMagicLinkIFrame,
  isLoggedIn
} from '../slice/authenticationSlice';
import checkIsLoggedInSaga from "./checkIsLoggedInSaga";
import signInWithMagicLinkSaga from './signInWithMagicLinkSaga';
import removeCookieAndLogoutFromMagicLinkSaga from './removeCookieAndLogoutFromMagicLinkSaga';
import preloadIFrameSaga from './preloadIFrameSaga';
import registerIsLoggedInCookieSaga from './registerIsLoggedInCookieSaga';

export default function* authenticationWatchers() {  
  yield all([
    take('app/routerReady'),
    take('persist/REHYDRATE')
  ])
  yield call(checkIsLoggedInSaga);
  yield all([
    takeEvery(isLoggedIn().type, registerIsLoggedInCookieSaga),
    takeEvery(signIn().type, signInWithMagicLinkSaga),
    takeEvery(logOut().type, removeCookieAndLogoutFromMagicLinkSaga),
    takeEvery(preloadMagicLinkIFrame().type, preloadIFrameSaga),
  ]);
}
