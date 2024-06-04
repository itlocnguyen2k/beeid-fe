import { Fragment, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardSubtitle, CardTitle, Col, Label, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import { useAuth } from "../../hook/useAuth";
import Avatar from "../../components/avatar/Avatar";
import { calculateProgress, completePhotoPath } from "../../utils/helpers";
import { format } from "date-fns";
import { useMemo } from "react";
import { Calendar, Clock } from "react-feather";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { chartCircle } from "../../configs/chart/chart";
import TableHeader from "../../components/table-header/TableHeader";
import Table from "../../components/table/Table";
import { subTaskListColumns } from "../../configs/table/SubTaskListHomeColumn";
import "../../@core/scss/react/libs/charts/apex-charts.scss";

const Home = (props) => {
  const { auth } = useAuth();
  const {
    meetingList,
    bestEmployeeList,
    projectList,
    sprintList,
    subTaskList,
    toggleProjectId,
    toggleSprintId,
    projectId,
    taskList,
    sprintId,
  } = props;
  const { t } = useTranslation();
  const [time, setTime] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [sprint, setSprint] = useState({});

  useEffect(() => {
    if (taskList.length > 0) {
      const categoriesTemp = [];
      const dataTemp = [];
      taskList.forEach((task) => {
        categoriesTemp.push(task.taskTitle);
        dataTemp.push(task.progress);
      });
      setCategories(categoriesTemp);
      setData(dataTemp);
    } else {
      setCategories([]);
      setData([]);
    }
  }, [taskList]);

  useEffect(() => {
    if (sprintId && sprintList.length > 0) {
      setSprint(sprintList.find((sprint) => sprint._id === sprintId));
    }
  }, [sprintId, sprintList]);

  const options = useMemo(() => {
    return {
      chart: {
        parentHeightOffset: 0,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "30%",
          endingShape: "rounded",
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      colors: "#28c76f",
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
        labels: {
          formatter: (value) => {
            return value + "%";
          },
        },
      },
      yaxis: {
        min: 0,
        max: 100,
        opposite: false,
      },
    };
  }, [categories]);

  const series = useMemo(() => {
    return [
      {
        data: data,
      },
    ];
  }, [data]);

  const renderProjectList = useMemo(() => {
    if (projectList.length > 0) {
      return projectList.map((project) => {
        return (
          <li
            className={`d-flex justify-content-between align-items-center border-0 py-50 px-0 cursor-pointer ${
              projectId === project._id ? "project-active" : ""
            }`}
            key={project._id}
            onClick={() => toggleProjectId(project._id)}
          >
            <div className="d-flex align-items-center ms-5px">
              {project.avatar ? <Avatar img={completePhotoPath(project.avatar)} /> : <Avatar content={project.projectName} initials />}
              <div className="user-info text-truncate ml-1">
                <span className="d-block font-weight-bold text-truncate mx-1">
                  <strong>{project.projectName}</strong>
                </span>
              </div>
            </div>
          </li>
        );
      });
    } else {
      return <div className="d-flex justify-content-center">Không có dự án nào !</div>;
    }
  }, [projectList, toggleProjectId, projectId]);

  const renderSprintList = useMemo(() => {
    if (sprintList.length > 0) {
      return sprintList.map((sprint) => {
        return (
          <li
            className={`d-flex justify-content-between align-items-center border-0 py-50 px-0 cursor-pointer ${
              sprintId === sprint._id ? "project-active" : ""
            }`}
            key={sprint._id}
            onClick={() => toggleSprintId(sprint._id)}
          >
            <div className="d-flex align-items-center ms-5px">
              {sprint.avatar ? <Avatar img={completePhotoPath(sprint.avatar)} /> : <Avatar content={sprint.sprintName} initials />}
              <div className="user-info text-truncate ml-1">
                <span className="d-block font-weight-bold text-truncate mx-1">
                  <strong>{sprint.sprintName}</strong>
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center cursor-pointer">
              <div className="font-weight-bold text-body-heading me-1">
                <strong>{calculateProgress(sprint.boards) || 0}%</strong>
              </div>
              <Chart
                options={chartCircle.options}
                series={[calculateProgress(sprint.boards) || 0]}
                type={chartCircle.type}
                height={chartCircle.height}
                width={chartCircle.width}
              />
            </div>
          </li>
        );
      });
    } else {
      return <div className="d-flex justify-content-center">Không có sprint nào !</div>;
    }
  }, [sprintList, sprintId, toggleSprintId]);

  const renderBestEmployee = useMemo(() => {
    return bestEmployeeList.map((employee, idx) => {
      return (
        <li className="d-flex justify-content-between align-items-center border-0 py-50 px-0 cursor-pointer" key={employee._id}>
          <div className="d-flex align-items-center">
            {employee.avatar ? (
              <Avatar
                img={completePhotoPath(employee.avatar)}
                status={t(`account_status_mapping.${employee.status}`, { defaultValue: "" })}
              />
            ) : (
              <Avatar content={employee.fullName} initials status={t(`account_status_mapping.${employee.status}`, { defaultValue: "" })} />
            )}
            <div className="user-info text-truncate ml-1">
              <span className="d-block font-weight-bold text-truncate mx-1">
                <strong>{employee.fullName}</strong>{" "}
                <span style={{ fontSize: "20px", marginTop: "5px" }}>{t(`best_employee_mapping.${idx}`, { defaultValue: "" })}</span>
              </span>
            </div>
          </div>
          <div className="d-flex align-items-center cursor-pointer">
            <div className="font-weight-bold text-body-heading">{employee.total}</div>
          </div>
        </li>
      );
    });
  }, [bestEmployeeList, t]);

  const renderMeetingList = useMemo(() => {
    if (meetingList.length > 0) {
      return meetingList.map((meeting) => (
        <li className="d-flex justify-content-between align-items-center border-0 py-50 px-0 cursor-pointer" key={meeting._id}>
          <div className="d-flex align-items-center">
            {meeting.projects.avatar ? (
              <Avatar img={completePhotoPath(meeting.projects.avatar)} />
            ) : (
              <Avatar content={meeting.projects.projectName} initials />
            )}
            <div className="user-info text-truncate ml-1">
              <span className="d-block font-weight-bold text-truncate mx-1">
                <strong>{meeting.projects.projectName}</strong>
              </span>
            </div>
          </div>
          <div className="d-flex align-items-center cursor-pointer">
            <strong style={{ fontSize: "13px" }}>{meeting.time ? format(new Date(meeting.time), "h:mm a") : ""}</strong>
          </div>
        </li>
      ));
    } else {
      return <div className="d-flex justify-content-center">Không có cuộc họp nào !</div>;
    }
  }, [meetingList]);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTime(format(new Date(), "HH:mm:ss"));
    }, 1000);
    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <Fragment>
      <div className="content-header row">
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              <h3 className="content-header-title float-start mb-0">Xin chào, {auth.account.fullName}</h3>
            </div>
            <div>
              <small>Chúc bạn buổi chiều vui vẻ !</small>
            </div>
          </div>
        </div>
      </div>
      <Row>
        <Col sm="9">
          <Row>
            <Col sm="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4" className="mb-0">
                    Tổng quan dự án
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="wrapper-overflow" style={{ height: "138px" }}>
                    {renderProjectList}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4" className="mb-0">
                    Tổng quan giai đoạn
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="wrapper-overflow" style={{ height: "138px" }}>
                    {renderSprintList}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4" className="mb-0">
                    Thành viên tiêu biểu
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="wrapper-overflow" style={{ height: "138px" }}>
                    {renderBestEmployee}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader className="d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start">
                  <div>
                    <CardSubtitle className="text-muted mb-25">Tiến độ</CardSubtitle>
                    <CardTitle className="font-weight-bolder" tag="h4">
                      {sprint?.sprintName}
                    </CardTitle>
                  </div>
                  <div className="d-flex align-items-center mt-md-0 mt-1">
                    <Calendar size={17} className="mx-1" />
                    <span>
                      {sprint?.startDate ? format(new Date(sprint.startDate), "yyyy-MM-dd") : ""} -{" "}
                      {sprint?.endDate ? format(new Date(sprint.endDate), "yyyy-MM-dd") : ""}
                    </span>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="text-white">
                    <Chart options={options} series={series} type="bar" height={306} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col sm="3">
          <Card>
            <CardBody>
              <Label className="d-flex justify-content-center">
                <Clock className="me-1" size="24" />
                <h4>
                  {time} {format(new Date(), "dd/MM/yyyy")}
                </h4>
              </Label>
              <div className="d-flex justify-content-center">
                <Flatpickr className="form-control home-flatpickr-input mt-1" value={new Date()} options={{ inline: true }} />
              </div>
              <div className="divider divider-dark">
                <div className="divider-text">Danh sách cuộc họp ngày hôm nay</div>
              </div>
              <div className="wrapper-overflow" style={{ height: "30vh" }}>
                {renderMeetingList}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4" className="mb-2">
                Công việc của tôi
              </CardTitle>
            </CardHeader>
            <CardBody>
              <TableHeader totalRows={subTaskList.length} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
              <Table
                data={subTaskList}
                columns={subTaskListColumns}
                currentPage={currentPage}
                totalRows={subTaskList.length}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Home;
