import { ROLES, STATUS } from "./variable";
import Avatar from "../../components/avatar/Avatar";
import { Badge, UncontrolledTooltip } from "reactstrap";
import { t } from "i18next";
import { Edit } from "react-feather";
import { format } from "date-fns";
import { completePhotoPath } from "../../utils/helpers";
import { Link } from "react-router-dom";
import ButtonDelete from "../../components/buttonDelete/ButtonDelete";
import { Fragment } from "react";

export const accountListColumns = [
  {
    name: "Họ và tên",
    selector: (row) => row.fullName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.avatar ? (
          <Avatar img={completePhotoPath(row.avatar)} status={t(`account_status_mapping.${row.status}`, { defaultValue: "" })} />
        ) : (
          <Avatar content={row.fullName} initials status={t(`account_status_mapping.${row.status}`, { defaultValue: "" })} />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.fullName}</span>
          <small className="mx-1">@{row.userName}</small>
        </div>
      </div>
    ),
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    minWidth: "250px",
  },
  {
    name: "Giới tính",
    selector: (row) => row.gender,
    sortable: true,
    minWidth: "100px",
    cell: (row) => {
      return <span>{t(`gender_mapping.${row.gender}`, { defaultValue: "" })}</span>;
    },
  },
  {
    name: "Ngày sinh",
    selector: (row) => row.dob,
    sortable: true,
    minWidth: "150px",
    cell: (row) => <span>{row.dob ? format(new Date(row.dob), "dd/MM/yyyy") : ""}</span>,
  },
  {
    name: "Loại tài khoản",
    selector: (row) => row.role,
    sortable: true,
    minWidth: "150px",
    cell: (row) => {
      return (
        <Badge color={ROLES[row.role]} pill>
          {t(`role_mapping.${row.role}`, { defaultValue: "" })}
        </Badge>
      );
    },
  },
  {
    name: "Trạng thái",
    selector: (row) => row.isLoginFirstTime,
    sortable: true,
    minWidth: "150px",
    cell: (row) => {
      return (
        <Badge color={STATUS[row.isLoginFirstTime]} pill outline>
          {t(`is_login_first_time_mapping.${row.isLoginFirstTime}`, { defaultValue: "" })}
        </Badge>
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
            <Link to="/admin/accounts/update" state={{ accountId: row._id }} className="me-1 ms-1">
              <Edit size={16} className="cursor-pointer" id="edit" />
              <UncontrolledTooltip placement="top" target="edit">
                Chỉnh sửa
              </UncontrolledTooltip>
            </Link>
          )}
          {row.flagDelete && <ButtonDelete row={row} category="account" />}
        </Fragment>
      );
    },
  },
];
