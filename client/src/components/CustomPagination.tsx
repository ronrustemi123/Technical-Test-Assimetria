import { type ReactNode, useCallback, useTransition } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useSearchParams, useNavigate, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface CustomPaginationProps {
  totalCount: number;
  page: number;
}

const PAGE_SIZE = 6;
export function CustomPagination({ totalCount, page }: CustomPaginationProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isPending, startTransition] = useTransition();

  const totalPageCount = Math.ceil(totalCount / PAGE_SIZE);

  const buildLink = useCallback(
    (newPage: number) => {
      const newSearch = new URLSearchParams(searchParams);
      newSearch.set("page", String(newPage));

      return `${location.pathname}?${newSearch.toString()}`;
    },
    [searchParams, location.pathname]
  );

  const navigateToPage = useCallback(
    (newPage: number) => {
      startTransition(() => navigate(buildLink(newPage)));
    },
    [buildLink, navigate]
  );

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    const createPageItem = (p: number) => (
      <PaginationItem key={p}>
        <PaginationLink
          onClick={() => navigateToPage(p)}
          isActive={page === p}
          className="cursor-pointer shadow-none"
        >
          {p}
        </PaginationLink>
      </PaginationItem>
    );

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) items.push(createPageItem(i));
    } else {
      items.push(createPageItem(1));
      if (page > 3)
        items.push(
          <PaginationItem key="es">
            <PaginationEllipsis />
          </PaginationItem>
        );

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      for (let i = start; i <= end; i++) items.push(createPageItem(i));

      if (page < totalPageCount - 2)
        items.push(
          <PaginationItem key="ee">
            <PaginationEllipsis />
          </PaginationItem>
        );

      items.push(createPageItem(totalPageCount));
    }

    return items;
  };

  return (
    <Pagination className="justify-center mt-12">
      <PaginationContent className="gap-1">
        {isPending && (
          <PaginationItem>
            <Loader2 className="h-4 w-4 animate-spin" />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationPrevious
            onClick={() => navigateToPage(Math.max(page - 1, 1))}
            className={cn(page === 1 && "opacity-50 pointer-events-none")}
          />
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <PaginationNext
            onClick={() => navigateToPage(Math.min(page + 1, totalPageCount))}
            className={cn(
              page === totalPageCount && "opacity-50 pointer-events-none"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
