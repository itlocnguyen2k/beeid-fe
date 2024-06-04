import _ from "lodash";
import { useReducer } from "react";
import { lazy, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SET_CATEGORY_LIST,
  SET_LABEL_LIST,
  SET_MEMBER_LIST_EXCEPT_DATA_EXIST,
  SET_MEMBER_SELECTED_LIST,
  SET_PRIORITY_LIST,
} from "../../../constants/action";
import { SPRINTS_DETAIL_API, TASKS_DETAIL_API, TASKS_UPDATE_API } from "../../../constants/api";
import TaskContext from "../../../context/TaskContext";
import { useHttp } from "../../../hook/useHttp";
import taskReducer, { initState, setObjectList, setObjectListExceptDataExist, setObjectSelectedList } from "../../../reducer/TaskReducer";
import { getResponseFromServerWithParameters, initDataSelection, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const TaskUpdate = lazy(() => import("./TaskUpdate"));

const TaskUpdateContainer = () => {
  const { state } = useLocation();
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const { getValues } = methods;
  const http = useHttp();
  const navigate = useNavigate();

  const [taskState, dispatch] = useReducer(taskReducer, initState);
  const { memberList, memberSelectedList, categoryList, labelList, priorityList } = taskState;
  const [memberOrgList, setMemberOrgList] = useState([]);
  const [task, setTask] = useState({});

  const getTaskDetail = useCallback(
    async (memberOrgList) => {
      const parameters = {
        taskId: state?.taskId,
      };
      try {
        const response = await getResponseFromServerWithParameters(http, TASKS_DETAIL_API, createParametersRequest(parameters));
        if (response.data) {
          setTask(response.data.task);
          dispatch(setObjectSelectedList(SET_MEMBER_SELECTED_LIST, response.data.task.members));
          dispatch(setObjectListExceptDataExist(SET_MEMBER_LIST_EXCEPT_DATA_EXIST, memberOrgList, response.data.task.members));
        } else {
          toggleSweetAlert("Thông báo", response.message, "error");
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, state],
  );

  const getSprintDetail = useCallback(async () => {
    const parameters = {
      sprintId: state?.sprintId,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, SPRINTS_DETAIL_API, createParametersRequest(parameters));
      if (response.data) {
        setMemberOrgList(response.data.sprint.members);
        dispatch(setObjectList(SET_CATEGORY_LIST, initDataSelection(response.data.sprint.categories, "categoryName")));
        dispatch(setObjectList(SET_LABEL_LIST, initDataSelection(response.data.sprint.labels, "labelName")));
        dispatch(setObjectList(SET_PRIORITY_LIST, initDataSelection(response.data.sprint.priorities, "priorityName")));
        getTaskDetail(response.data.sprint.members);
      } else {
        toggleSweetAlert("Thông báo", response.message, "error");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, state, getTaskDetail]);

  const onSubmit = useCallback(
    async (avatar) => {
      const data = getValues();
      const form = new FormData();
      for (const [key, values] of Object.entries(_.omit(data, "members", "comments", "subtasks", "sprints", "files", "logs"))) {
        if (key === "categories" || key === "labels" || key === "priorities") {
          form.append(key, values.value);
        } else {
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

      form.append("taskId", state?.taskId);

      const parameters = {
        body: form,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, TASKS_UPDATE_API, parameters);
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          navigate(-1);
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [getValues, http, state, navigate, memberSelectedList],
  );

  useEffect(() => {
    getSprintDetail();
  }, [getSprintDetail]);

  return (
    <FormProvider {...methods}>
      <TaskContext.Provider
        value={{
          task,
          memberList,
          memberSelectedList,
          memberOrgList,
          categoryList,
          labelList,
          priorityList,
          onSubmit,
          dispatch,
          getTaskDetail,
        }}
      >
        <TaskUpdate />
      </TaskContext.Provider>
    </FormProvider>
  );
};
export default TaskUpdateContainer;
