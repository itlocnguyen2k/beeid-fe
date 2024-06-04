import ReactPaginate from "react-paginate";

const Pagination = (props) => {
  const { currentPage, setCurrentPage, totalRows, pageSize } = props;
  return (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      forcePage={currentPage}
      onPageChange={(page) => setCurrentPage(page.selected)}
      pageCount={Math.ceil(totalRows / pageSize)}
      breakLabel={"..."}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={"active"}
      pageClassName={"page-item"}
      nextLinkClassName={"page-link"}
      nextClassName={"page-item next"}
      previousClassName={"page-item prev"}
      previousLinkClassName={"page-link"}
      pageLinkClassName={"page-link"}
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName={"pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1"}
    />
  );
};
export default Pagination;
