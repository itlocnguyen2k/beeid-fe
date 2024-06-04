import Avatar from "../../components/avatar/Avatar";
import { t } from "i18next";
import { Edit } from "react-feather";
import { format } from "date-fns";
import { completePhotoPath, progressColorMapping } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { Progress, UncontrolledTooltip } from "reactstrap";
import { Fragment } from "react";
import ButtonDelete from "../../components/buttonDelete/ButtonDelete";

export const subTaskListColumns = [
  {
    name: "Tiêu đề",
    selector: (row) => row.subTitle,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.avatar ? <Avatar img={completePhotoPath(row.avatar)} /> : <Avatar content={row.subTitle} initials />}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.subTitle}</span>
        </div>
      </div>
    ),
  },
  {
    name: "Bắt đầu",
    selector: (row) => row.startDate,
    sortable: true,
    minWidth: "150px",
    cell: (row) => <span>{row.startDate ? format(new Date(row.startDate), "dd/MM/yyyy HH:mm") : ""}</span>,
  },
  {
    name: "Kết thúc",
    selector: (row) => row.endDate,
    sortable: true,
    minWidth: "150px",
    cell: (row) => <span>{row.endDate ? format(new Date(row.endDate), "dd/MM/yyyy HH:mm") : ""}</span>,
  },
  {
    name: "Người phụ trách",
    selector: (row) => row.owners.fullName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.owners.avatar ? (
          <Avatar
            img={completePhotoPath(row.owners.avatar)}
            status={t(`account_status_mapping.${row.owners.status}`, { defaultValue: "" })}
          />
        ) : (
          <Avatar content={row.owners.fullName} initials status={t(`account_status_mapping.${row.owners.status}`, { defaultValue: "" })} />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.owners.fullName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "Phân loại",
    selector: (row) => row.categories.categoryName,
    sortable: true,
    minWidth: "100px",
    cell: (row) => (
      <div className="badge board-tag rounded-pill" style={{ backgroundColor: row.categories.color, minWidth: "80px" }}>
        {row.categories.categoryName}
      </div>
    ),
  },
  {
    name: "Độ ưu tiên",
    selector: (row) => row.priorities.priorityName,
    sortable: true,
    minWidth: "100px",
    cell: (row) => (
      <div className="badge board-tag rounded-pill" style={{ backgroundColor: row.priorities.color, minWidth: "80px" }}>
        {row.priorities.priorityName}
      </div>
    ),
  },
  {
    name: "Tiến độ",
    selector: (row) => row.status,
    sortable: true,
    minWidth: "100px",
    cell: (row) => {
      return (
        <div className="design-group mb-1">
          <div className="d-flex justify-content-between">
            <small style={{ marginLeft: "5px" }}>{row.progress || 0}%</small>
          </div>
          <Progress className="progress-sm progress-list" value={row.progress || 0} color={progressColorMapping(parseInt(row.progress))} />
        </div>
      );
    },
  },
  {
    name: "Hành động",
    allowOverflow: true,
    maxWidth: "130px",
    cell: (row) => {
      return (
        <Fragment>
          {row.flagEdit && (
            <Link
              to="/admin/sub-tasks/update"
              state={{ subTaskId: row._id, taskId: row.tasks._id, sprintId: row.tasks.sprints }}
              className="me-1"
            >
              <Edit size={16} className="cursor-pointer" id="edit" />
              <UncontrolledTooltip placement="top" target="edit">
                Chỉnh sửa
              </UncontrolledTooltip>
            </Link>
          )}
          {row.flagDelete && <ButtonDelete row={row} category="subtask" />}
        </Fragment>
      );
    },
  },
];
