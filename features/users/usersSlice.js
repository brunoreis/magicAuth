import { createSlice } from '@reduxjs/toolkit';

import { signInSuccess, checkIsLoggedInReceived } from 'features/authentication/authenticationSlice';

export const mainStoreKey = 'users';

const initialState = {
  users: [],
};

const findUserIndex = (state, issuer) => state.users.findIndex( u => u.issuer === issuer)
const findUser = (state, issuer) => state.users.find( u => u.issuer === issuer)
const hasUser = (state, issuer) => !!findUser(state, issuer)


export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: { 
    receiveUsername: (state, {payload: { issuer, username }}) => {
      const index = findUserIndex(state, issuer)
      state.users[index].username = username
    },
    addUser: (state, { payload: { issuer, email }}) => {
      if(!hasUser(state, issuer)) {
        state.users.push({ issuer, email })
      }
    }
  },
});

//reducer
export default usersSlice.reducer;

// actions
export const {
  receiveUsername,
  addUser
} = usersSlice.actions;

