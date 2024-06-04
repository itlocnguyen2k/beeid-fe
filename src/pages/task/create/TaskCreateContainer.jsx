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
import { SPRINTS_DETAIL_API, TASKS_CREATE_API } from "../../../constants/api";
import TaskContext from "../../../context/TaskContext";
import { useHttp } from "../../../hook/useHttp";
import taskReducer, { initState, setObjectList, setObjectListExceptDataExist, setObjectSelectedList } from "../../../reducer/TaskReducer";
import { getResponseFromServerWithParameters, initDataSelection, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const TaskCreate = lazy(() => import("./TaskCreate"));

const TaskCreateContainer = () => {
  const { state } = useLocation();
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const { getValues } = methods;
  const http = useHttp();
  const navigate = useNavigate();
  const [taskState, dispatch] = useReducer(taskReducer, initState);
  const [memberOrgList, setMemberOrgList] = useState([]);

  const { memberList, memberSelectedList, categoryList, labelList, priorityList } = taskState;

  const getDetailSprint = useCallback(async () => {
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
        dispatch(setObjectSelectedList(SET_MEMBER_SELECTED_LIST, response.data.sprint.members));
        dispatch(
          setObjectListExceptDataExist(SET_MEMBER_LIST_EXCEPT_DATA_EXIST, response.data.sprint.members, response.data.sprint.members),
        );
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
      for (const [key, values] of Object.entries(data)) {
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

      form.append("boardId", state?.boardId);
      form.append("sprints", state?.sprintId);

      const parameters = {
        body: form,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, TASKS_CREATE_API, parameters);
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
    getDetailSprint();
  }, [getDetailSprint]);

  return (
    <FormProvider {...methods}>
      <TaskContext.Provider
        value={{ onSubmit, memberList, memberSelectedList, memberOrgList, categoryList, labelList, priorityList, dispatch }}
      >
        <TaskCreate />
      </TaskContext.Provider>
    </FormProvider>
  );
};
export default TaskCreateContainer;
