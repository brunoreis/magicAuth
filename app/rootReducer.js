import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from '../features/loading/loadingSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';
import usersReducer from '../features/users/usersSlice';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  users: usersReducer,
  loading: loadingReducer,
});

export default rootReducer;

