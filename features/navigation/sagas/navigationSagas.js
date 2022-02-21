import { takeEvery, all } from 'redux-saga/effects';

import navigate from './navigate';

const issuer = (state) => state.authentication.issuer
export const isLoggedIn = (state) => !!issuer(state) 
export const removeQuery = (path) => path.split("?")[0]

const findUser = (state, issuer) => state.users.users.find((user) => user.issuer == issuer)
export const getUsername = (state) => isLoggedIn(state) ? findUser(state, issuer(state)).username : null;
export const startsWithNavSlash = (action) => action.type.startsWith('nav/');

export function* navigationWatcher() {
  yield all([takeEvery(startsWithNavSlash, navigate)]);
}


