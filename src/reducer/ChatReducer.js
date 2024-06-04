import { differenceBy } from "lodash";
import {
  ON_SELECTED_MEMBER,
  ON_SELECTED_MEMBER_CHAT,
  SET_FILE_LIST,
  SET_MEMBER_CHAT_LIST,
  SET_MEMBER_CHAT_LIST_EXCEPT_DATA_EXIST,
  SET_MEMBER_CHAT_SELECTED_LIST,
  SET_MEMBER_LIST,
  SET_MEMBER_LIST_EXCEPT_DATA_EXIST,
  SET_MEMBER_SELECTED_LIST,
} from "../constants/action";
import { filterArray } from "../utils/helpers";

const initState = {
  memberList: [],
  memberSelectedList: [],
  memberChatList: [],
  memberChatSelectedList: [],
  fileList: [],
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

const chatReducer = (state, action) => {
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
    case SET_MEMBER_CHAT_LIST:
      newState = {
        ...state,
        memberChatList: action.payload,
      };
      break;
    case SET_MEMBER_CHAT_LIST_EXCEPT_DATA_EXIST:
      newState = {
        ...state,
        memberChatList: action.payload,
      };
      break;
    case SET_MEMBER_CHAT_SELECTED_LIST:
      newState = {
        ...state,
        memberChatSelectedList: action.payload,
      };
      break;
    case SET_FILE_LIST:
      newState = {
        ...state,
        fileList: action.payload,
      };
      break;
    case ON_SELECTED_MEMBER:
      newState = {
        ...state,
        memberList: action.payload.objectList,
        memberSelectedList: action.payload.objectSelectedList,
      };
      break;
    case ON_SELECTED_MEMBER_CHAT:
      newState = {
        ...state,
        memberChatList: action.payload.objectList,
        memberChatSelectedList: action.payload.objectSelectedList,
      };
      break;
    default:
      throw new Error("Invalid action");
  }
  return newState;
};

export { initState };
export default chatReducer;
