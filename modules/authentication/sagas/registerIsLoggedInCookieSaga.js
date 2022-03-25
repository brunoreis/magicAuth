import { call } from 'redux-saga/effects';
import Cookie from 'js-cookie'

export default function* registerIsLoggedInCookieSaga() {
  yield call([Cookie, Cookie.set], 'isLoggedIn', 'true');
}
