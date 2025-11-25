import Button from '@atoms/Button';
import './Pagination.scss';

type PaginationProps = {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ total, current, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if (page !== current) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (total <= 1) return null;

  return (
    <div className="pagination">
      <Button
        variant="icon"
        icon={<span className="arrow-icon--left"></span>}
        className="pagination__btn pagination__arrow"
        disabled={current === 1}
        onClick={() => handlePageChange(current - 1)}
      ></Button>

      <ul className="pagination__list">
        {pages.map((page) => (
          <li key={page}>
            <Button
              className={`pagination__btn ${page === current ? 'is-active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          </li>
        ))}
      </ul>

      <Button
        variant="icon"
        icon={<span className="arrow-icon--right"></span>}
        className="pagination__btn pagination__arrow"
        disabled={current === total}
        onClick={() => handlePageChange(current + 1)}
      ></Button>
    </div>
  );
};

export default Pagination;
