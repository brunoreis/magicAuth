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
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'


import authenticationReducer, { getIssuer } from '../features/authentication/authenticationSlice';
import usersReducer, { receiveUsername } from '../features/users/usersSlice';
import appReducer from '../features/app/appSlice';

import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';



export const createStore = () => {
  const rootReducer = combineReducers({
    authentication: authenticationReducer,
    users: usersReducer,
    app: appReducer,
  })
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['users', 'authentication']
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)

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
  return store
}
export const store = createStore()
let persistor = persistStore(store)




