import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../http/baseUrl.tsx";

export const updateRestrictions: any = createAsyncThunk(
  "admin/updateRestrictions",
  async (data: any) => {
    try {
      const response = await api.patch(
        `/auth/updateRestricted/${data?.userId}`,
        data
      );
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

export interface UpdateRestrictions {
  loading: boolean;
}

const initialState: UpdateRestrictions = {
  loading: false,
};

export const updateRestrictionsSlice = createSlice({
  name: "updateRestrictions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // agent registration
      .addCase(updateRestrictions.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateRestrictions.fulfilled, (state, action) => {
        // state.data.agentUser=action.payload;
        state.loading = false;
      })
      .addCase(updateRestrictions.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default updateRestrictionsSlice.reducer;
