import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import createSagaMiddleware from 'redux-saga';
import { authentication } from './sagas/authentication';
import { navigation } from './sagas/navigation';
import { accessControl } from './sagas/accessControl';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(authentication);
sagaMiddleware.run(navigation);
sagaMiddleware.run(accessControl);
