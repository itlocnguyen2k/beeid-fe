import { useEffect, useReducer, useState } from "react";
import { useCallback } from "react";
import { lazy } from "react";
import {
  downloadFile,
  getBlodFromServerWithParameters,
  getResponseFromServerWithParameters,
  isObjEmpty,
  toggleSweetAlert,
} from "../../utils/helpers";
import {
  FILES_DOWNLOAD_API,
  MESSAGE_CREATE_API,
  MESSAGE_LIST_API,
  MESSAGE_UPDATE_API,
  ROOMS_CREATE_API,
  ROOMS_LIST_API,
  ROOMS_UPDATE_API,
} from "../../constants/api";
import { createParametersRequest } from "../../utils/sessionStorageHelper";
import { useHttp } from "../../hook/useHttp";
import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import { useStore } from "../../store/StoreHooks";
import { useAuth } from "../../hook/useAuth";

import chatReducer, { initState, setObjectList, setObjectListExceptDataExist } from "../../reducer/ChatReducer";
import ChatContext from "../../context/ChatContext";
import { useDropzone } from "react-dropzone";
import { SET_FILE_LIST, SET_MEMBER_CHAT_LIST, SET_MEMBER_CHAT_SELECTED_LIST, SET_MEMBER_LIST } from "../../constants/action";

const Chat = lazy(() => import("./Chat"));

const ChatContainer = () => {
  const http = useHttp();
  const { auth } = useAuth();
  const socket = useContext(SocketContext);
  const [storeState] = useStore();
  const [chatState, dispatch] = useReducer(chatReducer, initState);
  const { memberList, memberSelectedList, memberChatList, memberChatSelectedList, fileList } = chatState;

  const [roomList, setRoomList] = useState([]);
  const [roomSelected, setRoomSelected] = useState({});
  const [messageList, setMessageList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  const onDelete = useCallback(
    (file) => {
      const newFiles = files.filter((item) => item.lastModified !== file.lastModified);
      setFiles(newFiles);
    },
    [files],
  );

  const getRoomList = useCallback(async () => {
    try {
      const response = await getResponseFromServerWithParameters(http, ROOMS_LIST_API, createParametersRequest({}));
      if (response.data.rooms) {
        setRoomList(response.data.rooms);
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http]);

  const getMessageList = useCallback(async () => {
    const parameters = {
      roomId: roomSelected._id,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, MESSAGE_LIST_API, createParametersRequest(parameters));
      if (response.data.messages) {
        setMessageList(response.data.messages);
        setLoading(false);
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, roomSelected]);

  const toggleRoomSelected = useCallback(
    (room) => {
      setRoomSelected(room);
      dispatch(setObjectListExceptDataExist(SET_MEMBER_CHAT_LIST, storeState.memberOrgList, room.members));
      dispatch(setObjectList(SET_MEMBER_CHAT_SELECTED_LIST, room.members));
      dispatch(setObjectList(SET_FILE_LIST, room.files));
      setLoading(true);
    },
    [setRoomSelected, storeState],
  );

  const createRoom = useCallback(
    async (data) => {
      const parameters = {};
      for (const [key, values] of Object.entries(data)) {
        if (values) {
          parameters[key] = values;
        }
      }
      if (memberSelectedList.length > 0) {
        parameters["members"] = memberSelectedList;
      }

      try {
        const response = await getResponseFromServerWithParameters(http, ROOMS_CREATE_API, createParametersRequest(parameters));
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          window.location.reload();
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, memberSelectedList],
  );

  const updateRoom = useCallback(
    async (data) => {
      const parameters = {};
      for (const [key, values] of Object.entries(data)) {
        if (values) {
          parameters[key] = values;
        }
      }
      if (memberChatSelectedList.length > 0) {
        parameters["members"] = memberChatSelectedList;
      }
      parameters["rooms"] = roomSelected._id;

      try {
        const response = await getResponseFromServerWithParameters(http, ROOMS_UPDATE_API, createParametersRequest(parameters));
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          window.location.reload();
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, memberChatSelectedList, roomSelected],
  );

  const onDownload = useCallback(
    async (file) => {
      const parameters = {
        fileId: file._id,
      };
      try {
        const response = await getBlodFromServerWithParameters(http, FILES_DOWNLOAD_API, createParametersRequest(parameters));
        downloadFile(response, file);
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http],
  );

  const createMessage = useCallback(
    async (data, funCallback) => {
      const form = new FormData();
      for (const [key, values] of Object.entries(data)) {
        if (values) {
          form.append(key, values);
        }
      }
      if (files.length > 0) {
        for (const key of Object.keys(files)) {
          form.append("files", files[key]);
        }
      }
      if (auth.account) {
        form.append("senders", auth.account._id);
      }
      if (roomSelected) {
        form.append("rooms", roomSelected._id);
      }
      const parameters = {
        body: form,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, MESSAGE_CREATE_API, parameters);
        if (response.data) {
          socket.emit("send_message");
          funCallback();
          setFiles([]);
          setLoading(true);
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [auth, roomSelected, socket, files, http],
  );

  const updateMessage = useCallback(
    async (data, funCallback) => {
      const parameters = {};
      for (const [key, values] of Object.entries(data)) {
        if (values) {
          parameters[key] = values;
        }
      }

      try {
        const response = await getResponseFromServerWithParameters(http, MESSAGE_UPDATE_API, createParametersRequest(parameters));
        if (response.data) {
          socket.emit("send_message");
          funCallback();
          setFiles([]);
          setLoading(true);
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [socket, http],
  );

  useEffect(() => {
    getRoomList();
  }, [getRoomList]);

  useEffect(() => {
    socket.on("receive_message", () => {
      setLoading(true);
    });

    return () => {
      socket.off("receive_message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (!isObjEmpty(roomSelected) && isLoading) {
      getMessageList();
    }
  }, [roomSelected, isLoading, getMessageList]);

  useEffect(() => {
    dispatch(setObjectList(SET_MEMBER_LIST, storeState.memberOrgList));
  }, [dispatch, storeState]);

  return (
    <ChatContext.Provider
      value={{
        memberList,
        memberSelectedList,
        messageList,
        roomList,
        roomSelected,
        memberChatList,
        memberChatSelectedList,
        fileList,
        getInputProps,
        getRootProps,
        files,
        onDownload,
        onDelete,
        toggleRoomSelected,
        createRoom,
        updateRoom,
        createMessage,
        updateMessage,
        dispatch,
      }}
    >
      <Chat />
    </ChatContext.Provider>
  );
};
export default ChatContainer;
