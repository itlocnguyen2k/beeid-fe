import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PROJECTS_LIST_API } from "../../../constants/api";
import { useHttp } from "../../../hook/useHttp";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const ProjectList = lazy(() => import("./ProjectList"));

const ProjectListContainer = () => {
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const { getValues, reset } = methods;
  const http = useHttp();

  const [projectList, setProjectList] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const defaultValues = useMemo(() => {
    return {
      projectName: "",
      startDate: "",
      endDate: "",
      description: "",
      category: { value: "", label: "Tất cả" },
      status: { value: "", label: "Tất cả" },
      mode: { value: "", label: "Tất cả" },
    };
  }, []);

  const getProjectList = useCallback(
    async (parameters) => {
      try {
        const response = await getResponseFromServerWithParameters(http, PROJECTS_LIST_API, createParametersRequest(parameters));
        if (response.data.projects) {
          setProjectList(response.data.projects);
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
      projectName: data["projectName"],
      startDate: data["startDate"],
      endDate: data["endDate"],
      description: data["description"],
      category: data["category"]?.value,
      status: data["status"]?.value,
      mode: data["mode"]?.value,
    };

    getProjectList(parameters);
  }, [getValues, getProjectList]);

  const onClearFilter = useCallback(() => {
    getProjectList({});
    reset(defaultValues);
  }, [getProjectList, reset, defaultValues]);

  useEffect(() => {
    getProjectList({});
  }, [getProjectList]);
  return (
    <FormProvider {...methods}>
      <ProjectList
        projectList={projectList}
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
export default ProjectListContainer;
