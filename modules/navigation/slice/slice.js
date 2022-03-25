import { createSlice } from '@reduxjs/toolkit';

export const mainStoreKey = 'navigation';

const initialState = {
  navigatingTo: null
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: { 
    navigate: (state, action) => {
      state.navigatingTo = action.payload.path
    },
  }
});
export default navigationSlice.reducer

export const {
  navigate
} = navigationSlice.actions;
