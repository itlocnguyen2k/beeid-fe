import { Fragment } from "react";
import { Box } from "react-feather";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import CollapseFilter from "../../../components/collapse/CollapseFilter";
import ExpandableTableProjectList from "../../../components/expandable/ExpandableTableProjectList";
import TableHeader from "../../../components/table-header/TableHeader";
import Table from "../../../components/table/Table";
import { projectListColumns } from "../../../configs/table/ProjectListColumns";
import { useAuth } from "../../../hook/useAuth";
import FormFilterProject from "./FormFilterProject";

const ProjectList = (props) => {
  const { auth } = useAuth();
  const { projectList, pageSize, currentPage, totalRows, setPageSize, setCurrentPage, onFilter, onClearFilter } = props;
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Danh sách dự án" breadCrumbParent="Dự án" breadCrumbActive="Danh sách dự án">
        {auth.account.permission.projectCreate && (
          <Link to="/admin/projects/create" className="btn-link">
            <Box size={14} className="me-1" />
            Thêm mới dự án
          </Link>
        )}
      </Breadcrumbs>
      <Card className="app-collapse">
        <CollapseFilter title="Danh sách dự án">
          <FormFilterProject onFilter={onFilter} onClearFilter={onClearFilter} />
        </CollapseFilter>
        <CardBody>
          <TableHeader totalRows={totalRows} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
          <Table
            data={projectList}
            columns={projectListColumns}
            currentPage={currentPage}
            totalRows={totalRows}
            pageSize={pageSize}
            expandableRowsComponent={ExpandableTableProjectList}
            setCurrentPage={setCurrentPage}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default ProjectList;
