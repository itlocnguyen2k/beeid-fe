import { format } from "date-fns";
import { Fragment } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { Col, Media, Row } from "reactstrap";
import ChatContext from "../../context/ChatContext";
import { completeFilePath } from "../../utils/helpers";

const ModalFile = () => {
  const chatContext = useContext(ChatContext);
  const { fileList, onDownload } = chatContext;
  const renderFiles = useMemo(() => {
    if (fileList.length > 0) {
      return (
        <Row className="mt-1">
          {fileList.map((file) => (
            <Fragment>
              <Col lg="7" className="mb-1" key={file._id}>
                <Media className="d-flex align-items-center cursor-pointer file-item" onClick={() => onDownload(file)}>
                  <img
                    className="me-1"
                    src={window.location.origin + `/app-assets/images/file/${completeFilePath(file.fileName)}.svg`}
                    alt="pdf"
                    height="23"
                  />
                  <Media body>{file.fileName}</Media>
                </Media>
              </Col>
              <Col lg="2" className="mb-1">
                {file.fileSize / 1000}kb
              </Col>
              <Col lg="3" className="mb-1">
                {file.createdAt ? format(new Date(file.createdAt), "dd/MM/yyyy HH:mm:ss") : ""}
              </Col>
            </Fragment>
          ))}
        </Row>
      );
    } else {
      return <div className="d-flex justify-content-center mt-1">Không có dữ liệu !</div>;
    }
  }, [fileList, onDownload]);
  return (
    <div>
      <div className="divider">
        <div className="divider-text">Danh sách tệp tải lên</div>
      </div>
      <div className="wrapper-overflow" style={{ height: "350px" }}>
        {renderFiles}
      </div>
    </div>
  );
};
export default ModalFile;
