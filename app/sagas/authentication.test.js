import { fork, all, takeEvery, call, put } from 'redux-saga/effects';
import { navigateTo } from './navigation'
import { authentication, logOut, signIn, magicInitialization } from './authentication';
import magic from './shared/magic';

describe('authentication', () => {

  it('fork the magic initialization and redirects actions into sagas', () => {
    const g = authentication();
    expect(g.next().value).toEqual(fork(magicInitialization))
    expect(g.next().value).toEqual(all([
      takeEvery("auth/signIn", signIn),
      takeEvery("auth/signInSuccess", navigateTo, '/'),
      takeEvery("auth/logOutStart", logOut),
      takeEvery("auth/logOutEnd", navigateTo, '/signIn')
    ]));
  })

  // --------

  describe('magicInitialization', () => {
    it('preloads magic', () => {
      const g = magicInitialization();
      expect(g.next().value).toEqual(call([magic,magic.preload]));
      expect(g.next().done).toBe(true);
    })
  })

  describe('signIn', () => {
    it('signIn with the email and dispaches auth/signInSucces', () => {
      // this is throwing a TypeError: Converting circular structure to JSON error if it fails (jest bug?)
      const email = 'testemail@a.com';
      const g = signIn({ payload: { email }});
      expect(g.next().value).toEqual(call([magic.auth, magic.auth.loginWithMagicLink], { email }, true));
      expect(g.next().value).toEqual(put({type: "auth/signInSuccess"}));
      expect(g.next().done).toBe(true);
    });
  });

  describe('logOut', () => {
    it('it will log out and dispatches auth/logOutEnd', () => {
      const g = logOut();
      expect(g.next().value).toEqual(call([magic.user, magic.user.logout]));
      expect(g.next().value).toEqual(put({ type: 'auth/logOutEnd' }));
    });
  });
});
