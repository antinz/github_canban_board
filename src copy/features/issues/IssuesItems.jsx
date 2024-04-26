import React from "react";
import IssueItem from "./IssueItem";
import { List } from "antd";

function IssuesItems({ issues }) {
  return (
    <List
      itemLayout="vertical"
      dataSource={issues}
      renderItem={(issue) => <IssueItem issue={issue} />}
    />
  );
}

export default IssuesItems;
