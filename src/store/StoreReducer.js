import {
  SET_BEST_EMPLOYEE_LIST,
  SET_CATEGORY_ORG_LIST,
  SET_LABEL_ORG_LIST,
  SET_MEETING_LIST,
  SET_MEMBER_ORG_LIST,
  SET_PRIORITY_ORG_LIST,
  SET_PROJECT_LIST,
  SET_SUB_TASK_LIST,
} from "../constants/action";

const initState = {
  memberOrgList: [],
  categoryOrgList: [],
  labelOrgList: [],
  priorityOrgList: [],
  projectList: [],
  meetingList: [],
  bestEmployeeList: [],
  subTaskList: [],
};

const reducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case SET_MEMBER_ORG_LIST:
      newState = {
        ...state,
        memberOrgList: action.payload,
      };
      break;
    case SET_CATEGORY_ORG_LIST:
      newState = {
        ...state,
        categoryOrgList: action.payload,
      };
      break;
    case SET_LABEL_ORG_LIST:
      newState = {
        ...state,
        labelOrgList: action.payload,
      };
      break;
    case SET_PRIORITY_ORG_LIST:
      newState = {
        ...state,
        priorityOrgList: action.payload,
      };
      break;
    case SET_PROJECT_LIST:
      newState = {
        ...state,
        projectList: action.payload,
      };
      break;
    case SET_MEETING_LIST:
      newState = {
        ...state,
        meetingList: action.payload,
      };
      break;
    case SET_BEST_EMPLOYEE_LIST:
      newState = {
        ...state,
        bestEmployeeList: action.payload,
      };
      break;
    case SET_SUB_TASK_LIST:
      newState = {
        ...state,
        subTaskList: action.payload,
      };
      break;
    default:
      throw new Error("Invalid action");
  }
  return newState;
};

export { initState };
export default reducer;
