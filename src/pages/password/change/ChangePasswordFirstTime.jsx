import { Fragment } from "react";
import { ChevronLeft } from "react-feather";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, CardText, CardTitle, Form } from "reactstrap";
import InputElement from "../../../components/input-element/InputElement";
import InputPasswordToggle from "../../../components/input-password-toggle/InputPasswordToggle";

const ChangePasswordFirstTime = (props) => {
  const { onSubmit } = props;
  const { t } = useTranslation();
  const { handleSubmit, getValues } = useFormContext();
  return (
    <Fragment>
      <CardTitle tag="h4" className="mb-1">
        Đổi mật khẩu lần đầu 👋
      </CardTitle>
      <CardText className="mb-2">Đây là lần đầu tiên bạn đăng nhập. Hãy đổi cho mình một mật khẩu khác nhé !</CardText>
      <Form className="auth-login-form mt-2 mb-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <InputElement
            innerElement={InputPasswordToggle}
            name="passwordOld"
            type="password"
            label="Mật khẩu cũ :"
            placeholder="············"
            required
            rules={{
              required: {
                value: true,
                message: t("message.validation.required", {
                  name: "Mật khẩu cũ",
                }),
              },
              minLength: {
                value: 8,
                message: t("message.validation.min", { name: "Mật khẩu cũ", min: 8 }),
              },
            }}
          />
        </div>
        <div className="mb-1">
          <InputElement
            innerElement={InputPasswordToggle}
            name="passwordNew"
            type="password"
            label="Mật khẩu mới :"
            placeholder="············"
            required
            rules={{
              required: {
                value: true,
                message: t("message.validation.required", {
                  name: "Mật khẩu mới",
                }),
              },
              minLength: {
                value: 8,
                message: t("message.validation.min", { name: "Mật khẩu mới", min: 8 }),
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
        </div>
        <div className="mb-1">
          <InputElement
            innerElement={InputPasswordToggle}
            name="passwordConfirm"
            type="password"
            label="Xác nhận mật khẩu mới :"
            placeholder="············"
            required
            rules={{
              required: {
                value: true,
                message: t("message.validation.required", {
                  name: "Mật khẩu xác nhận",
                }),
              },
              minLength: {
                value: 8,
                message: t("message.validation.min", { name: "Mật khẩu xác nhận", min: 8 }),
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
        </div>
        <Button color="primary" block>
          Đổi mật khẩu
        </Button>
      </Form>
      <p className="text-center mt-2">
        <Link to="/login">
          <ChevronLeft className="mr-25" size={14} />
          <span className="align-middle">Trở về màn hình đăng nhập</span>
        </Link>
      </p>
    </Fragment>
  );
};
export default ChangePasswordFirstTime;
