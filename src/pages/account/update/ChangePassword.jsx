import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, Label, Row } from "reactstrap";
import InputPasswordToggle from "../../../components/input-password-toggle/InputPasswordToggle";

const ChangePassword = (props) => {
  const { onSubmitChangePassword } = props;
  const { t } = useTranslation();
  const {
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    reValidateMode: "all",
  });

  return (
    <Card className="mb-0">
      <CardHeader>
        <CardTitle tag="h4" className="mb-2">
          Thay đổi mật khẩu
        </CardTitle>
      </CardHeader>
      <CardBody onSubmit={handleSubmit(() => onSubmitChangePassword(getValues()))}>
        <Form>
          <Row className="mb-1 d-flex justify-content-center">
            <Col lg="6">
              <Label className="form-label required" for="passwordOld">
                Mật khẩu cũ :
              </Label>
              <Controller
                render={({ field }) => (
                  <InputPasswordToggle
                    {...field}
                    onBlur={(e) => {
                      setValue(e.currentTarget.name, e.currentTarget.value.trim(), { shouldValidate: true });
                    }}
                  />
                )}
                control={control}
                className="input-group-merge"
                name="passwordOld"
                id="passwordOld"
                placeholder="············"
                rules={{
                  required: {
                    value: true,
                    message: t("message.validation.required", {
                      name: "Mật khẩu",
                    }),
                  },
                  minLength: {
                    value: 8,
                    message: t("message.validation.min", { name: "Mật khẩu", min: 8 }),
                  },
                }}
              />
              {errors.passwordOld && <FormFeedback className="d-block">{errors.passwordOld.message}</FormFeedback>}
            </Col>
          </Row>
          <Row className="mb-1 d-flex justify-content-center">
            <Col lg="6">
              <Label className="form-label required" for="passwordNew">
                Mật khẩu mới :
              </Label>
              <Controller
                render={({ field }) => (
                  <InputPasswordToggle
                    {...field}
                    onBlur={(e) => {
                      setValue(e.currentTarget.name, e.currentTarget.value.trim(), { shouldValidate: true });
                    }}
                  />
                )}
                control={control}
                className="input-group-merge"
                name="passwordNew"
                id="passwordNew"
                placeholder="············"
                rules={{
                  required: {
                    value: true,
                    message: t("message.validation.required", {
                      name: "Mật khẩu",
                    }),
                  },
                  minLength: {
                    value: 8,
                    message: t("message.validation.min", { name: "Mật khẩu", min: 8 }),
                  },
                  validate: (passwordNew) => {
                    if (passwordNew) {
                      const passwordConfirm = getValues("passwordConfirm");
                      if (passwordConfirm && passwordNew !== passwordConfirm) {
                        return t("message.validation.password", { target: "Mật khẩu mới", source: "mật khẩu xác nhận" });
                      }
                    }
                  },
                }}
              />
              {errors.passwordNew && <FormFeedback className="d-block">{errors.passwordNew.message}</FormFeedback>}
            </Col>
          </Row>
          <Row className="mb-1 d-flex justify-content-center">
            <Col lg="6">
              <Label className="form-label required" for="passwordConfirm">
                Xác nhận mật khẩu mới :
              </Label>
              <Controller
                render={({ field }) => (
                  <InputPasswordToggle
                    {...field}
                    onBlur={(e) => {
                      setValue(e.currentTarget.name, e.currentTarget.value.trim(), { shouldValidate: true });
                    }}
                  />
                )}
                control={control}
                className="input-group-merge"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="············"
                rules={{
                  required: {
                    value: true,
                    message: t("message.validation.required", {
                      name: "Mật khẩu",
                    }),
                  },
                  minLength: {
                    value: 8,
                    message: t("message.validation.min", { name: "Mật khẩu", min: 8 }),
                  },
                  validate: (passwordConfirm) => {
                    if (passwordConfirm) {
                      const passwordNew = getValues("passwordNew");
                      if (passwordNew && passwordNew !== passwordConfirm) {
                        return t("message.validation.password", { target: "Mật khẩu xác nhận", source: "mật khẩu mới" });
                      }
                    }
                  },
                }}
              />
              {errors.passwordConfirm && <FormFeedback className="d-block">{errors.passwordConfirm.message}</FormFeedback>}
            </Col>
          </Row>
          <Row form className="mt-1 mb-0 d-flex justify-content-center">
            <Col lg="4" md="6" className="d-flex justify-content-center">
              <Button type="submit" color="primary" className="me-1">
                Đổi mật khẩu
              </Button>
              <Button type="reset" color="secondary" outline>
                Hủy
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default ChangePassword;
