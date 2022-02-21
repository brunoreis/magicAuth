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
    logOutSuccess: (state) => {
      state.issuer = null
      state.rememberMe = false
    }
  },
});

//reducer
export default authenticationSlice.reducer;

//actions
export const {
  signIn,
  signInSuccess,
  checkIsLoggedInReceived,
  logOutSuccess
} = authenticationSlice.actions;
export const signInFailure = createAction('authentication/signInFailure')
export const logOut = createAction('authentication/logOut')
export const checkIsLoggedInStarted = createAction('authentication/checkIsLoggedInStarted')
export const checkIsLoggedInLoginReceived = createAction('authentication/checkIsLoggedInLoginReceived')
export const preloadMagicLinkIFrame = createAction('authentication/preloadMagicLinkIFrame')
export const preloadMagicLinkIFrameStarted = createAction('authentication/preloadMagicLinkIFrameStarted')
export const isLoggedIn = createAction('authentication/isLoggedIn')

//selectors
export const getIsLoggedIn = (state) => !!state.issuer;
export const getIssuer = (state) => state.issuer;
export const getRememberMe = (state) => state.rememberMe


