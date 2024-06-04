import { useState, useEffect, useCallback, useContext } from "react";
import { lazy } from "react";
import _, { differenceBy } from "lodash";
import { useLocation } from "react-router-dom";
import {
  ACCOUNTS_DETAIL_API,
  ACCOUNTS_LIST_API,
  ACCOUNTS_UPDATE_API,
  ACCOUNTS_UPDATE_PERMISSION_API,
  CHANGE_PASSWORD_API,
  SEND_REQUEST_FOLLOWINGS_API,
} from "../../../constants/api";
import { useHttp } from "../../../hook/useHttp";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";
import { getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { useAuth } from "../../../hook/useAuth";
import { SocketContext } from "../../../context/SocketContext";

const AccountUpdate = lazy(() => import("./AccountUpdate"));

const AccountUpdateContainer = () => {
  const { state } = useLocation();
  const http = useHttp();
  const { auth } = useAuth();
  const socket = useContext(SocketContext);

  const [account, setAccount] = useState({});
  const [accountList, setAccountList] = useState([]);
  const [accountSuggestions, setAccountSuggestions] = useState([]);

  const getAccountDetail = useCallback(async () => {
    const parameters = {
      accountId: state?.accountId,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, ACCOUNTS_DETAIL_API, createParametersRequest(parameters));
      if (response.data) {
        setAccount(response.data.account);
      } else {
        toggleSweetAlert("Thông báo", response.message, "error");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, state]);

  const getAccountList = useCallback(
    async (parameters) => {
      try {
        const response = await getResponseFromServerWithParameters(http, ACCOUNTS_LIST_API, createParametersRequest(parameters));
        if (response.data.accounts) {
          setAccountList(response.data.accounts);
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http],
  );

  const initData = useCallback(() => {
    getAccountList({});
    getAccountDetail();
  }, [getAccountDetail, getAccountList]);

  const onSubmitAccountUpdate = useCallback(
    async (data, avatar) => {
      const form = new FormData();
      for (const [key, values] of Object.entries(_.omit(data, "permission"))) {
        if (values) {
          if (key === "role" || key === "gender") {
            form.append(key, values.value);
          } else {
            form.append(key, values);
          }
        }
      }
      form.append("accountId", state?.accountId);
      if (avatar) {
        form.append("file", avatar);
      }
      const parameters = {
        body: form,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, ACCOUNTS_UPDATE_API, parameters);
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          window.location.reload();
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, state],
  );

  const onSubmitChangePassword = useCallback(
    async (data) => {
      const parameters = {
        id: state?.accountId,
        passwordOld: data["passwordOld"],
        passwordNew: data["passwordNew"],
      };

      try {
        const response = await getResponseFromServerWithParameters(http, CHANGE_PASSWORD_API, createParametersRequest(parameters));
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          window.location.reload();
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, state],
  );

  const onSubmitPermission = useCallback(
    async (data) => {
      const parameters = {
        accountId: state?.accountId,
        permission: data,
      };

      try {
        const response = await getResponseFromServerWithParameters(
          http,
          ACCOUNTS_UPDATE_PERMISSION_API,
          createParametersRequest(parameters),
        );
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          window.location.reload();
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, state],
  );

  const followCallback = useCallback(
    async (reciever, url) => {
      const parameters = {
        reciever: reciever,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, url, createParametersRequest(parameters));
        if (url === SEND_REQUEST_FOLLOWINGS_API) {
          socket.emit("send_request_friend", reciever);
        }
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          initData();
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, initData, socket],
  );

  useEffect(() => {
    if (account && auth && accountList) {
      setAccountSuggestions(differenceBy(accountList, [auth.account], account.followers, account.followings, account.friends, "_id"));
    }
  }, [account, accountList, auth]);

  useEffect(() => {
    initData();
  }, [initData]);

  return (
    <AccountUpdate
      account={account}
      onSubmitAccountUpdate={onSubmitAccountUpdate}
      onSubmitChangePassword={onSubmitChangePassword}
      accountSuggestions={accountSuggestions}
      followCallback={followCallback}
      onSubmitPermission={onSubmitPermission}
    />
  );
};
export default AccountUpdateContainer;
