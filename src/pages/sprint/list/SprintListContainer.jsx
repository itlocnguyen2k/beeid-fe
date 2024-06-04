import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { SPRINTS_LIST_API } from "../../../constants/api";
import { useHttp } from "../../../hook/useHttp";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const SprintList = lazy(() => import("./SprintList"));

const SprintListContainer = () => {
  const { state } = useLocation();
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const { getValues, reset } = methods;
  const http = useHttp();

  const [sprintList, setSprintList] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const defaultValues = useMemo(() => {
    return {
      sprintName: "",
      startDate: "",
      endDate: "",
      description: "",
    };
  }, []);

  const getSprintList = useCallback(
    async (parameters) => {
      try {
        const response = await getResponseFromServerWithParameters(http, SPRINTS_LIST_API, createParametersRequest(parameters));
        if (response.data.sprints) {
          setSprintList(response.data.sprints);
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
      sprintName: data["sprintName"],
      startDate: data["startDate"],
      endDate: data["endDate"],
      description: data["description"],
      projectId: state?.projectId,
    };

    getSprintList(parameters);
  }, [getValues, getSprintList, state]);

  const onClearFilter = useCallback(() => {
    getSprintList({ projectId: state?.projectId });
    reset(defaultValues);
  }, [getSprintList, reset, defaultValues, state]);

  useEffect(() => {
    if (state) {
      getSprintList({ projectId: state?.projectId });
    }
  }, [getSprintList, state]);
  return (
    <FormProvider {...methods}>
      <SprintList
        sprintList={sprintList}
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
export default SprintListContainer;
