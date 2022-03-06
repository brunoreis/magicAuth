import reducer from './authenticationSlice'
import authenticationPageWrappers from './authenticationPageWrappers';
import watcher from './sagas/authenticationWatchers';

const config = {
  reducer,
  key: 'authentication',
  wrappers: authenticationPageWrappers,
  watcher
}
export default config;