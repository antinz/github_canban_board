import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  repoURLInput: "",
  issues: [],
  status: "idle",
  error: null,
};

const API_URL = "https://api.github.com/repos";

export const fetchRepoIssues = createAsyncThunk(
  "issues/fetchRepoIssues",
  async (_, { getState }) => {
    const { repoURLInput } = getState().issues;
    try {
      const res = await axios.get(
        `${API_URL}${repoURLInput.split(".com")[1]}/issues`
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    updateInput(state, action) {
      state.repoURLInput = action.payload;
    },
    issuesAdded: {
      reducer(state, action) {
        state.issues.push(action.payload);
      },
      prepare(created_at, title, state, id) {
        return {
          payload: {
            id,
            created_at,
            title,
            state,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRepoIssues.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRepoIssues.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.issues = action.payload;
        state.repoURLInput = "";
      })
      .addCase(fetchRepoIssues.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllIssues = (state) => state.issues.issues;
export const getIssuesStatus = (state) => state.issues.status;
export const getIssuesError = (state) => state.issues.error;

export default issuesSlice.reducer;
export const { updateInput, issuesAdded } = issuesSlice.actions;
