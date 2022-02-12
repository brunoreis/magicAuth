import { takeEvery, all, call, put, fork } from 'redux-saga/effects'
import { navigateTo } from './navigation'
import magic from './shared/magic';

export function* authentication() {
    yield fork(magicInitialization);
    yield all([
        takeEvery("auth/signIn", signIn),
        takeEvery("auth/signInSuccess", navigateTo, '/'),
        takeEvery("auth/logOutStart", logOut),
        takeEvery("auth/logOutEnd", navigateTo, '/signIn')
    ])
}

// --------

export function* magicInitialization() {
    yield call([ magic, magic.preload])
}

export function* signIn(action) {
    try {
        const idToken = yield call([magic.auth, magic.auth.loginWithMagicLink], { email: action.payload.email }, true)
        yield put({type: "auth/signInSuccess"});
    } catch (e) {
        yield put({type: "auth/signInFailure", message: e.message});
    }
}

export function* logOut() {
    yield call([magic.user, magic.user.logout])
    yield put({type: "auth/logOutEnd"});
}


