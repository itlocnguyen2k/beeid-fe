import { Card, CardBody, CardHeader, CardTitle, Col } from "reactstrap";

const BoardConnect = (props) => {
  const { title, component } = props;
  return (
    <Col lg="3">
      <Card className="board-connect">
        <CardHeader>
          <CardTitle tag="h4" className="mb-0">
            {title}
          </CardTitle>
        </CardHeader>
        <CardBody className="board-connect-body">{component}</CardBody>
      </Card>
    </Col>
  );
};
export default BoardConnect;
