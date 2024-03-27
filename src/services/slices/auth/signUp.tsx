import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../http/baseUrl.tsx";

export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async ({ data, phone }: any, { dispatch }) => {
    const newData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phone: phone,
    };
    try {
      console.log("dataaaa", newData);
      const response = await http.post("/auth/register", newData);
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
}

const initialState: SignUp = {
  loading: false,
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
        state.loading = false;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default signUpSlice.reducer;
