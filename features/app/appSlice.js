import { createSlice } from '@reduxjs/toolkit';
import {
  redirectsCompleted,
} from '../navigation/navigationSlice';
';

const initialState = {
  loading: true
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(redirectsCompleted().type, (state) => {
        state.loading = false
      })
  },
});
//selectors
export const getIsLoading = (state) => state.loading
//reducer
export default appSlice.reducer;
