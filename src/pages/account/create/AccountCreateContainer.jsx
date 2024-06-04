import { useCallback } from "react";
import { lazy } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ACCOUNTS_CREATE_API } from "../../../constants/api";
import { useHttp } from "../../../hook/useHttp";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCOUNTS_LIST_URL } from "../../../constants/url";

const AccountCreate = lazy(() => import("./AccountCreate"));

const AccountCreateContainer = () => {
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
    defaultValues: {
      role: { value: "1", label: "Administrator" },
      gender: { value: "1", label: "Nam" },
    },
  });
  const navigate = useNavigate();
  const http = useHttp();
  const { getValues } = methods;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const onSubmit = useCallback(async () => {
    const form = new FormData();
    const data = getValues();
    for (const [key, values] of Object.entries(data)) {
      if (values) {
        if (key === "role" || key === "gender") {
          form.append(key, values.value);
        } else {
          form.append(key, values);
        }
      }
    }
    if (avatar) {
      form.append("file", avatar);
    }
    const parameters = {
      body: form,
    };

    try {
      const response = await getResponseFromServerWithParameters(http, ACCOUNTS_CREATE_API, parameters);
      await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
      if (response.data) {
        navigate(ACCOUNTS_LIST_URL);
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [getValues, http, avatar, navigate]);

  return (
    <FormProvider {...methods}>
      <AccountCreate onSubmit={onSubmit} setAvatar={setAvatar} avatarPreview={avatarPreview} setAvatarPreview={setAvatarPreview} />
    </FormProvider>
  );
};
export default AccountCreateContainer;
