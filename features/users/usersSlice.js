import { createSlice, createAction } from '@reduxjs/toolkit';

import { signInSuccess, checkIsLoggedInReceived } from 'features/authentication/authenticationSlice';

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
    receiveUsername: (state, {payload: { loggedUserIssuer, username }}) => {
      const index = findUserIndex(state, loggedUserIssuer)
      state.users[index].username = username
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkIsLoggedInReceived().type, addNonExistentUser)
      .addCase(signInSuccess().type, addNonExistentUser)
  },
});

// actions
export const {
  receiveUsername,
} = usersSlice.actions;
export const receiveUsernameStart = createAction("users/receiveUsernameStart")

//reducer
export default usersSlice.reducer;
