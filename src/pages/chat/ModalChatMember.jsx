import { useMemo } from "react";
import { useContext } from "react";
import { Fragment } from "react";
import { Check, UserPlus, X } from "react-feather";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Form, Input } from "reactstrap";
import AvatarGroup from "../../components/avatar-group/AvatarGroup";
import Avatar from "../../components/avatar/Avatar";
import { ON_SELECTED_MEMBER_CHAT } from "../../constants/action";
import ChatContext from "../../context/ChatContext";
import { onSelected } from "../../reducer/ChatReducer";
import { useStore } from "../../store/StoreHooks";
import { completePhotoPath } from "../../utils/helpers";

const ModalChatMember = () => {
  const { handleSubmit } = useForm();

  const chatContext = useContext(ChatContext);
  const { memberChatList, memberChatSelectedList, dispatch, updateRoom } = chatContext;
  const [storeState] = useStore();
  const { t } = useTranslation();

  const renderMembers = useMemo(() => {
    return memberChatList.map((member) => (
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
          <UserPlus
            size={17}
            className="mx-0"
            onClick={() => dispatch(onSelected(ON_SELECTED_MEMBER_CHAT, member, memberChatSelectedList, storeState.memberOrgList))}
          />
        </div>
      </li>
    ));
  }, [t, memberChatSelectedList, memberChatList, storeState, dispatch]);

  const renderMembersSelected = useMemo(() => {
    return memberChatSelectedList.map((member) => (
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
          <X
            size={17}
            className="mx-0"
            onClick={() => dispatch(onSelected(ON_SELECTED_MEMBER_CHAT, member, memberChatSelectedList, storeState.memberOrgList))}
          />
        </div>
      </li>
    ));
  }, [t, memberChatSelectedList, storeState, dispatch]);

  return (
    <Fragment>
      <label className="form-label fw-bolder font-size font-small-4 mb-50" htmlFor="addMemberSelect">
        Tìm kiếm
      </label>
      <Input placeholder="Vui lòng nhập họ tên nhân viên" />
      <Form onSubmit={handleSubmit(() => updateRoom({}))}>
        <div className="divider">
          <div className="divider-text">Danh sách nhân viên đã chọn</div>
        </div>
        <div className="d-flex fw-bolder pt-50 mt-2 mb-1">
          <span className="me-1">{memberChatSelectedList.length} thành viên </span>
          <AvatarGroup data={memberChatSelectedList} />
        </div>
        <div className="wrapper-overflow" style={{ maxHeight: "23vh", minHeight: "23vh" }}>
          <ul className="list-group list-group-flush mb-2">{renderMembersSelected}</ul>
        </div>
        <div className="divider">
          <div className="divider-text">Danh sách nhân viên chưa chọn</div>
        </div>
        <div className="d-flex fw-bolder pt-50 mt-2">
          <span className="me-1">{memberChatList.length} thành viên </span>
        </div>
        <div className="wrapper-overflow" style={{ maxHeight: "23vh", minHeight: "23vh" }}>
          <ul className="list-group list-group-flush mb-2">{renderMembers}</ul>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none mx-2">Cập nhật</span>
            <Check size={14} className="align-middle ml-sm-25 ml-0" />
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};
export default ModalChatMember;
