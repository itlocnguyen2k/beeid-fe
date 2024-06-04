import { Fragment } from "react";
import Flatpickr from "react-flatpickr";
import { Controller, useFormContext } from "react-hook-form";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import "../../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import { Search, Trash } from "react-feather";
import Select from "react-select";
import "../../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import InputElement from "../../../components/input-element/InputElement";

const FormFilterProject = (props) => {
  const { onFilter, onClearFilter } = props;
  const { handleSubmit, control } = useFormContext();

  const categoriesOptions = [
    { value: "", label: "Tất cả" },
    { value: "1", label: "Outsource" },
    { value: "2", label: "Product" },
    { value: "3", label: "Khác" },
  ];

  const modeOptions = [
    { value: "", label: "Tất cả" },
    { value: "1", label: "Công khai" },
    { value: "2", label: "Bảo mật" },
  ];

  const statusOptions = [
    { value: "", label: "Tất cả" },
    { value: "1", label: "Đang hoạt động" },
    { value: "2", label: "Đã đóng" },
  ];

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onFilter)}>
        <Row>
          <Col lg="3" md="6" className="mb-1">
            <InputElement innerElement={Input} name="projectName" label="Dự án :" placeholder="Hãy nhập dự án để tìm kiếm" />
          </Col>
          <Col lg="3" md="6" className="mb-1">
            <InputElement innerElement={Input} name="description" label="Mô tả :" placeholder="Hãy nhập mô tả để tìm kiếm" />
          </Col>
          <Col lg="3" md="6">
            <Label for="startDate">Ngày bắt đầu:</Label>
            <Controller
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  className="form-control"
                  options={{ mode: "range", dateFormat: "d/m/Y" }}
                  placeholder="Hãy nhập ngày bắt đầu để tìm kiếm"
                />
              )}
              name="startDate"
              control={control}
              type="date"
            />
          </Col>
          <Col lg="3" md="6">
            <Label for="endDate">Ngày kết thúc :</Label>
            <Controller
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  className="form-control"
                  options={{ mode: "range", dateFormat: "d/m/Y" }}
                  placeholder="Hãy nhập ngày kết thúc để tìm kiếm"
                />
              )}
              name="endDate"
              control={control}
              type="date"
            />
          </Col>
          <Col lg="3" md="6">
            <Label className="form-label" for="category">
              Phân loại :
            </Label>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={categoriesOptions}
                  defaultValue={categoriesOptions[0]}
                  inputProps={{ autoComplete: "off", autoCorrect: "off", spellCheck: "off" }}
                />
              )}
              name="category"
              control={control}
            />
          </Col>
          <Col lg="3" md="6">
            <Label className="form-label" for="mode">
              Chế độ :
            </Label>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={modeOptions}
                  defaultValue={modeOptions[0]}
                  inputProps={{ autoComplete: "off", autoCorrect: "off", spellCheck: "off" }}
                />
              )}
              name="mode"
              control={control}
            />
          </Col>
          <Col lg="3" md="6">
            <Label className="form-label" for="status">
              Trạng thái :
            </Label>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={statusOptions}
                  defaultValue={statusOptions[0]}
                  inputProps={{ autoComplete: "off", autoCorrect: "off", spellCheck: "off" }}
                />
              )}
              name="status"
              control={control}
            />
          </Col>
        </Row>
        <Row form className="mt-1 mb-0 d-flex justify-content-end">
          <Col lg="4" md="6" className="d-flex justify-content-end">
            <Button color="primary" type="submit" className="me-1">
              <Search size={14} className="align-middle ml-sm-25 ml-0" />
              <span className="align-middle d-sm-inline-block d-none mx-1">Tìm kiếm</span>
            </Button>
            <Button color="secondary" type="button" outline onClick={onClearFilter}>
              <Trash size={14} className="align-middle ml-sm-25 ml-0" />
              <span className="align-middle d-sm-inline-block d-none mx-1">Hủy</span>
            </Button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
export default FormFilterProject;
