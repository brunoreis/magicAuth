import reducer from './slice/usersSlice'
import hoc from './hoc';
import watcher from './sagas/usersWatcherSaga';

const config = {
  reducer,
  key: 'users',
  hoc,
  watcher
}
export default config;