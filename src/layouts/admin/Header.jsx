import { Moon, Sun } from "react-feather";
import Navbar from "./Navbar";
import UserDropdown from "./UserDropdown";
import { useState } from "react";
import { useEffect } from "react";
import FriendRequest from "./FriendRequest";
import Notification from "./Notification";
const Header = () => {
  const [isLight, setLight] = useState(window.localStorage.getItem("isLight") === "true");

  const toggleLight = () => {
    setLight(!isLight);
    if (isLight) {
      window.localStorage.setItem("isLight", false);
    } else {
      window.localStorage.setItem("isLight", true);
    }
  };

  useEffect(() => {
    const root = document.getElementsByTagName("html")[0];
    if (!isLight) {
      root.setAttribute("class", "dark-layout");
    } else {
      root.removeAttribute("class", "dark-layout");
    }
  }, [isLight]);
  return (
    <nav
      className="header-navbar navbar-expand-lg navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center"
      data-nav="brand-center"
    >
      <div className="navbar-header d-xl-block d-none">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <a className="navbar-brand" href="../../../html/ltr/horizontal-menu-template-dark/index.html">
              <h2 className="brand-text mb-0">BeeId</h2>
            </a>
            <a className="navbar-brand" href="../../../html/ltr/horizontal-menu-template-dark/index.html">
              <small>You'll Never Walk Alone</small>
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-container d-flex content">
        <Navbar />
        <ul className="nav navbar-nav align-items-center ms-auto">
          {isLight ? (
            <Sun size={21} onClick={toggleLight} className="cursor-pointer" />
          ) : (
            <Moon size={21} onClick={toggleLight} className="cursor-pointer" />
          )}
          <Notification />
          <FriendRequest />
          <UserDropdown />
        </ul>
      </div>
    </nav>
  );
};
export default Header;
