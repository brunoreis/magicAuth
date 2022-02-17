import { call } from 'redux-saga/effects';
import registerIsLoggedInCookie from './registerIsLoggedInCookie';
import Cookie from 'js-cookie'

describe('registerIsLoggedInCookie', () => {
  it('save a session cookie stating that the user is logged in', () => {
    const g = registerIsLoggedInCookie();
    expect(g.next().value).toEqual(call([Cookie, Cookie.set], 'isLoggedIn', 'true'));
    expect(g.next().done).toBe(true);
  });
});
