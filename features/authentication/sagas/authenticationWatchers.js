import { all, takeEvery, call, fork, take } from 'redux-saga/effects';

import {
  signIn,
  logOut,
  preloadMagicLinkIFrame,
} from '../authenticationSlice';
import isSignedInWatcher from './isSignedInWatcher';
import checkIsLoggedIn from "./checkIsLoggedIn";
import signInWithMagicLink from './signInWithMagicLink';
import removeCookieAndLogoutFromMagicLink from './removeCookieAndLogoutFromMagicLink';
import preloadIFrame from './preloadIFrame';

export default function* authenticationWatchers() {
  yield all([
    take('persist/REHYDRATE'),
    take('app/routerReady')
  ])
  yield fork(isSignedInWatcher);
  yield call(checkIsLoggedIn);
  yield all([
    takeEvery(signIn().type, signInWithMagicLink),
    takeEvery(logOut().type, removeCookieAndLogoutFromMagicLink),
    takeEvery(preloadMagicLinkIFrame().type, preloadIFrame),
  ]);
}
