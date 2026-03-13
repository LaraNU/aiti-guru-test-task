import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';

  const handleSearch = useCallback(
    (searchQuery: string) => {
      const newParams = new URLSearchParams(searchParams);
      if (searchQuery.trim()) {
        newParams.set('q', searchQuery);
        newParams.set('page', '1');
      } else {
        newParams.delete('q');
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  return {
    query,
    handleSearch,
  };
};
