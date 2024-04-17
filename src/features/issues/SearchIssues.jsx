import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInput, fetchRepoIssues, getIssuesError } from "./issuesSlice";
import { Button } from "antd";

function SearchIssues() {
  const dispatch = useDispatch();
  const error = useSelector(getIssuesError);
  const { repoURLInput } = useSelector((state) => state.issues);
  const [localError, setLocalError] = useState("");

  function handleInput(e) {
    dispatch(updateInput(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!repoURLInput.trim()) {
      setLocalError("Please enter a repoURL");
      return;
    }
    const urlRegex = /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w-]+$/;
    if (!urlRegex.test(repoURLInput)) {
      setLocalError("Please type a valid repo URL");
      return;
    }
    setLocalError("");
    try {
      await dispatch(fetchRepoIssues());
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter repo URL"
          value={repoURLInput}
          onChange={handleInput}
        />
        <button type="submit">Load issues</button>
        {(error || localError) && (
          <div style={{ color: "red" }}>{error || localError}</div>
        )}
      </form>
    </div>
  );
}

export default SearchIssues;
