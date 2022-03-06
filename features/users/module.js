import reducer from './usersSlice'
import usersPageWrappers from './usersPageWrappers';
import watcher from './sagas/usersWatcher';

const config = {
  reducer,
  key: 'users',
  wrappers: usersPageWrappers,
  watcher
}
export default config;