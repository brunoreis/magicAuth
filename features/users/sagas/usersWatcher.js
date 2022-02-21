import { all, takeEvery } from 'redux-saga/effects';
import { receiveUsername, receiveUsernameStart } from '../usersSlice';
import receiveUsernameWithTheLoggedUserIssuer from './receiveUsernameWithTheLoggedUserIssuer';
import go from '../../navigation/sagas/go';

export default function* usersWatcher() {
  yield all([
    takeEvery(receiveUsernameStart().type, receiveUsernameWithTheLoggedUserIssuer),
    takeEvery(receiveUsername().type, go, "/"),
  ])
}

