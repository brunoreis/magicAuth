import { takeEvery, all } from 'redux-saga/effects';
import usersWatcher from './usersWatcher';
import receiveUsernameWithTheLoggedUserIssuer from './receiveUsernameWithTheLoggedUserIssuer'
import { receiveUsername, receiveUsernameStart } from '../usersSlice';
import go from '../../navigation/sagas/go';

it('usersWatcher', () => {
    const g = usersWatcher();
    expect(g.next().value).toEqual(all([
      takeEvery(receiveUsernameStart().type, receiveUsernameWithTheLoggedUserIssuer),
      takeEvery(receiveUsername().type, go, {payload: { path: "/"}}),
    ]));
    expect(g.next().done).toEqual(true);
});

