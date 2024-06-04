import { useMemo } from "react";
import { useContext } from "react";
import { Fragment } from "react";
import { Plus, X } from "react-feather";
import { Input } from "reactstrap";
import { ON_SELECTED_CATEGORY } from "../../../constants/action";
import SprintContext from "../../../context/SprintContext";
import { onSelected } from "../../../reducer/SprintReducer";
import { useStore } from "../../../store/StoreHooks";

const SprintCategory = () => {
  const sprintContext = useContext(SprintContext);
  const { categoryList, categorySelectedList, dispatch } = sprintContext;
  const [storeState] = useStore();

  const renderCategory = useMemo(() => {
    return categoryList.map((data) => (
      <li className="list-group-item d-flex justify-content-between align-items-center border-0 py-50 px-0 cursor-pointer" key={data._id}>
        <div className="d-flex align-items-center">
          <span className={`bullet bullet-xl me-1 avatar-sm`} style={{ borderRadius: "50%", backgroundColor: data.color }} />
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data.categoryName}</span>
          </div>
        </div>
        <div className="d-flex align-items-center cursor-pointer">
          <Plus
            size={17}
            className="mx-0"
            onClick={() => dispatch(onSelected(ON_SELECTED_CATEGORY, data, categorySelectedList, storeState.categoryOrgList))}
          />
        </div>
      </li>
    ));
  }, [categoryList, dispatch, storeState, categorySelectedList]);

  const renderCategorySelected = useMemo(() => {
    return categorySelectedList.map((data) => (
      <li className="list-group-item d-flex justify-content-between align-items-center border-0 py-50 px-0 cursor-pointer" key={data._id}>
        <div className="d-flex align-items-center">
          <span className={`bullet bullet-xl me-1 avatar-sm`} style={{ borderRadius: "50%", backgroundColor: data.color }} />
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data.categoryName}</span>
          </div>
        </div>
        <div className="d-flex align-items-center cursor-pointer">
          <X
            size={17}
            className="mx-0"
            onClick={() => dispatch(onSelected(ON_SELECTED_CATEGORY, data, categorySelectedList, storeState.categoryOrgList))}
          />
        </div>
      </li>
    ));
  }, [dispatch, storeState, categorySelectedList]);
  return (
    <Fragment>
      <label className="form-label fw-bolder font-size font-small-4 mb-50" htmlFor="addMemberSelect">
        Tìm kiếm
      </label>
      <Input placeholder="Vui lòng nhập tên phân loại" />
      <div className="divider">
        <div className="divider-text">Danh sách phân loại đã chọn</div>
      </div>
      <div className="d-flex fw-bolder pt-50 mt-2 mb-1">
        <span className="me-1">{categorySelectedList.length} phân loại </span>
      </div>
      <div className="wrapper-overflow" style={{ maxHeight: "23vh", minHeight: "23vh" }}>
        <ul className="list-group list-group-flush mb-2">{renderCategorySelected}</ul>
      </div>
      <div className="divider">
        <div className="divider-text">Danh sách phân loại chưa chọn</div>
      </div>
      <div className="d-flex fw-bolder pt-50 mt-2">
        <span className="me-1">{categoryList.length} phân loại </span>
      </div>
      <div className="wrapper-overflow" style={{ maxHeight: "23vh", minHeight: "23vh" }}>
        <ul className="list-group list-group-flush mb-2">{renderCategory}</ul>
      </div>
    </Fragment>
  );
};
export default SprintCategory;
