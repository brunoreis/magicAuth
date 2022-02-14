import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  issuer: null,
  rememberMe: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: { 
    signInSuccess: (state, action) => {
      state.issuer = action.payload.issuer
      state.isLoggedIn = true
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
  signInSuccess,
  checkIsLoggedInReceived,
} = authenticationSlice.actions;
export const signIn = createAction('authentication/signIn')
export const signInFailure = createAction('authentication/signInFailure')
export const logOut = createAction('authentication/logOut')
export const logOutSuccess = createAction('authentication/logOutSuccess')
export const checkIsLoggedInStarted = createAction('authentication/checkIsLoggedInStarted')
export const checkIsLoggedInLoginReceived = createAction('authentication/checkIsLoggedInLoginReceived')
//selectors
export const isLoggedIn = (state) => !!state.issuer;
export const getIssuer = (state) => state.issuer;
//reducer
export default authenticationSlice.reducer;
