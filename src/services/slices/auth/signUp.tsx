import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../http/baseUrl.tsx";

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
    console.log("toke", token);
    try {
      console.log("dataaaa", newData);
      const response = await http.post(`/users/updateUser/${token}`, newData);
      console.log(response);
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
