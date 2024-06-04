import "../../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import { Fragment } from "react";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import ProjectInfo from "./ProjectInfo";
import BackButton from "../../../components/link/BackButton";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";

const ProjectUpdate = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Chỉnh sửa dự án" breadCrumbParent="Dự án" breadCrumbActive="Chỉnh sửa dự án">
        <BackButton />
      </Breadcrumbs>
      <Row className="d-flex justify-content-center">
        <Col lg="10">
          <Card>
            <CardHeader>
              <CardTitle tag="h4" className="mb-2">
                Chỉnh sửa dự án
              </CardTitle>
            </CardHeader>
            <CardBody>
              <ProjectInfo />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default ProjectUpdate;
