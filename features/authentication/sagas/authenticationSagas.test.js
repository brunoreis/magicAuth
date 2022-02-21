import { all, takeEvery } from 'redux-saga/effects';

import authenticationSagas, { watchIsSignedIn } from './authenticationSagas';

import preload from './preload';
import handleSignIn from './handleSignIn';
import handleLogOut from './handleLogOut';
import registerIsLoggedInCookie from './registerIsLoggedInCookie';

import {
  signIn,
  logOut,
  logOutSuccess,
  preloadMagicLinkIFrame,
  isLoggedIn
} from '../authenticationSlice';

import go from '../../navigation/sagas/go';

it('watch and call sagas', () => {
  const g = authenticationSagas();
  expect(g.next().value).toEqual(
    all([
      takeEvery(signIn().type, handleSignIn),
      takeEvery(logOut().type, handleLogOut),
      takeEvery(logOutSuccess().type, go, '/signIn'),
      takeEvery(preloadMagicLinkIFrame().type, preload),
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




