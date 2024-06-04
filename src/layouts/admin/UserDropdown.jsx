import { Power } from "react-feather";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import Avatar from "../../components/avatar/Avatar";
import { useAuth } from "../../hook/useAuth";
import { completePhotoPath } from "../../utils/helpers";

const UserDropdown = () => {
  const { auth } = useAuth();
  const { t } = useTranslation();

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bolder">{auth.account.fullName}</span>
          <span className="user-status">@{auth.account.userName}</span>
        </div>
        {auth.account.avatar ? (
          <Avatar
            img={completePhotoPath(auth.account.avatar)}
            imgHeight="40"
            imgWidth="40"
            status={t(`account_status_mapping.${auth.account.status}`, { defaultValue: "" })}
          />
        ) : (
          <Avatar
            content={auth.account.fullName || "BeeId"}
            initials
            imgHeight="40"
            imgWidth="40"
            status={t(`account_status_mapping.${auth.account.status}`, { defaultValue: "" })}
          />
        )}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to="/login">
          <Power size={14} className="me-1" />
          <span className="align-middle">Đăng xuất</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
export default UserDropdown;
