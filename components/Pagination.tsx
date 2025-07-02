import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export function Pagination({currentPage, totalItems, pageSize, onPageChange}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / pageSize);
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);
    const maxVisiblePages = 5;
    
    let visiblePages = pages;
    if (totalPages > maxVisiblePages) {
        const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const end = Math.min(totalPages, start + maxVisiblePages - 1);
        visiblePages = pages.slice(start - 1, end);
    }

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4"/>
            </Button>

            {visiblePages[0] > 1 && (
                <>
                    <Button
                        variant="outline"
                        onClick={() => onPageChange(1)}
                    >
                        1
                    </Button>
                    {visiblePages[0] > 2 && (
                        <span className="px-2">...</span>
                    )}
                </>
            )}

            {visiblePages.map((page) => (
                <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
            ))}

            {visiblePages[visiblePages.length - 1] < totalPages && (
                <>
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                        <span className="px-2">...</span>
                    )}
                    <Button
                        variant="outline"
                        onClick={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </Button>
                </>
            )}

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4"/>
            </Button>
        </div>
    );
} 