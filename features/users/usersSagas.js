import { put, select } from 'redux-saga/effects';
export const getIssuer = state => state.authentication.issuer;
import { receiveUsername } from './usersSlice';

export function* handleReceiveUsername({ payload }) {
    const username = payload
    const loggedUserIssuer = yield select(getIssuer)
    if(!loggedUserIssuer) throw new Error("You can't register the username without a logged user")
    yield put(receiveUsername({
        username,
        loggedUserIssuer,
      })
    );
};
   