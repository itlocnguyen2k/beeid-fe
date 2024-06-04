import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import Pagination from "../pagination/Pagination";
import "../../@core/scss/react/libs/tables/react-dataTable-component.scss";

const Table = (props) => {
  const { columns, currentPage, data, totalRows, pageSize, setCurrentPage, expandableRowsComponent } = props;
  return (
    <DataTable
      noHeader
      pagination
      columns={columns}
      paginationPerPage={pageSize}
      className="react-dataTable"
      expandableRows={expandableRowsComponent ? true : false}
      expandOnRowClicked
      sortIcon={<ChevronDown size={10} />}
      paginationDefaultPage={currentPage + 1}
      expandableRowsComponent={expandableRowsComponent}
      paginationComponent={() => (
        <Pagination currentPage={currentPage} totalRows={totalRows} pageSize={pageSize} setCurrentPage={setCurrentPage} />
      )}
      data={data}
    />
  );
};

export default Table;
