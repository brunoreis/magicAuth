import { call, put } from 'redux-saga/effects';
import magic from '../../shared/magic';
import { logOutSuccess } from '../authenticationSlice';


export default function* handleLogOut() {
  yield call([magic.user, magic.user.logout]);
  yield put(logOutSuccess());
}
