import { all, takeEvery, call, fork, take } from 'redux-saga/effects';

import {
  signIn,
  logOut,
  preloadMagicLinkIFrame,
  isLoggedIn,
} from '../slice/authenticationSlice';
import authenticationWatchersSaga from './authenticationWatchersSaga';
import preloadIFrameSaga from './preloadIFrameSaga';
import signInWithMagicLinkSaga from './signInWithMagicLinkSaga';
import removeCookieAndLogoutFromMagicLinkSaga from './removeCookieAndLogoutFromMagicLinkSaga';
import registerIsLoggedInCookieSaga from './registerIsLoggedInCookieSaga';
import checkIsLoggedInSaga from './checkIsLoggedInSaga';

describe('authenticationWatchersSaga', () => {
  it('waits for the initial initialization of the router and the persistor to create the watchers', () => {
    const g = authenticationWatchersSaga();
    expect(g.next().value).toEqual(
      all([take('app/routerReady'), take('persist/REHYDRATE')])
    );
    
  });

  it('dispatches checkIsLoggedIn', () => {
    const g = authenticationWatchersSaga();
    g.next()
    expect(g.next().value).toEqual(call(checkIsLoggedInSaga));
  })

  it('takeEvery:  signIn => signInWithMagicLinkSaga | logOut => removeCookieAndLogoutFromMagicLinkSaga | preloadMagicLinkIFrame => preloadIFrame', () => {
    const g = authenticationWatchersSaga();
    g.next()
    expect(g.next().value).toEqual(call(checkIsLoggedInSaga));
    expect(g.next().value).toEqual(
      all([
        takeEvery(isLoggedIn().type, registerIsLoggedInCookieSaga),
        takeEvery(signIn().type, signInWithMagicLinkSaga),
        takeEvery(logOut().type, removeCookieAndLogoutFromMagicLinkSaga),
        takeEvery(preloadMagicLinkIFrame().type, preloadIFrameSaga),
      ])
    );
    expect(g.next().done).toBe(true);
  })
})
