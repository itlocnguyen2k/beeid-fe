import { format } from "date-fns";
import { completeFilePath } from "../../utils/helpers";
import { Media } from "reactstrap";
import DownloadComponent from "../../components/download/Download";
import { Fragment } from "react";
import ButtonDelete from "../../components/buttonDelete/ButtonDelete";
import { FILES_DOWNLOAD_API } from "../../constants/api";

export const FileListColumns = [
  {
    name: "File",
    selector: (row) => row.fileName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <Media className="d-flex align-items-center">
        <img
          className="me-1"
          src={window.location.origin + `/app-assets/images/file/${completeFilePath(row.fileName)}.svg`}
          alt="pdf"
          height="23"
        />
        <Media body>{row.fileName}</Media>
      </Media>
    ),
  },
  {
    name: "Size",
    selector: (row) => row.fileSize,
    sortable: true,
    minWidth: "130px",
    cell: (row) => <span>{row.fileSize / 1000} kb</span>,
  },
  {
    name: "Định dạng",
    selector: (row) => row.fileSize,
    sortable: true,
    minWidth: "130px",
    cell: (row) => <span>{row.fileName.split(".")[row.fileName.split(".").length - 1].toUpperCase()}</span>,
  },
  {
    name: "Upload",
    selector: (row) => row.createdAt,
    sortable: true,
    minWidth: "130px",
    cell: (row) => <span>{row.createdAt ? format(new Date(row.createdAt), "dd/MM/yyyy HH:mm:ss") : ""}</span>,
  },
  {
    name: "Hành Động",
    allowOverflow: true,
    maxWidth: "130px",
    cell: (row) => {
      return (
        <Fragment>
          <span className="me-1">
            <DownloadComponent file={row} url={FILES_DOWNLOAD_API} />
          </span>
          <ButtonDelete row={row} category="file" />
        </Fragment>
      );
    },
  },
];
