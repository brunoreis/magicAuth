import { call, put, select } from 'redux-saga/effects';
import {
  redirects,
  preload,
  checkIsLoggedIn,
  handleSignIn,
  handleLogOut,
  isLoggedIn,
} from './authentication';
import magic from '../shared/magic';
import {
  checkIsLoggedInStarted,
  checkIsLoggedInReceived,
  signInSuccess,
  logOutSuccess,
  redirectsStarted,
  redirectsCompleted,
} from '../../features/authentication/authenticationSlice';
import { nav } from '../../features/authentication/navigationSlice';
import Router from 'next/router';

jest.mock('next/router');

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

  //@todo: as visible, this sure would profit from a refactoring:
  describe('redirects', () => {
    describe('Given user is logged in', () => {
      it('/ does not redirect', () => {
        Router.router = { asPath: '/' };
        const g = redirects();
        expect(g.next().value).toEqual(put(redirectsStarted()));
        expect(g.next().value).toEqual(select(isLoggedIn));
        expect(g.next(true).value).toEqual(put(redirectsCompleted()));
        expect(g.next().done).toBe(true);
      });
      it('/signIn redirects to /', () => {
        Router.router = { asPath: '/signIn' };
        const isLogged = true;
        const g = redirects();
        expect(g.next().value).toEqual(put(redirectsStarted()));
        expect(g.next().value).toEqual(select(isLoggedIn));
        expect(g.next(isLogged).value).toEqual(put(nav('/')));
        expect(g.next().value).toEqual(put(redirectsCompleted()));
        expect(g.next().done).toBe(true);
      });
      it('/signUp redirects to /', () => {
        Router.router = { asPath: '/signUp' };
        const isLogged = true;
        const g = redirects();
        expect(g.next().value).toEqual(put(redirectsStarted()));
        expect(g.next().value).toEqual(select(isLoggedIn));
        expect(g.next(isLogged).value).toEqual(put(nav('/')));
        expect(g.next().value).toEqual(put(redirectsCompleted()));
        expect(g.next().done).toBe(true);
      });

      describe('Given user is not logged in', () => {
        it('/ redirectsTo signIn', () => {
          Router.router = { asPath: '/' };
          const isLogged = false;
          const g = redirects();
          expect(g.next().value).toEqual(put(redirectsStarted()));
          expect(g.next().value).toEqual(select(isLoggedIn));
          expect(g.next(isLogged).value).toEqual(put(nav('/signIn')));
          expect(g.next().value).toEqual(put(redirectsCompleted()));
          expect(g.next().done).toBe(true);
        });
        it('/signIn does not redirect', () => {
          Router.router = { asPath: '/signIn' };
          const isLogged = false;
          const g = redirects();
          expect(g.next().value).toEqual(put(redirectsStarted()));
          expect(g.next().value).toEqual(select(isLoggedIn));
          expect(g.next().value).toEqual(put(redirectsCompleted()));
          expect(g.next().done).toBe(true);
        });
        it('/signUn does not redirect', () => {
          Router.router = { asPath: '/signUp' };
          const isLogged = false;
          const g = redirects();
          expect(g.next().value).toEqual(put(redirectsStarted()));
          expect(g.next().value).toEqual(select(isLoggedIn));
          expect(g.next().value).toEqual(put(redirectsCompleted()));
          expect(g.next().done).toBe(true);
        });
      });
    });
  });
});
