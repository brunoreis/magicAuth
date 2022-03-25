
import watcher from './sagas/navigationWatchersSaga';
import reducer, { mainStoreKey} from './slice/slice'

const config = {
  watcher,
  reducer,
  key: mainStoreKey
}
export default config;