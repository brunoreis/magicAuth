import reducer from './slice/authenticationSlice'
import hoc from './hoc';
import watcher from './sagas/authenticationWatchersSaga';

const config = {
  reducer,
  key: 'authentication',
  hoc,
  watcher
}
export default config;