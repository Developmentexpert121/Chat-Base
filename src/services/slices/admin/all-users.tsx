import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../http/baseUrl.tsx";

export const fetchAllUsers: any = createAsyncThunk(
  "admin/allUsers",
  async () => {
    try {
      const response = await api.get("/users/getAllChatbots");
      if (response.status === 200) {
        console.log(response);
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return { error: "Bad Request" };
      }
    }
  }
);

export interface AllUsers {
  loading: boolean;
  data: [];
}

const initialState: AllUsers = {
  loading: false,
  data: [],
};

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // agent registration
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        // state.data.agentUser=action.payload;
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default allUsersSlice.reducer;
