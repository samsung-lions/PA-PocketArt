import { useEffect, useState } from 'react';

const Pagination = ({ maxPage, pageCountPerPage, clickListener }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(pageCountPerPage);

  const pages: number[] = Array.from({ length: maxPage + 1 }, (_, i) => i);

  useEffect(() => {
    if (maxPage < pageCountPerPage) {
      setEndPage(maxPage);
    }
  }, [maxPage, pageCountPerPage]);

  const leftPageClicked = (): void => {
    setCurrentPage(startPage - pageCountPerPage >= 1 ? currentPage - pageCountPerPage : startPage - 1);
    setStartPage(getStartPage());
    setEndPage(getStartPage() + pageCountPerPage - 1);
    clickListener(currentPage);
  };

  const rightPageClicked = (): void => {
    setCurrentPage(
      endPage + pageCountPerPage < maxPage ? currentPage + pageCountPerPage : startPage + pageCountPerPage
    );
    setStartPage(startPage + pageCountPerPage);
    setEndPage(getEndPage());
    clickListener(currentPage);
  };

  const pageNumberClicked = (page: number): void => {
    setCurrentPage(page);
    clickListener(page);
  };

  const getStartPage = (): number => {
    return startPage - pageCountPerPage > 1 ? startPage - pageCountPerPage : 1;
  };

  const getEndPage = (): number => {
    return endPage + pageCountPerPage < maxPage ? endPage + pageCountPerPage : maxPage;
  };

  return (
    <div>
      <button
        onClick={leftPageClicked}
        disabled={startPage === 1}
        className={`${startPage === 1 ? 'bg-opacity-50' : ''}`}
      >
        &lt;
      </button>
      {pages.slice(startPage, endPage + 1).map((page, i) => (
        <Numbering key={i} page={page} currentPage={currentPage} clickListener={pageNumberClicked} />
      ))}
      <button
        onClick={rightPageClicked}
        disabled={endPage === maxPage}
        className={`${endPage === maxPage ? 'bg-opacity-50' : ''}`}
      >
        &gt;
      </button>
    </div>
  );
};

const Numbering = ({ page, currentPage, clickListener }: NumberingProps) => {
  return (
    <button
      onClick={() => clickListener(page)}
      className={`border-none rounded-full p-1 m-1 ${
        page === currentPage ? 'text-yellow font-bold' : 'text-black font-normal'
      }`}
    >
      {page}
    </button>
  );
};

export default Pagination;
