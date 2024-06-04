import { SET_CATEGORY_LIST, SET_MEMBER_LIST, SET_PRIORITY_LIST } from "../constants/action";

const initState = {
  memberList: [],
  categoryList: [],
  priorityList: [],
};

export const setObjectList = (type, payload) => {
  return {
    type: type,
    payload,
  };
};

const subTaskReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case SET_MEMBER_LIST:
      newState = {
        ...state,
        memberList: action.payload,
      };
      break;
    case SET_CATEGORY_LIST:
      newState = {
        ...state,
        categoryList: action.payload,
      };
      break;
    case SET_PRIORITY_LIST:
      newState = {
        ...state,
        priorityList: action.payload,
      };
      break;
    default:
      throw new Error("Invalid action");
  }
  return newState;
};

export { initState };
export default subTaskReducer;
