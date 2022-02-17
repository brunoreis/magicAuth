import { all, takeEvery } from 'redux-saga/effects';

import authenticationSagas, { watchIsLoggedIn } from './authenticationSagas';

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

import { go } from '../../navigation/navigationSagas';

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

describe('watchIsLoggedIn', () => {
  it('call registerIsLoggedInCookie', ()=>{
    const g = watchIsLoggedIn()
    expect(g.next().value).toEqual(
      takeEvery(isLoggedIn().type, registerIsLoggedInCookie)
    )
  })
})




