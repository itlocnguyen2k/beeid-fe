import { differenceBy } from "lodash";
import {
  ON_SELECTED_CATEGORY,
  ON_SELECTED_LABEL,
  ON_SELECTED_MEMBER,
  ON_SELECTED_PRIORITY,
  SET_CATEGORY_LIST,
  SET_CATEGORY_LIST_EXCEPT_DATA_EXIST,
  SET_CATEGORY_SELECTED_LIST,
  SET_LABEL_LIST,
  SET_LABEL_LIST_EXCEPT_DATA_EXIST,
  SET_LABEL_SELECTED_LIST,
  SET_MEMBER_LIST,
  SET_MEMBER_LIST_EXCEPT_DATA_EXIST,
  SET_MEMBER_SELECTED_LIST,
  SET_PRIORITY_LIST,
  SET_PRIORITY_LIST_EXCEPT_DATA_EXIST,
  SET_PRIORITY_SELECTED_LIST,
} from "../constants/action";
import { filterArray } from "../utils/helpers";

const initState = {
  memberList: [],
  memberSelectedList: [],
  categoryList: [],
  categorySelectedList: [],
  labelList: [],
  labelSelectedList: [],
  priorityList: [],
  prioritySelectedList: [],
};

export const onSelected = (type, object, objectSelectedList, objectOrgList) => {
  const objectSelectedListTemp = filterArray(objectSelectedList, object, "_id");
  const objectListTemp = differenceBy(objectOrgList, objectSelectedListTemp, "_id");
  return {
    type: type,
    payload: {
      objectList: objectListTemp,
      objectSelectedList: objectSelectedListTemp,
    },
  };
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

const sprintReducer = (state, action) => {
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
    case SET_CATEGORY_LIST:
      newState = {
        ...state,
        categoryList: action.payload,
      };
      break;
    case SET_CATEGORY_LIST_EXCEPT_DATA_EXIST:
      newState = {
        ...state,
        categoryList: action.payload,
      };
      break;
    case SET_CATEGORY_SELECTED_LIST:
      newState = {
        ...state,
        categorySelectedList: action.payload,
      };
      break;
    case SET_LABEL_LIST:
      newState = {
        ...state,
        labelList: action.payload,
      };
      break;
    case SET_LABEL_LIST_EXCEPT_DATA_EXIST:
      newState = {
        ...state,
        labelList: action.payload,
      };
      break;
    case SET_LABEL_SELECTED_LIST:
      newState = {
        ...state,
        labelSelectedList: action.payload,
      };
      break;
    case SET_PRIORITY_LIST:
      newState = {
        ...state,
        priorityList: action.payload,
      };
      break;
    case SET_PRIORITY_LIST_EXCEPT_DATA_EXIST:
      newState = {
        ...state,
        priorityList: action.payload,
      };
      break;
    case SET_PRIORITY_SELECTED_LIST:
      newState = {
        ...state,
        prioritySelectedList: action.payload,
      };
      break;
    case ON_SELECTED_MEMBER:
      newState = {
        ...state,
        memberList: action.payload.objectList,
        memberSelectedList: action.payload.objectSelectedList,
      };
      break;
    case ON_SELECTED_CATEGORY:
      newState = {
        ...state,
        categoryList: action.payload.objectList,
        categorySelectedList: action.payload.objectSelectedList,
      };
      break;
    case ON_SELECTED_LABEL:
      newState = {
        ...state,
        labelList: action.payload.objectList,
        labelSelectedList: action.payload.objectSelectedList,
      };
      break;
    case ON_SELECTED_PRIORITY:
      newState = {
        ...state,
        priorityList: action.payload.objectList,
        prioritySelectedList: action.payload.objectSelectedList,
      };
      break;
    default:
      throw new Error("Invalid action");
  }
  return newState;
};

export { initState };
export default sprintReducer;
