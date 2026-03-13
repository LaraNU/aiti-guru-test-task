import { Empty, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';

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
  return (
    <Table<Product>
      className={styles.wrapper}
      columns={columns}
      onChange={onTableChange}
      dataSource={dataSource}
      loading={isLoading}
      rowKey="id"
      pagination={false}
      scroll={{ y: 71 * 5, x: 'max-content' }}
      rowClassName={(record) => (selectedRowKeys.includes(record.id) ? styles.selectedRow : '')}
      onRow={(record) => ({
        onClick: () => onRowClick(record.id),
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
