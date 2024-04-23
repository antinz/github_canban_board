import ToDo from "./ToDo";
import InProgress from "./InProgress";
import Done from "./Done";
import { Col, Row } from "antd";

export default function Boards() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <ToDo />
      </Col>
      <Col span={8}>
        <InProgress />
      </Col>
      <Col span={8}>
        <Done />
      </Col>
    </Row>
  );
}
