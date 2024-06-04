import Avatar from "../../components/avatar/Avatar";
import { Fragment } from "react";
import { BarChart2, Calendar, Edit, Trello } from "react-feather";
import { format } from "date-fns";
import { completePhotoPath } from "../../utils/helpers";
import { Link } from "react-router-dom";
import AvatarGroup from "../../components/avatar-group/AvatarGroup";
import { Badge, UncontrolledTooltip } from "reactstrap";
import ButtonDelete from "../../components/buttonDelete/ButtonDelete";

export const sprintListColumns = [
  {
    name: "Giai đoạn",
    selector: (row) => row.sprintName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.avatar ? <Avatar img={completePhotoPath(row.avatar)} /> : <Avatar content={row.sprintName} initials />}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.sprintName}</span>
          <small className="mx-1">@{row.description}</small>
        </div>
      </div>
    ),
  },
  {
    name: "Ngày bắt đầu",
    selector: (row) => row.startDate,
    sortable: true,
    minWidth: "150px",
    cell: (row) => <span>{row.startDate ? format(new Date(row.startDate), "dd/MM/yyyy") : ""}</span>,
  },
  {
    name: "Ngày kết thúc",
    selector: (row) => row.endDate,
    sortable: true,
    minWidth: "150px",
    cell: (row) => <span>{row.endDate ? format(new Date(row.endDate), "dd/MM/yyyy") : ""}</span>,
  },
  {
    name: "Thành viên",
    selector: (row) => row.members,
    sortable: false,
    minWidth: "150px",
    cell: (row) => {
      return <AvatarGroup data={row.members} />;
    },
  },
  {
    name: "Phân loại",
    selector: (row) => row.categories,
    sortable: true,
    minWidth: "50px",
    cell: (row) => {
      return (
        <Badge color="info" pill>
          số lượng: {row.categories.length || 0}
        </Badge>
      );
    },
  },
  {
    name: "Nhãn",
    selector: (row) => row.labels,
    sortable: true,
    minWidth: "50px",
    cell: (row) => {
      return (
        <Badge color="info" pill>
          số lượng: {row.labels.length || 0}
        </Badge>
      );
    },
  },
  {
    name: "Độ ưu tiên",
    selector: (row) => row.priorities,
    sortable: true,
    minWidth: "50px",
    cell: (row) => {
      return (
        <Badge color="info" pill>
          số lượng: {row.priorities.length || 0}
        </Badge>
      );
    },
  },
  {
    name: "Hành động",
    allowOverflow: true,
    maxWidth: "140px",
    cell: (row) => {
      return (
        <Fragment>
          {row.flagEdit && (
            <Link to="/admin/sprints/update" state={{ sprintId: row._id, projectId: row.projects }} className="me-5px">
              <Edit size={16} className="cursor-pointer" id="edit" />
              <UncontrolledTooltip placement="top" target="edit">
                Chỉnh sửa
              </UncontrolledTooltip>
            </Link>
          )}
          <Link to="/admin/boards" state={{ sprintId: row._id }} className="me-5px">
            <Trello size={16} className="cursor-pointer" id="list" />
            <UncontrolledTooltip placement="top" target="list">
              Danh sách công việc
            </UncontrolledTooltip>
          </Link>
          <Link to="/admin/calendars" state={{ sprintId: row._id }} className="me-5px">
            <Calendar size={16} className="cursor-pointer" id="calendar" />
            <UncontrolledTooltip placement="top" target="calendar">
              Lịch trình
            </UncontrolledTooltip>
          </Link>
          <Link to="/admin/sprints/progress" state={{ sprintId: row._id }} className="me-5px">
            <BarChart2 size={16} className="cursor-pointer" id="schedule" />
            <UncontrolledTooltip placement="top" target="schedule">
              Tiến độ
            </UncontrolledTooltip>
          </Link>
          {row.flagDelete && <ButtonDelete row={row} category="sprint" />}
        </Fragment>
      );
    },
  },
];
