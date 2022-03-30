import reducer from './slice/authenticationSlice'
import hoc from './hoc';
import sagaWatcher from './sagas/authenticationWatchersSaga';

const config = {
  reducer,
  key: 'authentication',
  hoc,
  sagaWatcher
}
export default config;