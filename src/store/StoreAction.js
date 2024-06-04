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

export const setMemberStore = (payload) => ({
  type: SET_MEMBER_ORG_LIST,
  payload,
});

export const setCategoryStore = (payload) => ({
  type: SET_CATEGORY_ORG_LIST,
  payload,
});

export const setLabelStore = (payload) => ({
  type: SET_LABEL_ORG_LIST,
  payload,
});

export const setPriorityStore = (payload) => ({
  type: SET_PRIORITY_ORG_LIST,
  payload,
});

export const setProjectStore = (payload) => ({
  type: SET_PROJECT_LIST,
  payload,
});

export const setMeetingStore = (payload) => ({
  type: SET_MEETING_LIST,
  payload,
});

export const setBestEmployeeStore = (payload) => ({
  type: SET_BEST_EMPLOYEE_LIST,
  payload,
});

export const setSubTaskStore = (payload) => ({
  type: SET_SUB_TASK_LIST,
  payload,
});
