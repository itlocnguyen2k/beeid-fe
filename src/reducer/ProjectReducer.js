import { differenceBy } from "lodash";
import { ON_SELECTED, SET_MEMBER_LIST, SET_MEMBER_LIST_EXCEPT_DATA_EXIST, SET_MEMBER_SELECTED_LIST } from "../constants/action";
import { filterArray } from "../utils/helpers";

const initState = {
  memberList: [],
  memberSelectedList: [],
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

export const setMemberList = (payload) => {
  return {
    type: SET_MEMBER_LIST,
    payload,
  };
};

export const setMemberListExceptDataExist = (memberOrgList, memberDataList) => {
  return {
    type: SET_MEMBER_LIST_EXCEPT_DATA_EXIST,
    payload: differenceBy(memberOrgList, memberDataList, "_id"),
  };
};

export const setMemberSelectedList = (payload) => {
  return {
    type: SET_MEMBER_SELECTED_LIST,
    payload,
  };
};

const projectReducer = (state, action) => {
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
    default:
      throw new Error("Invalid action");
  }
  return newState;
};

export { initState };
export default projectReducer;
