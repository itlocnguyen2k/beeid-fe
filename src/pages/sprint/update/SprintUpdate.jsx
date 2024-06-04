import { Card, CardBody, CardHeader, CardTitle, Col, Form, Button, Input, Label, Row, FormFeedback, Media } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "../../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import Avatar from "../../../components/avatar/Avatar";
import { ArrowLeft, Check, RefreshCcw, Trash, Upload, X } from "react-feather";
import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import { Fragment, useState } from "react";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import { useCallback } from "react";
import { useEffect } from "react";
import ModalComponent from "../../../components/modal/ModalComponent";
import AvatarGroup from "../../../components/avatar-group/AvatarGroup";
import SprintMember from "./SprintMember";
import SprintCategory from "./SprintCategory";
import SprintLabel from "./SprintLabel";
import SprintPriority from "./SprintPriority";
import BackButton from "../../../components/link/BackButton";
import { useContext } from "react";
import SprintContext from "../../../context/SprintContext";
import { useStore } from "../../../store/StoreHooks";
import { onSelected } from "../../../reducer/SprintReducer";
import { ON_SELECTED_CATEGORY, ON_SELECTED_LABEL, ON_SELECTED_PRIORITY } from "../../../constants/action";
import { completePhotoPath } from "../../../utils/helpers";
import CkEditor from "../../../components/ckeditor/CkEditor";
import { isAfter, isBefore } from "date-fns";

const SprintUpdate = () => {
  const sprintContext = useContext(SprintContext);
  const { onSubmit, sprint, memberSelectedList, labelSelectedList, categorySelectedList, prioritySelectedList, dispatch } = sprintContext;
  const [storeState] = useStore();
  const { t } = useTranslation();
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
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
  const [modalCategory, setModalCategory] = useState(false);
  const toggleModalCategory = () => {
    setModalCategory(!modalCategory);
  };
  const [modalLabel, setModalLabel] = useState(false);
  const toggleModalLabel = () => {
    setModalLabel(!modalLabel);
  };
  const [modalPriority, setModalPriority] = useState(false);
  const toggleModalPriority = () => {
    setModalPriority(!modalPriority);
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

  useEffect(() => {
    if (sprint) {
      setAvatarPreview(sprint.avatar);
      for (const [key, value] of Object.entries(sprint)) {
        if (value) {
          setValue(key, value);
        }
      }
    }
  }, [sprint, setValue, t]);

  const renderCategory = useCallback(() => {
    if (categorySelectedList?.length > 0) {
      return categorySelectedList.map((data) => (
        <Col className="mb-1" md="12" key={data._id}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className={`bullet bullet-xl me-1 avatar-sm`} style={{ borderRadius: "50%", backgroundColor: data.color }} />
              <div className="user-info text-truncate ml-1">
                <span className="d-block font-weight-bold text-truncate mx-1">{data.categoryName}</span>
              </div>
            </div>
            <div className="d-flex align-items-center cursor-pointer">
              <X
                size={24}
                className="mx-0"
                onClick={() => dispatch(onSelected(ON_SELECTED_CATEGORY, data, categorySelectedList, storeState.categoryOrgList))}
              />
            </div>
          </div>
        </Col>
      ));
    }
  }, [categorySelectedList, dispatch, storeState]);

  const renderLabel = useCallback(() => {
    if (labelSelectedList?.length > 0) {
      return labelSelectedList.map((data) => (
        <Col className="mb-1" md="12" key={data._id}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className={`bullet bullet-xl me-1 avatar-sm`} style={{ borderRadius: "50%", backgroundColor: data.color }} />
              <div className="user-info text-truncate ml-1">
                <span className="d-block font-weight-bold text-truncate mx-1">{data.labelName}</span>
              </div>
            </div>
            <div className="d-flex align-items-center cursor-pointer">
              <X
                size={24}
                className="mx-0"
                onClick={() => dispatch(onSelected(ON_SELECTED_LABEL, data, labelSelectedList, storeState.labelOrgList))}
              />
            </div>
          </div>
        </Col>
      ));
    }
  }, [labelSelectedList, dispatch, storeState]);

  const renderPriority = useCallback(() => {
    if (prioritySelectedList?.length > 0) {
      return prioritySelectedList.map((data) => (
        <Col className="mb-1" md="12" key={data._id}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className={`bullet bullet-xl me-1 avatar-sm`} style={{ borderRadius: "50%", backgroundColor: data.color }} />
              <div className="user-info text-truncate ml-1">
                <span className="d-block font-weight-bold text-truncate mx-1">{data.priorityName}</span>
              </div>
            </div>
            <div className="d-flex align-items-center cursor-pointer">
              <X
                size={24}
                className="mx-0"
                onClick={() => dispatch(onSelected(ON_SELECTED_PRIORITY, data, prioritySelectedList, storeState.priorityOrgList))}
              />
            </div>
          </div>
        </Col>
      ));
    }
  }, [prioritySelectedList, dispatch, storeState]);

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Chỉnh sửa giai đoạn" breadCrumbParent="Giai đoạn" breadCrumbActive="Chỉnh sửa giai đoạn">
        <BackButton />
      </Breadcrumbs>
      <Row className="d-flex justify-content-center">
        <Col lg="10">
          <Card>
            <CardHeader>
              <CardTitle tag="h4" className="mb-2">
                Chỉnh sửa giai đoạn
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
                  <div className="divider">
                    <div className="divider-text">Thông tin cơ bản</div>
                  </div>
                  <Col className="mb-1" md="12">
                    <Label className="form-label" for="sprintName">
                      Giai đoạn :
                    </Label>
                    <Controller
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Vui lòng nhập thông tin sprint"
                          onBlur={(e) => {
                            setValue(e.currentTarget.name, e.currentTarget.value.trim(), { shouldValidate: true });
                          }}
                        />
                      )}
                      name="sprintName"
                      control={control}
                      type="text"
                      rules={{
                        required: {
                          value: true,
                          message: t("message.validation.required", {
                            name: "Sprint",
                          }),
                        },
                      }}
                    />
                    {errors.sprintName && <FormFeedback className="d-block">{errors.sprintName.message}</FormFeedback>}
                  </Col>
                  <Col className="mb-1" md="4">
                    <Label className="form-label">Ngày bắt đầu :</Label>
                    <Controller
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
                          className="form-control"
                          options={{ dateFormat: "d/m/Y" }}
                          placeholder="Vui lòng nhập thông tin ngày bắt đầu"
                        />
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
                    <Label className="form-label">Ngày kết thúc :</Label>
                    <Controller
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
                          className="form-control"
                          options={{ dateFormat: "d/m/Y" }}
                          placeholder="Vui lòng nhập thông tin ngày kết thúc"
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
                  <Col className="mb-1" md="4">
                    <Label className="form-label" for="owners">
                      Thành viên :
                    </Label>
                    <div className="d-flex align-items-center mt-50">
                      <AvatarGroup data={memberSelectedList} addMember={true} funCallBack={toggleModalMember} />
                    </div>
                  </Col>
                </Row>
                <div className="divider">
                  <div className="divider-text">Thông tin lựa chọn</div>
                </div>
                <Row>
                  <Col lg="4">
                    <div className="divider">
                      <div className="divider-text">Phân loại</div>
                    </div>
                    <Row>{renderCategory()}</Row>
                    <Button color="flat-primary" className="btn-next" type="button" block onClick={toggleModalCategory}>
                      <span className="align-middle d-sm-inline-block d-none mx-2">Thay đổi</span>
                      <RefreshCcw size={14} className="align-middle ml-sm-25 ml-0" />
                    </Button>
                  </Col>
                  <Col lg="4">
                    <div className="divider">
                      <div className="divider-text">Nhãn</div>
                    </div>
                    <Row>{renderLabel()}</Row>
                    <Button color="flat-primary" className="btn-next" type="button" block onClick={toggleModalLabel}>
                      <span className="align-middle d-sm-inline-block d-none mx-2">Thay đổi</span>
                      <RefreshCcw size={14} className="align-middle ml-sm-25 ml-0" />
                    </Button>
                  </Col>
                  <Col lg="4">
                    <div className="divider">
                      <div className="divider-text">Độ ưu tiên</div>
                    </div>
                    <Row>{renderPriority()}</Row>
                    <Button color="flat-primary" className="btn-next" type="button" block onClick={toggleModalPriority}>
                      <span className="align-middle d-sm-inline-block d-none mx-2">Thay đổi</span>
                      <RefreshCcw size={14} className="align-middle ml-sm-25 ml-0" />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <div className="divider">
                    <div className="divider-text">Thông tin chi tiết</div>
                  </div>
                  <Col className="mb-1" md="12">
                    <Label className="form-label" for="description">
                      Mô tả :
                    </Label>
                    <Controller
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Vui lòng nhập thông tin mô tả"
                          onBlur={(e) => {
                            setValue(e.currentTarget.name, e.currentTarget.value.trim(), { shouldValidate: true });
                          }}
                        />
                      )}
                      name="description"
                      control={control}
                      type="text"
                    />
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
          <SprintMember />
        </ModalComponent>
      )}
      {modalCategory && (
        <ModalComponent modal={modalCategory} toggle={toggleModalCategory}>
          <SprintCategory />
        </ModalComponent>
      )}
      {modalLabel && (
        <ModalComponent modal={modalLabel} toggle={toggleModalLabel}>
          <SprintLabel />
        </ModalComponent>
      )}
      {modalPriority && (
        <ModalComponent modal={modalPriority} toggle={toggleModalPriority}>
          <SprintPriority />
        </ModalComponent>
      )}
    </Fragment>
  );
};
export default SprintUpdate;
