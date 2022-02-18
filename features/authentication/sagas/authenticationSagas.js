import { all, takeEvery } from 'redux-saga/effects';

import {
  signIn,
  logOut,
  logOutSuccess,
  preloadMagicLinkIFrame,
  isLoggedIn,
} from '../authenticationSlice';
import { go } from '../../navigation/navigationSagas';

export const getIsLoggedIn = (state) => state.authentication.isLoggedIn;
export const getRememberMe = (state) => state.authentication.rememberMe;

import preload from './preload';
import handleSignIn from './handleSignIn';
import handleLogOut from './handleLogOut';
import registerIsLoggedInCookie from './registerIsLoggedInCookie';

export default function* authenticationSagas() {
  yield all([
    takeEvery(signIn().type, handleSignIn),
    takeEvery(logOut().type, handleLogOut),
    takeEvery(logOutSuccess().type, go, '/signIn'),
    takeEvery(preloadMagicLinkIFrame().type, preload),
  ]);
}

export function* watchIsSignedIn() {
  yield takeEvery(isLoggedIn().type, registerIsLoggedInCookie)
}


