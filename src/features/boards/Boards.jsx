import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import {
  getClosedIssues,
  getInProgressIssues,
  getOpenIssues,
  moveIssue,
  reorderIssues,
} from "../issues/issuesSlice";
import { useMediaQuery } from "react-responsive";
import Board from "./Board";
import { Col, Row } from "antd";

export default function Boards() {
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    console.log(result);
    if (!destination) return;
    const sourceBoard = source.droppableId;
    const destinationBoard = destination.droppableId;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    if (sourceBoard !== destinationBoard) {
      dispatch(
        moveIssue({
          sourceBoard,
          destinationBoard,
          sourceIndex,
          destinationIndex,
        })
      );
    } else {
      dispatch(
        reorderIssues({ sourceIndex, destinationIndex, board: sourceBoard })
      );
    }
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 850 });

  const colSpan = isSmallScreen ? 24 : 8;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Row gutter={[16, 16]}>
        <Col span={colSpan}>
          <Board
            title="ToDo"
            issuesSelector={getOpenIssues}
            droppableId="openIssues"
          />
        </Col>
        <Col span={colSpan}>
          <Board
            title="In Progress"
            issuesSelector={getInProgressIssues}
            droppableId="inProgressIssues"
          />
        </Col>
        <Col span={colSpan}>
          <Board
            title="Done"
            issuesSelector={getClosedIssues}
            droppableId="closedIssues"
          />
        </Col>
      </Row>
    </DragDropContext>
  );
}
