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
import Router from 'next/router';

import sagas from './sagas';
import rootReducer from './rootReducer';

const initialState = null;
export const setInitialState = (state) => (initialState = state);

const checkRouter = (callback, times = 1) => {
  if(times > 30) {
    throw new Error('Timeout: router does not seem to be present.')
  }
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
    setTimeout(
      () => {
        const nextRouterIsReady = !!Router.router;
        nextRouterIsReady ? callback() : checkRouter(callback, times+1)
      },
      100
    );
  } else {
    callback();
  }
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['users'],
};



export const buildStore = (preloadedState = {}) => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const sagaMiddleware = createSagaMiddleware({});
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(sagaMiddleware)
  });
  sagaMiddleware.run(sagas);
  const persistor = persistStore(store);
  sagaMiddleware.setContext({ persistor });
  checkRouter(() => store.dispatch({ type: 'app/routerReady' }));
  return store;
};
