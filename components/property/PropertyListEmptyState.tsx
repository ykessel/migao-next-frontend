/**
 * PropertyListEmptyState Component
 * 
 * Displays empty state when no properties match the search criteria.
 * Follows Single Responsibility Principle - Only handles empty state presentation.
 */
export function PropertyListEmptyState() {
    return (
        <div className="text-center py-16">
            <div className="max-w-md mx-auto">
                <div className="mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"
                            />
                        </svg>
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No se encontraron propiedades
                </h3>
                <p className="text-gray-600 mb-4">
                    No hay propiedades que coincidan con tus criterios de búsqueda.
                    Intenta ajustar los filtros.
                </p>
            </div>
        </div>
    );
}

