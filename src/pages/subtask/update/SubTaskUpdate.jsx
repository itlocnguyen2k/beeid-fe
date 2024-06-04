import { Col, Row, Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";
import "../../../@core/scss/react/libs/react-select/_react-select.scss";
import "../../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import { Command, File, Info } from "react-feather";
import { Fragment, useState } from "react";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import BackButton from "../../../components/link/BackButton";
import { useLocation } from "react-router-dom";
import SubTaskInfo from "./SubTaskInfo";
import SubTaskHistoryContainer from "../history/SubTaskHistoryContainer";
import FileListContainer from "../../file/list/FileListContainer";

const SubTaskUpdate = () => {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState(state?.tab || "1");
  const toggle = (tab) => setActiveTab(tab);

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Chỉnh sửa công việc phụ" breadCrumbParent="Công việc phụ" breadCrumbActive="Chỉnh sửa công việc phụ">
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
                <Command size={14} />
                <span className="align-middle d-none d-sm-block">Lịch sử</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === "3"} onClick={() => toggle("3")}>
                <File size={14} />
                <span className="align-middle d-none d-sm-block">Tài liệu</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col sm="12">
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <SubTaskInfo />
            </TabPane>
            <TabPane tabId="2">
              <SubTaskHistoryContainer />
            </TabPane>
            <TabPane tabId="3">
              <FileListContainer type="2" />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  );
};
export default SubTaskUpdate;
