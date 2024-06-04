const ExpandableTableAccountList = ({ data }) => {
  return (
    <div className="expandable-content p-2">
      <div>
        <span className="font-weight-bold mx-1">Mã nhân viên:</span> #{data._id}
      </div>
      <div>
        <span className="font-weight-bold mx-1">Vị trí:</span> {data.position}
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
export default ExpandableTableAccountList;
