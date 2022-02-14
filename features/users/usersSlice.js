import { createSlice } from '@reduxjs/toolkit';
import { signInSuccess, checkIsLoggedInReceived } from '../authentication/authenticationSlice';

const initialState = {
  users: [],// todo: normalize ? 
};

const findUserIndex = (state, issuer) => state.users.findIndex( u => u.issuer === issuer)
const findUser = (state, issuer) => state.users.find( u => u.issuer === issuer)
const hasUser = (state, issuer) => !!findUser(state, issuer)
const addUser = (state, { issuer, email }) => state.users.push({ issuer, email })


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

// actions
export const {
  receiveUsername,
} = usersSlice.actions;

//reducer
export default usersSlice.reducer;
