import { Fragment } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Label, Row } from "reactstrap";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import BackButton from "../../../components/link/BackButton";
import { ScheduleMeeting } from "react-schedule-meeting";
import Avatar from "../../../components/avatar/Avatar";
import { addDay, completePhotoPath, getDates, initDataSelection, toggleSweetConfirm } from "../../../utils/helpers";
import "../../../@core/scss/react/libs/react-select/_react-select.scss";
import Select, { components } from "react-select";
import { Controller, useForm } from "react-hook-form";
import { useStore } from "../../../store/StoreHooks";
import { X } from "react-feather";
import { useEffect } from "react";
import { useMemo } from "react";
import { format } from "date-fns";

const MeetingSetting = (props) => {
  const { onSubmit, meetingList, onDelete } = props;
  const [storeState] = useStore();
  const { projectList } = storeState;
  const { control, setValue, getValues } = useForm({
    mode: "all",
    reValidateMode: "all",
  });

  const range = getDates(new Date(), addDay(new Date(), 10));
  const availableTimeslots = range.map((date, idx) => {
    return {
      idx,
      startTime: date.setHours(9, 0, 0, 0),
      endTime: date.setHours(18, 0, 0, 0),
    };
  });

  const renderMeetingList = useMemo(() => {
    if (meetingList.length > 0) {
      return meetingList.map((meeting) => (
        <li className="d-flex justify-content-between align-items-center border-0 py-50 px-0 cursor-pointer" key={meeting._id}>
          <div className="d-flex align-items-center">
            {meeting.projects.avatar ? (
              <Avatar img={completePhotoPath(meeting.projects.avatar)} size="lg" />
            ) : (
              <Avatar content={meeting.projects.projectName || "G"} initials size="lg" />
            )}
            <div className="user-info text-truncate ml-1">
              <span className="d-block font-weight-bold text-truncate mx-1">Dự án: {meeting.projects.projectName}</span>
              <div className="mx-1">
                Thời gian:{" "}
                <strong style={{ fontSize: "13px" }}>{meeting.time ? format(new Date(meeting.time), "h:mm a dd/MM/yyyy") : ""}</strong>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center cursor-pointer">
            <X
              size={17}
              className="mx-0"
              onClick={() => toggleSweetConfirm("Bạn muốn hủy cuộc họp này ?", "Đồng ý", () => onDelete(meeting._id), false)}
            />
          </div>
        </li>
      ));
    } else {
      return <div className="d-flex justify-content-center">Không có cuộc họp nào !</div>;
    }
  }, [meetingList, onDelete]);

  useEffect(() => {
    if (projectList.length > 0) {
      setValue("projects", initDataSelection([projectList[0]], "projectName")[0]);
    }
  }, [projectList, setValue]);

  const projectComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {data.avatar ? <Avatar img={completePhotoPath(data.avatar)} /> : <Avatar content={data.projectName || "G"} initials />}
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{data.projectName}</span>
            <small className="mx-1">@{data.description}</small>
          </div>
        </div>
      </components.Option>
    );
  };

  const handleTimeslotClicked = async (startTimeEventEmit) => {
    await onSubmit(getValues("projects"), startTimeEventEmit);
    startTimeEventEmit.resetSelectedTimeState();
  };

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Lịch họp" breadCrumbParent="Meeting" breadCrumbActive="Thiết lập lịch họp">
        <BackButton />
      </Breadcrumbs>
      <Card className="app-collapse">
        <CardHeader>
          <CardTitle tag="h4" className="mb-2">
            Thiết lập lịch họp
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row className="d-flex justify-content-center">
            <Col sm="3">
              <Label className="form-label" for="projects">
                Dự án :
              </Label>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    options={initDataSelection(projectList, "projectName")}
                    inputProps={{ autoComplete: "off", autoCorrect: "off", spellCheck: "off" }}
                    components={{ Option: projectComponent }}
                  />
                )}
                name="projects"
                control={control}
              />
              <div className="divider">
                <div className="divider-text">Danh sách lịch họp</div>
              </div>
              <div className="wrapper-overflow" style={{ maxHeight: "42vh" }}>
                {renderMeetingList}
              </div>
            </Col>
            <Col sm="9">
              <ScheduleMeeting
                borderRadius={10}
                primaryColor="#3f5b85"
                eventDurationInMinutes={60}
                availableTimeslots={availableTimeslots}
                onStartTimeSelect={handleTimeslotClicked}
                startTimeListStyle="scroll-list"
                lang_cancelButtonText="Hủy"
                lang_confirmButtonText="Chọn"
                lang_selectedButtonText={"Đã lựa chọn"}
                format_selectedDateMonthTitleFormatString="MM/yyyy"
                format_selectedDateDayTitleFormatString="cccc, dd/MM/yyyy"
                format_nextFutureStartTimeAvailableFormatString="cccc, dd/MM/yyyy"
                lang_goToNextAvailableDayText="Ngày tiếp theo"
                lang_emptyListText="Vui lòng lựa chọn một ngày khác !"
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default MeetingSetting;
