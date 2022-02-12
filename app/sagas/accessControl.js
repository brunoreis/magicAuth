import { call, put, fork, takeEvery } from 'redux-saga/effects'
import Router from 'next/router';
import magic from './shared/magic';

export function* accessControl() {
    yield fork(checkAuth);
    yield takeEvery("auth/checkAuthReceived", checkAuthRedirects)
}

// --------

export function* checkAuth() {
    yield put({type: "auth/checkAuth"})
    const isLoggedIn = yield call([magic.user, magic.user.isLoggedIn])
    const actualPath = yield call([Router.router, Router.router.asPath])
    console.log('actualPath', actualPath)
    yield put({type: "auth/checkAuthReceived", payload: { isLoggedIn, actualPath }})
}

export function* checkAuthRedirects(action) {
    const { isLoggedIn, actualPath } = action.payload
    if(isLoggedIn) {
        switch(actualPath) {
            case '/signIn': yield put({ type: 'nav/'}); 
                break;
            case '/signUp': yield put({ type: 'nav/'}); break;
        }
    } else {
        switch(actualPath) {
            case '/': yield put({ type: 'nav/signIn'}); break;
        }
    }
}