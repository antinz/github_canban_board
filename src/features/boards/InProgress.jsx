import { useSelector } from "react-redux";
import "./boardStyles.css";
import { getInProgressIssues, getIssuesStatus } from "../issues/issuesSlice";
import IssuesItems from "../issues/IssuesItems";
function InProgress() {
  const issuesStatus = useSelector(getIssuesStatus);
  const inProgressIssues = useSelector(getInProgressIssues);

  return (
    <>
      <h1>In Progress</h1>
      <div
        className="board-container"
        style={
          inProgressIssues.length > 3
            ? { overflowY: "scroll" }
            : { overflowY: "hidden" }
        }
      >
        {issuesStatus === "succeeded" &&
          inProgressIssues &&
          inProgressIssues.length > 0 && (
            <IssuesItems issues={inProgressIssues} />
          )}
        {issuesStatus === "failed" && (
          <div>Error loading issues. Please try again later.</div>
        )}
      </div>
    </>
  );
}

export default InProgress;
