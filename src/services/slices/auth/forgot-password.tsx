import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../http/baseUrl.tsx";

export const forgotPassword: any = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { dispatch }) => {
    try {
      const response = await api.post("/auth/forgot-password", data);
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

export interface ForgotPassword {
  loading: boolean;
}

const initialState: ForgotPassword = {
  loading: false,
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // agent registration
      .addCase(forgotPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        // state.data.agentUser=action.payload;
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default forgotPasswordSlice.reducer;
