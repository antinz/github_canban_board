import { useSelector } from "react-redux";
import IssuesItems from "../issues/IssuesItems";
import { getIssuesStatus, getOpenIssues } from "../issues/issuesSlice";
import "./boardStyles.css";
function ToDo() {
  const issuesStatus = useSelector(getIssuesStatus);
  const openIssues = useSelector(getOpenIssues);

  return (
    <>
      <h1>ToDo</h1>
      <div
        className="board-container"
        style={
          openIssues.length > 3
            ? { overflowY: "scroll" }
            : { overflowY: "hidden" }
        }
      >
        {issuesStatus === "succeeded" &&
          openIssues &&
          openIssues.length > 0 && <IssuesItems issues={openIssues} />}
        {issuesStatus === "failed" && (
          <div>Error loading issues. Please try again later.</div>
        )}
      </div>
    </>
  );
}

export default ToDo;
