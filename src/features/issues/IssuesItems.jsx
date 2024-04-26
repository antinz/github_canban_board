import React from "react";
import IssueItem from "./IssueItem";
import { List } from "antd";

function IssuesItems({ issues }) {
  return (
    <div>
      <List
        itemLayout="vertical"
        dataSource={issues}
        renderItem={(issue, index) => (
          <List.Item>
            <IssueItem issue={issue} index={index} />
          </List.Item>
        )}
        split={false}
      />
    </div>
  );
}

export default IssuesItems;
