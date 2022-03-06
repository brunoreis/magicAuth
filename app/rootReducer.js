import { combineReducers } from '@reduxjs/toolkit';
import modules from './modules';

const reducers = {
  ...modules.reducers,
  lastActionForTestingPurposes: (state = null, action) =>  action, // should only be used for testing purposes
}
const rootReducer = combineReducers(reducers);

export default rootReducer;

