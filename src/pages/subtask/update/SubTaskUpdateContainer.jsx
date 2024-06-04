import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useContext } from "react";
import { lazy, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { SET_CATEGORY_LIST, SET_MEMBER_LIST, SET_PRIORITY_LIST } from "../../../constants/action";
import { SPRINTS_DETAIL_API, SUB_TASKS_DETAIL_API, SUB_TASKS_UPDATE_API, TASKS_DETAIL_API } from "../../../constants/api";
import { SocketContext } from "../../../context/SocketContext";
import SubTaskContext from "../../../context/SubTaskContext";
import { useHttp } from "../../../hook/useHttp";
import subTaskReducer, { initState, setObjectList } from "../../../reducer/SubTaskReducer";
import { getResponseFromServerWithParameters, initDataSelection, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const SubTaskUpdate = lazy(() => import("./SubTaskUpdate"));

const SubTaskUpdateContainer = () => {
  const { state } = useLocation();
  const socket = useContext(SocketContext);

  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
    defaultValues: {
      status: { value: 0, label: "0%" },
      point: { value: 0, label: "0 điểm" },
    },
  });
  const { getValues } = methods;
  const http = useHttp();
  const navigate = useNavigate();
  const [subTaskState, dispatch] = useReducer(subTaskReducer, initState);
  const { memberList, categoryList, priorityList } = subTaskState;
  const [subTask, setSubTask] = useState({});

  const getTaskDetail = useCallback(async () => {
    const parameters = {
      taskId: state?.taskId,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, TASKS_DETAIL_API, createParametersRequest(parameters));
      if (response) {
        dispatch(setObjectList(SET_MEMBER_LIST, initDataSelection(response.data.task.members, "fullName")));
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, state]);

  const getSubTaskDetail = useCallback(async () => {
    const parameters = {
      subTaskId: state?.subTaskId,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, SUB_TASKS_DETAIL_API, createParametersRequest(parameters));
      if (response.data) {
        setSubTask(response.data.subTask);
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, state]);

  const getSprintDetail = useCallback(async () => {
    const parameters = {
      sprintId: state?.sprintId,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, SPRINTS_DETAIL_API, createParametersRequest(parameters));
      if (response.data) {
        dispatch(setObjectList(SET_CATEGORY_LIST, initDataSelection(response.data.sprint.categories, "categoryName")));
        dispatch(setObjectList(SET_PRIORITY_LIST, initDataSelection(response.data.sprint.priorities, "priorityName")));
      } else {
        toggleSweetAlert("Thông báo", response.message, "error");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, state]);

  const onSubmit = useCallback(
    async (avatar) => {
      const data = getValues();
      const form = new FormData();
      for (const [key, values] of Object.entries(_.omit(data, "tasks", "taskId", "logs", "files"))) {
        if (key === "progress" || key === "point" || key === "categories" || key === "owners" || key === "priorities") {
          form.append(key, values.value);
        } else {
          form.append(key, values);
        }
      }
      if (avatar) {
        form.append("file", avatar);
      }

      form.append("subTaskId", state?.subTaskId);

      const parameters = {
        body: form,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, SUB_TASKS_UPDATE_API, parameters);
        if (data.owners._id !== subTask.owners._id) {
          socket.emit("send_notification", data.owners);
        }
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          navigate(-1, { state: { tab: "4" } });
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [getValues, http, state, navigate, socket, subTask],
  );

  useEffect(() => {
    getTaskDetail();
    getSprintDetail();
    getSubTaskDetail();
  }, [getTaskDetail, getSprintDetail, getSubTaskDetail]);

  return (
    <FormProvider {...methods}>
      <SubTaskContext.Provider value={{ onSubmit, memberList, categoryList, priorityList, subTask }}>
        <SubTaskUpdate />
      </SubTaskContext.Provider>
    </FormProvider>
  );
};
export default SubTaskUpdateContainer;
