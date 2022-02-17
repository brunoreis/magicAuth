import { call, put, select } from 'redux-saga/effects';
import handleSignIn from './handleSignIn';
import { signInSuccess } from '../authenticationSlice';
import { requestNavigation } from '../../navigation/navigationSlice';
import magic from '../../shared/magic';
import { isLoggedIn } from '../authenticationSlice';
import { getUsername } from '../../../app/selectors';

describe('handleSignIn', () => {
  //@todo: test the exception flow
  describe('signIn with the email, dispaches auth/signInSucces and', () => {
    it('redirects to welcome if username exists', () => {
      // this is throwing a TypeError: Converting circular structure to JSON error if it fails (jest bug?)
      const email = 'testemail@a.com';
      const redirectURI = 'http://localhost:3000/';
      const g = handleSignIn({ payload: { email, redirectURI } });
      expect(g.next().value).toEqual(
        call(
          [magic.auth, magic.auth.loginWithMagicLink],
          { email, redirectURI },
          true
        )
      );
      expect(g.next().value).toEqual(
        call([magic.user, magic.user.getMetadata])
      );
      const metadata = {
        email: 'testemail@a.com',
        issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
      };
      expect(g.next(metadata).value).toEqual(put(signInSuccess(metadata)));
      expect(g.next().value).toEqual(put(isLoggedIn()));
      expect(g.next().value).toEqual(select(getUsername));
      expect(g.next('mockedUsername').value).toEqual(
        put(requestNavigation('/'))
      );
      expect(g.next().done).toBe(true);
    });

    it('redirects to /signUp if username does not exists', () => {
      const email = 'testemail@a.com';
      const redirectURI = 'http://localhost:3000/';
      const g = handleSignIn({ payload: { email, redirectURI } });

      expect(g.next().value).toEqual(
        call(
          [magic.auth, magic.auth.loginWithMagicLink],
          { email, redirectURI },
          true
        )
      );
      expect(g.next().value).toEqual(
        call([magic.user, magic.user.getMetadata])
      );
      const metadata = {
        email: 'testemail@a.com',
        issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
      };
      expect(g.next(metadata).value).toEqual(put(signInSuccess(metadata)));
      expect(g.next().value).toEqual(put(isLoggedIn()));
      expect(g.next().value).toEqual(select(getUsername));
      expect(g.next().value).toEqual(put(requestNavigation('/signUp')));
      expect(g.next().done).toBe(true);
    });
  });
});
