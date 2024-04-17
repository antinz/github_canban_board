import React from "react";
import { formatDate } from "../../utils/helpers";

function IssueItem({ issue }) {
  const { title, id, created_at: createdAt, user, number, comments } = issue;
  return (
    <li key={id}>
      <h4>{title}</h4>
      <span>#{number} </span>
      <span>{formatDate(createdAt)} </span>
      <span>
        {user.type} | Comments: {comments}
      </span>
    </li>
  );
}
export default IssueItem;
