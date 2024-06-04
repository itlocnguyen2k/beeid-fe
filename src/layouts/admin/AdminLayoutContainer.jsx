import { useCallback } from "react";
import { useState } from "react";
import { useHttp } from "../../hook/useHttp";
import { createParametersRequest } from "../../utils/sessionStorageHelper";
import AdminLayout from "./AdminLayout";
import { filterCurrentDate, getResponseFromServerWithParameters, notifyInfo, toggleSweetAlert } from "../../utils/helpers";
import { HOME_LIST_API, NOTIFICATIONS_LIST_API, NOTIFICATIONS_READ_ALL_API, NOTIFICATIONS_READ_API } from "../../constants/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/StoreHooks";
import {
  setBestEmployeeStore,
  setCategoryStore,
  setLabelStore,
  setMeetingStore,
  setMemberStore,
  setPriorityStore,
  setProjectStore,
  setSubTaskStore,
} from "../../store/StoreAction";
import AdminLayoutContext from "../../context/AdminLayoutContext";
import { useAuth } from "../../hook/useAuth";
import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";

const AdminLayoutContainer = () => {
  const http = useHttp();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const [notificationList, setNotificationList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [totalUnreadNotification, setTotalUnreadNotification] = useState(0);
  const [totalUnreadRequestFriend, setTotalUnreadRequestFriend] = useState(0);

  const [, dispatch] = useStore();
  const { auth } = useAuth();

  const getNotifications = useCallback(async () => {
    const parameters = {
      id: auth.account._id,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, NOTIFICATIONS_LIST_API, createParametersRequest(parameters));
      if (response.data) {
        setNotificationList(response.data.notifications);
        setFriendRequestList(response.data.friends);
        setTotalUnreadNotification(response.data.totalUnreadNotification);
        setTotalUnreadRequestFriend(response.data.totalUnreadRequestFriend);
      } else {
        toggleSweetAlert("Thông báo", response.message, "error");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, auth]);

  const getInitSetting = useCallback(async () => {
    try {
      const response = await getResponseFromServerWithParameters(http, HOME_LIST_API);
      if (response.data) {
        dispatch(setMemberStore(response.data.accounts));
        dispatch(setCategoryStore(response.data.categories));
        dispatch(setLabelStore(response.data.labels));
        dispatch(setPriorityStore(response.data.priorities));
        dispatch(setProjectStore(response.data.projects));
        dispatch(setMeetingStore(filterCurrentDate(response.data.meetings)));
        dispatch(setBestEmployeeStore(response.data.bestEmployees));
        dispatch(setSubTaskStore(response.data.subTasks));
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, dispatch]);

  const readNotification = useCallback(
    async (notification) => {
      if (notification.read) {
        if (notification.type === 2) {
          navigate("/admin/accounts/update", { state: { accountId: auth.account._id, tab: "4" } });
        } else {
          window.scrollTo(0, document.body.scrollHeight);
        }
      } else {
        const parameters = {
          id: notification._id,
        };
        try {
          const response = await getResponseFromServerWithParameters(http, NOTIFICATIONS_READ_API, createParametersRequest(parameters));
          if (response.data) {
            getInitSetting();
            getNotifications();
            if (notification.type === 2) {
              navigate("/admin/accounts/update", { state: { accountId: auth.account._id, tab: "4" } });
            } else {
              window.scrollTo(0, document.body.scrollHeight);
            }
          } else {
            toggleSweetAlert("Thông báo", response.message, "error");
          }
        } catch (err) {
          toggleSweetAlert("Thông báo", err, "error");
        }
      }
    },
    [http, navigate, auth, getInitSetting, getNotifications],
  );

  const readAllNotification = useCallback(
    async (type) => {
      const parameters = {
        type: type,
      };
      try {
        const response = await getResponseFromServerWithParameters(http, NOTIFICATIONS_READ_ALL_API, createParametersRequest(parameters));
        if (response.data) {
          getInitSetting();
          getNotifications();
          if (type === 2) {
            navigate("/admin/accounts/update", { state: { accountId: auth.account._id, tab: "4" } });
          } else {
            window.scrollTo(0, document.body.scrollHeight);
          }
        } else {
          toggleSweetAlert("Thông báo", response.message, "error");
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, navigate, auth, getInitSetting, getNotifications],
  );

  useEffect(() => {
    socket.on("receive_notification", (ownerId) => {
      if (auth.account._id === ownerId) {
        notifyInfo("Bạn nhận được một công việc mới !");
        getInitSetting();
        getNotifications();
      }
    });

    socket.on("receive_request_friend", (recieverId) => {
      if (auth.account._id === recieverId) {
        notifyInfo("Bạn nhận được một lời mời kết bạn !");
        getInitSetting();
        getNotifications();
      }
    });
    return () => {
      socket.off("receive_notification");
      socket.off("receive_request_friend");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    getInitSetting();
    getNotifications();
  }, [getInitSetting, getNotifications]);
  return (
    <AdminLayoutContext.Provider
      value={{
        notificationList,
        friendRequestList,
        totalUnreadNotification,
        totalUnreadRequestFriend,
        readNotification,
        readAllNotification,
      }}
    >
      <AdminLayout />
    </AdminLayoutContext.Provider>
  );
};
export default AdminLayoutContainer;
