import { useSelector } from "react-redux";
import IssuesItems from "../issues/IssuesItems";
import { getIssuesStatus, selectAllIssues } from "../issues/issuesSlice";

function ToDo() {
  const issuesStatus = useSelector(getIssuesStatus);
  const issues = useSelector(selectAllIssues);

  return (
    <>
      ToDo
      {issuesStatus === "succeeded" && issues && issues.length > 0 && (
        <IssuesItems />
      )}
      {issuesStatus === "loading" && <div>Loading...</div>}
      {issuesStatus === "failed" && (
        <div>Error loading issues. Please try again later.</div>
      )}
    </>
  );
}

export default ToDo;
