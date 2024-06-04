import { lazy, useContext, useEffect, useState } from "react";
import SubTaskContext from "../../../context/SubTaskContext";
import TaskContext from "../../../context/TaskContext";

const FileList = lazy(() => import("./FileList"));

const FileListContainer = (props) => {
  const { type } = props;
  const taskContext = useContext(TaskContext);
  const subTaskContext = useContext(SubTaskContext);

  const [fileList, setFileList] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    if (type === "1") {
      if (taskContext.task?.files?.length > 0) {
        setFileList(taskContext.task.files);
        setTotalRows(taskContext.task.files.length);
      }
    }
    if (type === "2") {
      if (subTaskContext.subTask?.files?.length > 0) {
        setFileList(subTaskContext.subTask.files);
        setTotalRows(subTaskContext.subTask.files.length);
      }
    }
  }, [taskContext, subTaskContext, type]);

  return (
    <FileList
      fileList={fileList}
      pageSize={pageSize}
      currentPage={currentPage}
      totalRows={totalRows}
      setPageSize={setPageSize}
      setCurrentPage={setCurrentPage}
    />
  );
};
export default FileListContainer;
