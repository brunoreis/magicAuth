import { call, put, select } from 'redux-saga/effects';
import magic from '../../shared/magic';
import {
  signInSuccess,
  signInFailure,
  isLoggedIn
} from '../authenticationSlice';
import { requestNavigation } from '../../navigation/navigationSlice';
import { getUsername } from '../../../app/selectors';


export default function* handleSignIn(action) {
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
      yield put(requestNavigation('/'));
    } else {
      yield put(requestNavigation('/signUp'));
    }
  } catch (e) {
    yield put(signInFailure());
  }
}
