import { call, put } from 'redux-saga/effects';
import {
  preload,
  checkIsLoggedIn,
  handleSignIn,
  handleLogOut,
} from './authentication';
import magic from '../shared/magic';
import {
  checkIsLoggedInStarted,
  checkIsLoggedInReceived,
  signInSuccess,
  logOutSuccess,
} from './authenticationSlice';

describe('authentication', () => {
  describe('preload', () => {
    it('preloads magic', () => {
      const g = preload();
      expect(g.next().value).toEqual(call([magic, magic.preload]));
      expect(g.next().done).toBe(true);
    });
  });

  describe('checkIsLoggedIn', () => {
    it('it will check if the user is logged in, dispatching auth/checkIsLoggedIn before, and auth/checkIsLoggedInReived on success', () => {
      const g = checkIsLoggedIn();
      expect(g.next().value).toEqual(put(checkIsLoggedInStarted()));
      expect(g.next().value).toEqual(call([magic.user, magic.user.isLoggedIn]));
      expect(g.next(true).value).toEqual(call([magic.user, magic.user.getMetadata]));
      const payload = { email: 'testemail@a.com', issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'}
      expect(g.next(payload).value).toEqual(put(checkIsLoggedInReceived(payload)));
      expect(g.next().done).toBe(true);
    });
  });

  describe('signIn', () => {
    it('signIn with the email and dispaches auth/signInSucces', () => {
      // this is throwing a TypeError: Converting circular structure to JSON error if it fails (jest bug?)
      const email = 'testemail@a.com';
      const g = handleSignIn({ payload: { email } });
      expect(g.next().value).toEqual(
        call([magic.auth, magic.auth.loginWithMagicLink], { email }, true)
      );
      expect(g.next().value).toEqual(call([magic.user, magic.user.getMetadata]));
      const metadata = { email: 'testemail@a.com', issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7'}
      expect(g.next(metadata).value).toEqual(put(signInSuccess(metadata)));
      expect(g.next().done).toBe(true);
    });
  });

  describe('logOut', () => {
    it('it will log out and dispatches auth/logOutEnd', () => {
      const g = handleLogOut();
      expect(g.next().value).toEqual(call([magic.user, magic.user.logout]));
      expect(g.next().value).toEqual(put(logOutSuccess()));
    });
  });
});
