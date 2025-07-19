import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight, MoreHorizontal} from "lucide-react";
import {cn} from "@/lib/utils";

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
        <div className="flex flex-col items-center justify-center gap-4 mt-1" role="navigation" aria-label="Paginación">

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-1 sm:gap-2" aria-label="Controles de paginación">
                {/* Previous Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={cn(
                        "h-9 px-3 transition-all duration-200",
                        "hover:bg-gray-50 hover:border-gray-300",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                        "focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    )}
                    aria-label={`Ir a la página anterior (página ${currentPage - 1})`}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true"/>
                    <span className="hidden sm:inline">Anterior</span>
                </Button>

                {/* First Page */}
                {visiblePages[0] > 1 && (
                    <>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(1)}
                            className={cn(
                                "h-9 w-9 p-0 transition-all duration-200",
                                "hover:bg-gray-50 hover:border-gray-300",
                                "focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            )}
                            aria-label="Ir a la página 1"
                        >
                            1
                        </Button>
                        {visiblePages[0] > 2 && (
                            <div className="flex items-center justify-center w-9 h-9">
                                <MoreHorizontal className="h-4 w-4 text-gray-400" aria-label="Páginas omitidas"/>
                            </div>
                        )}
                    </>
                )}

                {/* Visible Page Numbers */}
                {visiblePages.map((page) => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(page)}
                        className={cn(
                            "h-9 w-9 p-0 transition-all duration-200 relative",
                            currentPage === page 
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-md scale-105" 
                                : "hover:bg-gray-50 hover:border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                            "font-medium"
                        )}
                        aria-label={`Ir a la página ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                    >
                        {page}
                    </Button>
                ))}

                {/* Last Page */}
                {visiblePages[visiblePages.length - 1] < totalPages && (
                    <>
                        {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                            <div className="flex items-center justify-center w-9 h-9">
                                <MoreHorizontal className="h-4 w-4 text-gray-400" aria-label="Páginas omitidas"/>
                            </div>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(totalPages)}
                            className={cn(
                                "h-9 w-9 p-0 transition-all duration-200",
                                "hover:bg-gray-50 hover:border-gray-300",
                                "focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            )}
                            aria-label={`Ir a la página ${totalPages}`}
                        >
                            {totalPages}
                        </Button>
                    </>
                )}

                {/* Next Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={cn(
                        "h-9 px-3 transition-all duration-200",
                        "hover:bg-gray-50 hover:border-gray-300",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                        "focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    )}
                    aria-label={`Ir a la página siguiente (página ${currentPage + 1})`}
                >
                    <span className="hidden sm:inline">Siguiente</span>
                    <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true"/>
                </Button>
            </div>

            {/* Quick Navigation for Large Page Sets */}
            {totalPages > 10 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Ir a:</span>
                    <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={currentPage}
                        onChange={(e) => {
                            const page = parseInt(e.target.value);
                            if (page >= 1 && page <= totalPages) {
                                onPageChange(page);
                            }
                        }}
                        className="w-16 h-8 px-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        aria-label="Número de página"
                    />
                    <span>de {totalPages}</span>
                </div>
            )}
        </div>
    );
} 