import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../http/baseUrl.tsx";
import {
  startLoadingActivity,
  stopLoadingActivity,
} from "../activity/activitySlice.tsx";

export const getEmail: any = createAsyncThunk(
  "auth/getEmail",
  async ({ token }: any, { dispatch }) => {
    try {
      const response = await api.get(`users/getEmail/${token}`);
      if (response.status === 200) {
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

export interface GetEmail {
  loading: boolean;
}

const initialState: GetEmail = {
  loading: false,
};

export const getEmailSlice = createSlice({
  name: "getEmail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // agent registration
      .addCase(getEmail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEmail.fulfilled, (state, action) => {
        // state.data.agentUser=action.payload;
        state.loading = false;
      })
      .addCase(getEmail.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default getEmailSlice.reducer;
