import { useMemo } from "react";
import { useContext } from "react";
import { Fragment } from "react";
import { Check, UserPlus, X } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, FormFeedback, Input, Label, Media, Row } from "reactstrap";
import AvatarGroup from "../../components/avatar-group/AvatarGroup";
import Avatar from "../../components/avatar/Avatar";
import { ON_SELECTED_MEMBER } from "../../constants/action";
import ChatContext from "../../context/ChatContext";
import { onSelected } from "../../reducer/ChatReducer";
import { useStore } from "../../store/StoreHooks";
import { completePhotoPath } from "../../utils/helpers";

const ModalAddConversation = () => {
  const {
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const chatContext = useContext(ChatContext);
  const { memberList, memberSelectedList, dispatch, createRoom } = chatContext;
  const [storeState] = useStore();
  const { t } = useTranslation();

  const renderMembers = useMemo(() => {
    return memberList.map((member) => (
      <li className="list-group-item d-flex justify-content-between align-items-center border-0 py-50 px-0 cursor-pointer" key={member._id}>
        <div className="d-flex align-items-center cursor-pointer">
          {member.avatar ? (
            <Avatar
              img={completePhotoPath(member.avatar)}
              size="2sm"
              status={t(`account_status_mapping.${member.status}`, { defaultValue: "" })}
            />
          ) : (
            <Avatar content={member.fullName || "G"} initials size="2sm" />
          )}
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{member.fullName}</span>
          </div>
        </div>
        <div className="d-flex align-items-center cursor-pointer">
          <UserPlus
            size={17}
            className="mx-0"
            onClick={() => dispatch(onSelected(ON_SELECTED_MEMBER, member, memberSelectedList, storeState.memberOrgList))}
          />
        </div>
      </li>
    ));
  }, [t, memberSelectedList, memberList, storeState, dispatch]);

  const renderMembersSelected = useMemo(() => {
    return memberSelectedList.map((member) => (
      <li className="list-group-item d-flex justify-content-between align-items-center border-0 py-50 px-0 cursor-pointer" key={member._id}>
        <div className="d-flex align-items-center cursor-pointer">
          {member.avatar ? (
            <Avatar
              img={completePhotoPath(member.avatar)}
              size="2sm"
              status={t(`account_status_mapping.${member.status}`, { defaultValue: "" })}
            />
          ) : (
            <Avatar content={member.fullName || "G"} initials size="2sm" />
          )}
          <div className="user-info text-truncate ml-1">
            <span className="d-block font-weight-bold text-truncate mx-1">{member.fullName}</span>
          </div>
        </div>
        <div className="d-flex align-items-center cursor-pointer">
          <X
            size={17}
            className="mx-0"
            onClick={() => dispatch(onSelected(ON_SELECTED_MEMBER, member, memberSelectedList, storeState.memberOrgList))}
          />
        </div>
      </li>
    ));
  }, [t, memberSelectedList, storeState, dispatch]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(() => createRoom(getValues()))}>
        <Row>
          <Media className="d-flex justify-content-center">
            <Media className="mr-25 mb-1" center>
              <Avatar content={getValues("roomName") || "G"} initials size="xl" />
            </Media>
          </Media>
        </Row>
        <Row>
          <Col className="mb-1" md="12">
            <Label className="form-label" for="roomName">
              Nhóm :
            </Label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Vui lòng nhập thông tin nhóm"
                  onBlur={(e) => {
                    setValue(e.currentTarget.name, e.currentTarget.value.trim(), { shouldValidate: true });
                  }}
                />
              )}
              name="roomName"
              control={control}
              type="text"
              rules={{
                required: {
                  value: true,
                  message: t("message.validation.required", {
                    name: "Nhóm",
                  }),
                },
              }}
            />
            {errors.roomName && <FormFeedback className="d-block">{errors.roomName.message}</FormFeedback>}
          </Col>
          <Col className="mb-1" md="12">
            <Label className="form-label" for="description">
              Mô tả :
            </Label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Vui lòng nhập thông tin mô tả"
                  onBlur={(e) => {
                    setValue(e.currentTarget.name, e.currentTarget.value.trim(), { shouldValidate: true });
                  }}
                />
              )}
              name="description"
              control={control}
              type="text"
              rules={{
                required: {
                  value: true,
                  message: t("message.validation.required", {
                    name: "Mô tả",
                  }),
                },
              }}
            />
            {errors.description && <FormFeedback className="d-block">{errors.description.message}</FormFeedback>}
          </Col>
        </Row>
        <div className="divider">
          <div className="divider-text">Danh sách nhân viên đã chọn</div>
        </div>
        <div className="d-flex fw-bolder pt-50 mt-2 mb-1">
          <span className="me-1">{memberSelectedList.length} thành viên </span>
          <AvatarGroup data={memberSelectedList} />
        </div>
        <div className="wrapper-overflow" style={{ maxHeight: "23vh", minHeight: "23vh" }}>
          <ul className="list-group list-group-flush mb-2">{renderMembersSelected}</ul>
        </div>
        <div className="divider">
          <div className="divider-text">Danh sách nhân viên chưa chọn</div>
        </div>
        <div className="d-flex fw-bolder pt-50 mt-2">
          <span className="me-1">{memberList.length} thành viên </span>
        </div>
        <div className="wrapper-overflow" style={{ maxHeight: "23vh", minHeight: "23vh" }}>
          <ul className="list-group list-group-flush mb-2">{renderMembers}</ul>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none mx-2">Tạo</span>
            <Check size={14} className="align-middle ml-sm-25 ml-0" />
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};
export default ModalAddConversation;
