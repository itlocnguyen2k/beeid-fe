import { Fragment } from "react";
import { ChevronLeft } from "react-feather";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, CardText, CardTitle, Form, Input } from "reactstrap";
import InputElement from "../../../components/input-element/InputElement";
import { EMAIL_REGEX } from "../../../constants/validation";

const ResetPassword = (props) => {
  const { onSubmit } = props;
  const { t } = useTranslation();
  const { handleSubmit } = useFormContext();
  return (
    <Fragment>
      <CardTitle tag="h4" className="mb-1">
        Quên mật khẩu 👋
      </CardTitle>
      <CardText className="mb-2">Hãy nhập Email và chúng tôi sẽ gửi lại bạn hướng dẫn cấp lại mật khẩu !</CardText>
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
        <Button color="primary" block type="submit">
          Xác thực
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
export default ResetPassword;
