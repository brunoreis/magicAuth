import reducer from './authenticationSlice'
import hoc from './hoc';
import watcher from './sagas/authenticationWatchers';

const config = {
  reducer,
  key: 'authentication',
  hoc,
  watcher
}
export default config;