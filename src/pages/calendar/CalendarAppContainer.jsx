import { lazy, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TASKS_LIST_API } from "../../constants/api";
import { useHttp } from "../../hook/useHttp";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../utils/helpers";
import { createParametersRequest } from "../../utils/sessionStorageHelper";

const CalendarApp = lazy(() => import("./CalendarApp"));

const CalendarAppContainer = () => {
  const { state } = useLocation();
  const http = useHttp();

  const [taskList, setTaskList] = useState([]);

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

  useEffect(() => {
    getTaskList();
  }, [getTaskList]);

  return <CalendarApp taskList={taskList} />;
};
export default CalendarAppContainer;
