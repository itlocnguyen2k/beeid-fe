import { lazy, useCallback, useEffect, useState } from "react";
import { TRASHS_LIST_API } from "../../constants/api";
import { useHttp } from "../../hook/useHttp";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../utils/helpers";
import { createParametersRequest } from "../../utils/sessionStorageHelper";

const TrashList = lazy(() => import("./TrashList"));

const TrashListContainer = () => {
  const http = useHttp();
  const [trashList, setTrashList] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [type, setType] = useState(1);

  const getTrashList = useCallback(
    async (parameters) => {
      try {
        const response = await getResponseFromServerWithParameters(http, TRASHS_LIST_API, createParametersRequest(parameters));
        if (response) {
          setTrashList(response.data.trashs);
          setTotalRows(response.data.total);
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http],
  );

  useEffect(() => {
    getTrashList({ type });
  }, [getTrashList, type]);

  return (
    <TrashList
      trashList={trashList}
      pageSize={pageSize}
      currentPage={currentPage}
      totalRows={totalRows}
      setPageSize={setPageSize}
      setCurrentPage={setCurrentPage}
      setType={setType}
    />
  );
};
export default TrashListContainer;
