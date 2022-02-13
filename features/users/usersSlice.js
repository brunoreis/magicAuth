import { createSlice } from '@reduxjs/toolkit';
import { signInSuccess, checkIsLoggedInReceived } from '../authentication/authenticationSlice';

const initialState = {
  users: [],// todo: normalize ? 
};

const hasUser = (state, issuer) => state.users.find( u => u.issuer === issuer)
const addUser = (state, { issuer, email }) => state.users.push({ issuer, email })

export const authenticationSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(checkIsLoggedInReceived().type, (state, { payload }) => {
        const { issuer, email }  = payload
        if(!hasUser(state, issuer)) {
          addUser(state, { issuer, email })
        }
      })
      .addCase(signInSuccess().type, (state, { payload }) => {
        const { issuer, email }  = payload
        if(!hasUser(state, issuer)) {
          addUser(state, { issuer, email })
        }
      })
  },
});

export default authenticationSlice.reducer;
