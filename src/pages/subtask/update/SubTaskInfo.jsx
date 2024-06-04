import { Fragment, useContext, useEffect, useState } from "react";
import { ArrowLeft, Check, Trash, Upload } from "react-feather";
import "../../../@core/scss/react/libs/react-select/_react-select.scss";
import { Label, Row, Col, Form, Input, Button, Media, FormFeedback, Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "../../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import "../../../@core/scss/react/libs/react-select/_react-select.scss";
import Avatar from "../../../components/avatar/Avatar";
import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import Select, { components } from "react-select";
import { completePhotoPath, initDataSelection } from "../../../utils/helpers";
import CkEditor from "../../../components/ckeditor/CkEditor";
import InputElement from "../../../components/input-element/InputElement";
import SubTaskContext from "../../../context/SubTaskContext";
import { isAfter, isBefore } from "date-fns";

const SubTaskInfo = () => {
  const subTaskContext = useContext(SubTaskContext);
  const { onSubmit, memberList, categoryList, priorityList, subTask } = subTaskContext;
  const { t } = useTranslation();
  const {
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useFormContext({
    mode: "all",
    reValidateMode: "all",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (subTask) {
      setAvatarPreview(subTask.avatar);
      for (const [key, value] of Object.entries(subTask)) {
        if (value) {
          if (key === "point") {
            setValue(key, { value: value, label: value + " điểm" });
          } else if (key === "progress") {
            setValue(key, { value: value, label: value + "%" });
          } else if (key === "owners") {
            setValue(key, initDataSelection([value], "fullName")[0]);
          } else if (key === "priorities") {
            setValue(key, initDataSelection([value], "priorityName")[0]);
          } else if (key === "categories") {
            setValue(key, initDataSelection([value], "categoryName")[0]);
          } else {
            setValue(key, value);
          }
        }
      }
    }
  }, [subTask, setValue, t]);

  const progressOptions = [
    { value: 0, label: "0%" },
    { value: 10, label: "10%" },
    { value: 20, label: "20%" },
    { value: 30, label: "30%" },
    { value: 40, label: "40%" },
    { value: 50, label: "50%" },
    { value: 60, label: "60%" },
    { value: 70, label: "70%" },
    { value: 80, label: "80%" },
    { value: 90, label: "90%" },
    { value: 100, label: "100%" },
  ];

  const pointOptions = [
    { value: 0, label: "0 điểm" },
    { value: 1, label: "1 điểm" },
    { value: 2, label: "2 điểm" },
    { value: 3, label: "3 điểm" },
    { value: 4, label: "4 điểm" },
    { value: 5, label: "5 điểm" },
    { value: 6, label: "6 điểm" },
    { value: 7, label: "7 điểm" },
    { value: 8, label: "8 điểm" },
    { value: 9, label: "9 điểm" },
    { value: 10, label: "10 điểm" },
  ];

  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      setAvatarPreview(reader.result);
    };
    setAvatar(files[0]);
    reader.readAsDataURL(files[0]);
  };

  const memberComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {data.avatar ? <Avatar img={completePhotoPath(data.avatar)} /> : <Avatar content={data.fullName || "G"} initials />}
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data.fullName}</span>
            <small className="mx-1">@{data.userName}</small>
          </div>
        </div>
      </components.Option>
    );
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
      <Row className="d-flex justify-content-center">
        <Col lg="10">
          <Card>
            <CardHeader>
              <CardTitle tag="h4" className="mb-2">
                Chỉnh sửa mới công việc phụ
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit(() => onSubmit(avatar))}>
                <Row>
                  <Media className="d-flex justify-content-center">
                    <Media className="mr-25 mb-1" center>
                      {avatarPreview ? (
                        <Avatar img={completePhotoPath(avatarPreview)} size="xl" />
                      ) : (
                        <Avatar content={getValues("subTitle") || "G"} initials size="xl" />
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
                      name="subTitle"
                      label="Tiêu đề :"
                      placeholder="Vui lòng nhập thông tin công việc phụ"
                      required
                    />
                  </Col>
                  <Col className="mb-1" md="3">
                    <Label className="form-label" for="startDate">
                      Thời gian bắt đầu :
                    </Label>
                    <Controller
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
                          className="form-control"
                          options={{ dateFormat: "d/m/Y H:i", enableTime: true }}
                          placeholder="Vui lòng nhập bắt đầu"
                        />
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
                    <Label className="form-label" for="endDate">
                      Thời gian hoàn thành :
                    </Label>
                    <Controller
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
                          className="form-control"
                          options={{ dateFormat: "d/m/Y H:i", enableTime: true }}
                          placeholder="Vui lòng nhập thời gian hoàn thành"
                        />
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
                    <Label className="form-label" for="estimate">
                      Thời gian dự định :
                    </Label>
                    <Controller
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Vui lòng nhập thông tin thời gian dự định"
                          onBlur={(e) => {
                            setValue(e.currentTarget.name, e.currentTarget.value.trim(), { shouldValidate: true });
                          }}
                        />
                      )}
                      name="estimate"
                      control={control}
                      type="text"
                    />
                  </Col>
                  <Col className="mb-1" md="3">
                    <Label className="form-label" for="actual">
                      Thời gian thực tế :
                    </Label>
                    <Controller
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Vui lòng nhập thông tin thời gian thực tế"
                          onBlur={(e) => {
                            setValue(e.currentTarget.name, e.currentTarget.value.trim(), { shouldValidate: true });
                          }}
                        />
                      )}
                      name="actual"
                      control={control}
                      type="text"
                    />
                  </Col>
                  <div className="divider">
                    <div className="divider-text">Thông tin lựa chọn</div>
                  </div>
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
                    <Label className="form-label" for="progress">
                      Tiến độ:
                    </Label>
                    <Controller
                      render={({ field }) => (
                        <Select
                          {...field}
                          isClearable={false}
                          className="react-select"
                          classNamePrefix="select"
                          options={progressOptions}
                          defaultValue={progressOptions[0]}
                          inputProps={{ autoComplete: "off", autoCorrect: "off", spellCheck: "off" }}
                        />
                      )}
                      name="progress"
                      control={control}
                    />
                  </Col>
                  <Col className="mb-1" md="3">
                    <Label className="form-label" for="owners">
                      Phân công cho :
                    </Label>
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
                  <Col className="mb-1" md="9">
                    <InputElement
                      innerElement={Input}
                      name="module"
                      label="Phạm vi :"
                      placeholder="Vui lòng nhập thông tin phạm vi"
                      required
                      rules={{
                        required: {
                          value: true,
                          message: t("message.validation.required", {
                            name: "Phạm vi",
                          }),
                        },
                      }}
                    />
                  </Col>
                  <Col className="mb-1" md="3">
                    <Label className="form-label" for="point">
                      Điểm thưởng :
                    </Label>
                    <Controller
                      render={({ field }) => (
                        <Select
                          {...field}
                          isClearable={false}
                          className="react-select"
                          classNamePrefix="select"
                          options={pointOptions}
                          defaultValue={pointOptions[0]}
                          inputProps={{ autoComplete: "off", autoCorrect: "off", spellCheck: "off" }}
                        />
                      )}
                      name="point"
                      control={control}
                    />
                  </Col>
                  <Col className="mb-1" md="12">
                    <CkEditor name="about" label="Chi tiết :" />
                  </Col>
                </Row>
                <div className="d-flex justify-content-between mt-2 mb-2">
                  <Button color="secondary" className="btn-prev" outline disabled>
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
    </Fragment>
  );
};

export default SubTaskInfo;
