import React from "react";
import { formatDate } from "../../utils/helpers";
import { Card } from "antd";

function IssueItem({ issue }) {
  const { title, created_at: createdAt, user, number, comments, id } = issue;
  return (
    <Card className="issue-card" bordered={true} key={id}>
      <h4>{title}</h4>
      <span>#{number} </span>
      <span>{formatDate(createdAt)} </span>
      <div>
        <span>
          {user.type} | Comments: {comments}
        </span>
      </div>
    </Card>
  );
}

export default IssueItem;
