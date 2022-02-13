import { takeEvery, all, call, fork} from 'redux-saga/effects';
import { preload, checkIsLoggedIn, redirects } from '../features/authentication/authentication'
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
import { 
    navigateTo
} from '../features/navigation/navigation'

export default function* sagas() {
    yield fork(preload);
    yield call(checkIsLoggedIn);
    yield call(redirects)
    yield all([
      takeEvery(signIn().type, handleSignIn),
      takeEvery(signInSuccess().type, navigateTo, '/'),
      takeEvery(logOut().type, handleLogOut),
      takeEvery(logOutSuccess().type, navigateTo, '/signIn'),
    ]);
}