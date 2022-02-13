import { takeEvery, all, call, fork, put } from 'redux-saga/effects';
import { preload, checkIsLoggedIn } from '../features/authentication/authentication'
import { redirects } from '../features/navigation/navigation'
import { requestNavigation } from '../features/navigation/navigationSlice'
import {
    signIn,
    signInSuccess,
    logOut,
    logOutSuccess,
} from '../features/authentication/authenticationSlice';
import { 
    handleSignIn,
    handleLogOut
} from '../features/authentication/authentication'

export default function* sagas() {
    yield fork(preload);
    yield call(checkIsLoggedIn);
    yield call(redirects)
    yield all([
      takeEvery(signIn().type, handleSignIn),
      takeEvery(signInSuccess().type, put(requestNavigation('/'))),
      takeEvery(logOut().type, handleLogOut),
      takeEvery(logOutSuccess().type, put(requestNavigation('/signIn'))),
    ]);
}