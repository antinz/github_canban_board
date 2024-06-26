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
        dispatch(fetchRepoIssues({ issueState: "open" })),
        dispatch(fetchRepoIssues({ issueState: "open&assignee=*" })),
        dispatch(fetchRepoIssues({ issueState: "closed" })),
      ]);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  }

  return (
    <Form className="form">
      <div className="input-container">
        <Form.Item className="input-item">
          <Input
            type="text"
            placeholder="Enter repo URL"
            value={repoURLInput}
            onChange={handleInput}
            className="input"
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={handleSubmit} className="btn">
            Load issues
          </Button>
        </Form.Item>
      </div>
      {error && (
        <div style={{ color: "red", marginTop: "-15px", textAlign: "start" }}>
          {error}
        </div>
      )}
    </Form>
  );
}

export default SearchIssues;
