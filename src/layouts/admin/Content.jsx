import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const Content = () => {
  return (
    <div className="app-content content ">
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <div className="content-wrapper">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
export default Content;
