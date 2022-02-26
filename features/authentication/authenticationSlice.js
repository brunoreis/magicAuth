import { createAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const mainStoreKey = 'authentication';

const initialState = {
  issuer: null,
  rememberMe: false,
  signInLoading: false, 
  checkIsLoggedInLoading: false,
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
    checkIsLoggedInStarted: (state) => {
      state.checkIsLoggedInLoading = true
    },
    checkIsLoggedInReceived: (state, action) => {
      const issuer = action.payload.issuer
      state.checkIsLoggedInLoading = false
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
  
  }
});

//reducer  
const persistConfig = { 
  key: mainStoreKey,
  storage,
  blacklist: ['signInLoading', 'showLoader']
}
export default persistReducer(persistConfig, authenticationSlice.reducer);


//actions
export const {
  signIn,
  signInSuccess,
  checkIsLoggedInStarted,
  checkIsLoggedInReceived,
  logOutSuccess,
  hideLoader,
} = authenticationSlice.actions;
export const signInFailure = createAction('authentication/signInFailure')
export const logOut = createAction('authentication/logOut')
export const preloadMagicLinkIFrame = createAction('authentication/preloadMagicLinkIFrame')
export const preloadMagicLinkIFrameStarted = createAction('authentication/preloadMagicLinkIFrameStarted')
export const isLoggedIn = createAction('authentication/isLoggedIn')
