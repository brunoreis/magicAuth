import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: { // todo: we should not need reducers just to create action creators. (check createAction)
    signIn: () => {},
    signInSuccess: () => {},
    signInFailure: () => {},
    logOut: () => {},
    logOutSuccess: () => {},
    checkIsLoggedInStarted: () => {},
    redirectsStarted: () => {},
    redirectsCompleted: () => {},
    checkIsLoggedInReceived: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     });
  // },
});

export const {
  signIn,
  signInSuccess,
  logOut,
  logOutSuccess,
  receiveSignInInfo,
  checkIsLoggedIn,
  checkIsLoggedInStarted,
  checkIsLoggedInReceived,
  redirectsStarted,
  redirectsCompleted
} = authenticationSlice.actions;
export const isLoggedIn = (state) => state.isLoggedIn;
export default authenticationSlice.reducer;
