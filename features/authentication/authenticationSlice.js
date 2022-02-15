import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  issuer: null,
  rememberMe: false,
  loading: false
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: { 
    signIn: (state, action) => {
      state.rememberMe = action.payload.rememberMe
      state.loading = true
    },
    signInSuccess: (state, action) => {
      state.issuer = action.payload.issuer
      state.isLoggedIn = true
      state.loading = false
    },
    checkIsLoggedInReceived: (state, action) => {
      const issuer = action.payload.issuer
      if(issuer) {
        state.issuer = issuer
      } else {
        state.issuer = null
      }
    },
  },
});

//actions
export const {
  signIn,
  signInSuccess,
  checkIsLoggedInReceived,
} = authenticationSlice.actions;
export const signInFailure = createAction('authentication/signInFailure')
export const logOut = createAction('authentication/logOut')
export const logOutSuccess = createAction('authentication/logOutSuccess')
export const checkIsLoggedInStarted = createAction('authentication/checkIsLoggedInStarted')
export const checkIsLoggedInLoginReceived = createAction('authentication/checkIsLoggedInLoginReceived')
//selectors
export const isLoggedIn = (state) => !!state.issuer;
export const getIssuer = (state) => state.issuer;
export const getRememberMe = (state) => state.rememberMe
//reducer
export default authenticationSlice.reducer;
