import { call, put } from 'redux-saga/effects';
import magic from '../../shared/magic';
import { logOutSuccess } from '../authenticationSlice';
import Cookie from 'js-cookie'

export default function* handleLogOut() {
  yield call([magic.user, magic.user.logout]);
  yield call([Cookie, Cookie.remove], 'isLoggedIn');
  yield put(logOutSuccess());
}
