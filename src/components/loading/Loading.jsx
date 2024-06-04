import { Spinner } from "reactstrap";
const Loading = () => {
  return (
    <div className="d-flex justify-content-center my-1">
      <Spinner color="primary" />
    </div>
  );
};
export default Loading;
