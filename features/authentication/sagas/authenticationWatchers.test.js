import { all, takeEvery, call, fork, take } from 'redux-saga/effects';
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
import isSignedInWatcher from './isSignedInWatcher';
import checkIsLoggedIn from './checkIsLoggedIn';

it('watch and call sagas', () => {
  const g = authenticationSagas();
  expect(g.next().value).toEqual(
    all([take('persist/REHYDRATE'), take('app/routerReady')])
  );
  expect(g.next().value).toEqual(fork(isSignedInWatcher));
  expect(g.next().value).toEqual(call(checkIsLoggedIn));
  expect(g.next().value).toEqual(
    all([
      takeEvery(signIn().type, signInWithMagicLink),
      takeEvery(logOut().type, removeCookieAndLogoutFromMagicLink),
      takeEvery(preloadMagicLinkIFrame().type, preloadIFrame),
    ])
  );
  expect(g.next().done).toBe(true);
});
