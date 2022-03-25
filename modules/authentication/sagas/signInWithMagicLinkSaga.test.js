import { call, put } from 'redux-saga/effects';

import magic from '../util/magic';
import { signInSuccess } from '../slice/authenticationSlice';
import { isLoggedIn } from '../slice/authenticationSlice';
import signInWithMagicLinkSaga from './signInWithMagicLinkSaga';

//@todo: test the exception flow
it('signIn with the email, retrieve the metadata and dispaches auth/signInSucces and', () => {
  const email = 'testemail@a.com';
  const redirectURI = 'http://localhost:3000/';
  const g = signInWithMagicLinkSaga({ payload: { email, redirectURI } });
  expect(g.next().value).toEqual(
    call(
      [magic.auth, magic.auth.loginWithMagicLink],
      { email, redirectURI },
      true
    )
  );
  expect(g.next().value).toEqual(call([magic.user, magic.user.getMetadata]));
  const metadata = {
    email: 'testemail@a.com',
    issuer: 'did:ethr:0x4B60eF2694ffB466a7eDB66519dD2167448486B7',
  };
  expect(g.next(metadata).value).toEqual(put(signInSuccess(metadata)));
  expect(g.next().value).toEqual(put(isLoggedIn()));
  expect(g.next().done).toBe(true);
});
