import { Empty, Skeleton, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import { useMemo } from 'react';

import { Product } from '../model/types/product';
import styles from '../products-table.module.css';

interface ProductTableContentProps {
  columns: ColumnsType<Product>;
  dataSource: Product[];
  isLoading: boolean;
  selectedRowKeys: number[];
  onTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Product> | SorterResult<Product>[]
  ) => void;
  onRowClick: (id: number) => void;
}

export const ProductTableContent = ({
  columns,
  dataSource,
  isLoading,
  selectedRowKeys,
  onTableChange,
  onRowClick,
}: ProductTableContentProps) => {
  const isInitialLoading = isLoading && dataSource.length === 0;
  const mockData = useMemo(
    () => Array.from({ length: 7 }, (_, i) => ({ id: `skeleton-${i}` })),
    []
  );

  const displayColumns = useMemo(() => {
    if (isInitialLoading) {
      return columns.map((col) => ({
        ...col,
        render: () => <Skeleton.Button active block style={{ width: '100%' }} />,
      }));
    }
    return columns;
  }, [isInitialLoading, columns]);

  const displayData = (isInitialLoading ? mockData : dataSource) as Product[];

  return (
    <Table<Product>
      className={styles.wrapper}
      columns={displayColumns}
      onChange={onTableChange}
      dataSource={displayData}
      loading={isLoading && dataSource.length > 0}
      rowKey="id"
      pagination={false}
      scroll={{ y: 71 * 5, x: 'max-content' }}
      rowClassName={(record) => (selectedRowKeys.includes(record.id) ? styles.selectedRow : '')}
      onRow={(record) => ({
        onClick: () => !isInitialLoading && onRowClick(record.id),
      })}
      locale={{
        emptyText: (
          <Empty description="No Data">
            Проверьте подключение к интернету, возможно требуется подключение VPN
          </Empty>
        ),
      }}
    />
  );
};
