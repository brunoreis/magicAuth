import { all, takeEvery } from 'redux-saga/effects';

import go from 'features/navigation/sagas/go';

import {
  signIn,
  logOut,
  logOutSuccess,
  preloadMagicLinkIFrame,
} from '../authenticationSlice';
import authenticationSagas from './authenticationWatchers';
import preloadIFrame from './preloadIFrame';
import signInWithMagicLink from './signInWithMagicLink';
import removeCookieAndLogoutFromMagicLink from './removeCookieAndLogoutFromMagicLink';

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






