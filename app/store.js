import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer, { getIssuer } from '../features/authentication/authenticationSlice';
import usersReducer, { receiveUsername } from '../features/users/usersSlice';
import appReducer from '../features/app/appSlice';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

export const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: {
      authentication: authenticationReducer,
      users: usersReducer,
      app: appReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });
  sagaMiddleware.run(sagas);
  return store
}
export const store = createStore()



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




