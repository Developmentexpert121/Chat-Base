import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../http/baseUrl.tsx";
import {
  startLoadingActivity,
  stopLoadingActivity,
} from "../activity/activitySlice.tsx";

export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async ({ data, phone, token, email }: any, { dispatch }) => {
    const newData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: email,
      mobile: phone,
      password: data.password,
    };
    try {
      const response = await http.post(`/users/updateUser/${token}`, newData);
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

export interface SignUp {
  loading: boolean;
  data: [];
}

const initialState: SignUp = {
  loading: false,
  data: [],
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // agent registration
      .addCase(userSignUp.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        // state.data.agentUser=action.payload;
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default signUpSlice.reducer;
