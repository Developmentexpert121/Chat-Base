import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../http/baseUrl.tsx";

export const userLogin: any = createAsyncThunk(
  "auth/userLogin",
  async (data, { dispatch }) => {
    try {
      const response = await api.post("/auth", data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return { error: "Bad Request" };
      }
    }
  }
);

export interface Login {
  loading: boolean;
}

const initialState: Login = {
  loading: false,
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
        state.loading = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default loginSlice.reducer;
