import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { lazy } from "react";
import { useDropzone } from "react-dropzone";
import { FILES_DOWNLOAD_API, LOGS_LIST_API, NOTES_CREATE_API, NOTES_UPDATE_API } from "../../../constants/api";
import SubTaskContext from "../../../context/SubTaskContext";
import { useHttp } from "../../../hook/useHttp";
import { downloadFile, getBlodFromServerWithParameters, getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const SubTaskHistory = lazy(() => import("./SubTaskHistory"));
const SubTaskHistoryContainer = () => {
  const http = useHttp();

  const subTaskContext = useContext(SubTaskContext);
  const { subTask } = subTaskContext;

  const [files, setFiles] = useState([]);
  const [logsList, setLogsList] = useState([]);
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

  const getLogList = useCallback(async () => {
    const parameters = {
      type: 2,
      subTaskId: subTask._id,
    };
    try {
      const response = await getResponseFromServerWithParameters(http, LOGS_LIST_API, createParametersRequest(parameters));
      if (response.data) {
        setLogsList(response.data.logs);
      } else {
        toggleSweetAlert("Thông báo", response.message, "error");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, subTask]);

  const updateNote = useCallback(
    async (data) => {
      const form = new FormData();
      form.append("taskId", subTask._id);
      form.append("type", 2);
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
      const parameters = {
        body: form,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, NOTES_UPDATE_API, parameters);
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        window.location.reload();
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, files, subTask],
  );

  const onSubmit = useCallback(
    async (data) => {
      const form = new FormData();
      form.append("subTaskId", subTask._id);
      form.append("type", 2);
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
      const parameters = {
        body: form,
      };

      try {
        const response = await getResponseFromServerWithParameters(http, NOTES_CREATE_API, parameters);
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        window.location.reload();
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, files, subTask],
  );

  useEffect(() => {
    getLogList();
  }, [getLogList]);

  return (
    <SubTaskHistory
      subTask={subTask}
      logsList={logsList}
      getInputProps={getInputProps}
      getRootProps={getRootProps}
      files={files}
      onDelete={onDelete}
      onDownload={onDownload}
      onSubmit={onSubmit}
      updateNote={updateNote}
    />
  );
};
export default SubTaskHistoryContainer;
