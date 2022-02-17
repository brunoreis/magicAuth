import { all, takeEvery } from 'redux-saga/effects';

import authenticationSagas from './authenticationSagas';

import preload from './preload';
import handleSignIn from './handleSignIn';
import handleLogOut from './handleLogOut';

import {
  signIn,
  logOut,
  logOutSuccess,
  preloadMagicLinkIFrame,
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


