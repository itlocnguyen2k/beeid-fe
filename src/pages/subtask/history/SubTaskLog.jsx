import { format } from "date-fns";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Col, Media, Row } from "reactstrap";
import Avatar from "../../../components/avatar/Avatar";
import CollapseAbout from "../../../components/collapse/CollapseAbout";
import { completeFilePath, completePhotoPath, formatDateToMonthShort } from "../../../utils/helpers";

const SubTaskLog = (props) => {
  const { logsList, onDownload } = props;
  const { t } = useTranslation();

  const logData = useMemo(() => {
    if (logsList.length > 0) {
      return logsList.map((log) => {
        if (log.type === 1) {
          if (log.logs.event === 1) {
            return (
              <li className="timeline-item">
                <span className="timeline-point">
                  <Avatar img={completePhotoPath(log.author.avatar)} />
                </span>
                <div className="timeline-event">
                  <div className="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
                    <h6>{log.author.fullName}</h6>
                    <span className="timeline-event-time">{formatDateToMonthShort(log.createdAt)}</span>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <ul className="list-style-square">
                      <li>
                        Công việc phụ <strong>{log.logs.subTaskName}</strong> đã được tạo !
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            );
          } else if (log.logs.event === 3) {
            return (
              <li className="timeline-item">
                <span className="timeline-point">
                  <Avatar img={completePhotoPath(log.author.avatar)} />
                </span>
                <div className="timeline-event">
                  <div className="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
                    <h6>{log.author.fullName}</h6>
                    <span className="timeline-event-time">{formatDateToMonthShort(log.createdAt)}</span>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <ul className="list-style-square">
                      <li>
                        Công việc được chuyển từ <strong>{log.logs.oldBoard.boardTitle}</strong> thành{" "}
                        <strong>{log.logs.newBoard.boardTitle}</strong> !
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            );
          } else {
            return (
              <li className="timeline-item">
                <span className="timeline-point">
                  <Avatar img={completePhotoPath(log.author.avatar)} />
                </span>
                <div className="timeline-event">
                  <div className="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
                    <h6>{log.author.fullName}</h6>
                    <span className="timeline-event-time">{formatDateToMonthShort(log.createdAt)}</span>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <ul className="list-style-square">
                      {log.logs.logList.map((item) => {
                        if (item.field === "categories") {
                          return (
                            <li>
                              <strong>{t(`key_label_mapping.${item.field}`, { defaultValue: "" })}</strong> được thay đổi từ{" "}
                              <div className="badge rounded-pill board-tag board-log" style={{ backgroundColor: item.newCategory.color }}>
                                <small style={{ fontSize: "9px" }}>{item.newCategory.categoryName}</small>
                              </div>{" "}
                              thành{" "}
                              <div className="badge rounded-pill board-tag board-log" style={{ backgroundColor: item.oldCategory.color }}>
                                <small style={{ fontSize: "9px" }}>{item.oldCategory.categoryName}</small>
                              </div>
                            </li>
                          );
                        } else if (item.field === "priorities") {
                          return (
                            <li>
                              <strong>{t(`key_label_mapping.${item.field}`, { defaultValue: "" })}</strong> được thay đổi từ{" "}
                              <div className="badge rounded-pill board-tag board-log" style={{ backgroundColor: item.newPriority.color }}>
                                <small style={{ fontSize: "9px" }}>{item.newPriority.priorityName}</small>
                              </div>{" "}
                              thành{" "}
                              <div className="badge rounded-pill board-tag board-log" style={{ backgroundColor: item.oldPriority.color }}>
                                <small style={{ fontSize: "9px" }}>{item.oldPriority.priorityName}</small>
                              </div>
                            </li>
                          );
                        } else if (item.field === "owners") {
                          return (
                            <li>
                              <div className="d-flex align-items-center">
                                <strong style={{ marginRight: "5px" }}>{t(`key_label_mapping.${item.field}`, { defaultValue: "" })}</strong>{" "}
                                được thay đổi từ{" "}
                                <span className="d-flex mx-5px align-items-center">
                                  {item.oldOwner.avatar ? (
                                    <Avatar img={completePhotoPath(item.oldOwner.avatar)} size="1sm" />
                                  ) : (
                                    <Avatar content={item.oldOwner.fullName || "G"} initials size="1sm" />
                                  )}
                                  <div className="user-info text-truncate ms-5px">
                                    <span className="d-block font-weight-bold text-truncate">
                                      <strong>{item.oldOwner.fullName}</strong>
                                    </span>
                                  </div>
                                </span>{" "}
                                thành{" "}
                                <span className="d-flex mx-5px align-items-center">
                                  {item.newOwner.avatar ? (
                                    <Avatar img={completePhotoPath(item.newOwner.avatar)} size="1sm" />
                                  ) : (
                                    <Avatar content={item.newOwner.fullName || "G"} initials size="1sm" />
                                  )}
                                  <div className="user-info text-truncate ms-5px">
                                    <span className="d-block font-weight-bold text-truncate">
                                      <strong>{item.newOwner.fullName}</strong>
                                    </span>
                                  </div>
                                </span>
                              </div>
                            </li>
                          );
                        } else if (item.field === "progress") {
                          return (
                            <li>
                              <strong>{t(`key_label_mapping.${item.field}`, { defaultValue: "" })}</strong> được thay đổi từ{" "}
                              <strong>{item.oldValue}%</strong> thành <strong>{item.newValue}%</strong>.
                            </li>
                          );
                        } else if (item.field === "estimate" || item.field === "actual") {
                          return (
                            <li>
                              <strong>{t(`key_label_mapping.${item.field}`, { defaultValue: "" })}</strong> được thay đổi từ{" "}
                              <strong>{item.oldValue}h</strong> thành <strong>{item.newValue}h</strong>.
                            </li>
                          );
                        } else if (item.field === "about") {
                          return (
                            <li>
                              <strong>{t(`key_label_mapping.${item.field}`, { defaultValue: "" })}</strong> được cập nhật{" "}
                              <CollapseAbout>
                                <p>Chi tiết cũ:</p>
                                <div
                                  dangerouslySetInnerHTML={{ __html: item.oldValue }}
                                  className="mb-1 border-start-primary border-start-3 px-2 pb-2"
                                />
                                <p>Chi tiết mới:</p>
                                <div
                                  dangerouslySetInnerHTML={{ __html: item.newValue }}
                                  className="mb-1 border-start-primary border-start-3 px-2 pb-2"
                                />
                              </CollapseAbout>
                            </li>
                          );
                        } else if (item.field === "startDate" || item.field === "endDate") {
                          return (
                            <li>
                              <strong>{t(`key_label_mapping.${item.field}`, { defaultValue: "" })}</strong> được thay đổi từ{" "}
                              <strong>{item.oldValue ? format(new Date(item.oldValue), "dd/MM/yyyy HH:mm") : ""}</strong> thành{" "}
                              <strong>{item.newValue ? format(new Date(item.newValue), "dd/MM/yyyy HH:mm") : ""}</strong>.
                            </li>
                          );
                        } else {
                          return (
                            <li>
                              <strong>{t(`key_label_mapping.${item.field}`, { defaultValue: "" })}</strong> được thay đổi từ{" "}
                              <strong>{item.oldValue}</strong> thành <strong>{item.newValue}</strong>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            );
          }
        } else {
          return (
            <li className="timeline-item">
              <span className="timeline-point">
                <Avatar img={completePhotoPath(log.author.avatar)} />
              </span>
              <div className="timeline-event">
                <div className="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
                  <h6>{log.author.fullName}</h6>
                  <span className="timeline-event-time">{formatDateToMonthShort(log.createdAt)}</span>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <div dangerouslySetInnerHTML={{ __html: log.notes.note }} />
                </div>
                {log.notes.files.length > 0 ? (
                  <Row className="mt-1">
                    {log.notes.files.map((file) => (
                      <Col lg="12" className="mb-1" key={file._id}>
                        <Media className="d-flex align-items-center cursor-pointer" onClick={() => onDownload(file)}>
                          <img
                            className="me-1"
                            src={window.location.origin + `/app-assets/images/file/${completeFilePath(file.fileName)}.svg`}
                            alt="pdf"
                            height="23"
                          />
                          <Media body>
                            {file.fileName} - {file.fileSize / 1000}kb
                          </Media>
                        </Media>
                      </Col>
                    ))}
                  </Row>
                ) : null}
              </div>
            </li>
          );
        }
      });
    }
  }, [logsList, t, onDownload]);
  return <ul className="timeline">{logData}</ul>;
};
export default SubTaskLog;
