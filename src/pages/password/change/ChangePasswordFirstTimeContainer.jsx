import { useCallback } from "react";
import { lazy } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CHANGE_PASSWORD_FIRST_TIME_API } from "../../../constants/api";
import { HOME } from "../../../constants/url";
import { useAuth } from "../../../hook/useAuth";
import { useHttp } from "../../../hook/useHttp";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest, saveAccountInfo } from "../../../utils/sessionStorageHelper";

const ChangePasswordFirstTime = lazy(() => import("./ChangePasswordFirstTime"));

const ChangePasswordFirstTimeContainer = () => {
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
      passwordOld: getValues("passwordOld"),
      passwordNew: getValues("passwordNew"),
    };

    try {
      const response = await getResponseFromServerWithParameters(http, CHANGE_PASSWORD_FIRST_TIME_API, createParametersRequest(parameters));
      if (response.data) {
        saveAccountInfo(response.data.account);
        setAuth({ account: response.data.account, isAuthenticated: true });
        navigate(HOME);
      } else {
        toggleSweetAlert("Thông báo", response.message, "info");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [getValues, http, navigate, setAuth]);
  return (
    <FormProvider {...methods}>
      <ChangePasswordFirstTime onSubmit={onSubmit} />
    </FormProvider>
  );
};
export default ChangePasswordFirstTimeContainer;
