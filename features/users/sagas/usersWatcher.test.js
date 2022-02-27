import { takeEvery, all } from 'redux-saga/effects';
import usersWatcher from './usersWatcher';
import { receiveUsername } from '../usersSlice';
import go from '../../navigation/sagas/go';

it('usersWatcher', () => {
    const g = usersWatcher();
    expect(g.next().value).toEqual(all([
      takeEvery(receiveUsername().type, go, {payload: { path: "/"}}),
    ]));
    expect(g.next().done).toEqual(true);
});

