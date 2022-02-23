import { combineReducers } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice';
import usersReducer from '../features/users/usersSlice';

const rootReducer = combineReducers({
  authentication: authenticationReducer('authentication'),
  users: usersReducer,
});

export default rootReducer;

