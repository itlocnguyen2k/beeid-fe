import { useCallback, useState } from "react";
import { useEffect } from "react";
import { lazy } from "react";
import { HOME_SPRINT_LIST_API, HOME_TASK_LIST_API } from "../../constants/api";
import { useHttp } from "../../hook/useHttp";
import { useStore } from "../../store/StoreHooks";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../utils/helpers";
import { createParametersRequest } from "../../utils/sessionStorageHelper";

const Home = lazy(() => import("./Home"));

const HomeContainer = () => {
  const [storeState] = useStore();
  const { meetingList, bestEmployeeList, projectList, subTaskList } = storeState;
  const [sprintList, setSprintList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [sprintId, setSprintId] = useState("");

  const http = useHttp();

  const getSprintList = useCallback(
    async (parameters) => {
      try {
        const response = await getResponseFromServerWithParameters(http, HOME_SPRINT_LIST_API, createParametersRequest(parameters));
        if (response.data.sprints) {
          setSprintList(response.data.sprints);
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http],
  );

  const getTaskList = useCallback(
    async (parameters) => {
      try {
        const response = await getResponseFromServerWithParameters(http, HOME_TASK_LIST_API, createParametersRequest(parameters));
        if (response.data.tasks) {
          setTaskList(response.data.tasks);
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http],
  );

  const toggleProjectId = useCallback((projectId) => {
    setProjectId(projectId);
  }, []);

  const toggleSprintId = useCallback((sprintId) => {
    setSprintId(sprintId);
  }, []);

  useEffect(() => {
    if (projectList.length > 0) {
      setProjectId(projectList[0]._id);
    }
  }, [projectList]);

  useEffect(() => {
    if (sprintList.length > 0) {
      setSprintId(sprintList[0]._id);
    }
  }, [sprintList]);

  useEffect(() => {
    if (projectId) {
      getSprintList({ projectId: projectId });
    }
  }, [projectId, getSprintList]);

  useEffect(() => {
    if (sprintId) {
      getTaskList({ sprintId: sprintId });
    }
  }, [sprintId, getTaskList]);

  return (
    <Home
      meetingList={meetingList}
      bestEmployeeList={bestEmployeeList}
      projectList={projectList}
      sprintList={sprintList}
      subTaskList={subTaskList}
      toggleProjectId={toggleProjectId}
      projectId={projectId}
      taskList={taskList}
      sprintId={sprintId}
      toggleSprintId={toggleSprintId}
    />
  );
};
export default HomeContainer;
