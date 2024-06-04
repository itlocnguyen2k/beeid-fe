import { Fragment, useRef, useState } from "react";
import { RefreshCw, Settings } from "react-feather";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import Wizard from "../../components/wizard/Wizard";
import CategorySetting from "./CategorySetting";
import LabelSetting from "./LabelSetting";
import PrioritySetting from "./PrioritySetting";
import TemplateSetting from "./TemplateSetting";

const Setting = (props) => {
  const { initSetting, updateSetting, checkExist, categoryList, labelList, priorityList, templateList, onDelete } = props;
  const [, setStepper] = useState(null);
  const ref = useRef(null);

  const steps = [
    {
      id: "category-setting",
      title: "Phân loại",
      subtitle: "Hãy tạo thêm phân loại cho dự án",
      icon: <Settings size={18} />,
      content: (
        <CategorySetting
          initSetting={initSetting}
          updateSetting={updateSetting}
          checkExist={checkExist}
          categoryList={categoryList}
          onDelete={onDelete}
        />
      ),
    },
    {
      id: "label-setting",
      title: "Nhãn",
      subtitle: "Hãy tạo thêm nhãn cho dự án",
      icon: <Settings size={18} />,
      content: (
        <LabelSetting
          initSetting={initSetting}
          updateSetting={updateSetting}
          checkExist={checkExist}
          labelList={labelList}
          onDelete={onDelete}
        />
      ),
    },
    {
      id: "priority-setting",
      title: "Độ ưu tiên",
      subtitle: "Hãy tạo thêm độ ưu tiên cho dự án",
      icon: <Settings size={18} />,
      content: (
        <PrioritySetting
          initSetting={initSetting}
          updateSetting={updateSetting}
          checkExist={checkExist}
          priorityList={priorityList}
          onDelete={onDelete}
        />
      ),
    },
    {
      id: "template-setting",
      title: "Hạng mục",
      subtitle: "Hãy tạo thêm hạng mục cho dự án",
      icon: <Settings size={18} />,
      content: (
        <TemplateSetting
          initSetting={initSetting}
          updateSetting={updateSetting}
          checkExist={checkExist}
          templateList={templateList}
          onDelete={onDelete}
        />
      ),
    },
  ];
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle="Thiết lập dự án" breadCrumbParent="Dự án" breadCrumbActive="Thiết lập dự án">
        <Link to="/admin" className="btn-link">
          <RefreshCw size={14} className="me-1" />
          Trở về
        </Link>
      </Breadcrumbs>
      <Row className="d-flex justify-content-center">
        <Col lg="11">
          <Card>
            <div className="vertical-wizard">
              <Wizard
                className="shadow-none"
                type="vertical"
                ref={ref}
                steps={steps}
                options={{
                  linear: false,
                }}
                instance={(el) => setStepper(el)}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Setting;
