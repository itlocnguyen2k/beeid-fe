import Avatar from "../../components/avatar/Avatar";
import { t } from "i18next";
import { completeFilePath, completePhotoPath } from "../../utils/helpers";
import { format, isBefore } from "date-fns";
import Timer from "../../components/timer/Timer";
import { addDay } from "../../utils/helpers";
import ButtonRestore from "../../components/buttonRestore/ButtonRestore";
import { Media } from "reactstrap";

export const accountListColumns = [
  {
    name: "Họ và tên",
    selector: (row) => row.objects.fullName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.objects.avatar ? (
          <Avatar
            img={completePhotoPath(row.objects.avatar)}
            status={t(`account_status_mapping.${row.objects.status}`, { defaultValue: "" })}
          />
        ) : (
          <Avatar
            content={row.objects.fullName}
            initials
            status={t(`account_status_mapping.${row.objects.status}`, { defaultValue: "" })}
          />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.objects.fullName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "Thời gian xóa",
    selector: (row) => row.createdAt,
    sortable: true,
    minWidth: "150px",
    cell: (row) => <span>{row.createdAt ? format(new Date(row.createdAt), "dd/MM/yyyy HH:mm:ss") : ""}</span>,
  },
  {
    name: "Thời gian lưu trữ",
    selector: (row) => row.updatedAt,
    sortable: true,
    minWidth: "150px",
    cell: (row) =>
      isBefore(new Date(addDay(new Date(row.createdAt), 30)), new Date()) ? (
        <div>Quá hạn 🔥</div>
      ) : (
        <Timer deadline={new Date(addDay(new Date(row.createdAt), 30))} />
      ),
  },
  {
    name: "Người xóa",
    selector: (row) => row.authors.fullName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.authors.avatar ? (
          <Avatar
            img={completePhotoPath(row.authors.avatar)}
            status={t(`account_status_mapping.${row.authors.status}`, { defaultValue: "" })}
          />
        ) : (
          <Avatar
            content={row.authors.fullName}
            initials
            status={t(`account_status_mapping.${row.authors.status}`, { defaultValue: "" })}
          />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.authors.fullName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "Hành động",
    allowOverflow: true,
    maxWidth: "130px",
    cell: (row) => {
      return <ButtonRestore row={row} category="account" />;
    },
  },
];

export const projectListColumns = [
  {
    name: "Dự án",
    selector: (row) => row.objects.projectName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.objects.avatar ? (
          <Avatar img={completePhotoPath(row.objects.avatar)} />
        ) : (
          <Avatar content={row.objects.projectName} initials />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.objects.projectName}</span>
          <small className="mx-1">@{row.objects.description}</small>
        </div>
      </div>
    ),
  },
  {
    name: "Thời gian xóa",
    selector: (row) => row.createdAt,
    sortable: true,
    minWidth: "150px",
    cell: (row) => <span>{row.createdAt ? format(new Date(row.createdAt), "dd/MM/yyyy HH:mm:ss") : ""}</span>,
  },
  {
    name: "Thời gian lưu trữ",
    selector: (row) => row.updatedAt,
    sortable: true,
    minWidth: "150px",
    cell: (row) =>
      isBefore(new Date(addDay(new Date(row.createdAt), 30)), new Date()) ? (
        <div>Quá hạn 🔥</div>
      ) : (
        <Timer deadline={new Date(addDay(new Date(row.createdAt), 30))} />
      ),
  },
  {
    name: "Người xóa",
    selector: (row) => row.authors.fullName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.authors.avatar ? (
          <Avatar
            img={completePhotoPath(row.authors.avatar)}
            status={t(`account_status_mapping.${row.authors.status}`, { defaultValue: "" })}
          />
        ) : (
          <Avatar
            content={row.authors.fullName}
            initials
            status={t(`account_status_mapping.${row.authors.status}`, { defaultValue: "" })}
          />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.authors.fullName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "Hành động",
    allowOverflow: true,
    maxWidth: "130px",
    cell: (row) => {
      return <ButtonRestore row={row} category="project" />;
    },
  },
];

export const sprintListColumns = [
  {
    name: "Giai đoạn",
    selector: (row) => row.objects.sprintName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.objects.avatar ? <Avatar img={completePhotoPath(row.objects.avatar)} /> : <Avatar content={row.objects.sprintName} initials />}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.objects.sprintName}</span>
          <small className="mx-1">@{row.objects.description}</small>
        </div>
      </div>
    ),
  },
  {
    name: "Thời gian xóa",
    selector: (row) => row.createdAt,
    sortable: true,
    minWidth: "150px",
    cell: (row) => <span>{row.createdAt ? format(new Date(row.createdAt), "dd/MM/yyyy HH:mm:ss") : ""}</span>,
  },
  {
    name: "Thời gian lưu trữ",
    selector: (row) => row.updatedAt,
    sortable: true,
    minWidth: "150px",
    cell: (row) =>
      isBefore(new Date(addDay(new Date(row.createdAt), 30)), new Date()) ? (
        <div>Quá hạn 🔥</div>
      ) : (
        <Timer deadline={new Date(addDay(new Date(row.createdAt), 30))} />
      ),
  },
  {
    name: "Người xóa",
    selector: (row) => row.authors.fullName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.authors.avatar ? (
          <Avatar
            img={completePhotoPath(row.authors.avatar)}
            status={t(`account_status_mapping.${row.authors.status}`, { defaultValue: "" })}
          />
        ) : (
          <Avatar
            content={row.authors.fullName}
            initials
            status={t(`account_status_mapping.${row.authors.status}`, { defaultValue: "" })}
          />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.authors.fullName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "Hành động",
    allowOverflow: true,
    maxWidth: "130px",
    cell: (row) => {
      return <ButtonRestore row={row} category="sprint" />;
    },
  },
];

export const taskListColumns = [
  {
    name: "Công việc",
    selector: (row) => row.objects.taskTitle,
    sortable: true,
    minWidth: "150px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.objects.avatar ? <Avatar img={completePhotoPath(row.objects.avatar)} /> : <Avatar content={row.objects.taskTitle} initials />}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.objects.taskTitle}</span>
        </div>
      </div>
    ),
  },
  {
    name: "Thời gian xóa",
    selector: (row) => row.createdAt,
    sortable: true,
    minWidth: "150px",
    cell: (row) => <span>{row.createdAt ? format(new Date(row.createdAt), "dd/MM/yyyy HH:mm:ss") : ""}</span>,
  },
  {
    name: "Thời gian lưu trữ",
    selector: (row) => row.updatedAt,
    sortable: true,
    minWidth: "150px",
    cell: (row) =>
      isBefore(new Date(addDay(new Date(row.createdAt), 30)), new Date()) ? (
        <div>Quá hạn 🔥</div>
      ) : (
        <Timer deadline={new Date(addDay(new Date(row.createdAt), 30))} />
      ),
  },
  {
    name: "Người xóa",
    selector: (row) => row.authors.fullName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.authors.avatar ? (
          <Avatar
            img={completePhotoPath(row.authors.avatar)}
            status={t(`account_status_mapping.${row.authors.status}`, { defaultValue: "" })}
          />
        ) : (
          <Avatar
            content={row.authors.fullName}
            initials
            status={t(`account_status_mapping.${row.authors.status}`, { defaultValue: "" })}
          />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.authors.fullName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "Hành động",
    allowOverflow: true,
    maxWidth: "130px",
    cell: (row) => {
      return <ButtonRestore row={row} category="task" />;
    },
  },
];

export const subTaskListColumns = [
  {
    name: "Công việc phụ",
    selector: (row) => row.objects.subTitle,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.objects.avatar ? <Avatar img={completePhotoPath(row.objects.avatar)} /> : <Avatar content={row.objects.subTitle} initials />}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.objects.subTitle}</span>
        </div>
      </div>
    ),
  },
  {
    name: "Thời gian xóa",
    selector: (row) => row.createdAt,
    sortable: true,
    minWidth: "150px",
    cell: (row) => <span>{row.createdAt ? format(new Date(row.createdAt), "dd/MM/yyyy HH:mm:ss") : ""}</span>,
  },
  {
    name: "Thời gian lưu trữ",
    selector: (row) => row.updatedAt,
    sortable: true,
    minWidth: "150px",
    cell: (row) =>
      isBefore(new Date(addDay(new Date(row.createdAt), 30)), new Date()) ? (
        <div>Quá hạn 🔥</div>
      ) : (
        <Timer deadline={new Date(addDay(new Date(row.createdAt), 30))} />
      ),
  },
  {
    name: "Người xóa",
    selector: (row) => row.authors.fullName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.authors.avatar ? (
          <Avatar
            img={completePhotoPath(row.authors.avatar)}
            status={t(`account_status_mapping.${row.authors.status}`, { defaultValue: "" })}
          />
        ) : (
          <Avatar
            content={row.authors.fullName}
            initials
            status={t(`account_status_mapping.${row.authors.status}`, { defaultValue: "" })}
          />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.authors.fullName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "Hành động",
    allowOverflow: true,
    maxWidth: "130px",
    cell: (row) => {
      return <ButtonRestore row={row} category="subtask" />;
    },
  },
];

export const fileListColumns = [
  {
    name: "File",
    selector: (row) => row.objects.fileName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <Media className="d-flex align-items-center">
        <img
          className="me-1"
          src={window.location.origin + `/app-assets/images/file/${completeFilePath(row.objects.fileName)}.svg`}
          alt="pdf"
          height="23"
        />
        <Media body>{row.objects.fileName}</Media>
      </Media>
    ),
  },
  {
    name: "Thời gian xóa",
    selector: (row) => row.createdAt,
    sortable: true,
    minWidth: "150px",
    cell: (row) => <span>{row.createdAt ? format(new Date(row.createdAt), "dd/MM/yyyy HH:mm:ss") : ""}</span>,
  },
  {
    name: "Thời gian lưu trữ",
    selector: (row) => row.updatedAt,
    sortable: true,
    minWidth: "150px",
    cell: (row) =>
      isBefore(new Date(addDay(new Date(row.createdAt), 30)), new Date()) ? (
        <div>Quá hạn 🔥</div>
      ) : (
        <Timer deadline={new Date(addDay(new Date(row.createdAt), 30))} />
      ),
  },
  {
    name: "Người xóa",
    selector: (row) => row.authors.fullName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.authors.avatar ? (
          <Avatar
            img={completePhotoPath(row.authors.avatar)}
            status={t(`account_status_mapping.${row.authors.status}`, { defaultValue: "" })}
          />
        ) : (
          <Avatar
            content={row.authors.fullName}
            initials
            status={t(`account_status_mapping.${row.authors.status}`, { defaultValue: "" })}
          />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate mx-1">{row.authors.fullName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "Hành động",
    allowOverflow: true,
    maxWidth: "130px",
    cell: (row) => {
      return <ButtonRestore row={row} category="subtask" />;
    },
  },
];
