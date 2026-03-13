import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = (pageSize: number = 20) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useMemo(() => {
    const page = Number(searchParams.get('page'));
    return page && page > 0 ? page : 1;
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    currentPage,
    pageSize,
    handlePageChange,
  };
};
