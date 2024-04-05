import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../http/baseUrl.tsx";
import {
  startLoadingActivity,
  stopLoadingActivity,
} from "../activity/activitySlice.tsx";

export const userLogin: any = createAsyncThunk(
  "auth/userLogin",
  async (data, { dispatch }) => {
    try {
      const response: any = await api.post("/auth", data);
      if (response.status === 200) {
        if (response.data.success === true) {
          localStorage?.setItem("token", response.data.token);
        }
        dispatch(startLoadingActivity());
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return { error: "Bad Request" };
      }
    } finally {
      dispatch(stopLoadingActivity());
    }
  }
);

export interface Login {
  loading: boolean;
  isAdmin: boolean;
}

const initialState: Login = {
  loading: false,
  isAdmin: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // agent registration
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        // state.data.agentUser=action.payload;
        state.isAdmin = action.payload.isAdmin;
        state.loading = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default loginSlice.reducer;
