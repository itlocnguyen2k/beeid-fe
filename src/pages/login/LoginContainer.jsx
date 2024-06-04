import { lazy, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hook/useHttp";
import { createParametersRequest, saveAccessToken } from "../../utils/sessionStorageHelper";
import { LOGIN_API } from "../../constants/api";
import { VERIFY_LOGIN_CODE_URL } from "../../constants/url";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../utils/helpers";

const Login = lazy(() => import("./Login"));

const LoginContainer = () => {
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const { getValues } = methods;
  const http = useHttp();
  const navigate = useNavigate();

  const onSubmit = useCallback(async () => {
    const parameters = {
      email: getValues("email"),
      password: getValues("password"),
    };

    try {
      const response = await getResponseFromServerWithParameters(http, LOGIN_API, createParametersRequest(parameters));
      if (response.data.token) {
        saveAccessToken(response.data.token);
        navigate(VERIFY_LOGIN_CODE_URL, { state: { email: getValues("email") } });
      } else {
        toggleSweetAlert("Thông báo", response.message, "info");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [getValues, http, navigate]);

  return (
    <FormProvider {...methods}>
      <Login onSubmit={onSubmit} />
    </FormProvider>
  );
};
export default LoginContainer;
