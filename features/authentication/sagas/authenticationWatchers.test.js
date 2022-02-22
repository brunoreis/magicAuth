import { all, takeEvery } from 'redux-saga/effects';

import go from 'features/navigation/sagas/go';

import {
  signIn,
  logOut,
  logOutSuccess,
  preloadMagicLinkIFrame,
  isLoggedIn
} from '../authenticationSlice';
import authenticationSagas, { watchIsSignedIn } from './authenticationWatchers';
import preloadIFrame from './preloadIFrame';
import signInWithMagicLink from './signInWithMagicLink';
import removeCookieAndLogoutFromMagicLink from './removeCookieAndLogoutFromMagicLink';
import registerIsLoggedInCookie from './registerIsLoggedInCookie';

it('watch and call sagas', () => {
  const g = authenticationSagas();
  expect(g.next().value).toEqual(
    all([
      takeEvery(signIn().type, signInWithMagicLink),
      takeEvery(logOut().type, removeCookieAndLogoutFromMagicLink),
      takeEvery(logOutSuccess().type, go, '/signIn'),
      takeEvery(preloadMagicLinkIFrame().type, preloadIFrame),
    ])
  );
  expect(g.next().done).toBe(true);
});

describe('watchIsSignedIn', () => {
  it('call registerIsLoggedInCookie', ()=>{
    const g = watchIsSignedIn()
    expect(g.next().value).toEqual(
      takeEvery(isLoggedIn().type, registerIsLoggedInCookie)
    )
  })
})




