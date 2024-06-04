import { useCallback } from "react";
import { lazy } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TRY_VERIFY_LOGIN_CODE_API, VERIFY_LOGIN_CODE_API } from "../../../constants/api";
import { CHANGE_PASSWORD_FIRST_TIME_URL, HOME } from "../../../constants/url";
import { useAuth } from "../../../hook/useAuth";
import { useHttp } from "../../../hook/useHttp";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest, saveAccountInfo } from "../../../utils/sessionStorageHelper";

const VerifyLoginCode = lazy(() => import("./VerifyLoginCode"));

const VerifyLoginCodeContainer = () => {
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const { getValues } = methods;
  const http = useHttp();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const onSubmit = useCallback(async () => {
    const parameters = {
      loginCode: getValues("loginCode"),
    };
    try {
      const response = await getResponseFromServerWithParameters(http, VERIFY_LOGIN_CODE_API, createParametersRequest(parameters));
      if (response.data) {
        saveAccountInfo(response.data.account);
        setAuth({ account: response.data.account, isAuthenticated: true });
        if (response.data.account.isLoginFirstTime) {
          navigate(CHANGE_PASSWORD_FIRST_TIME_URL);
        } else {
          navigate(HOME);
        }
      } else {
        toggleSweetAlert("Thông báo", response.message, "info");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [getValues, http, navigate, setAuth]);

  const tryVerifyLoginCode = useCallback(async () => {
    try {
      const response = await getResponseFromServerWithParameters(http, TRY_VERIFY_LOGIN_CODE_API);
      if (response) {
        toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
      } else {
        toggleSweetAlert("Thông báo", response.message, "info");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http]);

  return (
    <FormProvider {...methods}>
      <VerifyLoginCode onSubmit={onSubmit} tryVerifyLoginCode={tryVerifyLoginCode} />
    </FormProvider>
  );
};
export default VerifyLoginCodeContainer;
