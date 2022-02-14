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

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  users: usersReducer,
  app: appReducer,
})
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const createStore = () => {
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


// thunks 
export const receiveUsernameThunk = (username) => (dispatch, getState) => {
  const loggedUserIssuer = getIssuer(getState().authentication)
  if(!loggedUserIssuer) throw new Error("You can't register the username without a logged user")
  dispatch(
    receiveUsername({
      username,
      loggedUserIssuer,
    })
  );
};




