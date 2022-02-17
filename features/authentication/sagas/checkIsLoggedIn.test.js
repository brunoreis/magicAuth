import { call, put, select } from 'redux-saga/effects';
import { getRememberMe } from './authenticationSagas';
import checkIsLoggedIn from './checkIsLoggedIn';
import {
  checkIsLoggedInStarted,
  checkIsLoggedInLoginReceived,
  checkIsLoggedInReceived,
  isLoggedIn,
} from '../authenticationSlice';
import magic from '../../shared/magic';
import Cookie from 'js-cookie'

export let mockedQuerySearch = ''; // I'm not sure about this strategy. It smells like it can cause concurrency issues
jest.mock('../../../app/router', () => ({
  getSearch: () => mockedQuerySearch,
}));

describe('checkIsLoggedIn', () => {
  it('Given that remember me is true, it will check if the user is logged in and grab metadata, dispatching auth/checkIsLoggedIn before, and auth/checkIsLoggedInReived on success', () => {
    const g = checkIsLoggedIn();
    expect(g.next().value).toEqual(select(getRememberMe));
    expect(g.next(true).value).toEqual(call([Cookie, Cookie.get], 'isLoggedIn'));
    mockedQuerySearch = '';
    expect(g.next(false).value).toEqual(
      put(checkIsLoggedInStarted({ rememberMe: true, magicCredential: null, isLoggedInCookie: false }))
    );
    expect(g.next().value).toEqual(call([magic.user, magic.user.isLoggedIn]));
    expect(g.next(true).value).toEqual(
      put(
        checkIsLoggedInLoginReceived({ isLoggedIn: true, method: 'isLoggedIn' })
      )
    );
    expect(g.next().value).toEqual(call([magic.user, magic.user.getMetadata]));
    const payload = {
      email: 'testemail@a.com',
      issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
    };
    expect(g.next(payload).value).toEqual(
      put(checkIsLoggedInReceived(payload))
    );
    expect(g.next().value).toEqual(put(isLoggedIn()));

    expect(g.next().done).toBe(true);
  });

  it('Given that remember me is false, but the isLoggedInCookie is true it will check if the user is logged in and grab metadata, dispatching auth/checkIsLoggedIn before, and auth/checkIsLoggedInReived on success', () => {
    const g = checkIsLoggedIn();
    expect(g.next().value).toEqual(select(getRememberMe));
    expect(g.next(false).value).toEqual(call([Cookie, Cookie.get], 'isLoggedIn'));
    mockedQuerySearch = '';
    expect(g.next(true).value).toEqual(
      put(checkIsLoggedInStarted({ rememberMe: false, magicCredential: null, isLoggedInCookie: true }))
    );
    expect(g.next().value).toEqual(call([magic.user, magic.user.isLoggedIn]));
    expect(g.next(true).value).toEqual(
      put(
        checkIsLoggedInLoginReceived({ isLoggedIn: true, method: 'isLoggedIn' })
      )
    );
    expect(g.next().value).toEqual(call([magic.user, magic.user.getMetadata]));
    const payload = {
      email: 'testemail@a.com',
      issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
    };
    expect(g.next(payload).value).toEqual(
      put(checkIsLoggedInReceived(payload))
    );
    expect(g.next().value).toEqual(put(isLoggedIn()));

    // expect(g.next().done).toBe(true);
  });

  it('Uses magic credential if they are in the location query', () => {
    const g = checkIsLoggedIn();
    expect(g.next().value).toEqual(select(getRememberMe));
    expect(g.next(true).value).toEqual(call([Cookie, Cookie.get], 'isLoggedIn'));
    mockedQuerySearch = '?magic_credential=cred123';
    expect(g.next(true).value).toEqual(
      put(
        checkIsLoggedInStarted({ rememberMe: true, magicCredential: 'cred123', isLoggedInCookie: true })
      )
    );
    expect(g.next().value).toEqual(
      call([magic.auth, magic.auth.loginWithCredential])
    );
    expect(g.next(true).value).toEqual(
      put(
        checkIsLoggedInLoginReceived({
          isLoggedIn: true,
          method: 'loginWithCredential',
        })
      )
    );
    expect(g.next().value).toEqual(call([magic.user, magic.user.getMetadata]));
    const payload = {
      email: 'testemail@a.com',
      issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
    };
    expect(g.next(payload).value).toEqual(
      put(checkIsLoggedInReceived(payload))
    );
    expect(g.next().value).toEqual(put(isLoggedIn()));
    expect(g.next().done).toBe(true);
  });

  it('Given that remember and isLoggedInCookie are false, it will skip the check and dispatch auth/checkIsLoggedInReived on success', () => {
    const g = checkIsLoggedIn();
    expect(g.next().value).toEqual(select(getRememberMe));
    expect(g.next(false).value).toEqual(call([Cookie, Cookie.get], 'isLoggedIn'));
    mockedQuerySearch = '';
    expect(g.next(false).value).toEqual(
      put(checkIsLoggedInStarted({ rememberMe: false, magicCredential: null, isLoggedInCookie: false }))
    );
    expect(g.next().value).toEqual(
      put(
        checkIsLoggedInReceived({ issuer: null, note: 'Remember me disabled' })
      )
    );
    expect(g.next().done).toBe(true);
  });

  
});
