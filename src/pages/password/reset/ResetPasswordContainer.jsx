import { lazy, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { finalize, map } from "rxjs";
import { RESET_PASSWORD_API } from "../../../constants/api";
import { VERIFY_PASSWORD_CODE_URL } from "../../../constants/url";
import { useHttp } from "../../../hook/useHttp";
import { toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const ResetPassword = lazy(() => import("./ResetPassword"));

const ResetPasswordContainer = () => {
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const { getValues } = methods;
  const http = useHttp();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback(() => {
    const parameters = {
      email: getValues("email"),
    };

    const s = http
      .post(RESET_PASSWORD_API, createParametersRequest(parameters))
      .pipe(
        map((response) => {
          if (response.code !== 200) {
            throw new Error(response.message || t("message.server_error"));
          }
          return response;
        }),
        finalize(() => {
          s.unsubscribe();
        }),
      )
      .subscribe({
        next: (response) => {
          if (response.data) {
            navigate(VERIFY_PASSWORD_CODE_URL, { state: { email: getValues("email") } });
          } else {
            toggleSweetAlert("Thông báo", response.message, "info");
          }
        },
        error: (err) => {
          toggleSweetAlert("Thông báo", err.message, "error");
        },
      });
  }, [getValues, t, http, navigate]);
  return (
    <FormProvider {...methods}>
      <ResetPassword onSubmit={onSubmit} />
    </FormProvider>
  );
};
export default ResetPasswordContainer;
