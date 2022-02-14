import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer, {
  getIssuer,
} from '../features/authentication/authenticationSlice';
import usersReducer, { receiveUsername } from '../features/users/usersSlice';
import appReducer from '../features/app/appSlice';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const findUser = (store, issuer) => store.users.users.find((user)=> user.issuer === issuer)

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    users: usersReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(sagas);



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

export const getUsername = (state) => {
  const loggedUserIssuer = getIssuer(state.authentication)
  const user = findUser(state, loggedUserIssuer)
  return user.username
}
