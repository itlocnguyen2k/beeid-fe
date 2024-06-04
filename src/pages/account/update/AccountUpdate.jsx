import { Fragment, useState } from "react";
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import "../../../@core/scss/react/apps/app-users.scss";
import { Info, Lock, Settings, Share2 } from "react-feather";
import AccountInfo from "./AccountInfo";
import ChangePassword from "./ChangePassword";
import AccountConnect from "./AccountConnect";
import FormAccountUpdate from "./FormAccountUpdate";
import { useLocation } from "react-router-dom";
import BackButton from "../../../components/link/BackButton";
import AccountEditRole from "./AccountEditRole";

const AccountUpdate = (props) => {
  const { account, onSubmitAccountUpdate, onSubmitChangePassword, accountSuggestions, followCallback, onSubmitPermission } = props;
  const { state } = useLocation();

  const [activeTab, setActiveTab] = useState(state.tab || "1");
  const toggle = (tab) => setActiveTab(tab);

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Chỉnh sửa thông tin" breadCrumbParent="Nhân viên" breadCrumbActive="Chỉnh sửa thông tin">
        <BackButton />
      </Breadcrumbs>
      <Row className="app-user-edit">
        <Col lg="12">
          <Nav pills>
            <NavItem>
              <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                <Info size={14} />
                <span className="align-middle d-none d-sm-block">Thông tin chung</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === "2"} onClick={() => toggle("2")}>
                <Settings size={14} />
                <span className="align-middle d-none d-sm-block">Cập nhật thông tin</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === "3"} onClick={() => toggle("3")}>
                <Lock size={14} />
                <span className="align-middle d-none d-sm-block">Bảo mật</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === "4"} onClick={() => toggle("4")}>
                <Share2 size={14} />
                <span className="align-middle d-none d-sm-block">Kết nối</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        {activeTab !== "4" && (
          <Col lg="3">
            <AccountInfo account={account} />
          </Col>
        )}
        <Col sm={`${activeTab === "4" ? "12" : "9"} `}>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <AccountEditRole onSubmitPermission={onSubmitPermission} account={account} />
            </TabPane>
            <TabPane tabId="2">
              <FormAccountUpdate account={account} onSubmitAccountUpdate={onSubmitAccountUpdate} />
            </TabPane>
            <TabPane tabId="3">
              <ChangePassword onSubmitChangePassword={onSubmitChangePassword} />
            </TabPane>
            <TabPane tabId="4">
              <AccountConnect account={account} accountSuggestions={accountSuggestions} followCallback={followCallback} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  );
};
export default AccountUpdate;
