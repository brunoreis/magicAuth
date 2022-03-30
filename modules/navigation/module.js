
import sagaWatcher from './sagas/navigationWatchersSaga';
import reducer, { mainStoreKey} from './slice/slice'

const config = {
  sagaWatcher,
  reducer,
  key: mainStoreKey
}
export default config;