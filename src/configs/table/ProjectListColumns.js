import Avatar from "../../components/avatar/Avatar";
import { Fragment } from "react";
import { Edit, Trello } from "react-feather";
import { format } from "date-fns";
import { completePhotoPath } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { Badge, UncontrolledTooltip } from "reactstrap";
import { t } from "i18next";
import { CATEGORIES, MODES, PROJECT_STATUS } from "./variable";
import AvatarGroup from "../../components/avatar-group/AvatarGroup";
import ButtonDelete from "../../components/buttonDelete/ButtonDelete";

export const projectListColumns = [
  {
    name: "Dự án",
    selector: (row) => row.projectName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.avatar ? <Avatar img={completePhotoPath(row.avatar)} /> : <Avatar content={row.projectName} initials />}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.projectName}</span>
          <small className="mx-1">@{row.description}</small>
        </div>
      </div>
    ),
  },
  {
    name: "Ngày bắt đầu",
    selector: (row) => row.startDate,
    sortable: true,
    minWidth: "130px",
    cell: (row) => <span>{row.startDate ? format(new Date(row.startDate), "dd/MM/yyyy") : ""}</span>,
  },
  {
    name: "Ngày kết thúc",
    selector: (row) => row.endDate,
    sortable: true,
    minWidth: "130px",
    cell: (row) => <span>{row.endDate ? format(new Date(row.endDate), "dd/MM/yyyy") : ""}</span>,
  },
  {
    name: "Thành viên",
    selector: (row) => row.members,
    sortable: false,
    minWidth: "120px",
    cell: (row) => {
      return <AvatarGroup data={row.members} />;
    },
  },
  {
    name: "Phân loại",
    selector: (row) => row.category,
    sortable: true,
    minWidth: "80px",
    cell: (row) => {
      return (
        <Badge color={CATEGORIES[row.category]} pill>
          {t(`category_mapping.${row.category}`, { defaultValue: "" })}
        </Badge>
      );
    },
  },
  {
    name: "Chế độ",
    selector: (row) => row.mode,
    sortable: true,
    minWidth: "80px",
    cell: (row) => {
      return (
        <Badge color={MODES[row.mode]} pill>
          {t(`mode_mapping.${row.mode}`, { defaultValue: "" })}
        </Badge>
      );
    },
  },
  {
    name: "Trạng thái",
    selector: (row) => row.status,
    sortable: true,
    minWidth: "80px",
    cell: (row) => {
      return (
        <Badge color={PROJECT_STATUS[row.status]} pill>
          {t(`status_mapping.${row.status}`, { defaultValue: "" })}
        </Badge>
      );
    },
  },
  {
    name: "Hành Động",
    allowOverflow: true,
    maxWidth: "130px",
    cell: (row) => {
      return (
        <Fragment>
          {row.flagEdit && (
            <Link to="/admin/projects/update" state={{ projectId: row._id }} className="me-1 ms-1">
              <Edit size={16} className="cursor-pointer" id="edit" />
              <UncontrolledTooltip placement="top" target="edit">
                Chỉnh sửa
              </UncontrolledTooltip>
            </Link>
          )}
          <Link to="/admin/sprints" state={{ projectId: row._id }} className="me-1">
            <Trello size={16} className="cursor-pointer" id="list" />
            <UncontrolledTooltip placement="top" target="list">
              Danh sách giai đoạn
            </UncontrolledTooltip>
          </Link>
          {row.flagDelete && <ButtonDelete row={row} category="project" />}
        </Fragment>
      );
    },
  },
];
