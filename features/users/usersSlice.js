import { createSlice } from '@reduxjs/toolkit';

import { signInSuccess, checkIsLoggedInReceived } from 'features/authentication/authenticationSlice';

export const mainStoreKey = 'users';

const initialState = {
  users: [],
};

const findUserIndex = (state, issuer) => state.users.findIndex( u => u.issuer === issuer)
const findUser = (state, issuer) => state.users.find( u => u.issuer === issuer)
const hasUser = (state, issuer) => !!findUser(state, issuer)
const addUser = (state, { issuer, email }) => state.users.push({ issuer, email })
const addNonExistentUser = (state, { payload }) => {
  const { issuer, email }  = payload
  if(!hasUser(state, issuer)) {
    addUser(state, { issuer, email })
  }
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: { 
    receiveUsername: (state, {payload: { issuer, username }}) => {
      const index = findUserIndex(state, issuer)
      state.users[index].username = username
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkIsLoggedInReceived().type, addNonExistentUser) // maybe we can also do these through the wrappers
      .addCase(signInSuccess().type, addNonExistentUser)
  },
});

//reducer
export default usersSlice.reducer;

// actions
export const {
  receiveUsername,
} = usersSlice.actions;

