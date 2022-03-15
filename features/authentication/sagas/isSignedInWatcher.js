import { takeEvery } from 'redux-saga/effects';

import { isLoggedIn } from '../authenticationSlice';
import registerIsLoggedInCookie from './registerIsLoggedInCookie';

export default function* isSignedInWatcher() {
  // console.log('---isSignedInWatcher')
  yield takeEvery(isLoggedIn().type, registerIsLoggedInCookie);
}
