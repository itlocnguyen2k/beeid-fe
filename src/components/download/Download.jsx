import { Fragment, useCallback } from "react";
import { Download } from "react-feather";
import { UncontrolledTooltip } from "reactstrap";
import { useHttp } from "../../hook/useHttp";
import { downloadFile, getBlodFromServerWithParameters, toggleSweetAlert } from "../../utils/helpers";
import { createParametersRequest } from "../../utils/sessionStorageHelper";

const DownloadComponent = (props) => {
  const { file, url } = props;
  const http = useHttp();
  const onDownload = useCallback(
    async (file) => {
      const parameters = {
        fileId: file._id,
      };
      try {
        const response = await getBlodFromServerWithParameters(http, url, createParametersRequest(parameters));
        downloadFile(response, file);
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, url],
  );
  return (
    <Fragment>
      <Download size={16} className="cursor-pointer" onClick={() => onDownload(file)} id="download" />
      <UncontrolledTooltip placement="top" target="download">
        Tải xuống
      </UncontrolledTooltip>
    </Fragment>
  );
};
export default DownloadComponent;
