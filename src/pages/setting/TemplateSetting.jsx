import { Fragment } from "react";
import { Check, Plus, Trash } from "react-feather";
import { Label, Row, Col, Form, Input, Button, FormFeedback } from "reactstrap";
import "../../@core/scss/react/libs/react-select/_react-select.scss";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  SETTINGS_CHECK_EXIST_TEMPLATE_API,
  SETTINGS_CREATE_TEMPLATE_API,
  SETTINGS_DELETE_TEMPLATE_API,
  SETTINGS_UPDATE_TEMPLATE_API,
} from "../../constants/api";
import { useState } from "react";
import { useEffect } from "react";
import Repeater from "../../components/repeater/Repeater";

const TemplateSetting = (props) => {
  const { initSetting, updateSetting, checkExist, templateList, onDelete } = props;
  const { t } = useTranslation();
  const {
    handleSubmit,
    setValue,
    control,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  const [count, setCount] = useState(1);
  const increaseCount = () => {
    setCount(count + 1);
  };

  const deleteForm = (e) => {
    e.preventDefault();
    e.target.closest("form").remove();
  };

  useEffect(() => {
    if (templateList) {
      templateList.forEach((template, idx) => {
        setValue(`templateName${idx}`, template.templateName);
      });
      setCount(templateList.length);
    }
  }, [templateList, setValue]);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0 text-center">Thiết Lập Hạng Mục</h5>
        <small className="d-flex justify-content-center">Hãy nhập thông tin thiết lập hạng mục.</small>
      </div>
      <Repeater count={count}>
        {(i) => {
          return (
            <Form
              onSubmit={
                i >= templateList.length
                  ? handleSubmit(() => initSetting(getValues(), i, SETTINGS_CREATE_TEMPLATE_API))
                  : handleSubmit(() => updateSetting(getValues(), i, SETTINGS_UPDATE_TEMPLATE_API, templateList[i]))
              }
              key={i}
            >
              <Row className="justify-content-between align-items-center">
                <Col md={5} className="mb-0">
                  <Label for={`animation-item-name-${i}`}>Hạng mục :</Label>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Vui lòng nhập thông tin hạng mục"
                        onBlur={(e) => {
                          setValue(e.currentTarget.name, e.currentTarget.value.trim(), { shouldValidate: true });
                          e.currentTarget.value.trim() &&
                            checkExist(e.currentTarget.name, e.currentTarget.value.trim(), setError, SETTINGS_CHECK_EXIST_TEMPLATE_API);
                        }}
                      />
                    )}
                    name={`templateName${i}`}
                    control={control}
                    type="text"
                    rules={{
                      required: {
                        value: true,
                        message: t("message.validation.required", {
                          name: "Hạng mục",
                        }),
                      },
                    }}
                  />
                  {errors[`templateName${i}`] && <FormFeedback className="d-block">{errors[`templateName${i}`].message}</FormFeedback>}
                </Col>
                <Col md={2} className="mt-2 cursor-pointer d-flex">
                  <Button type="submit" color="flat-secondary" className="btn-sm px-0 py-0" outline>
                    <Check size={20} className="d-block" />
                  </Button>
                  <Button
                    type="button"
                    color="flat-secondary"
                    outline
                    onClick={i >= templateList.length ? deleteForm : () => onDelete(SETTINGS_DELETE_TEMPLATE_API, templateList[i])}
                    className="btn-sm px-1 py-0"
                  >
                    <Trash size={18} className="d-block" />
                  </Button>
                </Col>
                <Col sm={12}>
                  <hr />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Repeater>
      <Button type="button" className="btn-sm" color="flat-secondary" onClick={increaseCount}>
        <Plus size={14} />
        <span className="align-middle ms-25">Thêm mới</span>
      </Button>
    </Fragment>
  );
};

export default TemplateSetting;
