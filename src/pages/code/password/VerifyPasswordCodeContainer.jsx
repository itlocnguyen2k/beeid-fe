import { useCallback } from "react";
import { lazy } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { TRY_VERIFY_PASSWORD_CODE_API, VERIFY_PASSWORD_CODE_API } from "../../../constants/api";
import { LOGIN_URL } from "../../../constants/url";
import { useHttp } from "../../../hook/useHttp";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const VerifyPasswordCode = lazy(() => import("./VerifyPasswordCode"));

const VerifyPasswordCodeContainer = () => {
  const { state } = useLocation();
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const { getValues } = methods;
  const http = useHttp();
  const navigate = useNavigate();

  const onSubmit = useCallback(async () => {
    const parameters = {
      email: state?.email,
      passwordCode: getValues("passwordCode"),
    };
    try {
      const response = await getResponseFromServerWithParameters(http, VERIFY_PASSWORD_CODE_API, createParametersRequest(parameters));
      if (response) {
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        navigate(LOGIN_URL);
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [getValues, http, state, navigate]);

  const tryVerifyPasswordCode = useCallback(async () => {
    const parameters = {
      email: state?.email,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, TRY_VERIFY_PASSWORD_CODE_API, parameters);
      if (response) {
        toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, state]);

  return (
    <FormProvider {...methods}>
      <VerifyPasswordCode onSubmit={onSubmit} tryVerifyPasswordCode={tryVerifyPasswordCode} />
    </FormProvider>
  );
};
export default VerifyPasswordCodeContainer;
