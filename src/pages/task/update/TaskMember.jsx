import { useMemo } from "react";
import { useContext } from "react";
import { Fragment } from "react";
import { UserPlus, X } from "react-feather";
import { useTranslation } from "react-i18next";
import { Input } from "reactstrap";
import AvatarGroup from "../../../components/avatar-group/AvatarGroup";
import Avatar from "../../../components/avatar/Avatar";
import TaskContext from "../../../context/TaskContext";
import { onSelected } from "../../../reducer/TaskReducer";
import { completePhotoPath } from "../../../utils/helpers";

const TaskMember = () => {
  const taskContext = useContext(TaskContext);
  const { memberList, memberSelectedList, memberOrgList, dispatch } = taskContext;
  const { t } = useTranslation();

  const renderMembers = useMemo(() => {
    return memberList.map((member) => (
      <li className="list-group-item d-flex justify-content-between align-items-center border-0 py-50 px-0 cursor-pointer" key={member._id}>
        <div className="d-flex align-items-center cursor-pointer">
          {member.avatar ? (
            <Avatar
              img={completePhotoPath(member.avatar)}
              size="2sm"
              status={t(`account_status_mapping.${member.status}`, { defaultValue: "" })}
            />
          ) : (
            <Avatar content={member.fullName || "G"} initials size="2sm" />
          )}
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{member.fullName}</span>
          </div>
        </div>
        <div className="d-flex align-items-center cursor-pointer">
          <UserPlus size={17} className="mx-0" onClick={() => dispatch(onSelected(member, memberSelectedList, memberOrgList))} />
        </div>
      </li>
    ));
  }, [memberList, t, dispatch, memberSelectedList, memberOrgList]);

  const renderMembersSelected = useMemo(() => {
    return memberSelectedList.map((member) => (
      <li className="list-group-item d-flex justify-content-between align-items-center border-0 py-50 px-0 cursor-pointer" key={member._id}>
        <div className="d-flex align-items-center cursor-pointer">
          {member.avatar ? (
            <Avatar
              img={completePhotoPath(member.avatar)}
              size="2sm"
              status={t(`account_status_mapping.${member.status}`, { defaultValue: "" })}
            />
          ) : (
            <Avatar content={member.fullName || "G"} initials size="2sm" />
          )}
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{member.fullName}</span>
          </div>
        </div>
        <div className="d-flex align-items-center cursor-pointer">
          <X size={17} className="mx-0" onClick={() => dispatch(onSelected(member, memberSelectedList, memberOrgList))} />
        </div>
      </li>
    ));
  }, [memberSelectedList, t, dispatch, memberOrgList]);
  return (
    <Fragment>
      <label className="form-label fw-bolder font-size font-small-4 mb-50" htmlFor="addMemberSelect">
        Tìm kiếm
      </label>
      <Input placeholder="Vui lòng nhập họ tên nhân viên" />
      <div className="divider">
        <div className="divider-text">Danh sách nhân viên đã chọn</div>
      </div>
      <div className="d-flex fw-bolder pt-50 mt-2 mb-1">
        <span className="me-1">{memberSelectedList.length} thành viên </span>
        <AvatarGroup data={memberSelectedList} />
      </div>
      <div className="wrapper-overflow" style={{ maxHeight: "23vh", minHeight: "23vh" }}>
        <ul className="list-group list-group-flush mb-2">{renderMembersSelected}</ul>
      </div>
      <div className="divider">
        <div className="divider-text">Danh sách nhân viên chưa chọn</div>
      </div>
      <div className="d-flex fw-bolder pt-50 mt-2">
        <span className="me-1">{memberList.length} thành viên </span>
      </div>
      <div className="wrapper-overflow" style={{ maxHeight: "23vh", minHeight: "23vh" }}>
        <ul className="list-group list-group-flush mb-2">{renderMembers}</ul>
      </div>
    </Fragment>
  );
};
export default TaskMember;
