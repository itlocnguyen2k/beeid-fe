import { Card, CardBody, CardHeader, CardTitle, Col, Form, Button, Input, Label, Row, Media, FormFeedback } from "reactstrap";
import "../../../@core/scss/react/libs/react-select/_react-select.scss";
import Select, { components } from "react-select";
import Flatpickr from "react-flatpickr";
import "../../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import Avatar from "../../../components/avatar/Avatar";
import { ArrowLeft, Check, Trash, Upload } from "react-feather";
import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import { Fragment } from "react";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import { useState } from "react";
import TaskMember from "./TaskMember";
import AvatarGroup from "../../../components/avatar-group/AvatarGroup";
import ModalComponent from "../../../components/modal/ModalComponent";
import BackButton from "../../../components/link/BackButton";
import InputElement from "../../../components/input-element/InputElement";
import { useContext } from "react";
import TaskContext from "../../../context/TaskContext";
import CkEditor from "../../../components/ckeditor/CkEditor";
import { isAfter, isBefore } from "date-fns";

const TaskCreate = () => {
  const taskContext = useContext(TaskContext);
  const { onSubmit, memberSelectedList, categoryList, labelList, priorityList } = taskContext;
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useFormContext({
    mode: "all",
    reValidateMode: "all",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const [modalMember, setModalMember] = useState(false);
  const toggleModalMember = () => {
    setModalMember(!modalMember);
  };

  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      setAvatarPreview(reader.result);
    };
    setAvatar(files[0]);
    reader.readAsDataURL(files[0]);
  };

  const categoryComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <span className={`bullet bullet-xl me-1 avatar-sm`} style={{ borderRadius: "50%", backgroundColor: data.color }} />
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data.categoryName}</span>
          </div>
        </div>
      </components.Option>
    );
  };

  const labelComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <span className={`bullet bullet-xl me-1 avatar-sm`} style={{ borderRadius: "50%", backgroundColor: data.color }} />
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data.labelName}</span>
          </div>
        </div>
      </components.Option>
    );
  };

  const priorityComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <span className={`bullet bullet-xl me-1 avatar-sm`} style={{ borderRadius: "50%", backgroundColor: data.color }} />
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data.priorityName}</span>
          </div>
        </div>
      </components.Option>
    );
  };

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Thêm mới công việc" breadCrumbParent="Công việc" breadCrumbActive="Thêm mới công việc">
        <BackButton />
      </Breadcrumbs>
      <Row className="d-flex justify-content-center">
        <Col lg="10">
          <Card>
            <CardHeader>
              <CardTitle tag="h4" className="mb-2">
                Thêm mới công việc
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit(() => onSubmit(avatar))}>
                <Row>
                  <Media className="d-flex justify-content-center">
                    <Media className="mr-25 mb-1" center>
                      {avatarPreview ? (
                        <Avatar img={avatarPreview} size="xl" />
                      ) : (
                        <Avatar content={getValues("sprintName") || "G"} initials size="xl" />
                      )}
                    </Media>
                  </Media>
                  <Media className="d-flex justify-content-center" body>
                    <Button tag={Label} className="me-1" size="sm" color="primary" type="button">
                      <Upload size={14} className="mx-1" />
                      <Input type="file" onChange={onChange} hidden accept="image/*" />
                    </Button>
                    <Button
                      tag={Label}
                      color="secondary"
                      size="sm"
                      outline
                      onClick={() => {
                        setAvatar("");
                        setAvatarPreview("");
                      }}
                    >
                      <Trash size={14} className="mx-1" />
                    </Button>
                  </Media>
                </Row>
                <Row>
                  <Col className="mb-1" md="12">
                    <InputElement
                      innerElement={Input}
                      name="taskTitle"
                      label="Tiêu đề :"
                      placeholder="Vui lòng nhập thông tin tiêu đề"
                      required
                    />
                  </Col>
                  <Col className="mb-1" md="3">
                    <Label className="form-label required" for="startDate">
                      Ngày bắt đầu :
                    </Label>
                    <Controller
                      render={({ field }) => (
                        <Flatpickr {...field} className="form-control" options={{ dateFormat: "d/m/Y" }} placeholder="Ngày bắt đầu" />
                      )}
                      name="startDate"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: t("message.validation.required", {
                            name: "Ngày bắt đầu",
                          }),
                        },
                        validate: (startDate) => {
                          const endDate = getValues("endDate");
                          if (endDate && startDate && isAfter(new Date(startDate), new Date(endDate))) {
                            return t("message.validation.start_date");
                          }
                        },
                      }}
                    />
                    {errors.startDate && <FormFeedback className="d-block">{errors.startDate.message}</FormFeedback>}
                  </Col>
                  <Col className="mb-1" md="3">
                    <Label className="form-label required" for="endDate">
                      Ngày kết thúc :
                    </Label>
                    <Controller
                      render={({ field }) => (
                        <Flatpickr {...field} className="form-control" options={{ dateFormat: "d/m/Y" }} placeholder="Ngày kết thúc" />
                      )}
                      name="endDate"
                      control={control}
                      type="date"
                      rules={{
                        required: {
                          value: true,
                          message: t("message.validation.required", {
                            name: "Ngày kết thúc",
                          }),
                        },
                        validate: (endDate) => {
                          const startDate = getValues("startDate");
                          if (endDate && startDate && isBefore(new Date(endDate), new Date(startDate))) {
                            return t("message.validation.end_date");
                          }
                        },
                      }}
                    />
                    {errors.endDate && <FormFeedback className="d-block">{errors.endDate.message}</FormFeedback>}
                  </Col>
                  <Col className="mb-1" md="3">
                    <InputElement innerElement={Input} name="estimate" label="Thời gian ước tính :" placeholder="Thời gian ước tính" />
                  </Col>
                </Row>
                <div className="divider">
                  <div className="divider-text">Thông tin lựa chọn</div>
                </div>
                <Row>
                  <Col className="mb-1" md="3">
                    <Label className="form-label required" for="categories">
                      Phân loại :
                    </Label>
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
                  <Col className="mb-1" md="3">
                    <Label className="form-label required" for="labels">
                      Nhãn :
                    </Label>
                    <Controller
                      render={({ field }) => (
                        <Select
                          {...field}
                          isClearable={false}
                          className="react-select"
                          classNamePrefix="select"
                          options={labelList}
                          inputProps={{ autoComplete: "off", autoCorrect: "off", spellCheck: "off" }}
                          components={{ Option: labelComponent }}
                        />
                      )}
                      name="labels"
                      control={control}
                    />
                  </Col>
                  <Col className="mb-1" md="3">
                    <Label className="form-label required" for="priorities">
                      Độ ưu tiên :
                    </Label>
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
                  <Col className="mb-1" md="3">
                    <Label className="form-label required" for="owners">
                      Phân công cho :
                    </Label>
                    <div className="d-flex align-items-center mt-50">
                      <AvatarGroup data={memberSelectedList} addMember={true} funCallBack={toggleModalMember} />
                    </div>
                  </Col>
                  <Col className="mb-1" md="12">
                    <InputElement innerElement={Input} name="document" label="Tài liệu :" placeholder="Vui lòng nhập liên kết tài liệu" />
                  </Col>
                  <Col className="mb-1" md="12">
                    <CkEditor name="about" label="Chi tiết :" />
                  </Col>
                </Row>
                <div className="d-flex justify-content-between mt-2 mb-2">
                  <Button color="secondary" className="btn-prev" outline>
                    <ArrowLeft size={14} className="align-middle mr-sm-25 mr-0"></ArrowLeft>
                    <span className="align-middle d-sm-inline-block d-none mx-2">Hủy</span>
                  </Button>
                  <Button color="primary" className="btn-next" type="submit">
                    <span className="align-middle d-sm-inline-block d-none mx-2">Cập nhật</span>
                    <Check size={14} className="align-middle ml-sm-25 ml-0" />
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {modalMember && (
        <ModalComponent modal={modalMember} toggle={toggleModalMember}>
          <TaskMember />
        </ModalComponent>
      )}
    </Fragment>
  );
};
export default TaskCreate;
