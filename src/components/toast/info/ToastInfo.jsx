import { Fragment } from "react";
import { formatDateToMonthShort } from "../../../utils/helpers";

const ToastInfo = (props) => {
  const { message } = props;
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="text-info ml-50 mb-0">Thông báo !</h6>
        </div>
        <small className="text-muted">{formatDateToMonthShort(new Date())}</small>
      </div>
      <div className="toastify-body">
        <span>{message}</span>
      </div>
    </Fragment>
  );
};

export default ToastInfo;
