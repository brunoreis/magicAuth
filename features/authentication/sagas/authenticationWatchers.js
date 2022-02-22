import { all, takeEvery } from 'redux-saga/effects';

import go from 'features/navigation/sagas/go';

import {
  signIn,
  logOut,
  logOutSuccess,
  preloadMagicLinkIFrame,
  isLoggedIn,
} from '../authenticationSlice';
import signInWithMagicLink from './signInWithMagicLink';
import removeCookieAndLogoutFromMagicLink from './removeCookieAndLogoutFromMagicLink';
import registerIsLoggedInCookie from './registerIsLoggedInCookie';
import preloadIFrame from './preloadIFrame';

export default function* authenticationWatchers() {
  yield all([
    takeEvery(signIn().type, signInWithMagicLink),
    takeEvery(logOut().type, removeCookieAndLogoutFromMagicLink),
    takeEvery(logOutSuccess().type, go, '/signIn'),
    takeEvery(preloadMagicLinkIFrame().type, preloadIFrame),
  ]);
}

export function* watchIsSignedIn() {
  yield takeEvery(isLoggedIn().type, registerIsLoggedInCookie)
}


