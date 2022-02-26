import { put, select, call } from 'redux-saga/effects';
import { receiveUsername } from '../usersSlice';
import { getUsernameIsAvailable } from 'app/selectors';
import getIssuer from 'features/authentication/selectors/global/getIssuer';

export default function* receiveUsernameWithTheLoggedUserIssuer({ payload }) {
  const username = payload;
  const loggedUserIssuer = yield select(getIssuer);
  const selector = yield call(getUsernameIsAvailable, username);
  const usernameAvailable = yield select(selector);
  if (usernameAvailable) {
    if (!loggedUserIssuer) {
      throw new Error("You can't register the username without a logged user");
    }
    yield put(
      receiveUsername({
        username,
        loggedUserIssuer,
      })
    );
  }
}
