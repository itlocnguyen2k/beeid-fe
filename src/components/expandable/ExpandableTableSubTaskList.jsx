const ExpandableTableSubTaskList = ({ data }) => {
  return (
    <div className="expandable-content p-2">
      <div>
        <span className="font-weight-bold mx-1">Mã công việc:</span> #{data._id}
      </div>
      <div>
        <span className="font-weight-bold mx-1">Phạm vi:</span> {data.module}
      </div>
      <div>
        <span className="font-weight-bold mx-1">Chi tiết:</span>
        <div className="px-2">
          <div dangerouslySetInnerHTML={{ __html: data?.about }} />
        </div>
      </div>
    </div>
  );
};
export default ExpandableTableSubTaskList;
