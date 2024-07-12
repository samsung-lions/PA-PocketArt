interface PaginationProps {
  maxPage: number;
  itemCountPerPage: number;
  pageCountPerPage: number;
  clickListener: (page: number) => void;
}
interface NumberingProps {
  page: number;
  currentPage: number;
  clickListener: (page: number) => void;
}
