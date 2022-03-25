import { call } from 'redux-saga/effects';
import registerIsLoggedInCookieSaga from './registerIsLoggedInCookieSaga';
import Cookie from 'js-cookie'

describe('registerIsLoggedInCookieSaga', () => {
  it('save a session cookie stating that the user is logged in', () => {
    const g = registerIsLoggedInCookieSaga();
    expect(g.next().value).toEqual(call([Cookie, Cookie.set], 'isLoggedIn', 'true'));
    expect(g.next().done).toBe(true);
  });
});
