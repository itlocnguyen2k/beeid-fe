import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { Badge, Card, CardBody, CardText, Col, Row } from "reactstrap";
import Avatar from "../../../components/avatar/Avatar";
import { ROLES, STATUS } from "../../../configs/table/variable";
import { completePhotoPath } from "../../../utils/helpers";

const AccountInfo = (props) => {
  const { account } = props;
  const { t } = useTranslation();

  return (
    <Card>
      <CardBody>
        <Row>
          <Col xl="12" lg="12" className="d-flex flex-column justify-content-between border-container-lg">
            <div className="user-avatar-section">
              <div className="d-flex justify-content-center">
                {account.avatar ? (
                  <Avatar img={completePhotoPath(account.avatar)} size="xl" />
                ) : (
                  <Avatar content={account.fullName || "G"} initials size="xl" />
                )}
              </div>
              <div className="d-flex justify-content-center">
                <div className="user-info mb-1 mt-1">
                  <h4 className="mb-0 text-center">{account.fullName}</h4>
                  <CardText tag="span" className="text-center">
                    {account.email}
                  </CardText>
                </div>
              </div>
            </div>
          </Col>
          <Col xl="12" lg="12" className="mt-2 mt-xl-0">
            <div className="user-info-wrapper">
              <div className="d-flex flex-wrap align-items-center">
                <div className="user-info-title">
                  <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                    Biệt danh :
                  </CardText>
                </div>
                <CardText className="mb-0 mx-1">{account.userName}</CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                    Loại tài khoản :
                  </CardText>
                </div>
                <CardText className="mb-0 mx-1">
                  <Badge color={ROLES[account.role]} pill>
                    {t(`role_mapping.${account.role}`, { defaultValue: "" })}
                  </Badge>
                </CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                    Giới tính :
                  </CardText>
                </div>
                <CardText className="mb-0 mx-1">{t(`gender_mapping.${account.gender}`, { defaultValue: "" })}</CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                    Ngày sinh :
                  </CardText>
                </div>
                <CardText className="mb-0 mx-1">{account.dob ? format(new Date(account.dob), "dd/MM/yyyy") : ""}</CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                    Trạng thái :
                  </CardText>
                </div>
                <CardText className="mb-0 mx-1">
                  <Badge color={STATUS[account.isLoginFirstTime]} pill outline>
                    {t(`is_login_first_time_mapping.${account.isLoginFirstTime}`, { defaultValue: "" })}
                  </Badge>
                </CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                    Vị trí :
                  </CardText>
                </div>
                <CardText className="mb-0 mx-1">{account.position}</CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <CardText tag="span" className="user-info-title font-weight-bold mb-0">
                    Mô tả :
                  </CardText>
                </div>
                <div dangerouslySetInnerHTML={{ __html: account.about }} />
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default AccountInfo;
