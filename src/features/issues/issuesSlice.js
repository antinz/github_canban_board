import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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
      if (error.message === "Request failed with status code 404") {
        return {
          issueState,
          error: "Invalid URL. The resource could not be found!",
        };
      } else {
        return { issueState, error: error.message };
      }
    }
  }
);

export const reorderIssues = createAction("issues/reorderIssues");

export const moveIssue = createAction("issues/moveIssue");

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
      .addCase(reorderIssues, (state, action) => {
        const { sourceIndex, destinationIndex, board } = action.payload;
        if (!state[board]) {
          console.error(`Board '${board}' does not exist in the state.`);
          return;
        }
        const newBoard = [...state[board]];
        const movedIssue = newBoard.splice(sourceIndex, 1)[0];
        const updatedBoard = [
          ...newBoard.slice(0, destinationIndex),
          movedIssue,
          ...newBoard.slice(destinationIndex),
        ];
        return {
          ...state,
          [board]: updatedBoard,
        };
      })
      .addCase(moveIssue, (state, action) => {
        const { sourceBoard, destinationBoard, sourceIndex, destinationIndex } =
          action.payload;
        const movedIssue = state[sourceBoard].splice(sourceIndex, 1)[0];
        state[destinationBoard].splice(destinationIndex, 0, movedIssue);
      });
  },
});

export const getIssuesStatus = (state) => state.issues.status;
export const getIssuesError = (state) => state.issues.error;
export const getOpenIssues = (state) => state.issues.openIssues;
export const getClosedIssues = (state) => state.issues.closedIssues;
export const getInProgressIssues = (state) => state.issues.inProgressIssues;

export default issuesSlice.reducer;
export const { updateInput, issuesAdded, updateError } = issuesSlice.actions;
