import { takeEvery, all, call, fork } from 'redux-saga/effects';
import { preload, checkIsLoggedIn, redirects } from '../features/authentication/authentication'
import sagas from './sagas'
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
it('preload, check log in, redirects and start other sagas', () => {
    const g = sagas();
    expect(g.next().value).toEqual(fork(preload));
    expect(g.next().value).toEqual(call(checkIsLoggedIn));
    expect(g.next().value).toEqual(call(redirects));
    expect(g.next().value).toEqual(
      all([
        takeEvery(signIn().type, handleSignIn),
        takeEvery(signInSuccess().type, navigateTo, '/'),
        takeEvery(logOut().type, handleLogOut),
        takeEvery(logOutSuccess().type, navigateTo, '/signIn'),
      ])
    );
  });