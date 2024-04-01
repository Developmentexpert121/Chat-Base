import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../http/baseUrl.tsx";

export const resetPassword: any = createAsyncThunk(
  "auth/resetPassword",
  async (data: any, { dispatch }) => {
    try {
      const response = await api.post(`/auth/reset-password/${data?.token}`, {
        password: data.password,
      });
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

export interface ResetPassword {
  loading: boolean;
}

const initialState: ResetPassword = {
  loading: false,
};

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // agent registration
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        // state.data.agentUser=action.payload;
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default resetPasswordSlice.reducer;
