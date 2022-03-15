import { call, put } from 'redux-saga/effects';

import magic from '../util/magic';
import {
  signInSuccess,
  signInFailure,
  isLoggedIn
} from '../authenticationSlice';

export default function* signInWithMagicLink(action) {
  try {
    yield call(
      [magic.auth, magic.auth.loginWithMagicLink],
      {
        email: action.payload.email,
        redirectURI: action.payload.redirectURI
      },
      true
    );

    const metadata = yield call([magic.user, magic.user.getMetadata]);
    yield put(signInSuccess(metadata));
    yield put(isLoggedIn());

  } catch (e) {
    yield put(signInFailure());
  }
}
