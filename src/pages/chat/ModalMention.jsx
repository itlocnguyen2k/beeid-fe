import { useMemo } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "reactstrap";
import Avatar from "../../components/avatar/Avatar";
import ChatContext from "../../context/ChatContext";
import { completePhotoPath } from "../../utils/helpers";

const ModalMention = (props) => {
  const { selectMention } = props;
  const chatContext = useContext(ChatContext);
  const { memberList } = chatContext;
  const { t } = useTranslation();

  const renderMembers = useMemo(() => {
    return memberList.map((member) => (
      <li
        className="mention-item d-flex justify-content-between align-items-center border-0 px-1 py-50 cursor-pointer"
        key={member._id}
        onClick={() => selectMention(member.fullName)}
      >
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
      </li>
    ));
  }, [t, memberList, selectMention]);
  return (
    <Card>
      <div className="wrapper-overflow" style={{ height: "300px" }}>
        {renderMembers}
      </div>
    </Card>
  );
};
export default ModalMention;
