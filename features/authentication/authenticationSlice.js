import { createAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

let mainStoreKey;

const initialState = {
  issuer: null,
  rememberMe: false,
  signInLoading: false, 
  showLoader: true,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: { 
    signIn: (state, action) => {
      state.rememberMe = action.payload.rememberMe
      state.signInLoading = true
    },
    signInSuccess: (state, action) => {
      state.issuer = action.payload.issuer
      state.isLoggedIn = true
      state.signInLoading = false
    },
    signInFailure: (state, action) => {
      state.signInLoading = false
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
    },
    hideLoader: (state) => {
      state.showLoader = false
    }
  }
});

//reducer
export default (mainKey) => {
  mainStoreKey = mainKey
  const persistConfig = { 
    key: mainKey,
    storage,
    blacklist: ['signInLoading', 'showLoader']
  }
  return persistReducer(persistConfig, authenticationSlice.reducer);
}

//actions
export const {
  signIn,
  signInSuccess,
  checkIsLoggedInReceived,
  logOutSuccess,
  hideLoader,
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
export const getSignInLoading = (state) => state.signInLoading;
export const getIssuer = (state) => state.issuer;
export const getRememberMe = (state) => state.rememberMe
export const getShowLoader = (state) => state.showLoader