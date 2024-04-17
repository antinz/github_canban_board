import React from "react";
import { useSelector } from "react-redux";
import { selectAllIssues } from "./issuesSlice";
import IssueItem from "./IssueItem";

function IssuesItems() {
  const issues = useSelector(selectAllIssues);

  return (
    <ul>
      {issues.map((issue) => (
        <IssueItem key={issue.id} issue={issue} />
      ))}
    </ul>
  );
}

export default IssuesItems;
