import { Fragment, useState } from "react";
import { ArrowLeft, Check, Trash, Upload } from "react-feather";
import "../../../@core/scss/react/libs/react-select/_react-select.scss";
import { Label, Row, Col, Form, Input, Button, Media, FormFeedback, Card, CardBody } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "../../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import "../../../@core/scss/react/libs/react-select/_react-select.scss";
import Avatar from "../../../components/avatar/Avatar";
import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { useEffect } from "react";
import { completePhotoPath } from "../../../utils/helpers";
import InputElement from "../../../components/input-element/InputElement";
import AvatarGroup from "../../../components/avatar-group/AvatarGroup";
import ModalComponent from "../../../components/modal/ModalComponent";
import ProjectMember from "./ProjectMember";
import { useContext } from "react";
import ProjectContext from "../../../context/ProjectContext";
import CkEditor from "../../../components/ckeditor/CkEditor";
import { isAfter, isBefore } from "date-fns";

const ProjectInfo = () => {
  const projectContext = useContext(ProjectContext);
  const { onSubmit, project, memberSelectedList } = projectContext;
  const { t } = useTranslation();
  const {
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const categoriesOptions = [
    { value: "1", label: "Outsource" },
    { value: "2", label: "Product" },
    { value: "0", label: "Khác" },
  ];

  const modeOptions = [
    { value: "1", label: "Công khai" },
    { value: "0", label: "Bảo mật" },
  ];

  const statusOptions = [
    { value: "1", label: "Đang hoạt động" },
    { value: "0", label: "Đã đóng" },
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

  const [modalMember, setModalMember] = useState(false);
  const toggleModalMember = () => {
    setModalMember(!modalMember);
  };

  useEffect(() => {
    if (project) {
      setAvatarPreview(project.avatar);
      for (const [key, value] of Object.entries(project)) {
        if (value) {
          if (key === "mode" || key === "status" || key === "category") {
            setValue(key, { value: value, label: t(`${key}_mapping.${project[key]}`, { defaultValue: "" }) });
          } else {
            setValue(key, value);
          }
        }
      }
    }
  }, [project, setValue, t]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(() => onSubmit(getValues(), avatar))}>
        <Row>
          <Col lg="12">
            <Card style={{ paddingBottom: "5px" }}>
              <CardBody>
                <Row>
                  <Media className="d-flex justify-content-center">
                    <Media className="mr-25 mb-1" center>
                      {avatarPreview ? (
                        <Avatar img={completePhotoPath(avatarPreview)} size="xl" />
                      ) : (
                        <Avatar content={getValues("projectName") || "G"} initials size="xl" />
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
                  <Col className="mb-1" md="4">
                    <InputElement
                      innerElement={Input}
                      name="projectName"
                      label="Dự án :"
                      placeholder="Vui lòng nhập thông tin dự án"
                      required
                      rules={{
                        required: {
                          value: true,
                          message: t("message.validation.required", {
                            name: "Dự án",
                          }),
                        },
                      }}
                    />
                  </Col>
                  <Col className="mb-1" md="4">
                    <Label className="form-label required" for="startDate">
                      Ngày bắt đầu :
                    </Label>
                    <Controller
                      render={({ field }) => (
                        <Flatpickr {...field} className="form-control" options={{ dateFormat: "d/m/Y" }} placeholder="Ngày bắt đầu" />
                      )}
                      name="startDate"
                      control={control}
                      type="date"
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
                  <Col className="mb-1" md="4">
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
                  <Col className="mb-1" md="12">
                    <InputElement
                      innerElement={Input}
                      name="description"
                      label="Mô tả :"
                      placeholder="Vui lòng nhập thông tin mô tả"
                      required
                      rules={{
                        required: {
                          value: true,
                          message: t("message.validation.required", {
                            name: "Mô tả",
                          }),
                        },
                      }}
                    />
                  </Col>
                  <Col className="mb-1" md="3">
                    <Label className="form-label required" for="category">
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
                  <Col className="mb-1" md="3">
                    <Label className="form-label required" for="mode">
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
                  <Col className="mb-1" md="3">
                    <Label className="form-label required" for="status">
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
                  <Col className="mb-1" md="3">
                    <Label className="form-label required" for="owners">
                      Thành viên :
                    </Label>
                    <div className="d-flex align-items-center mt-50">
                      <AvatarGroup data={memberSelectedList} addMember={true} funCallBack={toggleModalMember} />
                    </div>
                  </Col>
                  <Col className="mb-1" md="12">
                    <CkEditor name="about" label="Chi tiết :" />
                  </Col>
                </Row>
              </CardBody>
            </Card>
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
      {modalMember && (
        <ModalComponent modal={modalMember} toggle={toggleModalMember}>
          <ProjectMember />
        </ModalComponent>
      )}
    </Fragment>
  );
};

export default ProjectInfo;
