import { Col, Label, Row } from "reactstrap";
import Selection from "../select/Selection";

const TableHeader = (props) => {
  const { totalRows, setCurrentPage, setPageSize } = props;
  return (
    <Row className="mx-0 mb-50">
      <Col sm="12" className="px-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center w-25">
            <Label for="sort-select">
              Tổng số: <strong>{totalRows ? totalRows : 0}</strong> bản ghi
            </Label>
          </div>
          <div className="d-flex align-items-center justify-content-end w-25">
            <Label for="sort-select" className="me-1">
              Lựa chọn:
            </Label>
            <Selection setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default TableHeader;
