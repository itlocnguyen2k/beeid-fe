import { format } from "date-fns";
import { t } from "i18next";
import { completePhotoPath } from "../../utils/helpers";
import Avatar from "../avatar/Avatar";

const ExpandableTableSprintList = ({ data }) => {
  return (
    <div className="expandable-content p-2">
      <div>
        <span className="font-weight-bold mx-1">Mã giai đoạn:</span> #{data?._id}
      </div>
      <div className="mb-1">
        <span className="font-weight-bold mx-1">Chi tiết:</span>
        <div className="px-2">
          <div dangerouslySetInnerHTML={{ __html: data?.about }} />
        </div>
      </div>
      <div className="d-flex align-items-center">
        <span className="font-weight-bold mx-1">Người tạo:</span>{" "}
        <div className="d-flex align-items-center">
          {data?.userCreated.avatar ? (
            <Avatar
              img={completePhotoPath(data?.userCreated.avatar)}
              status={t(`account_status_mapping.${data?.userCreated.status}`, { defaultValue: "" })}
            />
          ) : (
            <Avatar
              content={data?.userCreated.fullName}
              initials
              status={t(`account_status_mapping.${data?.userCreated.status}`, { defaultValue: "" })}
            />
          )}
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data?.userCreated.fullName}</span>
          </div>
        </div>
      </div>
      <div>
        <span className="font-weight-bold mx-1">Thời gian tạo:</span>{" "}
        {data.createdAt ? format(new Date(data.createdAt), "dd/MM/yyyy HH:mm:ss") : ""}
      </div>
      <div className="d-flex align-items-center">
        <span className="font-weight-bold mx-1">Người chỉnh sửa:</span>{" "}
        <div className="d-flex align-items-center">
          {data?.userUpdated.avatar ? (
            <Avatar
              img={completePhotoPath(data?.userUpdated.avatar)}
              status={t(`account_status_mapping.${data?.userUpdated.status}`, { defaultValue: "" })}
            />
          ) : (
            <Avatar
              content={data?.userUpdated.fullName}
              initials
              status={t(`account_status_mapping.${data?.userUpdated.status}`, { defaultValue: "" })}
            />
          )}
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data?.userUpdated.fullName}</span>
          </div>
        </div>
      </div>
      <div>
        <span className="font-weight-bold mx-1">Chỉnh sửa lần cuối:</span>{" "}
        {data.updatedAt ? format(new Date(data.updatedAt), "dd/MM/yyyy HH:mm:ss") : ""}
      </div>
    </div>
  );
};
export default ExpandableTableSprintList;
