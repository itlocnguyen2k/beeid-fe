import { Fragment } from "react";
import { UserPlus } from "react-feather";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import CollapseFilter from "../../../components/collapse/CollapseFilter";
import ExpandableTableAccountList from "../../../components/expandable/ExpandableTableAccountList";
import TableHeader from "../../../components/table-header/TableHeader";
import Table from "../../../components/table/Table";
import { accountListColumns } from "../../../configs/table/AccountListColumns";
import FormFilterAccount from "./FormFilterAccount";
import { useAuth } from "../../../hook/useAuth";

const AccountList = (props) => {
  const { accountList, pageSize, currentPage, totalRows, setPageSize, setCurrentPage, onFilter, onClearFilter } = props;
  const { auth } = useAuth();
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Danh sách nhân viên" breadCrumbParent="Nhân viên" breadCrumbActive="Danh sách nhân viên">
        {auth.account.permission.accountCreate && (
          <Link to="/admin/accounts/create" className="btn-link">
            <UserPlus size={14} className="me-1" />
            Thêm mới nhân viên
          </Link>
        )}
      </Breadcrumbs>
      <Card className="app-collapse">
        <CollapseFilter title="Danh sách nhân viên">
          <FormFilterAccount onFilter={onFilter} onClearFilter={onClearFilter} />
        </CollapseFilter>
        <CardBody>
          <TableHeader totalRows={totalRows} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
          <Table
            data={accountList}
            columns={accountListColumns}
            currentPage={currentPage}
            totalRows={totalRows}
            pageSize={pageSize}
            expandableRowsComponent={ExpandableTableAccountList}
            setCurrentPage={setCurrentPage}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default AccountList;
