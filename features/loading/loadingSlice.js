import { createSlice } from '@reduxjs/toolkit';
import { signIn, signInSuccess, signInFailure } from '../authentication/authenticationSlice';
const initialState = {
  authentication: false,
  app: true,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    applicationLoaded(state) {
      state.app = false
    }
  },
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


export const { applicationLoaded } = loadingSlice.actions
export default loadingSlice.reducer;
