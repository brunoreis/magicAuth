import { takeLatest, all } from 'redux-saga/effects';

import { navigate } from '../navigationSlice';
import navigationWatchers from './navigationWatchers';
import go from './go';

it('navigationWatchers', () => {
    const g = navigationWatchers();
    expect(g.next().value).toEqual(all([
      takeLatest(navigate().type, go),
    ]));
    expect(g.next().done).toEqual(true);
});
