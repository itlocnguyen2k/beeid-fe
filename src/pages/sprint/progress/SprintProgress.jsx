import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { Card, CardBody, CardHeader, CardSubtitle, CardTitle, Col, Row } from "reactstrap";
import "../../../@core/scss/react/libs/charts/apex-charts.scss";
import { Calendar } from "react-feather";
import Chart from "react-apexcharts";
import { useMemo } from "react";
import { format } from "date-fns";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import BackButton from "../../../components/link/BackButton";

const SprintProgress = (props) => {
  const { taskList, sprint } = props;

  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);

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
    }
  }, [taskList]);

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

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Tiến độ" breadCrumbParent="Giai đoạn" breadCrumbActive="Tiến độ">
        <BackButton />
      </Breadcrumbs>
      <Row className="d-flex justify-content-center">
        <Col lg="8">
          <Card>
            <CardHeader className="d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start">
              <div>
                <CardSubtitle className="text-muted mb-25">Tiến độ</CardSubtitle>
                <CardTitle className="font-weight-bolder" tag="h4">
                  {sprint.sprintName}
                </CardTitle>
              </div>
              <div className="d-flex align-items-center mt-md-0 mt-1">
                <Calendar size={17} className="mx-1" />
                <span>
                  {sprint.startDate ? format(new Date(sprint.startDate), "yyyy-MM-dd") : ""} -{" "}
                  {sprint.endDate ? format(new Date(sprint.endDate), "yyyy-MM-dd") : ""}
                </span>
              </div>
            </CardHeader>
            <CardBody>
              <Chart options={options} series={series} type="bar" height={400} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default SprintProgress;
