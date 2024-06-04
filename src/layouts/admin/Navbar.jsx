import { Home, User, Box, MessageCircle, Settings, Calendar, Clock, Trash, BarChart2 } from "react-feather";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";
import { useAuth } from "../../hook/useAuth";
const Navbar = () => {
  const { auth } = useAuth();
  return (
    <div className="bookmark-wrapper d-flex align-items-center">
      <ul className="nav navbar-nav">
        <li className="nav-item d-none d-lg-block">
          <Link to="/admin">
            <span className="nav-link nav-link-style">
              <Home size={20} id="home" />
              <UncontrolledTooltip placement="top" target="home">
                Trang chủ
              </UncontrolledTooltip>
            </span>
          </Link>
        </li>
        <li className="nav-item d-none d-lg-block">
          <Link to="/admin/chat">
            <span className="nav-link nav-link-style">
              <MessageCircle size={20} id="chat" />
              <UncontrolledTooltip placement="top" target="chat">
                Trao đổi
              </UncontrolledTooltip>
            </span>
          </Link>
        </li>
        <li className="nav-item d-none d-lg-block">
          <Link to="/admin/accounts">
            <span className="nav-link nav-link-style">
              <User size={20} id="account" />
              <UncontrolledTooltip placement="top" target="account">
                Quản lý tài khoản
              </UncontrolledTooltip>
            </span>
          </Link>
        </li>
        <li className="nav-item d-none d-lg-block">
          <Link to="/admin/projects">
            <span className="nav-link nav-link-style">
              <Box size={20} id="project" />
              <UncontrolledTooltip placement="top" target="project">
                Quản lý dự án
              </UncontrolledTooltip>
            </span>
          </Link>
        </li>
        <li className="nav-item d-none d-lg-block">
          <Link to="/admin/calendars">
            <span className="nav-link nav-link-style">
              <Calendar size={20} id="calendar" />
              <UncontrolledTooltip placement="top" target="calendar">
                Lịch trình
              </UncontrolledTooltip>
            </span>
          </Link>
        </li>
        {auth.account.permission.settingList && (
          <li className="nav-item d-none d-lg-block">
            <Link to="/admin/settings">
              <span className="nav-link nav-link-style">
                <Settings size={20} id="setting" />
                <UncontrolledTooltip placement="top" target="setting">
                  Thiết lập hạng mục
                </UncontrolledTooltip>
              </span>
            </Link>
          </li>
        )}
        {auth.account.permission.meetingList && (
          <li className="nav-item d-none d-lg-block">
            <Link to="/admin/meeting">
              <span className="nav-link nav-link-style">
                <Clock size={20} id="meeting" />
                <UncontrolledTooltip placement="top" target="meeting">
                  Đặt lịch họp
                </UncontrolledTooltip>
              </span>
            </Link>
          </li>
        )}
        {auth.account.permission.trashList && (
          <li className="nav-item d-none d-lg-block">
            <Link to="/admin/trash">
              <span className="nav-link nav-link-style">
                <Trash size={20} id="trash" />
                <UncontrolledTooltip placement="top" target="trash">
                  Thùng rác
                </UncontrolledTooltip>
              </span>
            </Link>
          </li>
        )}
        {auth.account.permission.reportList && (
          <li className="nav-item d-none d-lg-block">
            <Link to="/admin/report">
              <span className="nav-link nav-link-style">
                <BarChart2 size={20} id="report" />
                <UncontrolledTooltip placement="top" target="report">
                  Báo cáo hằng ngày
                </UncontrolledTooltip>
              </span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
export default Navbar;
