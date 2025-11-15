import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {cn} from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export function Pagination({currentPage, totalItems, pageSize, onPageChange}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / pageSize);
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    if (totalPages <= 1) return null;

    // Calculate page numbers to show
    const getPageNumbers = () => {
        const delta = 1; // Number of pages to show on each side of current page
        const range = [];
        const rangeWithDots = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex flex-col items-center gap-4" role="navigation" aria-label="Paginación">
            {/* Results Info */}
            <div className="text-sm text-gray-600 font-medium">
                Mostrando <span className="text-gray-900">{startItem}</span> a{' '}
                <span className="text-gray-900">{endItem}</span> de{' '}
                <span className="text-gray-900">{totalItems}</span> resultados
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1" aria-label="Controles de paginación">
                {/* Previous Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={cn(
                        "h-8 w-8 p-0 rounded-md",
                        "hover:bg-gray-100",
                        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    )}
                    aria-label="Página anterior"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {pages.map((page, index) => {
                        if (page === '...') {
                            return (
                                <span
                                    key={`dots-${index}`}
                                    className="h-8 w-8 flex items-center justify-center text-gray-400 text-sm"
                                >
                                    ···
                                </span>
                            );
                        }

                        const pageNumber = page as number;
                        const isActive = currentPage === pageNumber;

                        return (
                            <Button
                                key={pageNumber}
                                variant="ghost"
                                size="sm"
                                onClick={() => onPageChange(pageNumber)}
                                className={cn(
                                    "h-8 w-8 p-0 rounded-md text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-teal-600 text-white hover:bg-teal-700"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                                aria-label={`Página ${pageNumber}`}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {pageNumber}
                            </Button>
                        );
                    })}
                </div>

                {/* Next Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={cn(
                        "h-8 w-8 p-0 rounded-md",
                        "hover:bg-gray-100",
                        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    )}
                    aria-label="Página siguiente"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
} 