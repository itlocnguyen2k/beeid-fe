import { lazy, useCallback } from "react";
import { useHttp } from "../../hook/useHttp";
import { createParametersRequest } from "../../utils/sessionStorageHelper";
import { getResponseFromServerWithParameters, settingKeys, toggleSweetAlert } from "../../utils/helpers";
import { useState } from "react";
import {
  SETTINGS_CATEGORY_LIST_API,
  SETTINGS_LABEL_LIST_API,
  SETTINGS_PRIORITY_LIST_API,
  SETTINGS_TEMPLATE_LIST_API,
} from "../../constants/api";
import { useEffect } from "react";

const Setting = lazy(() => import("./Setting"));

const SettingContainer = () => {
  const http = useHttp();
  const [categoryList, setCategoryList] = useState([]);
  const [labelList, setLabelList] = useState([]);
  const [priorityList, setPriorityList] = useState([]);
  const [templateList, setTemplateList] = useState([]);

  const getSetting = useCallback(
    async (url, funCallback) => {
      try {
        const response = await getResponseFromServerWithParameters(http, url, createParametersRequest({}));
        if (response.data) {
          funCallback(response.data);
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http],
  );

  const initData = useCallback(() => {
    getSetting(SETTINGS_CATEGORY_LIST_API, setCategoryList);
    getSetting(SETTINGS_LABEL_LIST_API, setLabelList);
    getSetting(SETTINGS_PRIORITY_LIST_API, setPriorityList);
    getSetting(SETTINGS_TEMPLATE_LIST_API, setTemplateList);
  }, [getSetting]);

  const initSetting = useCallback(
    async (parameters, i, url) => {
      try {
        const response = await getResponseFromServerWithParameters(http, url, createParametersRequest(settingKeys(parameters, i)));
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          window.location.reload();
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http],
  );

  const updateSetting = useCallback(
    async (parameters, i, url, object) => {
      const parameterTemp = settingKeys(parameters, i);
      parameterTemp["id"] = object._id;
      try {
        const response = await getResponseFromServerWithParameters(http, url, createParametersRequest(parameterTemp));
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          window.location.reload();
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http],
  );

  const onDelete = useCallback(
    async (url, object) => {
      const parameters = {
        id: object._id,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, url, createParametersRequest(parameters));
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          window.location.reload();
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http],
  );

  const checkExist = useCallback(
    async (name, value, funCallback, url) => {
      const parameters = {
        name: value,
      };
      try {
        const response = await getResponseFromServerWithParameters(http, url, createParametersRequest(parameters));
        if (!response.data) {
          funCallback(name, { type: "custom", message: response.message });
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http],
  );

  useEffect(() => {
    initData();
  }, [initData]);

  return (
    <Setting
      initSetting={initSetting}
      updateSetting={updateSetting}
      checkExist={checkExist}
      categoryList={categoryList}
      labelList={labelList}
      priorityList={priorityList}
      templateList={templateList}
      onDelete={onDelete}
    />
  );
};
export default SettingContainer;
