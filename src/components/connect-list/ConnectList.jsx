import { useTranslation } from "react-i18next";
import { Button } from "reactstrap";
import { completePhotoPath } from "../../utils/helpers";
import Avatar from "../avatar/Avatar";

const ConnectList = (props) => {
  const { data, children, followCallback, url } = props;
  const { t } = useTranslation();
  return data.map((account) => (
    <div className="d-flex justify-content-between mt-1" key={account._id}>
      <div className="d-flex align-items-center">
        {account.avatar ? (
          <Avatar
            img={completePhotoPath(account.avatar)}
            imgHeight="32"
            imgWidth="32"
            status={t(`account_status_mapping.${account.status}`, { defaultValue: "" })}
          />
        ) : (
          <Avatar
            content={account.fullName || "G"}
            initials
            imgHeight="32"
            imgWidth="32"
            status={t(`account_status_mapping.${account.status}`, { defaultValue: "" })}
          />
        )}
        <div className="profile-user-info mx-1">
          <h6 className="mb-0">{account.fullName}</h6>
          <small className="text-muted">{account.email}</small>
        </div>
      </div>
      <div>
        <Button className="btn-icon" color="primary" size="sm" onClick={() => followCallback(account._id, url)}>
          {children}
        </Button>
      </div>
    </div>
  ));
};
export default ConnectList;
