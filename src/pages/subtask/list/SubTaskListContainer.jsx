import { useContext } from "react";
import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SUB_TASKS_LIST_API } from "../../../constants/api";
import TaskContext from "../../../context/TaskContext";
import { useHttp } from "../../../hook/useHttp";
import { getResponseFromServerWithParameters, initDataSelection, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const SubTaskList = lazy(() => import("./SubTaskList"));

const SubTaskListContainer = () => {
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const { getValues, reset, setValue } = methods;
  const http = useHttp();

  const taskContext = useContext(TaskContext);
  const { task } = taskContext;
  const [memberList, setMemberList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [priorityList, setPriorityList] = useState([]);

  const [subTaskList, setSubTaskList] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const defaultValues = useMemo(() => {
    return {
      subTitle: "",
      module: "",
      endDate: "",
      startDate: "",
      status: { value: "", label: "Tất cả" },
    };
  }, []);

  const getSubTaskList = useCallback(
    async (parameters) => {
      try {
        const response = await getResponseFromServerWithParameters(http, SUB_TASKS_LIST_API, createParametersRequest(parameters));
        if (response) {
          setSubTaskList(response.data.subTasks);
          setTotalRows(response.data.total);
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http],
  );

  const onFilter = useCallback(() => {
    const data = getValues();
    const parameters = {
      subTitle: data["subTitle"],
      module: data["module"],
      endDate: data["endDate"],
      startDate: data["startDate"],
      status: data["status"]?.value,
      owners: data["owners"]?.value,
      categories: data["categories"]?.value,
      priorities: data["priorities"]?.value,
    };

    getSubTaskList({ ...parameters, taskId: task._id });
  }, [getValues, getSubTaskList, task]);

  const onClearFilter = useCallback(() => {
    getSubTaskList({ taskId: task._id });
    reset(defaultValues);
  }, [getSubTaskList, reset, defaultValues, task]);

  useEffect(() => {
    getSubTaskList({ taskId: task._id });
    if (task?.sprints?.members?.length > 0) {
      const memberListTemp = initDataSelection(task.sprints.members, "fullName");
      memberListTemp.unshift({ value: "", label: "Tất cả" });
      setMemberList(memberListTemp);
      setValue("owners", { value: "", label: "Tất cả" });
    }
    if (task?.sprints?.categories?.length > 0) {
      const categoryListTemp = initDataSelection(task.sprints.categories, "categoryName");
      categoryListTemp.unshift({ value: "", label: "Tất cả" });
      setCategoryList(categoryListTemp);
      setValue("categories", { value: "", label: "Tất cả" });
    }
    if (task?.sprints?.priorities?.length > 0) {
      const priorityListTemp = initDataSelection(task.sprints.priorities, "priorityName");
      priorityListTemp.unshift({ value: "", label: "Tất cả" });
      setPriorityList(priorityListTemp);
      setValue("priorities", { value: "", label: "Tất cả" });
    }
  }, [getSubTaskList, task, setValue]);
  return (
    <FormProvider {...methods}>
      <SubTaskList
        task={task}
        memberList={memberList}
        priorityList={priorityList}
        categoryList={categoryList}
        subTaskList={subTaskList}
        pageSize={pageSize}
        currentPage={currentPage}
        totalRows={totalRows}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        onFilter={onFilter}
        onClearFilter={onClearFilter}
      />
    </FormProvider>
  );
};
export default SubTaskListContainer;
