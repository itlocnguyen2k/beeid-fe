import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHttp } from "../../hook/useHttp";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../utils/helpers";
import { createParametersRequest } from "../../utils/sessionStorageHelper";
import { REPORTS_LIST_API } from "../../constants/api";

const ReportList = lazy(() => import("./ReportList"));

const ReportListContainer = () => {
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const { getValues, reset } = methods;
  const http = useHttp();

  const [reportList, setReportList] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const defaultValues = useMemo(() => {
    return {
      fileName: "",
      createdAt: "",
    };
  }, []);

  const getReportList = useCallback(
    async (parameters) => {
      try {
        const response = await getResponseFromServerWithParameters(http, REPORTS_LIST_API, createParametersRequest(parameters));
        if (response && response.data.reports) {
          setReportList(response.data.reports);
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
      fileName: data["fileName"],
      createdAt: data["createdAt"],
    };

    getReportList(parameters);
  }, [getValues, getReportList]);

  const onClearFilter = useCallback(() => {
    getReportList({});
    reset(defaultValues);
  }, [getReportList, reset, defaultValues]);

  useEffect(() => {
    getReportList({});
  }, [getReportList]);
  return (
    <FormProvider {...methods}>
      <ReportList
        reportList={reportList}
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
export default ReportListContainer;
