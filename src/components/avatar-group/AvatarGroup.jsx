// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import Proptypes from "prop-types";
import classnames from "classnames";
import { UncontrolledTooltip } from "reactstrap";

// ** Custom Components
import Avatar from "../avatar/Avatar";
import { completePhotoPath } from "../../utils/helpers";

const AvatarGroup = (props) => {
  // ** Props
  const { data, tag, className, addMember, funCallBack } = props;

  // ** Conditional Tag
  const Tag = tag ? tag : "div";

  // ** Render Data
  const renderData = () => {
    return data.map((item, i) => {
      const ItemTag = item.tag ? item.tag : "div";
      return (
        <Fragment key={i}>
          {item.fullName ? <UncontrolledTooltip target={item.fullName.split(" ").join("-")}>{item.fullName}</UncontrolledTooltip> : null}
          {item.avatar ? (
            <Avatar
              tag={ItemTag}
              className={classnames("pull-up", {
                [item.className]: item.className,
              })}
              size="sm"
              img={completePhotoPath(item.avatar)}
              {...(item.fullName ? { id: item.fullName.split(" ").join("-") } : {})}
              {...item}
            />
          ) : (
            <Avatar content="4 0 4" initials size="sm" />
          )}
          {item.meta ? <ItemTag className="d-flex align-items-center pl-1">{item.meta}</ItemTag> : null}
        </Fragment>
      );
    });
  };

  return (
    <Tag
      className={classnames("avatar-group", {
        [className]: className,
      })}
    >
      {renderData()}
      {addMember && <Avatar content="+" initials size="sm" onClick={funCallBack} />}
    </Tag>
  );
};

export default AvatarGroup;

// ** PropTypes
AvatarGroup.propTypes = {
  data: Proptypes.array.isRequired,
  tag: Proptypes.oneOfType([Proptypes.func, Proptypes.string]),
  addMember: false,
};
