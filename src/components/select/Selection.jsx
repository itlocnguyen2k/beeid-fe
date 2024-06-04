import Select from "react-select";
import "../../@core/scss/react/libs/react-select/_react-select.scss";
const Selection = (props) => {
  const { setPageSize, setCurrentPage } = props;
  const selectOptions = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];
  return (
    <Select
      isClearable={false}
      onChange={(e) => {
        setPageSize(parseInt(e.value));
        setCurrentPage(0);
      }}
      className="react-select w-25"
      classNamePrefix="select"
      options={selectOptions}
      defaultValue={selectOptions[0]}
      placeholder="Số bản ghi"
    />
  );
};

export default Selection;
