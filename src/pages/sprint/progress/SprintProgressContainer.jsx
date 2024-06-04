import { lazy, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SPRINTS_DETAIL_API, TASKS_LIST_API } from "../../../constants/api";
import { useHttp } from "../../../hook/useHttp";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const SprintProgress = lazy(() => import("./SprintProgress"));

const SprintProgressContainer = () => {
  const { state } = useLocation();
  const http = useHttp();

  const [taskList, setTaskList] = useState([]);
  const [sprint, setSprint] = useState({});

  const getTaskList = useCallback(async () => {
    const parameters = {
      sprintId: state?.sprintId,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, TASKS_LIST_API, createParametersRequest(parameters));
      if (response.data.tasks) {
        setTaskList(response.data.tasks);
      } else {
        toggleSweetAlert("Thông báo", response.message, "error");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, state]);

  const getDetailSprint = useCallback(async () => {
    const parameters = {
      sprintId: state?.sprintId,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, SPRINTS_DETAIL_API, createParametersRequest(parameters));
      if (response.data) {
        setSprint(response.data.sprint);
      } else {
        toggleSweetAlert("Thông báo", response.message, "error");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, state]);

  useEffect(() => {
    getTaskList();
    getDetailSprint();
  }, [getTaskList, getDetailSprint]);

  return <SprintProgress taskList={taskList} sprint={sprint} />;
};
export default SprintProgressContainer;
