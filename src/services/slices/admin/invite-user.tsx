import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../http/baseUrl.tsx";

export const inviteUser: any = createAsyncThunk(
  "admin/inviteUser",
  async (data) => {
    try {
      const response = await api.post("/users/invite", data);
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

export interface InviteUser {
  loading: boolean;
}

const initialState: InviteUser = {
  loading: false,
};

export const inviteUserSlice = createSlice({
  name: "inviteUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // agent registration
      .addCase(inviteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(inviteUser.fulfilled, (state, action) => {
        // state.data.agentUser=action.payload;

        state.loading = false;
      })
      .addCase(inviteUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default inviteUserSlice.reducer;
