import _ from "lodash";
import { useReducer } from "react";
import { lazy, useCallback, useEffect, useState } from "react";
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
import { PROJECTS_DETAIL_API, SPRINTS_DETAIL_API, SPRINTS_UPDATE_API } from "../../../constants/api";
import SprintContext from "../../../context/SprintContext";
import { useHttp } from "../../../hook/useHttp";
import { initState } from "../../../reducer/ProjectReducer";
import sprintReducer, { setObjectListExceptDataExist, setObjectSelectedList } from "../../../reducer/SprintReducer";
import { useStore } from "../../../store/StoreHooks";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const SprintUpdate = lazy(() => import("./SprintUpdate"));

const SprintUpdateContainer = () => {
  const { state } = useLocation();
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const { getValues } = methods;
  const http = useHttp();
  const navigate = useNavigate();
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
  const [sprint, setSprint] = useState({});

  const getDetailSprint = useCallback(
    async (memberOrgList) => {
      const parameters = {
        sprintId: state?.sprintId,
      };
      try {
        const response = await getResponseFromServerWithParameters(http, SPRINTS_DETAIL_API, createParametersRequest(parameters));
        if (response.data) {
          setSprint(response.data.sprint);
          dispatch(setObjectListExceptDataExist(SET_MEMBER_LIST_EXCEPT_DATA_EXIST, memberOrgList, response.data.sprint.members));
          dispatch(setObjectSelectedList(SET_MEMBER_SELECTED_LIST, response.data.sprint.members));
          dispatch(
            setObjectListExceptDataExist(SET_CATEGORY_LIST_EXCEPT_DATA_EXIST, storeState.categoryOrgList, response.data.sprint.categories),
          );
          dispatch(setObjectSelectedList(SET_CATEGORY_SELECTED_LIST, response.data.sprint.categories));
          dispatch(setObjectListExceptDataExist(SET_LABEL_LIST_EXCEPT_DATA_EXIST, storeState.labelOrgList, response.data.sprint.labels));
          dispatch(setObjectSelectedList(SET_LABEL_SELECTED_LIST, response.data.sprint.labels));
          dispatch(
            setObjectListExceptDataExist(SET_PRIORITY_LIST_EXCEPT_DATA_EXIST, storeState.priorityOrgList, response.data.sprint.priorities),
          );
          dispatch(setObjectSelectedList(SET_PRIORITY_SELECTED_LIST, response.data.sprint.priorities));
        } else {
          toggleSweetAlert("Thông báo", response.message, "error");
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, state, storeState],
  );

  const getProjectDetail = useCallback(async () => {
    const parameters = {
      projectId: state?.projectId,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, PROJECTS_DETAIL_API, createParametersRequest(parameters));
      if (response.data) {
        setMemberOrgList(response.data.project.members);
        getDetailSprint(response.data.project.members);
      } else {
        toggleSweetAlert("Thông báo", response.message, "error");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, state, getDetailSprint]);

  const onSubmit = useCallback(
    async (avatar) => {
      const form = new FormData();
      const data = getValues();
      for (const [key, values] of Object.entries(_.omit(data, "boards", "categories", "members", "labels", "projects", "priorities"))) {
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
      form.append("sprintId", state?.sprintId);

      const parameters = {
        body: form,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, SPRINTS_UPDATE_API, parameters);
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          navigate("/admin/sprints", { state: { projectId: sprint.projects } });
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [sprint, getValues, http, state, navigate, categorySelectedList, memberSelectedList, labelSelectedList, prioritySelectedList],
  );

  useEffect(() => {
    getProjectDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      <SprintContext.Provider
        value={{
          sprint,
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
        <SprintUpdate />
      </SprintContext.Provider>
    </FormProvider>
  );
};
export default SprintUpdateContainer;
