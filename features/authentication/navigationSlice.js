import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
// this is too much code just for an action dispatcher. We need to refactor it later. 
export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    nav: (path) => {},
  },
});

export const {
  nav,
} = navigationSlice.actions;
export default navigationSlice.reducer;
