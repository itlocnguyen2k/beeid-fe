import { Fragment } from "react";
import Header from "./Header";
import Content from "./Content";
import { notifyInfo } from "../../utils/helpers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = () => {
  return (
    <Fragment>
      <Header />
      <Content />
      <div className="sidenav-overlay" />
      <div className="drag-target" />
      <button className="btn btn-primary btn-icon scroll-top" type="button" onClick={notifyInfo}>
        <i data-feather="arrow-up" />
      </button>
      <ToastContainer />
    </Fragment>
  );
};
export default AdminLayout;
