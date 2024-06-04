import { Fragment, Suspense, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import "../../@core/scss/base/pages/page-auth.scss";
import Loading from "../../components/loading/Loading";

const DefaultLayout = () => {
  const [isLight] = useState(window.localStorage.getItem("isLight") === "true");

  useEffect(() => {
    const root = document.getElementsByTagName("html")[0];
    if (!isLight) {
      root.setAttribute("class", "dark-layout");
    } else {
      root.removeAttribute("class", "dark-layout");
    }
  }, [isLight]);

  return (
    <Fragment>
      <div className="content-overlay" />
      <div className="content-wrapper">
        <div className="content-header row"></div>
        <div className="content-body">
          <div className="auth-wrapper auth-basic px-2">
            <div className="auth-inner py-2">
              <Card className="mb-0">
                <CardBody>
                  <Link className="brand-logo mb-0" to="/login" onClick={(e) => e.preventDefault()}>
                    <h2 className="brand-text text-primary ml-1 mb-0">beeid</h2>
                  </Link>
                  <Link className="brand-logo mt-0" to="/login" onClick={(e) => e.preventDefault()}>
                    <small className="d-block">You'll Never Walk Alone</small>
                  </Link>
                  <Suspense fallback={<Loading />}>
                    <Outlet />
                  </Suspense>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default DefaultLayout;
