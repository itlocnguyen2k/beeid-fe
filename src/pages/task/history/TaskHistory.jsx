import { Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useState } from "react";
import TaskLog from "./TaskLog";
import TaskLogChange from "./TaskLogChange";
import TaskNote from "./TaskNote";

const TaskHistory = (props) => {
  const { task, logsList, getInputProps, getRootProps, files, onDelete, onSubmit, onDownload, updateNote } = props;
  const [activePill, setPillActive] = useState("1");
  const togglePills = (tab) => {
    if (activePill !== tab) {
      setPillActive(tab);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Nav tabs>
          <NavItem>
            <NavLink
              active={activePill === "1"}
              onClick={() => {
                togglePills("1");
              }}
            >
              Tất cả
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activePill === "2"}
              onClick={() => {
                togglePills("2");
              }}
            >
              Lịch sử thay đổi
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activePill === "3"}
              onClick={() => {
                togglePills("3");
              }}
            >
              Ghi chú
            </NavLink>
          </NavItem>
        </Nav>
      </CardHeader>
      <CardBody>
        <TabContent activeTab={activePill}>
          <TabPane tabId="1">
            <TaskLog logsList={logsList} onDownload={onDownload} />
          </TabPane>
          <TabPane tabId="2">
            <TaskLogChange logsList={logsList} />
          </TabPane>
          <TabPane tabId="3">
            <TaskNote
              task={task}
              logsList={logsList}
              getInputProps={getInputProps}
              files={files}
              onDelete={onDelete}
              onDownload={onDownload}
              onSubmit={onSubmit}
              getRootProps={getRootProps}
              updateNote={updateNote}
            />
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
};
export default TaskHistory;
