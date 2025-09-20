import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function AppPagination({
  depPerPage,
  totalDep,
  currentPage,
  className,
  paginate,
}: {
  depPerPage: number;
  totalDep: number;
  className: string;
  currentPage: number;
  paginate: (number: number) => void;
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDep / depPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <Pagination className={className}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  paginate(currentPage - 1);
                }
              }}
              href={"!#"}
            />
          </PaginationItem>

          {pageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                isActive={currentPage === number}
                href={"!#"}
                onClick={(e) => {
                  e.preventDefault();
                  paginate(number);
                }}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={"!#"}
              onClick={(e) => {
                e.preventDefault();
                const lastPage = Math.ceil(totalDep / depPerPage);
                if (currentPage < lastPage) {
                  paginate(currentPage + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default AppPagination;
