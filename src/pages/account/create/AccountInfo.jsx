import { Fragment } from "react";
import Select from "react-select";
import { ArrowLeft, ArrowRight, Trash, Upload } from "react-feather";
import { Label, Row, Col, Form, Input, Button, Media, FormFeedback } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "../../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import "../../../@core/scss/react/libs/react-select/_react-select.scss";
import Avatar from "../../../components/avatar/Avatar";
import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import InputElement from "../../../components/input-element/InputElement";
import { EMAIL_REGEX } from "../../../constants/validation";
import CkEditor from "../../../components/ckeditor/CkEditor";

const AccountInfo = (props) => {
  const { setAvatar, avatarPreview, setAvatarPreview, onSubmit } = props;
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  const genderOptions = [
    { value: "1", label: "Nam" },
    { value: "0", label: "Nữ" },
  ];

  const roleOptions = [
    { value: "1", label: "Administrator" },
    { value: "0", label: "Staff" },
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

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Media className="d-flex justify-content-center">
            <Media className="mr-25 mb-1" center>
              {avatarPreview ? (
                <Avatar img={avatarPreview} size="xl" />
              ) : (
                <Avatar content={getValues("fullName") || "G"} initials size="xl" />
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
            <div className="divider-text">Thiết lập tài khoản</div>
          </div>
          <Col className="mb-1" md="4">
            <InputElement
              innerElement={Input}
              name="email"
              label="E-mail :"
              type="email"
              placeholder="Vui lòng nhập thông tin E-mail"
              required
              rules={{
                required: {
                  value: true,
                  message: t("message.validation.required", {
                    name: "E-mail",
                  }),
                },
                pattern: {
                  value: new RegExp(EMAIL_REGEX),
                  message: t("message.validation.email"),
                },
              }}
            />
          </Col>
          <Col className="mb-1" md="4">
            <InputElement
              innerElement={Input}
              name="userName"
              label="Biệt danh :"
              placeholder="Vui lòng nhập thông tin biệt danh"
              required
              rules={{
                required: {
                  value: true,
                  message: t("message.validation.required", {
                    name: "Biệt danh",
                  }),
                },
              }}
            />
          </Col>
          <Col className="mb-1" md="4">
            <Label className="form-label required" for="role">
              Loại tài khoản :
            </Label>
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
        </Row>
        <Row>
          <div className="divider">
            <div className="divider-text">Thông tin cá nhân</div>
          </div>
          <Col className="mb-1" md="4">
            <InputElement
              innerElement={Input}
              name="fullName"
              label="Họ và tên :"
              placeholder="Vui lòng nhập thông tin họ và tên"
              required
              rules={{
                required: {
                  value: true,
                  message: t("message.validation.required", {
                    name: "Họ và tên",
                  }),
                },
              }}
            />
          </Col>
          <Col className="mb-1" md="4">
            <Label className="form-label required" for="gender">
              Giới tính :
            </Label>
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
          <Col className="mb-1" md="4">
            <Label className="form-label required" for="dob">
              Ngày sinh :
            </Label>
            <Controller
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  className="form-control"
                  options={{ dateFormat: "d/m/Y" }}
                  placeholder="Vui lòng nhập thông tin ngày sinh"
                />
              )}
              name="dob"
              control={control}
              type="date"
              rules={{
                required: {
                  value: true,
                  message: t("message.validation.required", {
                    name: "Ngày sinh",
                  }),
                },
              }}
            />
            {errors.dob && <FormFeedback className="d-block">{errors.dob.message}</FormFeedback>}
          </Col>
          <Col className="mb-1" md="12">
            <InputElement
              innerElement={Input}
              name="position"
              label="Vị trí :"
              placeholder="Vui lòng nhập thông tin vị trí"
              required
              rules={{
                required: {
                  value: true,
                  message: t("message.validation.required", {
                    name: "Vị trí",
                  }),
                },
              }}
            />
          </Col>
          <Col className="mb-1" md="12">
            <CkEditor name="about" label="Chi tiết :" />
          </Col>
        </Row>
        <div className="d-flex justify-content-between mt-2">
          <Button color="secondary" className="btn-prev" outline>
            <ArrowLeft size={14} className="align-middle mr-sm-25 mr-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none mx-2">Hủy</span>
          </Button>
          <Button color="primary" type="submit" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none mx-2">Tiếp</span>
            <ArrowRight size={14} className="align-middle ml-sm-25 ml-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AccountInfo;
