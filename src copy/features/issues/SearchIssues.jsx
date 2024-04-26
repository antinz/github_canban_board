import { useDispatch, useSelector } from "react-redux";
import {
  updateInput,
  fetchRepoIssues,
  getIssuesError,
  updateError,
} from "./issuesSlice";
import { Button, Form, Input } from "antd";

function SearchIssues() {
  const dispatch = useDispatch();
  const error = useSelector(getIssuesError);
  const { repoURLInput } = useSelector((state) => state.issues);

  function handleInput(e) {
    dispatch(updateInput(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!repoURLInput.trim()) {
      dispatch(updateError("Please enter a repo URL"));
      return;
    }
    const urlRegex = /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w-]+$/;
    if (!urlRegex.test(repoURLInput)) {
      dispatch(
        updateError(
          "Please type a valid repo URL e.g. https://github.com/facebook/react"
        )
      );
      return;
    }
    dispatch(updateError(null));
    try {
      await Promise.all([
        dispatch(fetchRepoIssues({ issueState: "open", limit: 5 })),
        dispatch(fetchRepoIssues({ issueState: "open&assignee=*", limit: 1 })),
        dispatch(fetchRepoIssues({ issueState: "closed", limit: 3 })),
      ]);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  }

  return (
    <Form className="form">
      <Form.Item>
        <Input
          type="text"
          placeholder="Enter repo URL"
          value={repoURLInput}
          onChange={handleInput}
          className="input"
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Load issues
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SearchIssues;
