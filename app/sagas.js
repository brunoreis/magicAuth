import { takeEvery, all, call, put, fork } from 'redux-saga/effects'
import { Magic } from 'magic-sdk';
import Router from 'next/router'

const magic = new Magic('pk_live_DAD57FAA0FFD246C'); 

function* nav(action) {
    const path = action.type.substring(3);
    yield call([Router, Router.push], path)
}

function* navigateTo(path) {
    yield put({type: `nav${path}`})
}

function* logout() {
    yield call([magic.user, magic.user.logout])
    yield put({type: "auth/logOutEnd"});
}

function* checkAuth() {
    yield put({type: "auth/checkAuth"});
    const isLoggedIn = yield magic.user.isLoggedIn()
    yield put({type: "auth/authInfoReceived", payload: { isLoggedIn }});
}

function* checkAuthRedirects(action) {
    const asPath = Router.router.asPath
    switch(asPath) {
        case '/': yield put({ type: 'nav/signIn'}); break;
        case '/signIn': yield put({ type: 'nav/'}); break;
        case '/signUp': yield put({ type: 'nav/'}); break;
    }
}

function* signIn(action) {
    try {
        yield call([magic,magic.preload])
        console.log(3);
        const idToken = yield call([magic.auth, magic.auth.loginWithMagicLink], { email: 'bruno.p.reis@gmail.com'}, true)
        console.log(4);
        console.log({ idToken })
        yield put({type: "auth/signInSuccess"});
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

export function* authSaga() {
    yield fork(checkAuth);
    yield all([
        takeEvery("auth/signIn", signIn),
        takeEvery("auth/signInSuccess", navigateTo, '/'),
        takeEvery((action) => action.type.startsWith("nav/"), nav), // not sure about this, but it sure makes the history clear
        takeEvery("auth/authInfoReceived", checkAuthRedirects),
        takeEvery("auth/logOutStart", logout),
        takeEvery("auth/logOutEnd", navigateTo, '/signIn')
    ])
}