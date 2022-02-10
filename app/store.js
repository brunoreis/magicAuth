import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import createSagaMiddleware from 'redux-saga';
import { authSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(authSaga);
