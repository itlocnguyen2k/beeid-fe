// ** Third Party Components
import Proptypes from "prop-types";
import classnames from "classnames";
import Avatar from "../avatar/Avatar";
import { completeFilePath, completePhotoPath, formatDateToMonthShort } from "../../utils/helpers";
import { Col, Media, Row } from "reactstrap";

const Timeline = (props) => {
  // ** Props
  const { data, tag, className, onDownload } = props;

  // ** Custom Tagg
  const Tag = tag ? tag : "ul";

  return (
    <Tag
      className={classnames("timeline", {
        [className]: className,
      })}
    >
      {data.map((item, i) => {
        const ItemTag = item.tag ? item.tag : "li";
        return (
          <ItemTag
            key={i}
            className={classnames("timeline-item", {
              [item.className]: className,
            })}
          >
            <span
              className={classnames("timeline-point", {
                [`timeline-point-${item.color}`]: item.color,
                "timeline-point-indicator": !item.icon,
              })}
            >
              {item.owners.avatar ? (
                <Avatar img={completePhotoPath(item.owners.avatar)} />
              ) : (
                <Avatar content={item?.owners?.fullName || "G"} initials />
              )}
            </span>
            <div className="user-info text-truncate">
              <span className="d-block font-weight-bold text-truncate fw-bolder mb-1">{item.owners.fullName}</span>
            </div>
            <div className="timeline-event">
              <div
                className={classnames("d-flex justify-content-between flex-sm-row flex-column", {
                  "mb-sm-0 mb-1": item.createdAt,
                })}
              >
                <h6>{item.title}</h6>
                {item.createdAt ? (
                  <span
                    className={classnames("timeline-event-time", {
                      [item.metaClassName]: item.metaClassName,
                    })}
                  >
                    {formatDateToMonthShort(item.createdAt)}
                  </span>
                ) : null}
              </div>
              <p
                className={classnames({
                  "mb-0": i === data.length - 1 && !item.customContent,
                })}
              >
                {item.content}
              </p>
              {item.files.length > 0 ? (
                <Row>
                  {item.files.map((file) => (
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
          </ItemTag>
        );
      })}
    </Tag>
  );
};

export default Timeline;

// ** PropTypes
Timeline.propTypes = {
  data: Proptypes.array.isRequired,
  className: Proptypes.string,
  tag: Proptypes.string,
};
