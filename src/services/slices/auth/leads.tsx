import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../http/baseUrl.tsx";

export const fetchAllLeads: any = createAsyncThunk(
  "admin/fetchAllLeads",
  async () => {
    try {
      const response = await api.get("/users/getAllChatbots");
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

export const fetchLeadsbyDateRange: any = createAsyncThunk(
  "admin/fetchLeadsbyDateRange",
  async (data: any) => {
    try {
      const response = await api.post("/users/leadsbyDateRange", data);
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

export interface FetchAllLeads {
  loading: boolean;
  data: [];
  leadsDateRange: [];
}

const initialState: FetchAllLeads = {
  loading: false,
  data: [],
  leadsDateRange: [],
};

export const fetchAllLeadsSlice = createSlice({
  name: "fetchAllLeads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // agent registration
      .addCase(fetchAllLeads.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllLeads.fulfilled, (state, action) => {
        // state.data.agentUser=action.payload;
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchAllLeads.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchLeadsbyDateRange.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchLeadsbyDateRange.fulfilled, (state, action) => {
        state.leadsDateRange = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchLeadsbyDateRange.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default fetchAllLeadsSlice.reducer;
