import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const startLoadingActivity: any = createAsyncThunk(
  "activity/startLoadingActivity",
  async () => {}
);

export const stopLoadingActivity: any = createAsyncThunk(
  "activity/stopLoadingActivity",
  async () => {}
);

export const activitySlice = createSlice({
  name: "activity",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // agent registration
      .addCase(startLoadingActivity.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(startLoadingActivity.fulfilled, (state, action) => {
        state.loading = true;
      })
      .addCase(startLoadingActivity.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(stopLoadingActivity.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(stopLoadingActivity.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(stopLoadingActivity.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default activitySlice.reducer;
