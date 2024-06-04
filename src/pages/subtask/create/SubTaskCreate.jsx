import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import "../../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import { Fragment } from "react";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import SubTaskInfo from "./SubTaskInfo";
import BackButton from "../../../components/link/BackButton";

const SubTaskCreate = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Thêm mới công việc phụ" breadCrumbParent="Công việc phụ" breadCrumbActive="Thêm mới công việc phụ">
        <BackButton />
      </Breadcrumbs>
      <Row className="d-flex justify-content-center">
        <Col lg="10">
          <Card>
            <CardHeader>
              <CardTitle tag="h4" className="mb-2">
                Thêm mới công việc phụ
              </CardTitle>
            </CardHeader>
            <CardBody>
              <SubTaskInfo />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default SubTaskCreate;
