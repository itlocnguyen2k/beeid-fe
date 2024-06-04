import { Fragment } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import CollapseFilter from "../../../components/collapse/CollapseFilter";
import TableHeader from "../../../components/table-header/TableHeader";
import Table from "../../../components/table/Table";
import { FileListColumns } from "../../../configs/table/FileListColumns";

const FileList = (props) => {
  const { fileList, pageSize, currentPage, totalRows, setPageSize, setCurrentPage } = props;
  return (
    <Fragment>
      <Row className="d-flex justify-content-center">
        <Col lg="12">
          <Card className="app-collapse">
            <CardBody>
              <CollapseFilter title="Danh sách tài liệu" />
              <TableHeader totalRows={totalRows} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
              <Table
                data={fileList}
                columns={FileListColumns}
                currentPage={currentPage}
                totalRows={totalRows}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default FileList;
