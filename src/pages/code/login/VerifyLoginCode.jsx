import { Fragment } from "react";
import { RefreshCw } from "react-feather";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Button, CardText, CardTitle, Form, Input } from "reactstrap";
import InputElement from "../../../components/input-element/InputElement";

const VerifyLoginCode = (props) => {
  const { state } = useLocation();
  const { onSubmit, tryVerifyLoginCode } = props;
  const { t } = useTranslation();
  const { handleSubmit } = useFormContext();
  return (
    <Fragment>
      <CardTitle tag="h4" className="mb-1">
        Xác thực tài khoản 💬
      </CardTitle>
      <CardText>Chúng tôi đã gửi mã xác thực cho bạn. Vui lòng kiểm tra Email.</CardText>
      <p className="card-text fw-bolder mb-2">{state?.email}</p>
      <Form className="auth-login-form mt-2 mb-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <InputElement
            innerElement={Input}
            name="loginCode"
            label="Mã xác thực :"
            type="text"
            placeholder="············"
            required
            rules={{
              required: {
                value: true,
                message: t("message.validation.required", {
                  name: "Mã xác thực",
                }),
              },
            }}
          />
        </div>
        <Button color="primary" block type="submit">
          Xác thực
        </Button>
      </Form>
      <p className="text-center mt-2">
        <Link
          to=""
          onClick={(e) => {
            e.preventDefault();
            tryVerifyLoginCode();
          }}
        >
          <RefreshCw style={{ marginRight: "5px" }} size={14} />
          <span className="align-middle">Thử lại</span>
        </Link>
      </p>
    </Fragment>
  );
};
export default VerifyLoginCode;
