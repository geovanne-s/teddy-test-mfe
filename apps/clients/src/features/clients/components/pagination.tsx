import { useDispatch, useSelector } from "react-redux";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination, DOTS } from "@/hooks/usePagination"; // Importe o nosso novo hook
import { setPage } from "../clientsSlice.ts";
import { AppDispatch, RootState } from "@/app/store.ts";

export function ClientListPagination() {
  const dispatch = useDispatch<AppDispatch>();

  const { currentPage, totalPages, status } = useSelector(
    (state: RootState) => state.clientes
  );

  const isLoading = status === "loading";

  const paginationRange = usePagination({ currentPage, totalPages });

  const handlePageChange = (page: number) => {
    if (page !== currentPage && !isLoading) {
      dispatch(setPage(page));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            className={
              currentPage === 1 || isLoading
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem key={`dots-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNumber} className="cursor-pointer">
              <PaginationLink
                onClick={() => handlePageChange(pageNumber as number)}
                className={
                  pageNumber === currentPage
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "text-black hover:text-primary-foreground hover:bg-primary"
                }
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            className={
              currentPage === totalPages || isLoading
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
