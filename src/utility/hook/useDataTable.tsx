import { useState, useMemo } from 'react';

type FilterValue = string | number | boolean;
type Filters<T> = Partial<Record<keyof T, FilterValue>>;

interface DataTableUtils<T> {
    data: T[];
    totalItems: number;
    searchTerm: string;
    handleSearch: (term: string) => void;
    searchFields: Array<keyof T>;
    setSearchFields: (fields: Array<keyof T>) => void;
    filters: Filters<T>;
    handleFilter: (field: keyof T, value: FilterValue) => void;
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
    goToNextPage: () => void;
    goToPrevPage: () => void;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    pageSize: number;
    handlePageSizeChange: (size: number) => void;
    isEmpty: boolean;
}

interface UseDataTableOptions<T> {
    initialPageSize?: number;
    initialSearchFields?: Array<keyof T>;
}

export const useDataTable = <T extends Record<string, any>>(
    data: T[],
    options?: UseDataTableOptions<T>
): DataTableUtils<T> => {
    const initialPageSize = options?.initialPageSize ?? 10000;
    const initialSearchFields = options?.initialSearchFields ?? [];

    const [searchTerm, setSearchTerm] = useState('');
    const [searchFields, setSearchFields] = useState<Array<keyof T>>(initialSearchFields);
    const [filters, setFilters] = useState<Filters<T>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const filteredData = useMemo(() => {
        return data.filter(item => {
            // If searchFields are specified, only search in those fields
            const searchMatch = searchTerm === '' || (
                searchFields.length > 0
                    ? searchFields.some(field =>
                        String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    : Object.values(item).some(value =>
                        String(value).toLowerCase().includes(searchTerm.toLowerCase())
                    )
            );

            const filterMatch = Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                return String(item[key as keyof T]).toLowerCase().includes(String(value).toLowerCase());
            });

            return searchMatch && filterMatch;
        });
    }, [data, searchTerm, searchFields, filters]);

    const isEmpty = filteredData.length === 0;
    const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
    const safeCurrentPage = Math.min(currentPage, totalPages);

    const paginatedData = useMemo(() => {
        if (isEmpty) return [];
        const startIndex = (safeCurrentPage - 1) * pageSize;
        return filteredData.slice(startIndex, startIndex + pageSize);
    }, [filteredData, safeCurrentPage, pageSize, isEmpty]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleFilter = (field: keyof T, value: FilterValue) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.min(Math.max(1, page), totalPages));
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const goToNextPage = () => {
        handlePageChange(safeCurrentPage + 1);
    };

    const goToPrevPage = () => {
        handlePageChange(safeCurrentPage - 1);
    };

    return {
        data: paginatedData,
        totalItems: filteredData.length,
        searchTerm,
        handleSearch,
        searchFields,
        setSearchFields,
        filters,
        handleFilter,
        currentPage: safeCurrentPage,
        totalPages,
        handlePageChange,
        goToNextPage,
        goToPrevPage,
        hasNextPage: safeCurrentPage < totalPages,
        hasPrevPage: safeCurrentPage > 1,
        pageSize,
        handlePageSizeChange,
        isEmpty
    };
};