import { Fragment } from "react";
import Flatpickr from "react-flatpickr";
import { Controller, useFormContext } from "react-hook-form";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import Select, { components } from "react-select";
import "../../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import { Search, Trash } from "react-feather";
import InputElement from "../../../components/input-element/InputElement";
import Avatar from "../../../components/avatar/Avatar";
import { completePhotoPath } from "../../../utils/helpers";

const FormFilterSubTask = (props) => {
  const { onFilter, onClearFilter, memberList, categoryList, priorityList } = props;
  const { handleSubmit, control } = useFormContext();

  const statusOptions = [
    { value: "", label: "Tất cả" },
    { value: "0", label: "new", color: "#ea5455" },
    { value: "1", label: "doing", color: "#ff9f43" },
    { value: "2", label: "done", color: "#28c76f" },
    { value: "3", label: "complete", color: "#00cfe8" },
    { value: "4", label: "pending", color: "#82868b" },
    { value: "5", label: "reject", color: "#4b4b4b" },
  ];

  const memberComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {data.userName &&
            (data.avatar ? <Avatar img={completePhotoPath(data.avatar)} /> : <Avatar content={data.fullName || "G"} initials />)}
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data.fullName || data.label}</span>
            {data.userName && <small className="mx-1">@{data.userName}</small>}
          </div>
        </div>
      </components.Option>
    );
  };

  const statusComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {data.color && (
            <span className={`bullet bullet-xl me-1 avatar-sm`} style={{ borderRadius: "50%", backgroundColor: data.color }} />
          )}
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data.label}</span>
          </div>
        </div>
      </components.Option>
    );
  };

  const categoryComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {data.color && (
            <span className={`bullet bullet-xl me-1 avatar-sm`} style={{ borderRadius: "50%", backgroundColor: data.color }} />
          )}
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data.categoryName || data.label}</span>
          </div>
        </div>
      </components.Option>
    );
  };

  const priorityComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {data.color && (
            <span className={`bullet bullet-xl me-1 avatar-sm`} style={{ borderRadius: "50%", backgroundColor: data.color }} />
          )}
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data.priorityName || data.label}</span>
          </div>
        </div>
      </components.Option>
    );
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onFilter)}>
        <Row>
          <Col lg="3" md="6" className="mb-1">
            <InputElement innerElement={Input} name="subTitle" label="Tiêu đề :" placeholder="Hãy nhập tiêu đề để tìm kiếm" />
          </Col>
          <Col lg="3" md="6" className="mb-1">
            <InputElement innerElement={Input} name="module" label="Phạm vi :" placeholder="Hãy nhập phạm vi để tìm kiếm" />
          </Col>
          <Col lg="3" md="6">
            <Label for="startDate">Thời gian bắt đầu:</Label>
            <Controller
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  className="form-control"
                  options={{ mode: "range", dateFormat: "d/m/Y" }}
                  placeholder="Hãy nhập thời gian bắt đầu để tìm kiếm"
                />
              )}
              name="startDate"
              control={control}
              type="date"
            />
          </Col>
          <Col lg="3" md="6">
            <Label for="endDate">Thời gian kết thúc:</Label>
            <Controller
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  className="form-control"
                  options={{ mode: "range", dateFormat: "d/m/Y" }}
                  placeholder="Hãy nhập thời gian kết thúc để tìm kiếm"
                />
              )}
              name="endDate"
              control={control}
              type="date"
            />
          </Col>
          <Col lg="3" md="6" className="mb-1">
            <Label for="categories">Phân loại :</Label>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={categoryList}
                  inputProps={{ autoComplete: "off", autoCorrect: "off", spellCheck: "off" }}
                  components={{ Option: categoryComponent }}
                />
              )}
              name="categories"
              control={control}
            />
          </Col>
          <Col lg="3" md="6" className="mb-1">
            <Label for="priorities">Độ ưu tiên :</Label>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={priorityList}
                  inputProps={{ autoComplete: "off", autoCorrect: "off", spellCheck: "off" }}
                  components={{ Option: priorityComponent }}
                />
              )}
              name="priorities"
              control={control}
            />
          </Col>
          <Col lg="3" md="6" className="mb-1">
            <Label for="status">Trạng thái :</Label>
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
                  components={{ Option: statusComponent }}
                />
              )}
              name="status"
              control={control}
            />
          </Col>
          <Col lg="3" md="6" className="mb-1">
            <Label for="owners">Người phụ trách :</Label>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={memberList}
                  inputProps={{ autoComplete: "off", autoCorrect: "off", spellCheck: "off" }}
                  components={{ Option: memberComponent }}
                />
              )}
              name="owners"
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
export default FormFilterSubTask;
