import { call, put, select } from 'redux-saga/effects';

import { getUsername } from 'app/selectors';
import go from 'features/navigation/sagas/go';

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
    const username = yield select(getUsername);
    if (username) {
      yield call(go,'/');
    } else {
      yield call(go,'/signUp');
    }
  } catch (e) {
    yield put(signInFailure());
  }
}
