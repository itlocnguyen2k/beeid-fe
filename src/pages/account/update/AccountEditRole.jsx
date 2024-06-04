import { useState } from "react";
import { useEffect } from "react";
import { ArrowLeft, Check } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, Input, Label, Row } from "reactstrap";

const AccountEditRole = (props) => {
  const { account, onSubmitPermission } = props;
  const methods = useForm({
    mode: "all",
    reValidateMode: "all",
  });
  const { handleSubmit, control, getValues, setValue, watch } = methods;
  const watchSelectAll = watch("selectAll");
  const watchAllFields = watch();
  const [isLoadingFirstTime, setLoadingFirstTime] = useState(false);
  const [isCompleteInitValue, setCompleteInitValue] = useState(false);

  useEffect(() => {
    if (account.permission) {
      let isSelectAll = true;
      for (const [key, value] of Object.entries(account.permission)) {
        if (value) {
          setValue(key, value);
        } else {
          isSelectAll = false;
        }
      }
      setValue("selectAll", isSelectAll);
      setCompleteInitValue(true);
    }
  }, [account, setValue]);

  useEffect(() => {
    if (account.permission && isLoadingFirstTime) {
      for (const [key] of Object.entries(account.permission)) {
        setValue(key, watchSelectAll);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchSelectAll, setValue, account]);

  useEffect(() => {
    if (isCompleteInitValue) {
      setLoadingFirstTime(true);
    }
  }, [watchAllFields, isCompleteInitValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Chỉnh sửa quyền truy cập</CardTitle>
      </CardHeader>
      <CardBody>
        <Form
          onSubmit={handleSubmit(() => {
            onSubmitPermission(getValues());
          })}
        >
          <Row>
            <Col sm="12">
              <div class="table-responsive">
                <table class="table table-flush-spacing">
                  <tbody>
                    <tr>
                      <td className="text-nowrap fw-bolder">Quyền truy cập</td>
                      <td>
                        <div className="form-check">
                          <Controller
                            render={({ field }) => <Input {...field} type="checkbox" checked={getValues("selectAll")} />}
                            name="selectAll"
                            control={control}
                          />
                          <Label class="form-check-label" for="selectAll">
                            Chọn tất cả
                          </Label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-bolder">Tài khoản</td>
                      <td>
                        <div class="d-flex">
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("accountCreate")} />}
                              name="accountCreate"
                              control={control}
                            />
                            <Label class="form-check-label" for="accountCreate">
                              Thêm
                            </Label>
                          </div>
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("accountEdit")} />}
                              name="accountEdit"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="accountEdit">
                              Chỉnh sửa
                            </Label>
                          </div>
                          <div class="form-check">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("accountDelete")} />}
                              name="accountDelete"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="accountDelete">
                              Xóa
                            </Label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-bolder">Dự án</td>
                      <td>
                        <div class="d-flex">
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("projectCreate")} />}
                              name="projectCreate"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="projectCreate">
                              Thêm
                            </Label>
                          </div>
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("projectEdit")} />}
                              name="projectEdit"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="projectEdit">
                              Chỉnh sửa
                            </Label>
                          </div>
                          <div class="form-check">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("projectDelete")} />}
                              name="projectDelete"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="projectDelete">
                              Xóa
                            </Label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-bolder">Giai đoạn</td>
                      <td>
                        <div class="d-flex">
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("sprintCreate")} />}
                              name="sprintCreate"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="sprintCreate">
                              Thêm
                            </Label>
                          </div>
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("sprintEdit")} />}
                              name="sprintEdit"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="sprintEdit">
                              Chỉnh sửa
                            </Label>
                          </div>
                          <div class="form-check">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("sprintDelete")} />}
                              name="sprintDelete"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="sprintDelete" checked={getValues("accountCreate")}>
                              Xóa
                            </Label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-bolder">Công việc</td>
                      <td>
                        <div class="d-flex">
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("taskCreate")} />}
                              name="taskCreate"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="taskCreate">
                              Thêm
                            </Label>
                          </div>
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("taskEdit")} />}
                              name="taskEdit"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="taskEdit">
                              Chỉnh sửa
                            </Label>
                          </div>
                          <div class="form-check">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("taskDelete")} />}
                              name="taskDelete"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="taskDelete">
                              Xóa
                            </Label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-bolder">Công việc phụ</td>
                      <td>
                        <div class="d-flex">
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("subTaskCreate")} />}
                              name="subTaskCreate"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="subTaskCreate">
                              Thêm
                            </Label>
                          </div>
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("subTaskEdit")} />}
                              name="subTaskEdit"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="subTaskEdit">
                              Chỉnh sửa
                            </Label>
                          </div>
                          <div class="form-check">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("subTaskDelete")} />}
                              name="subTaskDelete"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="subTaskDelete">
                              Xóa
                            </Label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-bolder">Thiết lập</td>
                      <td>
                        <div class="d-flex">
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("settingList")} />}
                              name="settingList"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="settingList">
                              Xem
                            </Label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-bolder">Đặt lịch họp</td>
                      <td>
                        <div class="d-flex">
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("meetingList")} />}
                              name="meetingList"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="meetingList">
                              Xem
                            </Label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-bolder">Thùng rác</td>
                      <td>
                        <div class="d-flex">
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("trashList")} />}
                              name="trashList"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="trashList">
                              Xem
                            </Label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-bolder">Báo cáo</td>
                      <td>
                        <div class="d-flex">
                          <div class="form-check me-3 me-lg-5">
                            <Controller
                              render={({ field }) => <Input {...field} type="checkbox" checked={getValues("reportList")} />}
                              name="reportList"
                              control={control}
                              type="checkbox"
                            />
                            <Label class="form-check-label" for="reportList">
                              Xem
                            </Label>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-between mt-2 mb-2">
            <Button color="secondary" className="btn-prev" outline disabled>
              <ArrowLeft size={14} className="align-middle mr-sm-25 mr-0"></ArrowLeft>
              <span className="align-middle d-sm-inline-block d-none mx-2">Hủy</span>
            </Button>
            <Button color="primary" className="btn-next" type="submit">
              <span className="align-middle d-sm-inline-block d-none mx-2">Cập nhật</span>
              <Check size={14} className="align-middle ml-sm-25 ml-0" />
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};
export default AccountEditRole;
