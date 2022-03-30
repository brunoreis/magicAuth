import reducer from './slice/usersSlice'
import hoc from './hoc';
import sagaWatcher from './sagas/usersWatcherSaga';

const config = {
  reducer,
  key: 'users',
  hoc,
  sagaWatcher
}
export default config;