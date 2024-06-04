import { Fragment } from "react";
import { Package } from "react-feather";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import CollapseFilter from "../../../components/collapse/CollapseFilter";
import ExpandableTableSubTaskList from "../../../components/expandable/ExpandableTableSubTaskList";
import TableHeader from "../../../components/table-header/TableHeader";
import Table from "../../../components/table/Table";
import { subTaskListColumns } from "../../../configs/table/SubTaskListColumn";
import { useAuth } from "../../../hook/useAuth";
import FormFilterSubTask from "./FormFilterSubTask";

const SubTaskList = (props) => {
  const { auth } = useAuth();
  const {
    task,
    memberList,
    categoryList,
    priorityList,
    subTaskList,
    pageSize,
    currentPage,
    totalRows,
    setPageSize,
    setCurrentPage,
    onFilter,
    onClearFilter,
  } = props;
  return (
    <Fragment>
      <div className="mb-1 d-flex justify-content-end">
        {auth.account.permission.subTaskCreate && (
          <Link to="/admin/sub-tasks/create" state={{ taskId: task._id, sprintId: task.sprints }} className="btn-link">
            <Package size={14} className="me-1" />
            Thêm mới công việc phụ
          </Link>
        )}
      </div>
      <Card className="app-collapse">
        <CollapseFilter title="Danh sách công việc phụ">
          <FormFilterSubTask
            onFilter={onFilter}
            onClearFilter={onClearFilter}
            memberList={memberList}
            priorityList={priorityList}
            categoryList={categoryList}
          />
        </CollapseFilter>
        <CardBody>
          <TableHeader totalRows={totalRows} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
          <Table
            data={subTaskList}
            columns={subTaskListColumns}
            currentPage={currentPage}
            totalRows={totalRows}
            pageSize={pageSize}
            expandableRowsComponent={ExpandableTableSubTaskList}
            setCurrentPage={setCurrentPage}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default SubTaskList;
