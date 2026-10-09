import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  currentPage?: number;
  page?: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage: propCurrentPage,
  page,
  totalPages,
  onPageChange,
  className,
}) => {
  const { t } = useTranslation();
  const currentPage = page ?? propCurrentPage ?? 1;
  
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(i)}
            className="h-8 w-8"
          >
            {i}
          </Button>
        );
      }
    } else {
      // Always show first page
      pages.push(
        <Button
          key={1}
          variant={currentPage === 1 ? "default" : "outline"}
          size="icon"
          onClick={() => onPageChange(1)}
          className="h-8 w-8"
        >
          1
        </Button>
      );

      // Show dots if current page is far from start
      if (currentPage > 3) {
        pages.push(
          <div key="dots-1" className="flex h-8 w-8 items-center justify-center">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </div>
        );
      }

      // Show pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(i)}
            className="h-8 w-8"
          >
            {i}
          </Button>
        );
      }

      // Show dots if current page is far from end
      if (currentPage < totalPages - 2) {
        pages.push(
          <div key="dots-2" className="flex h-8 w-8 items-center justify-center">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </div>
        );
      }

      // Always show last page
      pages.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="icon"
          onClick={() => onPageChange(totalPages)}
          className="h-8 w-8"
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="text-sm text-muted-foreground">
        {t('common.page')} {currentPage} {t('common.of')} {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">{t('common.previous')}</span>
        </Button>
        <div className="hidden sm:flex sm:items-center sm:space-x-2">
          {renderPageNumbers()}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">{t('common.next')}</span>
        </Button>
      </div>
    </div>
  );
};

export { Pagination };
export default Pagination;
