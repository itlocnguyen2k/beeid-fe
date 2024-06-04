import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import { lazy } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SET_CATEGORY_LIST_EXCEPT_DATA_EXIST,
  SET_CATEGORY_SELECTED_LIST,
  SET_LABEL_LIST_EXCEPT_DATA_EXIST,
  SET_LABEL_SELECTED_LIST,
  SET_MEMBER_LIST_EXCEPT_DATA_EXIST,
  SET_MEMBER_SELECTED_LIST,
  SET_PRIORITY_LIST_EXCEPT_DATA_EXIST,
  SET_PRIORITY_SELECTED_LIST,
} from "../../../constants/action";
import { PROJECTS_DETAIL_API, SPRINTS_CREATE_API } from "../../../constants/api";
import { SPRINTS_LIST_URL } from "../../../constants/url";
import SprintContext from "../../../context/SprintContext";
import { useHttp } from "../../../hook/useHttp";

import sprintReducer, { initState, setObjectListExceptDataExist, setObjectSelectedList } from "../../../reducer/SprintReducer";
import { useStore } from "../../../store/StoreHooks";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const SprintCreate = lazy(() => import("./SprintCreate"));

const SprintCreateContainer = () => {
  const { state } = useLocation();
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
    defaultValues: {
      flagTemplate: true,
    },
  });
  const navigate = useNavigate();
  const http = useHttp();
  const { getValues } = methods;
  const [storeState] = useStore();
  const [sprintState, dispatch] = useReducer(sprintReducer, initState);
  const {
    memberList,
    memberSelectedList,
    categoryList,
    categorySelectedList,
    labelList,
    labelSelectedList,
    priorityList,
    prioritySelectedList,
  } = sprintState;

  const [memberOrgList, setMemberOrgList] = useState([]);

  const getProjectDetail = useCallback(async () => {
    const parameters = {
      projectId: state?.projectId,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, PROJECTS_DETAIL_API, createParametersRequest(parameters));
      if (response.data) {
        setMemberOrgList(response.data.project.members);
        dispatch(setObjectSelectedList(SET_MEMBER_SELECTED_LIST, response.data.project.members));
        dispatch(
          setObjectListExceptDataExist(SET_MEMBER_LIST_EXCEPT_DATA_EXIST, response.data.project.members, response.data.project.members),
        );
      } else {
        toggleSweetAlert("Thông báo", response.message, "error");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, state, dispatch]);

  const onSubmit = useCallback(
    async (avatar) => {
      const form = new FormData();
      const data = getValues();
      for (const [key, values] of Object.entries(data)) {
        if (values) {
          form.append(key, values);
        }
      }
      if (avatar) {
        form.append("file", avatar);
      }
      if (memberSelectedList.length > 0) {
        memberSelectedList.forEach((member) => {
          form.append("members[]", member._id);
        });
      }
      if (categorySelectedList.length > 0) {
        categorySelectedList.forEach((category) => {
          form.append("categories[]", category._id);
        });
      }
      if (labelSelectedList.length > 0) {
        labelSelectedList.forEach((label) => {
          form.append("labels[]", label._id);
        });
      }
      if (prioritySelectedList.length > 0) {
        prioritySelectedList.forEach((priority) => {
          form.append("priorities[]", priority._id);
        });
      }
      form.append("projectId", state?.projectId);

      const parameters = {
        body: form,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, SPRINTS_CREATE_API, parameters);
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          navigate(SPRINTS_LIST_URL, { state: { projectId: state?.projectId } });
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [getValues, http, navigate, prioritySelectedList, categorySelectedList, labelSelectedList, memberSelectedList, state],
  );

  useEffect(() => {
    getProjectDetail();
    dispatch(setObjectListExceptDataExist(SET_CATEGORY_LIST_EXCEPT_DATA_EXIST, storeState.categoryOrgList, storeState.categoryOrgList));
    dispatch(setObjectSelectedList(SET_CATEGORY_SELECTED_LIST, storeState.categoryOrgList));
    dispatch(setObjectListExceptDataExist(SET_LABEL_LIST_EXCEPT_DATA_EXIST, storeState.labelOrgList, storeState.labelOrgList));
    dispatch(setObjectSelectedList(SET_LABEL_SELECTED_LIST, storeState.labelOrgList));
    dispatch(setObjectListExceptDataExist(SET_PRIORITY_LIST_EXCEPT_DATA_EXIST, storeState.priorityOrgList, storeState.priorityOrgList));
    dispatch(setObjectSelectedList(SET_PRIORITY_SELECTED_LIST, storeState.priorityOrgList));
  }, [getProjectDetail, storeState]);

  return (
    <FormProvider {...methods}>
      <SprintContext.Provider
        value={{
          onSubmit,
          memberList,
          memberSelectedList,
          memberOrgList,
          categoryList,
          categorySelectedList,
          priorityList,
          prioritySelectedList,
          labelList,
          labelSelectedList,
          dispatch,
        }}
      >
        <SprintCreate />
      </SprintContext.Provider>
    </FormProvider>
  );
};
export default SprintCreateContainer;
