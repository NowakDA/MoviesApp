import { Pagination } from 'antd';

function PaginationComponent({ currentPage, totalResults, onChange }) {
  return (
    <Pagination
      align="center"
      showQuickJumper
      current={currentPage}
      pageSize={20}
      total={totalResults > 10000 ? 10000 : totalResults}
      onChange={onChange}
    />
  );
}

export default PaginationComponent;
