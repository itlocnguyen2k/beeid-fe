import { Fragment } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import BackButton from "../../../components/link/BackButton";
import AccountInfo from "./AccountInfo";

const AccountCreate = (props) => {
  const { onSubmit, setAvatar, avatarPreview, setAvatarPreview } = props;
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Thêm mới nhân viên" breadCrumbParent="Nhân viên" breadCrumbActive="Thêm mới nhân viên">
        <BackButton />
      </Breadcrumbs>
      <Row className="d-flex justify-content-center">
        <Col lg="10">
          <Card>
            <CardHeader>
              <CardTitle tag="h4" className="mb-2">
                Thêm mới nhân viên
              </CardTitle>
            </CardHeader>
            <CardBody>
              <AccountInfo setAvatar={setAvatar} avatarPreview={avatarPreview} setAvatarPreview={setAvatarPreview} onSubmit={onSubmit} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default AccountCreate;
