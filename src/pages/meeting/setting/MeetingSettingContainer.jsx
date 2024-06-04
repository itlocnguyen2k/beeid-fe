import { useEffect } from "react";
import { useState } from "react";
import { lazy, useCallback } from "react";
import { MEETINGS_CREATE_API, MEETINGS_DELETE_API, MEETINGS_LIST_API } from "../../../constants/api";
import { useHttp } from "../../../hook/useHttp";
import { setMeetingStore } from "../../../store/StoreAction";
import { useStore } from "../../../store/StoreHooks";
import { filterCurrentDate, getResponseFromServerWithParameters, toggleSweetAlert } from "../../../utils/helpers";
import { createParametersRequest } from "../../../utils/sessionStorageHelper";

const MeetingSetting = lazy(() => import("./MeetingSetting"));

const MeetingSettingContainer = () => {
  const http = useHttp();

  const [meetingList, setMeetingList] = useState([]);
  const [, dispatch] = useStore();

  const getListMeeting = useCallback(async () => {
    try {
      const response = await getResponseFromServerWithParameters(http, MEETINGS_LIST_API);
      if (response.data) {
        setMeetingList(response.data.meetings);
        dispatch(setMeetingStore(filterCurrentDate(response.data.meetings)));
      } else {
        toggleSweetAlert("Thông báo", response.message, "error");
      }
    } catch (err) {
      toggleSweetAlert("Thông báo", err, "error");
    }
  }, [http, dispatch]);

  const onSubmit = useCallback(
    async (data, timeObject) => {
      const parameters = {
        projectId: data._id,
        time: timeObject.startTime,
      };
      try {
        const response = await getResponseFromServerWithParameters(http, MEETINGS_CREATE_API, createParametersRequest(parameters));
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        getListMeeting();
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, getListMeeting],
  );

  const onDelete = useCallback(
    async (meetingId) => {
      const parameters = {
        meetingId: meetingId,
      };
      try {
        const response = await getResponseFromServerWithParameters(http, MEETINGS_DELETE_API, createParametersRequest(parameters));
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        getListMeeting();
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, getListMeeting],
  );

  useEffect(() => {
    getListMeeting();
  }, [getListMeeting]);
  return <MeetingSetting onSubmit={onSubmit} meetingList={meetingList} onDelete={onDelete} />;
};
export default MeetingSettingContainer;
