import { RefreshCw } from "react-feather";
import { Link, useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Link
      className="btn-link"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      <RefreshCw size={14} className="me-1" />
      Trở về
    </Link>
  );
};
export default BackButton;
