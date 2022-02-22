import { takeEvery } from 'redux-saga/effects';

import {
  isLoggedIn
} from '../authenticationSlice';
import isSignedInWatcher from './isSignedInWatcher';
import registerIsLoggedInCookie from './registerIsLoggedInCookie';

it('call registerIsLoggedInCookie', ()=>{
    const g = isSignedInWatcher()
    expect(g.next().value).toEqual(
    takeEvery(isLoggedIn().type, registerIsLoggedInCookie)
    )
})
