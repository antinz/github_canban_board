import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  repoURLInput: "",
  openIssues: [],
  closedIssues: [],
  inProgressIssues: [],
  status: "idle",
  error: null,
};

const API_URL = "https://api.github.com/repos";

export const fetchRepoIssues = createAsyncThunk(
  "issues/fetchRepoIssues",
  async ({ issueState, limit }, { getState }) => {
    const { repoURLInput } = getState().issues;
    try {
      const res = await axios.get(
        `${API_URL}${
          repoURLInput.split(".com")[1]
        }/issues?state=${issueState}&per_page=${limit}`
      );
      console.log(res.data, issueState);
      return { issueState, data: res.data };
    } catch (error) {
      return { issueState, error: error.message };
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
    updateError(state, action) {
      state.error = action.payload;
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
        const { issueState, data, error } = action.payload;
        if (error) {
          state.error = error;
          return;
        }
        switch (issueState) {
          case "open":
            state.openIssues = data;
            break;
          case "closed":
            state.closedIssues = data;
            break;
          case "open&assignee=*":
            state.inProgressIssues = data;
            break;
          default:
            break;
        }
        state.repoURLInput = "";
      })
      .addCase(fetchRepoIssues.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getIssuesStatus = (state) => state.issues.status;
export const getIssuesError = (state) => state.issues.error;
export const getOpenIssues = (state) => state.issues.openIssues;
export const getClosedIssues = (state) => state.issues.closedIssues;
export const getInProgressIssues = (state) => state.issues.inProgressIssues;

export default issuesSlice.reducer;
export const { updateInput, issuesAdded, updateError, issueState, limit } =
  issuesSlice.actions;
