import { createSlice } from '@reduxjs/toolkit';
import { signIn, signInSuccess, signInFailure } from '../authentication/authenticationSlice';
const initialState = {
  authentication: false,
  app: true,
};
import {
  redirectsCompleted,
} from '../navigation/navigationSlice';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signIn().type, (state) => {
        state.authentication = true
      })
      .addCase(signInSuccess().type, (state) => {
        state.authentication = false
      })
      .addCase(signInFailure().type, (state) => {
        state.authentication = false
      })
      .addCase(redirectsCompleted().type, (state) => {
        state.app = false
      })
  },
});

export default loadingSlice.reducer;
