import React from "react";
import { useSelector } from "react-redux";
import { Droppable } from "@hello-pangea/dnd";
import IssuesItems from "../issues/IssuesItems";
import "./boardStyles.css";
import { getIssuesStatus } from "../issues/issuesSlice";

function Board({ title, issuesSelector, droppableId }) {
  const issuesStatus = useSelector(getIssuesStatus);
  const issues = useSelector(issuesSelector);

  return (
    <>
      <h1>{title}</h1>
      <div
        className="board-container"
        style={
          issues.length > 2 ? { overflowY: "scroll" } : { overflowY: "hidden" }
        }
      >
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {issuesStatus === "succeeded" && issues && issues.length > 0 && (
                <IssuesItems issues={issues} />
              )}
              {issuesStatus === "failed" && (
                <div>Error loading issues. Please try again later.</div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
}

export default Board;
