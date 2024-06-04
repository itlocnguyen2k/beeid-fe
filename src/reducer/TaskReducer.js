import { differenceBy } from "lodash";
import {
  ON_SELECTED,
  SET_CATEGORY_LIST,
  SET_LABEL_LIST,
  SET_MEMBER_LIST,
  SET_MEMBER_LIST_EXCEPT_DATA_EXIST,
  SET_MEMBER_SELECTED_LIST,
  SET_PRIORITY_LIST,
} from "../constants/action";
import { filterArray } from "../utils/helpers";

const initState = {
  memberList: [],
  memberSelectedList: [],
  categoryList: [],
  labelList: [],
  priorityList: [],
};

export const setObjectList = (type, payload) => {
  return {
    type: type,
    payload,
  };
};

export const setObjectListExceptDataExist = (type, objectOrgList, objectDataList) => {
  return {
    type: type,
    payload: differenceBy(objectOrgList, objectDataList, "_id"),
  };
};

export const setObjectSelectedList = (type, payload) => {
  return {
    type: type,
    payload,
  };
};

export const onSelected = (member, memberSelectedList, memberOrgList) => {
  const memberSelectedListTemp = filterArray(memberSelectedList, member, "_id");
  const memberListTemp = differenceBy(memberOrgList, memberSelectedListTemp, "_id");
  return {
    type: ON_SELECTED,
    payload: {
      memberList: memberListTemp,
      memberSelectedList: memberSelectedListTemp,
    },
  };
};

const taskReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case SET_MEMBER_LIST:
      newState = {
        ...state,
        memberList: action.payload,
      };
      break;
    case SET_MEMBER_LIST_EXCEPT_DATA_EXIST:
      newState = {
        ...state,
        memberList: action.payload,
      };
      break;
    case SET_MEMBER_SELECTED_LIST:
      newState = {
        ...state,
        memberSelectedList: action.payload,
      };
      break;
    case ON_SELECTED:
      newState = {
        ...state,
        memberList: action.payload.memberList,
        memberSelectedList: action.payload.memberSelectedList,
      };
      break;
    case SET_CATEGORY_LIST:
      newState = {
        ...state,
        categoryList: action.payload,
      };
      break;
    case SET_LABEL_LIST:
      newState = {
        ...state,
        labelList: action.payload,
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
export default taskReducer;
