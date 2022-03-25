import { takeLatest, all } from 'redux-saga/effects';

import { navigate } from '../slice/slice';
import navigationWatchersSaga from './navigationWatchersSaga';
import navigateSaga from './navigateSaga';

describe('navigationWatchersSaga', () => {
  it('takes the latest navigate action and calls navigateSaga', () => {
    const g = navigationWatchersSaga();
    expect(g.next().value).toEqual(
      all([takeLatest(navigate().type, navigateSaga)])
    );
    expect(g.next().done).toEqual(true);
  });
});
