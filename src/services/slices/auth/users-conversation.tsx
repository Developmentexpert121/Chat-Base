import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../http/baseUrl.tsx";
import {
  startLoadingActivity,
  stopLoadingActivity,
} from "../activity/activitySlice.tsx";

export const getUsersConversation = createAsyncThunk(
  "usersConversation/getUsersConversation",
  async (data: any, { dispatch }) => {
    try {
      const response = await http.post("/users/getconversation", data);
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

export const usersConversationSlice = createSlice({
  name: "usersConversation",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // agent registration
      .addCase(getUsersConversation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUsersConversation.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(getUsersConversation.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default usersConversationSlice.reducer;
