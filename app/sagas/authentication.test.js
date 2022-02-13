import { fork, all, takeEvery, call, put, select } from 'redux-saga/effects';
import { navigateTo } from './navigation';
import {
  redirects,
  authentication,
  preload,
  checkIsLoggedIn,
  handleSignIn,
  handleLogOut,
  isLoggedIn,
} from './authentication';
import magic from './shared/magic';
import {
  checkIsLoggedInStarted,
  checkIsLoggedInReceived,
  signIn,
  signInSuccess,
  logOut,
  logOutSuccess,
  redirectsStarted,
  redirectsCompleted,
} from '../../features/authentication/authenticationSlice';
import { nav } from '../../features/authentication/navigationSlice';
import Router from 'next/router';

jest.mock('next/router');

describe('authentication', () => {
  it('preload, check log in,  and redirects actions into sagas', () => {
    const g = authentication();
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

  // --------

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
      expect(g.next(true).value).toEqual(put(checkIsLoggedInReceived(true)));
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
      expect(g.next().value).toEqual(put(signInSuccess()));
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
