import { takeEvery, all } from 'redux-saga/effects';
import usersWatcherSaga from './usersWatcherSaga';
import { receiveUsername } from '../slice/usersSlice';
import go from '../../navigation/sagas/navigateSaga';

describe('usersWatcherSaga', () => {
  it('usersWatcher', () => {
      const g = usersWatcherSaga();
      expect(g.next().value).toEqual(all([
        takeEvery(receiveUsername().type, go, {payload: { path: "/"}}),
      ]));
      expect(g.next().done).toEqual(true);
  });
})

