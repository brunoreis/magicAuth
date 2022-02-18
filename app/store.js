import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
import loadingReducer from '../features/loading/loadingSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';
import usersReducer from '../features/users/usersSlice';

import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import Router from 'next/router';

const checkRouter = (cb) => {
  window ? setTimeout(() => (Router.router ? cb() : checkRouter()), 100) : cb();
};

export const createStore = () => {
  const rootReducer = combineReducers({
    authentication: authenticationReducer,
    users: usersReducer,
    loading: loadingReducer, 
  });
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['users', 'authentication'],
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
  persistStore(store);
  return store;
};

export const store = createStore();
checkRouter(() => store.dispatch({ type: 'app/routerReady' }));

