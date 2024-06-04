import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ACCOUNTS_LIST_API } from "../../../constants/api";
import { useHttp } from "../../../hook/useHttp";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const AccountList = lazy(() => import("./AccountList"));

const AccountListContainer = () => {
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const { getValues, reset } = methods;
  const http = useHttp();

  const [accountList, setAccountList] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const defaultValues = useMemo(() => {
    return {
      fullName: "",
      userName: "",
      email: "",
      dob: "",
      role: { value: "", label: "Tất cả" },
      gender: { value: "", label: "Tất cả" },
    };
  }, []);

  const getAccountList = useCallback(
    async (parameters) => {
      try {
        const response = await getResponseFromServerWithParameters(http, ACCOUNTS_LIST_API, createParametersRequest(parameters));
        if (response && response.data.accounts) {
          setAccountList(response.data.accounts);
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
      fullName: data["fullName"],
      userName: data["userName"],
      email: data["email"],
      dob: data["dob"],
      role: data["role"]?.value,
      gender: data["gender"]?.value,
    };

    getAccountList(parameters);
  }, [getValues, getAccountList]);

  const onClearFilter = useCallback(() => {
    getAccountList({});
    reset(defaultValues);
  }, [getAccountList, reset, defaultValues]);

  useEffect(() => {
    getAccountList({});
  }, [getAccountList]);
  return (
    <FormProvider {...methods}>
      <AccountList
        accountList={accountList}
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
export default AccountListContainer;
