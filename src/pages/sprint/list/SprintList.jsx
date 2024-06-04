import { Fragment } from "react";
import { Twitch } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import CollapseFilter from "../../../components/collapse/CollapseFilter";
import ExpandableTableSprintList from "../../../components/expandable/ExpandableTableSprintList";
import TableHeader from "../../../components/table-header/TableHeader";
import Table from "../../../components/table/Table";
import { sprintListColumns } from "../../../configs/table/SprintListColumns";
import { useAuth } from "../../../hook/useAuth";
import FormFilterSprint from "./FormFilterSprint";

const SprintList = (props) => {
  const { state } = useLocation();
  const { auth } = useAuth();
  const { sprintList, pageSize, currentPage, totalRows, setPageSize, setCurrentPage, onFilter, onClearFilter } = props;
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Danh sách giai đoạn" breadCrumbParent="Giai đoạn" breadCrumbActive="Danh sách giai đoạn">
        {auth.account.permission.sprintCreate && (
          <Link to="/admin/sprints/create" state={{ projectId: state?.projectId }} className="btn-link">
            <Twitch size={14} className="me-1" />
            Thêm mới giai đoạn
          </Link>
        )}
      </Breadcrumbs>
      <Card className="app-collapse">
        <CollapseFilter title="Danh sách giai đoạn">
          <FormFilterSprint onFilter={onFilter} onClearFilter={onClearFilter} />
        </CollapseFilter>
        <CardBody>
          <TableHeader totalRows={totalRows} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
          <Table
            data={sprintList}
            columns={sprintListColumns}
            currentPage={currentPage}
            totalRows={totalRows}
            pageSize={pageSize}
            expandableRowsComponent={ExpandableTableSprintList}
            setCurrentPage={setCurrentPage}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default SprintList;
