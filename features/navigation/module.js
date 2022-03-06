
import watcher from './sagas/navigationWatchers';
import reducer, { mainStoreKey} from './navigationSlice'

const config = {
  watcher,
  reducer,
  key: mainStoreKey
}
export default config;