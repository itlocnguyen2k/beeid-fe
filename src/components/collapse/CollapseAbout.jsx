import { Fragment, useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { CardBody, Collapse } from "reactstrap";

const CollapseAbout = (props) => {
  const { children, unControlClose } = props;
  const [openCollapse, setOpenCollapse] = useState(false);
  const handleCollapseToggle = useCallback(() => {
    setOpenCollapse(!openCollapse);
  }, [openCollapse]);

  useEffect(() => {
    if (!unControlClose) {
      setOpenCollapse(false);
    }
  }, [children, unControlClose]);

  return (
    <Fragment>
      {openCollapse ? (
        <ChevronUp size={24} onClick={handleCollapseToggle} className="cursor-pointer" />
      ) : (
        <ChevronDown size={24} onClick={handleCollapseToggle} className="cursor-pointer" />
      )}
      <Collapse isOpen={openCollapse}>
        <CardBody className="px-0 py-0">{children}</CardBody>
      </Collapse>
    </Fragment>
  );
};
export default CollapseAbout;
