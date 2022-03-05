import { combineReducers } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice';
import usersReducer from '../features/users/usersSlice';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  users: usersReducer,
  lastActionForTestingPurposes: (state = null, action) =>  action, // should only be used for testing purposes
});

export default rootReducer;

