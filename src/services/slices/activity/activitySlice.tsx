import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const startLoadingActivity: any = createAsyncThunk(
  "activity/startLoadingActivity",
  async () => { }
);

export const stopLoadingActivity: any = createAsyncThunk(
  "activity/stopLoadingActivity",
  async () => { }
);

export const collapsedSideBar: any = createAsyncThunk(
  "activity/collapsedSideBar",
  async (data) => {
    return data;
  }
);

export const activitySlice = createSlice({
  name: "activity",
  initialState: {
    loading: false,
    collapsedSidebar: false
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
      })

      .addCase(collapsedSideBar.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(collapsedSideBar.fulfilled, (state, action) => {
        state.loading = false;
        state.collapsedSidebar = !state.collapsedSidebar;
      })
      .addCase(collapsedSideBar.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default activitySlice.reducer;
