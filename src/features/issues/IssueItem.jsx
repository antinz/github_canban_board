import React from "react";
import { formatDate } from "../../utils/helpers";
import { Card } from "antd";
import { Draggable } from "@hello-pangea/dnd";

function IssueItem({ issue, index }) {
  const {
    title,
    created_at: createdAt,
    user,
    number,
    comments,
    node_id: nodeId,
  } = issue;
  return (
    <Draggable
      draggableId={`${number}_${nodeId}`}
      index={index}
      key={`${nodeId}_${number}`}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className="issue-card" bordered={true}>
            <h4>{title}</h4>
            <span>#{number} </span>
            <span>{formatDate(createdAt)} </span>
            <div>
              <span>
                {user.type} | Comments: {comments}
              </span>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
}

export default IssueItem;
