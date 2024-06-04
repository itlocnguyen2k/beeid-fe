import { Fragment, useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { CardBody, CardHeader, CardTitle, Collapse } from "reactstrap";

const CollapseFilter = (props) => {
  const { title, children, unControlClose } = props;
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
      <CardHeader className="align-items-center cursor-pointer" onClick={handleCollapseToggle}>
        <CardTitle className="collapse-title text-primary fw-bolderer">{title}</CardTitle>
        {openCollapse ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </CardHeader>
      <Collapse isOpen={openCollapse}>
        <CardBody>{children}</CardBody>
      </Collapse>
    </Fragment>
  );
};
export default CollapseFilter;
