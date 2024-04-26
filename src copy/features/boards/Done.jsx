import { useSelector } from "react-redux";
import "./boardStyles.css";
import { getClosedIssues, getIssuesStatus } from "../issues/issuesSlice";
import IssuesItems from "../issues/IssuesItems";

function Done() {
  const issuesStatus = useSelector(getIssuesStatus);
  const closedIssues = useSelector(getClosedIssues);

  return (
    <>
      <h1>Done</h1>
      <div
        className="board-container"
        style={
          closedIssues.length > 3
            ? { overflowY: "scroll" }
            : { overflowY: "hidden" }
        }
      >
        {issuesStatus === "succeeded" &&
          closedIssues &&
          closedIssues.length > 0 && <IssuesItems issues={closedIssues} />}
        {issuesStatus === "failed" && (
          <div>Error loading issues. Please try again later.</div>
        )}
      </div>
    </>
  );
}

export default Done;
