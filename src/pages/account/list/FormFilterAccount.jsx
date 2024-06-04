import { Fragment } from "react";
import Flatpickr from "react-flatpickr";
import { Controller, useFormContext } from "react-hook-form";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import Select from "react-select";
import "../../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import { Search, Trash } from "react-feather";
import InputElement from "../../../components/input-element/InputElement";

const FormFilterAccount = (props) => {
  const { onFilter, onClearFilter } = props;
  const { handleSubmit, control } = useFormContext();

  const genderOptions = [
    { value: "", label: "Tất cả" },
    { value: "1", label: "Nam" },
    { value: "0", label: "Nữ" },
  ];

  const roleOptions = [
    { value: "", label: "Tất cả" },
    { value: "1", label: "Administrator" },
    { value: "0", label: "Staff" },
  ];

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onFilter)}>
        <Row>
          <Col lg="3" md="6" className="mb-1">
            <InputElement innerElement={Input} name="fullName" label="Họ và tên :" placeholder="Hãy nhập họ và tên để tìm kiếm" />
          </Col>
          <Col lg="3" md="6" className="mb-1">
            <InputElement innerElement={Input} name="userName" label="Biệt danh :" placeholder="Hãy nhập biệt danh để tìm kiếm" />
          </Col>
          <Col lg="3" md="6" className="mb-1">
            <InputElement innerElement={Input} name="email" label="Email :" placeholder="Hãy nhập email để tìm kiếm" type="email" />
          </Col>
          <Col lg="3" md="6">
            <Label for="dob">Ngày sinh:</Label>
            <Controller
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  className="form-control"
                  options={{ mode: "range", dateFormat: "d/m/Y" }}
                  placeholder="Hãy nhập ngày sinh để tìm kiếm"
                />
              )}
              name="dob"
              control={control}
              type="date"
            />
          </Col>
          <Col lg="3" md="6" className="mb-1">
            <Label for="role">Loại tài khoản :</Label>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={roleOptions}
                  defaultValue={roleOptions[0]}
                  inputProps={{ autoComplete: "off", autoCorrect: "off", spellCheck: "off" }}
                />
              )}
              name="role"
              control={control}
            />
          </Col>
          <Col lg="3" md="6" className="mb-1">
            <Label for="gender">Giới tính :</Label>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={genderOptions}
                  defaultValue={genderOptions[0]}
                  inputProps={{ autoComplete: "off", autoCorrect: "off", spellCheck: "off" }}
                />
              )}
              name="gender"
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
export default FormFilterAccount;
