import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authentication: false,
  app: true,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    applicationLoaded(state) {
      state.app = false
    }
  },
});


export const { applicationLoaded } = loadingSlice.actions
export default loadingSlice.reducer;
