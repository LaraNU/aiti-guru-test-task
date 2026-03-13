import { useMemo } from 'react';

import { useGetProductsQuery } from '@/features/products/products-api';

import { usePagination } from './hooks/use-pagination';
import { useRowSelection } from './hooks/use-row-selection';
import { useSortingHandler } from './hooks/use-sorting-handler';
import { useTableColumns } from './hooks/use-table-columns';
import { TablePagination } from './pagination/pagination';
import styles from './products-table.module.css';
import { ProductTableContent } from './ui/product-table-content';
import { TableLoadingBar } from './ui/table-loading-bar';
import { TableThemeProvider } from './ui/table-theme-provider';

export const ProductsTable = () => {
  const pageSize = 20;
  const { currentPage, handlePageChange } = usePagination(pageSize);
  const { handleTableChange } = useSortingHandler();
  const { selectedRowKeys, toggleAll, toggleRow } = useRowSelection();

  const queries = new URLSearchParams(window.location.search);
  const sortBy = queries.get('sortBy') || '';
  const order = queries.get('order') || '';

  const { data, isLoading, isFetching } = useGetProductsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
    sortBy,
    order,
  });

  const currentProducts = useMemo(() => data?.products || [], [data]);

  const isAllSelected = useMemo(
    () =>
      currentProducts.length > 0 && currentProducts.every((p) => selectedRowKeys.includes(p.id)),
    [currentProducts, selectedRowKeys]
  );

  const columns = useTableColumns({
    sortBy,
    order,
    isAllSelected,
    selectedRowKeys,
    onToggleAll: () => toggleAll(currentProducts.map((p) => p.id)),
    onToggleRow: toggleRow,
  });

  return (
    <div className={styles.tableContainer}>
      <TableLoadingBar isFetching={isFetching} />

      <TableThemeProvider>
        <ProductTableContent
          columns={columns}
          dataSource={data ? data.products : []}
          isLoading={isLoading}
          selectedRowKeys={selectedRowKeys}
          onTableChange={handleTableChange}
          onRowClick={toggleRow}
        />
      </TableThemeProvider>

      <TablePagination
        current={currentPage}
        total={data?.total || 0}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
    </div>
  );
};
