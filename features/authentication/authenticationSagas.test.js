import { call, put, select, all, takeEvery } from 'redux-saga/effects';

import authenticationSagas, {
  preload,
  checkIsLoggedIn,
  handleSignIn,
  handleLogOut,
  getRememberMe,
} from './authenticationSagas';
import {
  signIn,
  logOut,
  logOutSuccess,
  checkIsLoggedInStarted,
  checkIsLoggedInLoginReceived,
  checkIsLoggedInReceived,
  signInSuccess,
  preloadMagicLinkIFrame,
  preloadMagicLinkIFrameStarted
} from './authenticationSlice';

import { requestNavigation } from '../navigation/navigationSlice';
import { go } from '../navigation/navigationSagas';

import magic from '../shared/magic';

import { getUsername } from '../../app/selectors';

describe('authenticationSagas', () => {
  it('watch and call sagas', () => {
    const g = authenticationSagas();
    expect(g.next().value).toEqual(
      all([
        takeEvery(signIn().type, handleSignIn),
        takeEvery(logOut().type, handleLogOut),
        takeEvery(logOutSuccess().type, go, '/signIn'),
        takeEvery(preloadMagicLinkIFrame().type, preload),
      ])
    );
    expect(g.next().done).toBe(true);
  });
});

describe('preload', () => {
  it('preloads magic', () => {
    const g = preload();
    expect(g.next().value).toEqual(put(preloadMagicLinkIFrameStarted()));
    expect(g.next().value).toEqual(call([magic, magic.preload]));
    expect(g.next().done).toBe(true);
  });
});

describe('checkIsLoggedIn', () => {
  it('Given that remember me is true, it will check if the user is logged in and grab metadata, dispatching auth/checkIsLoggedIn before, and auth/checkIsLoggedInReived on success', () => {
    const g = checkIsLoggedIn();
    expect(g.next(true).value).toEqual(select(getRememberMe));
    expect(g.next(true).value).toEqual(
      put(checkIsLoggedInStarted({ rememberMe: true }))
    );
    expect(g.next().value).toEqual(call([magic.user, magic.user.isLoggedIn]));
    expect(g.next(true).value).toEqual(
      put(checkIsLoggedInLoginReceived({ isLoggedIn: true }))
    );
    expect(g.next().value).toEqual(call([magic.user, magic.user.getMetadata]));
    const payload = {
      email: 'testemail@a.com',
      issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
    };
    expect(g.next(payload).value).toEqual(
      put(checkIsLoggedInReceived(payload))
    );
    expect(g.next().done).toBe(true);
  });

  it('Given that remember me is false, it will skip the check and dispatch auth/checkIsLoggedInReived on success', () => {
    const g = checkIsLoggedIn();
    expect(g.next(true).value).toEqual(select(getRememberMe));
    expect(g.next(false).value).toEqual(
      put(checkIsLoggedInStarted({ rememberMe: false }))
    );
    expect(g.next().value).toEqual(
      put(
        checkIsLoggedInReceived({ issuer: null, note: 'Remember me disabled' })
      )
    );
    expect(g.next().done).toBe(true);
  });
});

describe('signIn', () => {
  //@todo: test the exception flow
  describe('signIn with the email, dispaches auth/signInSucces and', () => {
    it('redirects to welcome if username exists', () => {
      // this is throwing a TypeError: Converting circular structure to JSON error if it fails (jest bug?)
      const email = 'testemail@a.com';
      const redirectURI = 'http://localhost:3000/';
      const g = handleSignIn({ payload: { email, redirectURI } });
      expect(g.next().value).toEqual(
        call(
          [magic.auth, magic.auth.loginWithMagicLink],
          { email, redirectURI },
          true
        )
      );
      expect(g.next().value).toEqual(
        call([magic.user, magic.user.getMetadata])
      );
      const metadata = {
        email: 'testemail@a.com',
        issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
      };
      expect(g.next(metadata).value).toEqual(put(signInSuccess(metadata)));
      expect(g.next().value).toEqual(select(getUsername));
      expect(g.next('mockedUsername').value).toEqual(
        put(requestNavigation('/'))
      );
      expect(g.next().done).toBe(true);
    });
    it('redirects to /signUp if username does not exists', () => {
      const email = 'testemail@a.com';
      const redirectURI = 'http://localhost:3000/';
      const g = handleSignIn({ payload: { email, redirectURI } });

      expect(g.next().value).toEqual(
        call(
          [magic.auth, magic.auth.loginWithMagicLink],
          { email, redirectURI },
          true
        )
      );
      expect(g.next().value).toEqual(
        call([magic.user, magic.user.getMetadata])
      );
      const metadata = {
        email: 'testemail@a.com',
        issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
      };
      expect(g.next(metadata).value).toEqual(put(signInSuccess(metadata)));
      expect(g.next().value).toEqual(select(getUsername));
      expect(g.next().value).toEqual(put(requestNavigation('/signUp')));
      expect(g.next().done).toBe(true);
    });
  });
});

describe('logOut', () => {
  it('it will log out and dispatches auth/logOutEnd', () => {
    const g = handleLogOut();
    expect(g.next().value).toEqual(call([magic.user, magic.user.logout]));
    expect(g.next().value).toEqual(put(logOutSuccess()));
  });
});
