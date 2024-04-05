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

export const getScheduleCronUser: any = createAsyncThunk(
  "dashboard/grtScheduleCronUser",
  async () => {
    try {
      const response = await http.get(
        "/standard/cron_manager/schedulecronUser"
      );
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

export const stopCronSettings: any = createAsyncThunk(
  "dashboard/stopCronSettings",
  async (data, { dispatch }: any) => {
    console.log("status ", data);
    try {
      const response = await http.post("/standard/cron_manager/stopCron");
      if (response.status === 200) {
        dispatch(getScheduleCronUser());
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return { error: "Bad Request" };
      }
    }
  }
);

export const scheduleCronSettings: any = createAsyncThunk(
  "dashboard/scheduleCronSettings",
  async (data, { dispatch }: any) => {
    console.log("responsre 999999999999999999999999999999", data);
    try {
      const response = await http.post("/standard/cron_manager/schedulecron");
      if (response.status === 200) {
        console.log("responsre 999999999999999999999999999999", response);
        dispatch(getScheduleCronUser());
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
    cronUser: {},
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
      })

      .addCase(getScheduleCronUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getScheduleCronUser.fulfilled, (state, action) => {
        state.cronUser = action.payload.data;
        state.loading = false;
      })
      .addCase(getScheduleCronUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;
