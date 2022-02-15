import { createSlice } from '@reduxjs/toolkit';
import { signIn, signInSuccess, signInFailure } from '../authentication/authenticationSlice';
const initialState = {
  authentication: false,
};
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
  },
});

export default loadingSlice.reducer;
