import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, CardText, CardTitle, Form, Input, Label } from "reactstrap";
import InputElement from "../../components/input-element/InputElement";
import InputPasswordToggle from "../../components/input-password-toggle/InputPasswordToggle";
import { EMAIL_REGEX } from "../../constants/validation";

const Login = (props) => {
  const { onSubmit } = props;
  const { t } = useTranslation();
  const { handleSubmit } = useFormContext();

  return (
    <Fragment>
      <CardTitle tag="h4" className="mb-1">
        Chào mừng bạn đến với beeid 👋
      </CardTitle>
      <CardText className="mb-2">Hãy đăng nhập tài khoản để tiếp tục trải nghiệm !</CardText>
      <Form className="auth-login-form mt-2 mb-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <InputElement
            innerElement={Input}
            name="email"
            label="E-mail :"
            type="email"
            placeholder="john@example.com"
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
        </div>
        <div className="mb-1">
          <InputElement
            innerElement={InputPasswordToggle}
            name="password"
            type="password"
            label="Mật khẩu :"
            placeholder="············"
            required
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
          >
            <Link to="/reset-password">
              <small>Quên mật khẩu</small>
            </Link>
          </InputElement>
        </div>
        <div className="mb-1">
          <Input type="checkbox" className="custom-control-Primary" id="remember-me" />
          <Label check className="mx-1">
            Nhớ mật khẩu
          </Label>
        </div>
        <Button color="primary" block type="submit">
          Đăng nhập
        </Button>
      </Form>
    </Fragment>
  );
};
export default Login;
