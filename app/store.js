import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import Router from 'next/router';
import rootReducer from './rootReducer';

const checkRouter = (cb) => {
  window ? setTimeout(() => (Router.router ? cb() : checkRouter()), 100) : cb();
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['users'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(sagas);
export const persistor = persistStore(store);
sagaMiddleware.setContext({ persistor })
export default store;
checkRouter(() => store.dispatch({ type: 'app/routerReady' }));

