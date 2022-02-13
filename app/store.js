import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice';
import createSagaMiddleware from 'redux-saga';
import { authentication } from './sagas/authentication';
import { navigation } from './sagas/navigation';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(authentication);
sagaMiddleware.run(navigation);
