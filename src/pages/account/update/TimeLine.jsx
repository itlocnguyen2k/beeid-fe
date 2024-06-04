import { Card, CardBody, CardHeader, CardTitle, Col, Media, Row } from "reactstrap";
import Timeline from "../../../components/timeline/TimeLine";
import pdf from "../../../assets/images/icons/file-icons/pdf.png";
import Avatar from "../../../components/avatar/Avatar";
import { Fragment } from "react";

const TimeLine = () => {
  const data = [
    {
      title: "12 Invoices have been paid",
      content: "Add files to new design folder",
      meta: "12 min ago",
      customContent: (
        <Fragment>
          <Row>
            <Col lg="2">
              <Media className="d-flex align-items-center">
                <img className="me-1" src={pdf} alt="pdf" height="23" />
                <Media body>invoice.pdf</Media>
              </Media>
            </Col>
            <Col lg="2">
              <Media className="d-flex align-items-center">
                <img className="me-1" src={pdf} alt="pdf" height="23" />
                <Media body>invoice.pdf</Media>
              </Media>
            </Col>
          </Row>
        </Fragment>
      ),
    },
    {
      title: "Client Meeting",
      meta: "45 min ago",
      color: "warning",
      customContent: (
        <Media className="align-items-center">
          <Avatar img="" imgHeight={38} imgWidth={38} />
          <Media className="ml-50" body>
            <h6 className="mb-0">John Doe (Client)</h6>
            <span>CEO of Infibeam</span>
          </Media>
        </Media>
      ),
    },
    {
      title: "Create a new project for client",
      content: "Add files to new design folder",
      meta: "2 days ago",
      color: "info",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4" className="mb-2">
          User Timeline
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Timeline data={data} />
      </CardBody>
    </Card>
  );
};
export default TimeLine;
