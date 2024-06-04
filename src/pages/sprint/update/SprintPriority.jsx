import { useMemo } from "react";
import { useContext } from "react";
import { Fragment } from "react";
import { Plus, X } from "react-feather";
import { Input } from "reactstrap";
import { ON_SELECTED_PRIORITY } from "../../../constants/action";
import SprintContext from "../../../context/SprintContext";
import { onSelected } from "../../../reducer/SprintReducer";
import { useStore } from "../../../store/StoreHooks";

const SprintPriority = () => {
  const sprintContext = useContext(SprintContext);
  const { priorityList, prioritySelectedList, dispatch } = sprintContext;
  const [storeState] = useStore();

  const renderPriority = useMemo(() => {
    return priorityList.map((data) => (
      <li className="list-group-item d-flex justify-content-between align-items-center border-0 py-50 px-0 cursor-pointer" key={data._id}>
        <div className="d-flex align-items-center">
          <span className={`bullet bullet-xl me-1 avatar-sm`} style={{ borderRadius: "50%", backgroundColor: data.color }} />
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data.priorityName}</span>
          </div>
        </div>
        <div className="d-flex align-items-center cursor-pointer">
          <Plus
            size={17}
            className="mx-0"
            onClick={() => dispatch(onSelected(ON_SELECTED_PRIORITY, data, prioritySelectedList, storeState.priorityOrgList))}
          />
        </div>
      </li>
    ));
  }, [priorityList, dispatch, prioritySelectedList, storeState]);

  const renderPrioritySelected = useMemo(() => {
    return prioritySelectedList.map((data) => (
      <li className="list-group-item d-flex justify-content-between align-items-center border-0 py-50 px-0 cursor-pointer" key={data._id}>
        <div className="d-flex align-items-center">
          <span className={`bullet bullet-xl me-1 avatar-sm`} style={{ borderRadius: "50%", backgroundColor: data.color }} />
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data.priorityName}</span>
          </div>
        </div>
        <div className="d-flex align-items-center cursor-pointer">
          <X
            size={17}
            className="mx-0"
            onClick={() => dispatch(onSelected(ON_SELECTED_PRIORITY, data, prioritySelectedList, storeState.priorityOrgList))}
          />
        </div>
      </li>
    ));
  }, [dispatch, prioritySelectedList, storeState]);
  return (
    <Fragment>
      <label className="form-label fw-bolder font-size font-small-4 mb-50" htmlFor="addMemberSelect">
        Tìm kiếm
      </label>
      <Input placeholder="Vui lòng nhập tên độ ưu tiên" />
      <div className="divider">
        <div className="divider-text">Danh sách độ ưu tiên đã chọn</div>
      </div>
      <div className="d-flex fw-bolder pt-50 mt-2 mb-1">
        <span className="me-1">{prioritySelectedList.length} độ ưu tiên </span>
      </div>
      <div className="wrapper-overflow" style={{ maxHeight: "23vh", minHeight: "23vh" }}>
        <ul className="list-group list-group-flush mb-2">{renderPrioritySelected}</ul>
      </div>
      <div className="divider">
        <div className="divider-text">Danh sách độ ưu tiên chưa chọn</div>
      </div>
      <div className="d-flex fw-bolder pt-50 mt-2">
        <span className="me-1">{priorityList.length} độ ưu tiên </span>
      </div>
      <div className="wrapper-overflow" style={{ maxHeight: "23vh", minHeight: "23vh" }}>
        <ul className="list-group list-group-flush mb-2">{renderPriority}</ul>
      </div>
    </Fragment>
  );
};
export default SprintPriority;
