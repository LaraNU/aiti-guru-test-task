import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../model/types/product';

export const useSortingHandler = () => {
  const [_searchParams, setSearchParams] = useSearchParams();

  const handleTableChange = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Product> | SorterResult<Product>[]
  ) => {
    const newParams = new URLSearchParams(_searchParams);

    const currentSorter = Array.isArray(sorter) ? sorter[0] : sorter;

    if (currentSorter?.field && currentSorter?.order) {
      newParams.set('sortBy', currentSorter.field as string);
      newParams.set('order', currentSorter.order === 'ascend' ? 'asc' : 'desc');
    } else {
      newParams.delete('sortBy');
      newParams.delete('order');
    }

    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return { handleTableChange };
};
