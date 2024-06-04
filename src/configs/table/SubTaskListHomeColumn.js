import Avatar from "../../components/avatar/Avatar";
import { Edit } from "react-feather";
import { isBefore } from "date-fns";
import { completePhotoPath, progressColorMapping } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { Progress, UncontrolledTooltip } from "reactstrap";
import Timer from "../../components/timer/Timer";
import { Fragment } from "react";
import ButtonDelete from "../../components/buttonDelete/ButtonDelete";

export const subTaskListColumns = [
  {
    name: "Dự án",
    selector: (row) => row.tasks.sprints.projects.projectName,
    sortable: true,
    minWidth: "150px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.tasks.sprints.projects.avatar ? (
          <Avatar img={completePhotoPath(row.tasks.sprints.projects.avatar)} />
        ) : (
          <Avatar content={row.tasks.sprints.projects.projectName} initials />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.tasks.sprints.projects.projectName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "Giai đoạn",
    selector: (row) => row.tasks.sprints.sprintName,
    sortable: true,
    minWidth: "150px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.tasks.sprints.projects.avatar ? (
          <Avatar img={completePhotoPath(row.tasks.sprints.avatar)} />
        ) : (
          <Avatar content={row.tasks.sprints.sprintName} initials />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.tasks.sprints.sprintName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "Công việc",
    selector: (row) => row.tasks.taskTitle,
    sortable: true,
    minWidth: "150px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.tasks.avatar ? <Avatar img={completePhotoPath(row.tasks.avatar)} /> : <Avatar content={row.tasks.taskTitle} initials />}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.tasks.taskTitle}</span>
        </div>
      </div>
    ),
  },
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
    name: "Thời gian",
    selector: (row) => row.endDate,
    sortable: true,
    minWidth: "150px",
    cell: (row) => (isBefore(new Date(row.endDate), new Date()) ? <div>Quá hạn 🔥</div> : <Timer deadline={row.endDate} />),
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
