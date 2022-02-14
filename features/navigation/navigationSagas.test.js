import { put, all, takeEvery, select } from 'redux-saga/effects';
import {
  requestNavigation,
  redirectsStarted,
  redirectsCompleted,
} from './navigationSlice';
import {
  isLoggedIn,
  getUsername,
  navigationWatcher,
  navigate,
  redirects,
  startsWithSlashNav,
} from './navigationSagas';

import Router from 'next/router';
jest.mock('next/router');

it('redirects actions into sagas', () => {
  const g = navigationWatcher();
  expect(g.next().value).toStrictEqual(
    all([takeEvery(startsWithSlashNav, navigate)])
  );
  expect(g.next().done).toBe(true);
});

//@todo: as visible, this sure would profit from a refactoring:
describe('redirects', () => {
  it('if logged in and has no username, goes to /signUp', () => {
    Router.router = { asPath: '/signIn' };
    const isLogged = true;
    const g = redirects();
    expect(g.next().value).toEqual(put(redirectsStarted()));
    expect(g.next().value).toEqual(select(isLoggedIn));
    expect(g.next(isLogged).value).toEqual(select(getUsername));
    expect(g.next(null).value).toEqual(put(requestNavigation('/signUp')));
    expect(g.next().value).toEqual(put(redirectsCompleted()));
    expect(g.next().done).toBe(true);
  });

    describe('Given user is logged in', () => {
      it('/ does not redirect', () => {
        Router.router = { asPath: '/' };
        const g = redirects();
        expect(g.next().value).toEqual(put(redirectsStarted()));
        expect(g.next().value).toEqual(select(isLoggedIn));
        expect(g.next('bruno').value).toEqual(select(getUsername));
        expect(g.next(true).value).toEqual(put(redirectsCompleted()));
        expect(g.next().done).toBe(true);
      });
      it('/signIn redirects to /', () => {
        Router.router = { asPath: '/signIn' };
        const isLogged = true;
        const g = redirects();
        expect(g.next().value).toEqual(put(redirectsStarted()));
        expect(g.next().value).toEqual(select(isLoggedIn));
        expect(g.next('bruno').value).toEqual(select(getUsername));
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
        expect(g.next('bruno').value).toEqual(select(getUsername));
        expect(g.next(isLogged).value).toEqual(put(requestNavigation('/')));
        expect(g.next().value).toEqual(put(redirectsCompleted()));
        expect(g.next().done).toBe(true);
      });
    })

    describe('Given user is not logged in', () => {
      it('/ redirectsTo signIn', () => {
        Router.router = { asPath: '/' };
        const isLogged = false;
        const g = redirects();
        expect(g.next().value).toEqual(put(redirectsStarted()));
        expect(g.next().value).toEqual(select(isLoggedIn));
        expect(g.next(isLogged).value).toEqual(select(getUsername));
        expect(g.next('bruno').value).toEqual(
          put(requestNavigation('/signIn'))
        );
        expect(g.next().value).toEqual(put(redirectsCompleted()));
        expect(g.next().done).toBe(true);
      });
      it('/signIn does not redirect', () => {
        Router.router = { asPath: '/signIn' };
        const isLogged = false;
        const g = redirects();
        expect(g.next().value).toEqual(put(redirectsStarted()));
        expect(g.next().value).toEqual(select(isLoggedIn));
        expect(g.next(isLogged).value).toEqual(select(getUsername));
        expect(g.next('bruno').value).toEqual(put(redirectsCompleted()));
        expect(g.next().done).toBe(true);
      });
      it('/signUp does not redirect', () => {
        Router.router = { asPath: '/signUp' };
        const isLogged = false;
        const g = redirects();
        expect(g.next().value).toEqual(put(redirectsStarted()));
        expect(g.next().value).toEqual(select(isLoggedIn));
        expect(g.next(isLogged).value).toEqual(select(getUsername));
        expect(g.next('bruno').value).toEqual(put(redirectsCompleted()));
        expect(g.next().done).toBe(true);
      });
    });
});
