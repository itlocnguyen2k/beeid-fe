// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import Proptypes from "prop-types";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

const Breadcrumbs = (props) => {
  // ** Props
  const { breadCrumbTitle, breadCrumbParent, breadCrumbParent2, breadCrumbParent3, breadCrumbActive, children } = props;

  return (
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            {breadCrumbTitle ? <h2 className="content-header-title float-start mb-0">{breadCrumbTitle}</h2> : ""}
            <div className="breadcrumb-wrapper">
              <Breadcrumb>
                <BreadcrumbItem tag="li">
                  <Link to="/admin">Trang chủ</Link>
                </BreadcrumbItem>
                <BreadcrumbItem tag="li" className="text-primary">
                  {breadCrumbParent}
                </BreadcrumbItem>
                {breadCrumbParent2 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {breadCrumbParent2}
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
                {breadCrumbParent3 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {breadCrumbParent3}
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
                <BreadcrumbItem tag="li" active>
                  {breadCrumbActive}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-12 d-flex justify-content-end align-items-center">{children}</div>
    </div>
  );
};
export default Breadcrumbs;

// ** PropTypes
Breadcrumbs.propTypes = {
  breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbActive: Proptypes.string.isRequired,
};
