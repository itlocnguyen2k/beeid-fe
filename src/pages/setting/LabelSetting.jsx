import { Fragment, useEffect, useState } from "react";
import { Check, Plus, Trash } from "react-feather";
import { Label, Row, Col, Form, Input, Button, FormFeedback } from "reactstrap";
import "../../@core/scss/react/libs/react-select/_react-select.scss";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  SETTINGS_CHECK_EXIST_LABEL_API,
  SETTINGS_CREATE_LABEL_API,
  SETTINGS_DELETE_LABEL_API,
  SETTINGS_UPDATE_LABEL_API,
} from "../../constants/api";
import Repeater from "../../components/repeater/Repeater";
import { COLOR_DEFAULT_CONFIG } from "../../configs/color/ColorConfig";
import { TwitterPicker } from "react-color";

const LabelSetting = (props) => {
  const { initSetting, updateSetting, checkExist, labelList, onDelete } = props;
  const { t } = useTranslation();
  const {
    handleSubmit,
    setValue,
    control,
    setError,
    getValues,
    formState: { errors },
  } = useForm();

  const [count, setCount] = useState(1);
  const [twitterPickerActive, setTwitterPickerActive] = useState("");
  const increaseCount = () => {
    setCount(count + 1);
  };

  const deleteForm = (e) => {
    e.preventDefault();
    e.target.closest("form").remove();
  };

  useEffect(() => {
    if (labelList) {
      labelList.forEach((priority, idx) => {
        setValue(`labelName${idx}`, priority.labelName);
        setValue(`color${idx}`, priority.color);
      });
      setCount(labelList.length);
    }
  }, [labelList, setValue]);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0 text-center">Thiết Lập Nhãn</h5>
        <small className="d-flex justify-content-center">Hãy nhập thông tin thiết lập nhãn.</small>
      </div>
      <Repeater count={count}>
        {(i) => {
          return (
            <Form
              onSubmit={
                i >= labelList.length
                  ? handleSubmit(() => initSetting(getValues(), i, SETTINGS_CREATE_LABEL_API))
                  : handleSubmit(() => updateSetting(getValues(), i, SETTINGS_UPDATE_LABEL_API, labelList[i]))
              }
              key={i}
            >
              <Row className="justify-content-between align-items-center">
                <Col md={5} className="mb-0">
                  <Label for={`animation-item-name-${i}`}>Độ ưu tiên :</Label>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Vui lòng nhập thông tin nhãn"
                        onBlur={(e) => {
                          setValue(e.currentTarget.name, e.currentTarget.value.trim(), { shouldValidate: true });
                          e.currentTarget.value.trim() &&
                            checkExist(e.currentTarget.name, e.currentTarget.value.trim(), setError, SETTINGS_CHECK_EXIST_LABEL_API);
                        }}
                      />
                    )}
                    name={`labelName${i}`}
                    control={control}
                    type="text"
                    rules={{
                      required: {
                        value: true,
                        message: t("message.validation.required", {
                          name: "Nhãn",
                        }),
                      },
                    }}
                  />
                  {errors[`labelName${i}`] && <FormFeedback className="d-block">{errors[`labelName${i}`].message}</FormFeedback>}
                </Col>
                <Col md={3} className="mb-0">
                  <Label for={`color${i}`}>Màu sắc :</Label>
                  {twitterPickerActive === i ? (
                    <Controller
                      render={({ field }) => (
                        <TwitterPicker
                          {...field}
                          onChange={(data) => {
                            setValue(`color${i}`, data.hex);
                            setTwitterPickerActive("");
                          }}
                          colors={COLOR_DEFAULT_CONFIG}
                          className="mt-1"
                        />
                      )}
                      name={`color${i}`}
                      control={control}
                      type="text"
                      rules={{
                        required: {
                          value: true,
                          message: t("message.validation.required", {
                            name: "Màu sắc",
                          }),
                        },
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => setTwitterPickerActive(i)}
                      className={`d-block bullet bullet-xl me-1`}
                      style={{ borderRadius: "50%", backgroundColor: getValues(`color${i}`) || "#ffffff" }}
                    />
                  )}
                </Col>
                <Col md={3} className="mt-2 cursor-pointer d-flex">
                  <Button type="submit" color="flat-secondary" className="btn-sm px-0 py-0" outline>
                    <Check size={20} className="d-block" />
                  </Button>
                  <Button
                    type="button"
                    color="flat-secondary"
                    outline
                    onClick={i >= labelList.length ? deleteForm : () => onDelete(SETTINGS_DELETE_LABEL_API, labelList[i])}
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
      <Button type="button" className="btn-sm" color="flat-secondary" onClick={increaseCount} outline>
        <Plus size={14} />
        <span className="align-middle ms-25">Thêm mới</span>
      </Button>
    </Fragment>
  );
};

export default LabelSetting;
