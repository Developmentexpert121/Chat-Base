import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../http/baseUrl.tsx";

export const getDashboardData: any = createAsyncThunk(
  "dashboard/getDashboardData",
  async (data: any, { dispatch }) => {
    try {
      const response = await http.get("/users/usersCountByDay");
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return { error: "Bad Request" };
      }
    }
  }
);

export const addSettingsData: any = createAsyncThunk(
  "dashboard/addSettingsData",
  async (data: any) => {
    try {
      const response = await http.post("/standard/cron_manager", data);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return { error: "Bad Request" };
      }
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    data: [],
    cronData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // agent registration
      .addCase(getDashboardData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(addSettingsData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addSettingsData.fulfilled, (state, action) => {
        state.cronData = action.payload.data;
        state.loading = false;
      })
      .addCase(addSettingsData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;
