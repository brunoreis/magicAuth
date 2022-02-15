import { all, put, select, takeEvery, call } from 'redux-saga/effects';
export const getIssuer = state => state.authentication.issuer;
import { receiveUsername, receiveUsernameStart } from '../../features/users/usersSlice';
import { go } from '../../features/navigation/navigationSagas';
import { getUsernameIsAvailable } from '../../app/selectors';

export default function* userSagas() {
  yield all([
    takeEvery(receiveUsernameStart().type, callReceiveUsernameWithTheLoggedUserIssuer),
    takeEvery(receiveUsername().type, go, "/"),
  ])
}

export function* callReceiveUsernameWithTheLoggedUserIssuer({ payload }) {
    const username = payload
    const loggedUserIssuer = yield select(getIssuer)
    const selector = yield call(getUsernameIsAvailable,username)
    const usernameAvailable = yield select(selector)
    if(usernameAvailable) {
      if(!loggedUserIssuer) throw new Error("You can't register the username without a logged user")
      yield put(receiveUsername({
          username,
          loggedUserIssuer,
        })
      );
    }
};
   