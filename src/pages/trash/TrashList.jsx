import { Col, Row, Nav, NavItem, NavLink, TabPane, TabContent, Card, CardBody } from "reactstrap";
import { Bookmark, Box, File, Package, Trello, User } from "react-feather";
import { Fragment, useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import BackButton from "../../components/link/BackButton";
import CollapseFilter from "../../components/collapse/CollapseFilter";
import TableHeader from "../../components/table-header/TableHeader";
import {
  accountListColumns,
  fileListColumns,
  projectListColumns,
  sprintListColumns,
  subTaskListColumns,
  taskListColumns,
} from "../../configs/table/TrashListColumn";
import Table from "../../components/table/Table";

const TrashList = (props) => {
  const { trashList, pageSize, currentPage, totalRows, setPageSize, setCurrentPage, setType } = props;
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    setActiveTab(tab);
    setType(tab);
  };

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Danh sách đối tượng xóa" breadCrumbParent="Thùng rác" breadCrumbActive="Danh sách đối tượng xóa">
        <BackButton />
      </Breadcrumbs>
      <Row className="app-user-edit">
        <Col lg="12">
          <Nav pills>
            <NavItem>
              <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                <User size={14} />
                <span className="align-middle d-none d-sm-block">Tài khoản</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === "2"} onClick={() => toggle("2")}>
                <Box size={14} />
                <span className="align-middle d-none d-sm-block">Dự án</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === "3"} onClick={() => toggle("3")}>
                <Trello size={14} />
                <span className="align-middle d-none d-sm-block">Giai đoạn</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === "4"} onClick={() => toggle("4")}>
                <Bookmark size={14} />
                <span className="align-middle d-none d-sm-block">Công việc</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === "5"} onClick={() => toggle("5")}>
                <Package size={14} />
                <span className="align-middle d-none d-sm-block">Công việc phụ</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === "6"} onClick={() => toggle("6")}>
                <File size={14} />
                <span className="align-middle d-none d-sm-block">Tài liệu</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col sm="12">
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Card className="app-collapse">
                <CollapseFilter title="Danh sách nhân viên">
                  {/* <FormFilterAccount onFilter={onFilter} onClearFilter={onClearFilter} /> */}
                </CollapseFilter>
                <CardBody>
                  <TableHeader totalRows={totalRows} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                  <Table
                    data={trashList}
                    columns={accountListColumns}
                    currentPage={currentPage}
                    totalRows={totalRows}
                    pageSize={pageSize}
                    setCurrentPage={setCurrentPage}
                  />
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="2">
              <Card className="app-collapse">
                <CollapseFilter title="Danh sách dự án">
                  {/* <FormFilterAccount onFilter={onFilter} onClearFilter={onClearFilter} /> */}
                </CollapseFilter>
                <CardBody>
                  <TableHeader totalRows={totalRows} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                  <Table
                    data={trashList}
                    columns={projectListColumns}
                    currentPage={currentPage}
                    totalRows={totalRows}
                    pageSize={pageSize}
                    setCurrentPage={setCurrentPage}
                  />
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="3">
              <Card className="app-collapse">
                <CollapseFilter title="Danh sách giai đoạn">
                  {/* <FormFilterAccount onFilter={onFilter} onClearFilter={onClearFilter} /> */}
                </CollapseFilter>
                <CardBody>
                  <TableHeader totalRows={totalRows} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                  <Table
                    data={trashList}
                    columns={sprintListColumns}
                    currentPage={currentPage}
                    totalRows={totalRows}
                    pageSize={pageSize}
                    setCurrentPage={setCurrentPage}
                  />
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="4">
              <Card className="app-collapse">
                <CollapseFilter title="Danh sách công việc">
                  {/* <FormFilterAccount onFilter={onFilter} onClearFilter={onClearFilter} /> */}
                </CollapseFilter>
                <CardBody>
                  <TableHeader totalRows={totalRows} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                  <Table
                    data={trashList}
                    columns={taskListColumns}
                    currentPage={currentPage}
                    totalRows={totalRows}
                    pageSize={pageSize}
                    setCurrentPage={setCurrentPage}
                  />
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="5">
              <Card className="app-collapse">
                <CollapseFilter title="Danh sách công việc phụ">
                  {/* <FormFilterAccount onFilter={onFilter} onClearFilter={onClearFilter} /> */}
                </CollapseFilter>
                <CardBody>
                  <TableHeader totalRows={totalRows} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                  <Table
                    data={trashList}
                    columns={subTaskListColumns}
                    currentPage={currentPage}
                    totalRows={totalRows}
                    pageSize={pageSize}
                    setCurrentPage={setCurrentPage}
                  />
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="6">
              <Card className="app-collapse">
                <CollapseFilter title="Danh sách file">
                  {/* <FormFilterAccount onFilter={onFilter} onClearFilter={onClearFilter} /> */}
                </CollapseFilter>
                <CardBody>
                  <TableHeader totalRows={totalRows} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                  <Table
                    data={trashList}
                    columns={fileListColumns}
                    currentPage={currentPage}
                    totalRows={totalRows}
                    pageSize={pageSize}
                    setCurrentPage={setCurrentPage}
                  />
                </CardBody>
              </Card>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  );
};
export default TrashList;
