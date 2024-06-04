import { Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import CollapseFilter from "../../components/collapse/CollapseFilter";
import TableHeader from "../../components/table-header/TableHeader";
import Table from "../../components/table/Table";
import FormFilterReport from "./FormFilterReport";
import BackButton from "../../components/link/BackButton";
import { reportListColumns } from "../../configs/table/ReportListColumns";

const ReportList = (props) => {
  const { reportList, pageSize, currentPage, totalRows, setPageSize, setCurrentPage, onFilter, onClearFilter } = props;
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Danh sách báo cáo hằng ngày" breadCrumbParent="Báo cáo" breadCrumbActive="Danh sách báo cáo hằng ngày">
        <BackButton />
      </Breadcrumbs>
      <Card className="app-collapse">
        <CollapseFilter title="Danh sách báo cáo hằng ngày">
          <FormFilterReport onFilter={onFilter} onClearFilter={onClearFilter} />
        </CollapseFilter>
        <CardBody>
          <TableHeader totalRows={totalRows} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
          <Table
            data={reportList}
            columns={reportListColumns}
            currentPage={currentPage}
            totalRows={totalRows}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default ReportList;
