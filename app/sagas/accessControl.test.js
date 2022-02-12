import { put, call, fork, takeEvery } from 'redux-saga/effects';
import { checkAuth, checkAuthRedirects, accessControl } from './accessControl';
import magic from './shared/magic';
import Router from 'next/router';
jest.mock('next/router');

describe('accessControl', () => {

  it('fork the access control check and redirects actions into sagas', () => {
    const g = accessControl();
    expect(g.next().value).toEqual(fork(checkAuth));
    expect(g.next().value).toEqual(takeEvery("auth/checkAuthReceived", checkAuthRedirects));
    expect(g.next().done).toBe(true);
  })

  // --------

  describe('checkAuth', () => {
    Router.router = { asPath : () => '/jj' }
    it('it will check if the user is logged in, dispatching auth/checkAuth before, and auth/checkAuthReived on success', () => {
      const g = checkAuth();
      expect(g.next().value).toEqual(put({type: "auth/checkAuth"}));
      expect(g.next().value).toEqual(call([magic.user, magic.user.isLoggedIn]));
      expect(g.next().value).toEqual(call([Router.router, Router.router.asPath]));
      //todo: understand how to mock/deal with the isLoggedIn and actualPath values
      expect(g.next().value).toEqual(put({type: "auth/checkAuthReceived", payload: { isLoggedIn: undefined, actualPath: undefined }}));
      expect(g.next().done).toBe(true)
    });
  });

  describe('checkAuthRedirects', () => {
    describe('Given user is logged in', ()=> {
      it('/ does not redirect', () => {
        const g = checkAuthRedirects({ payload: { isLoggedIn: true, actualPath: '/'} });
        expect(g.next().done).toBe(true);
      });
      it('/signIn redirects to /', () => {
        const g = checkAuthRedirects({ payload: { isLoggedIn: true, actualPath: '/signIn'} });
        expect(g.next().value).toEqual(put({ type: 'nav/'}));
        expect(g.next().done).toBe(true);
      });
      it('/signUn redirects to /', () => {
        const g = checkAuthRedirects({ payload: { isLoggedIn: true, actualPath: '/signIn'} });
        expect(g.next().value).toEqual(put({ type: 'nav/'}));
        expect(g.next().done).toBe(true);
      });
    })

    describe('Given user is not logged in', ()=> {
      it('/ redirectsTo signIn', () => {
        const g = checkAuthRedirects({ payload: { isLoggedIn: false, actualPath: '/'} });
        expect(g.next().value).toEqual(put({ type: 'nav/signIn'}));
        expect(g.next().done).toBe(true);
      });
      it('/signIn does not redirect', () => {
        const g = checkAuthRedirects({ payload: { isLoggedIn: false, actualPath: '/signIn'} });
        expect(g.next().done).toBe(true);
      });
      it('/signUn does not redirect', () => {
        const g = checkAuthRedirects({ payload: { isLoggedIn: false, actualPath: '/signIn'} });
        expect(g.next().done).toBe(true);
      });
    })
  });

});

