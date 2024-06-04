import { Plus, X } from "react-feather";
import Avatar from "../../components/avatar/Avatar";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button, Input } from "reactstrap";
import classnames from "classnames";
import { useCallback, useState } from "react";
import ModalComponent from "../../components/modal/ModalComponent";
import ModalAddConversation from "./ModalAddConversation";
import { useMemo } from "react";
import { completePhotoPath, formatDateToMonthShort } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import ChatContext from "../../context/ChatContext";
import { useAuth } from "../../hook/useAuth";

const SidebarLeft = () => {
  const chatContext = useContext(ChatContext);
  const { auth } = useAuth();
  const { roomList, roomSelected, toggleRoomSelected } = chatContext;
  const [modalConversation, setModalConversation] = useState(false);
  const toggleModalConversation = useCallback(() => {
    setModalConversation(!modalConversation);
  }, [modalConversation]);

  const { t } = useTranslation();

  const renderMyChats = () => {
    return (
      <li>
        {auth.account.avatar ? (
          <Avatar
            img={completePhotoPath(auth.account.avatar)}
            imgHeight="42"
            imgWidth="42"
            status={t(`account_status_mapping.${auth.account.status}`, { defaultValue: "" })}
          />
        ) : (
          <Avatar
            content={auth.account.fullName || "G"}
            initials
            imgHeight="42"
            imgWidth="42"
            status={t(`account_status_mapping.${auth.account.status}`, { defaultValue: "" })}
          />
        )}
        <div className="chat-info flex-grow-1">
          <h5 className="mb-0">{auth.account.fullName}</h5>
          <p className="card-text text-truncate">{auth.account.userName}</p>
        </div>
        <div className="chat-meta text-nowrap">
          <small className="float-end mb-25 chat-time">{formatDateToMonthShort(auth.account.updatedAt)}</small>
        </div>
      </li>
    );
  };
  const renderRoomChat = useMemo(() => {
    return roomList.map((room) => (
      <li className={`${roomSelected._id === room._id ? "active" : ""}`} onClick={() => toggleRoomSelected(room)} key={room._id}>
        <Avatar content={room.roomName} initials imgHeight="42" imgWidth="42" status="online" />
        <div className="chat-info">
          <h5 className="mb-0">{room.roomName}</h5>
          <small className="card-text text-truncate">{room.description}</small>
        </div>
        <div className="chat-meta text-nowrap">
          <small className="float-end mb-25 chat-time">{formatDateToMonthShort(room.updatedAt)}</small>
        </div>
      </li>
    ));
  }, [roomList, roomSelected, toggleRoomSelected]);

  return (
    <div className="sidebar-left">
      <div className="sidebar">
        <div
          className={classnames("chat-profile-sidebar", {
            show: false,
          })}
        >
          <header className="chat-profile-header">
            <span className="close-icon">
              <X size={14} />
            </span>
            <div className="header-profile-sidebar">
              <Avatar img="../../../app-assets/images/portrait/small/avatar-s-11.jpg" status="online" imgHeight={70} imgWidth={70} />
              <h4 className="chat-user-name">Phương Công Thắng</h4>
              <span className="user-post">Admin</span>
            </div>
          </header>
          <PerfectScrollbar className="profile-sidebar-area" options={{ wheelPropagation: false }}>
            <h6 className="section-label mb-1">About</h6>
            <div className="about-user">
              <Input rows="5" type="textarea" />
              <small className="counter-value float-end">
                <span className="char-count">108</span> / 120
              </small>
            </div>
            <h6 className="section-label mb-1 mt-3">Status</h6>
            <ul className="list-unstyled user-status">
              <li className="pb-1">
                <div className="form-check form-check-success">
                  <input
                    type="radio"
                    id="activeStatusRadio"
                    name="userStatus"
                    className="form-check-input"
                    defaultValue="online"
                    defaultChecked=""
                  />
                  <label className="form-check-label ms-25" htmlFor="activeStatusRadio">
                    Active
                  </label>
                </div>
              </li>
              <li className="pb-1">
                <div className="form-check form-check-danger">
                  <input type="radio" id="dndStatusRadio" name="userStatus" className="form-check-input" defaultValue="busy" />
                  <label className="form-check-label ms-25" htmlFor="dndStatusRadio">
                    Do Not Disturb
                  </label>
                </div>
              </li>
              <li className="pb-1">
                <div className="form-check form-check-warning">
                  <input type="radio" id="awayStatusRadio" name="userStatus" className="form-check-input" defaultValue="away" />
                  <label className="form-check-label ms-25" htmlFor="awayStatusRadio">
                    Away
                  </label>
                </div>
              </li>
              <li className="pb-1">
                <div className="form-check form-check-secondary">
                  <input type="radio" id="offlineStatusRadio" name="userStatus" className="form-check-input" defaultValue="offline" />
                  <label className="form-check-label ms-25" htmlFor="offlineStatusRadio">
                    Offline
                  </label>
                </div>
              </li>
            </ul>
            <h6 className="section-label mb-1 mt-2">Settings</h6>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center">
                  <i data-feather="check-square" className="me-75 font-medium-3" />
                  <span className="align-middle">Two-step Verification</span>
                </div>
                <div className="form-check form-switch me-0">
                  <input type="checkbox" className="form-check-input" id="customSwitch1" defaultChecked="" />
                  <label className="form-check-label" htmlFor="customSwitch1" />
                </div>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center">
                  <i data-feather="bell" className="me-75 font-medium-3" />
                  <span className="align-middle">Notification</span>
                </div>
                <div className="form-check form-switch me-0">
                  <input type="checkbox" className="form-check-input" id="customSwitch2" />
                  <label className="form-check-label" htmlFor="customSwitch2" />
                </div>
              </li>
              <li className="mb-1 d-flex align-items-center cursor-pointer">
                <i data-feather="user" className="me-75 font-medium-3" />
                <span className="align-middle">Invite Friends</span>
              </li>
              <li className="d-flex align-items-center cursor-pointer">
                <i data-feather="trash" className="me-75 font-medium-3" />
                <span className="align-middle">Delete Account</span>
              </li>
            </ul>
            <div className="mt-3">
              <button className="btn btn-primary">
                <span>Logout</span>
              </button>
            </div>
          </PerfectScrollbar>
        </div>
        <div
          className={classnames("sidebar-content", {
            show: true,
          })}
        >
          <span className="sidebar-close-icon">
            <X size={14} />
          </span>
          <div className="chat-fixed-search">
            <div className="d-flex align-items-center w-100">
              <div className="sidebar-profile-toggle">
                {auth.account.avatar ? (
                  <Avatar
                    img={completePhotoPath(auth.account.avatar)}
                    imgHeight="42"
                    imgWidth="42"
                    status={t(`account_status_mapping.${auth.account.status}`, { defaultValue: "" })}
                  />
                ) : (
                  <Avatar
                    content={auth.account.fullName || "G"}
                    initials
                    imgHeight="42"
                    imgWidth="42"
                    status={t(`account_status_mapping.${auth.account.status}`, { defaultValue: "" })}
                  />
                )}
              </div>
              <div className="input-group input-group-merge ms-1 w-100">
                <span className="input-group-text round">
                  <i data-feather="search" className="text-muted" />
                </span>
                <Input type="text" className="form-control round" placeholder="Tìm kiếm bạn bè" />
              </div>
            </div>
          </div>
          <PerfectScrollbar className="chat-user-list-wrapper list-group" options={{ wheelPropagation: false }}>
            <div className="divider">
              <div className="divider-text">Cá nhân</div>
            </div>
            <ul className="chat-users-list chat-list media-list">{renderMyChats()}</ul>
            <div className="divider">
              <div className="divider-text">Hội nhóm</div>
            </div>
            <ul className="chat-users-list contact-list media-list">{renderRoomChat}</ul>
            <hr />
            <Button type="button" color="flat-secondary" className="btn-sm" onClick={toggleModalConversation}>
              <Plus size={12} />
              <span className="align-middle ms-25">Thêm mới cuộc trò chuyện</span>
            </Button>
          </PerfectScrollbar>
        </div>
      </div>
      {modalConversation && (
        <ModalComponent modal={modalConversation} toggle={toggleModalConversation}>
          <ModalAddConversation />
        </ModalComponent>
      )}
    </div>
  );
};

export default SidebarLeft;
