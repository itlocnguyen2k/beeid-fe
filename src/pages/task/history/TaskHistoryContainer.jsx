import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { lazy } from "react";
import { useDropzone } from "react-dropzone";
import { FILES_DOWNLOAD_API, LOGS_LIST_API, NOTES_CREATE_API, NOTES_UPDATE_API } from "../../../constants/api";
import TaskContext from "../../../context/TaskContext";
import { useHttp } from "../../../hook/useHttp";
import {
  downloadFile,
  getBlodFromServerWithParameters,
  getResponseFromServerWithParameters,
  toggleSweetAlert,
} from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const TaskHistory = lazy(() => import("./TaskHistory"));
const TaskHistoryContainer = () => {
  const http = useHttp();

  const taskContext = useContext(TaskContext);
  const { task } = taskContext;

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
      type: 1,
      taskId: task._id,
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
  }, [http, task]);

  const updateNote = useCallback(
    async (data) => {
      const form = new FormData();
      form.append("taskId", task._id);
      form.append("type", 1);
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
    [http, files, task],
  );

  const onSubmit = useCallback(
    async (data) => {
      const form = new FormData();
      form.append("taskId", task._id);
      form.append("type", 1);
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
    [http, files, task],
  );

  useEffect(() => {
    getLogList();
  }, [getLogList]);

  return (
    <TaskHistory
      task={task}
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
export default TaskHistoryContainer;
