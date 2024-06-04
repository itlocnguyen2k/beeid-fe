import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import Calendar from "../../components/calendar/Calendar";
import BackButton from "../../components/link/BackButton";

const CalendarApp = (props) => {
  const { taskList } = props;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (taskList.length > 0) {
      const eventTemp = [];
      taskList.forEach((task) => {
        const title =
          task.categories.categoryName +
          " - " +
          task.taskTitle +
          " - " +
          task.sprints.sprintName +
          " - " +
          task.sprints.projects.projectName;
        eventTemp.push({
          title: title,
          start: task.startDate,
          end: task.endDate,
          backgroundColor: task.categories.color,
          borderColor: task.categories.color,
          id: task._id,
          sprintId: task.sprints._id,
        });
      });
      setEvents(eventTemp);
    }
  }, [taskList]);

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Schedule" breadCrumbParent="Giai đoạn" breadCrumbActive="Schedule">
        <BackButton />
      </Breadcrumbs>
      <Row className="d-flex justify-content-center">
        <Col lg="10">
          <Card className="shadow-none border-0 mb-0 rounded-0 pb-2">
            <CardBody className="pb-0">
              <Calendar events={events} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default CalendarApp;
