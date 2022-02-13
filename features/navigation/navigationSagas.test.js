import { put, call, all, takeEvery, select } from 'redux-saga/effects';
import Router from 'next/router';
import { requestNavigation } from './navigationSlice';
import { redirectsStarted, redirectsCompleted, isLoggedIn } from '../authentication/authenticationSlice';
import { navigation, navigate, redirects, startsWithSlashNav } from './navigationSagas';


jest.mock('next/router');


describe('sagas', () => {
  it('redirects actions into sagas', () => {
    const g = navigation();
    expect(g.next().value).toStrictEqual(
      all([takeEvery(startsWithSlashNav, navigate)])
    );
    expect(g.next().done).toBe(true);
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
        expect(g.next(isLogged).value).toEqual(put(requestNavigation('/')));
        expect(g.next().value).toEqual(put(redirectsCompleted()));
        expect(g.next().done).toBe(true);
      });
      it('/signUp redirects to /', () => {
        Router.router = { asPath: '/signUp' };
        const isLogged = true;
        const g = redirects();
        expect(g.next().value).toEqual(put(redirectsStarted()));
        expect(g.next().value).toEqual(select(isLoggedIn));

        expect(g.next(isLogged).value).toEqual(put(requestNavigation('/')));
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
          expect(g.next(isLogged).value).toEqual(put(requestNavigation('/signIn')));
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
