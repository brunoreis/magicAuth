import { put, all, takeEvery, select } from 'redux-saga/effects';
import { path } from '../../app/router';
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
    const isLogged = true;
    const g = redirects();
    expect(g.next().value).toEqual(path());
    expect(g.next('/').value).toEqual(select(isLoggedIn));
    expect(g.next(isLogged).value).toEqual(select(getUsername));
    expect(g.next().value).toEqual(
      put(
        redirectsStarted({
          actualPath: '/',
          isLogged: true,
          username: undefined,
        })
      )
    );
    expect(g.next(null).value).toEqual(put(requestNavigation('/signUp')));
    expect(g.next().value).toEqual(put(redirectsCompleted()));
    expect(g.next().done).toBe(true);
  });

  describe('Given user is logged in', () => {
    it('/ does not redirect', () => {
      const g = redirects();
      expect(g.next().value).toEqual(path());
      expect(g.next('/').value).toEqual(select(isLoggedIn));
      expect(g.next(true).value).toEqual(select(getUsername));
      expect(g.next('username').value).toEqual(
        put(
          redirectsStarted({
            actualPath: '/',
            isLogged: true,
            username: 'username',
          })
        )
      );
      expect(g.next(true).value).toEqual(put(redirectsCompleted()));
      expect(g.next().done).toBe(true);
    });
    it('/signIn redirects to /', () => {
      const isLogged = true;
      const g = redirects();
      expect(g.next().value).toEqual(path());
      expect(g.next('/signIn').value).toEqual(select(isLoggedIn));
      expect(g.next(true).value).toEqual(select(getUsername));
      expect(g.next('username').value).toEqual(
        put(
          redirectsStarted({
            actualPath: '/signIn',
            isLogged: true,
            username: 'username',
          })
        )
      );
      expect(g.next(isLogged).value).toEqual(put(requestNavigation('/')));
      expect(g.next().value).toEqual(put(redirectsCompleted()));
      expect(g.next().done).toBe(true);
    });
    it('/signUp redirects to /', () => {
      const isLogged = true;
      const g = redirects();
      expect(g.next().value).toEqual(path());
      expect(g.next('/signUp').value).toEqual(select(isLoggedIn));
      expect(g.next(true).value).toEqual(select(getUsername));
      expect(g.next('username').value).toEqual(
        put(
          redirectsStarted({
            actualPath: '/signUp',
            isLogged: true,
            username: 'username',
          })
        )
      );
      expect(g.next(isLogged).value).toEqual(put(requestNavigation('/')));
      expect(g.next().value).toEqual(put(redirectsCompleted()));
      expect(g.next().done).toBe(true);
    });
  });

  describe('Given user is not logged in', () => {
    it('/ redirectsTo signIn', () => {
      const isLogged = true;
      const g = redirects();
      expect(g.next().value).toEqual(path());
      expect(g.next('/').value).toEqual(select(isLoggedIn));
      expect(g.next(false).value).toEqual(select(getUsername));
      expect(g.next('username').value).toEqual(
        put(
          redirectsStarted({
            actualPath: '/',
            isLogged: false,
            username: 'username',
          })
        )
      );
      expect(g.next().value).toEqual(put(requestNavigation('/signIn')));
      expect(g.next().value).toEqual(put(redirectsCompleted()));
      expect(g.next().done).toBe(true);
    });
    it('/signIn does not redirect', () => {
      const isLogged = false;
      const g = redirects();
      expect(g.next().value).toEqual(path());
      expect(g.next('/signIn').value).toEqual(select(isLoggedIn));
      expect(g.next(false).value).toEqual(select(getUsername));
      expect(g.next('username').value).toEqual(
        put(
          redirectsStarted({
            actualPath: '/signIn',
            isLogged: false,
            username: 'username',
          })
        )
      );
      expect(g.next('bruno').value).toEqual(put(redirectsCompleted()));
      expect(g.next().done).toBe(true);
    });
    it('/signUp goes to /signIn', () => {
      const isLogged = false;
      const g = redirects();
      expect(g.next().value).toEqual(path());
      expect(g.next('/signUp').value).toEqual(select(isLoggedIn));
      expect(g.next(false).value).toEqual(select(getUsername));
      expect(g.next('username').value).toEqual(
        put(
          redirectsStarted({
            actualPath: '/signUp',
            isLogged: false,
            username: 'username',
          })
        )
      );
      expect(g.next().value).toEqual(put(requestNavigation('/signIn')));
      expect(g.next().value).toEqual(put(redirectsCompleted()));
      expect(g.next().done).toBe(true);
    });
  });
});
