import { call, put, select } from 'redux-saga/effects';
import magic from '../../shared/magic';
import { getSearch } from '../../../app/router';
import {
  checkIsLoggedInStarted,
  checkIsLoggedInLoginReceived,
  checkIsLoggedInReceived
} from '../authenticationSlice';
import { getRememberMe } from './authenticationSagas';



export default function* checkIsLoggedIn() {
  const rememberMe = yield select(getRememberMe);
  const magicCredential = new URLSearchParams(getSearch()).get('magic_credential');
  yield put(checkIsLoggedInStarted({ rememberMe, magicCredential }));
  if (magicCredential) {
    const isLoggedIn = yield call([magic.auth, magic.auth.loginWithCredential]);
    yield put(checkIsLoggedInLoginReceived({ isLoggedIn, method: 'loginWithCredential' }));
    const metadata = yield call([magic.user, magic.user.getMetadata]);
    yield put(checkIsLoggedInReceived(metadata));
  } else {
    if (rememberMe) {
      try {
        const isLoggedIn = yield call([magic.user, magic.user.isLoggedIn]);
        yield put(checkIsLoggedInLoginReceived({ isLoggedIn, method: 'isLoggedIn' }));
        const metadata = yield call([magic.user, magic.user.getMetadata]);
        yield put(checkIsLoggedInReceived(metadata));
      } catch (e) {
        // basic error handling. Needs to be improved
        // https://magic.link/docs/api-reference/client-side-sdks/web#rpcerror
        yield put(checkIsLoggedInReceived({ issuer: null, error: e.message }));
      }
    } else {
      yield put(
        checkIsLoggedInReceived({ issuer: null, note: 'Remember me disabled' })
      );
    }
  }
}
