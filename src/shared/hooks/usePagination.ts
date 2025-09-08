import { useEffect, useMemo, useState } from 'react';

export function usePagination(total: number, initialSize = 9) {
    const [pageSize, setPageSize] = useState<number>(initialSize);
    const [page, setPage] = useState<number>(1);

    useEffect(() => { setPage(1); }, [pageSize, total]);

    const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

    const clampedPage = Math.min(page, totalPages);
    const start = (clampedPage - 1) * pageSize;
    const end = Math.min(start + pageSize, total);

    return {
        page, setPage,
        pageSize, setPageSize,
        totalPages, clampedPage,
        start, end,
    };
}

export default usePagination;