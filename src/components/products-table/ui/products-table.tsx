import { ConfigProvider, Empty, Progress, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetProductsQuery } from '@/features/products/products-api';

import { productColumns } from '../columns/products-columns';
import { TablePagination } from '../pagination/pagination';
import { Product } from '../types/product';
import styles from './products-table.module.css';

export const ProductsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const pageSize = 20;

  const currentPage = useMemo(() => {
    const page = Number(searchParams.get('page'));
    return page && page > 0 ? page : 1;
  }, [searchParams]);

  const { data, isLoading, isFetching } = useGetProductsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  const currentProducts = useMemo(() => data?.products || [], [data]);

  const isAllSelected = useMemo(
    () =>
      currentProducts.length > 0 && currentProducts.every((p) => selectedRowKeys.includes(p.id)),
    [currentProducts, selectedRowKeys]
  );

  const toggleAll = useCallback(() => {
    const currentIds = currentProducts.map((p) => p.id);
    if (isAllSelected) {
      setSelectedRowKeys((prev) => prev.filter((id) => !currentIds.includes(id)));
    } else {
      setSelectedRowKeys((prev) => [...new Set([...prev, ...currentIds])]);
    }
  }, [currentProducts, isAllSelected]);

  const toggleRow = (id: number) => {
    setSelectedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );
  };

  const columns: ColumnsType<Product> = useMemo(
    () => [
      {
        title: (
          <div
            className={`${styles.checkbox} ${isAllSelected ? styles.checkboxChecked : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleAll();
            }}
          />
        ),
        key: 'checkbox',
        width: 50,
        fixed: 'start',
        render: (_: unknown, record: Product) => (
          <div
            className={`${styles.checkbox} ${selectedRowKeys.includes(record.id) ? styles.checkboxChecked : ''}`}
          />
        ),
      },
      ...productColumns,
    ],
    [isAllSelected, selectedRowKeys, toggleAll]
  );

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.tableContainer}>
      {isFetching && (
        <Progress
          percent={95}
          status="active"
          showInfo={false}
          strokeColor="#3c538e"
          className={styles.progressBar}
          size={'small'}
        />
      )}

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3c538e',
            colorText: '#161919',
          },
          components: {
            Table: {
              headerBg: '#ffffff',
              headerColor: '#b2b3b9',
              headerSplitColor: '#ffffff',
              rowSelectedBg: 'transparent',
              cellFontSize: 16,
              expandIconBg: 'transparent',
              cellPaddingBlock: 11,
              fontFamily: '"Cairo", sans-serif',
              lineHeight: 1.2,
            },
          },
        }}
      >
        <Table<Product>
          className={styles.wrapper}
          columns={columns}
          dataSource={data ? data.products : []}
          loading={isLoading}
          rowKey="id"
          pagination={false}
          scroll={{ y: 71 * 5, x: 'max-content' }}
          rowClassName={(record) => (selectedRowKeys.includes(record.id) ? styles.selectedRow : '')}
          onRow={(record) => ({
            onClick: () => toggleRow(record.id),
          })}
          locale={{
            emptyText: (
              <Empty description="No Data">
                Проверьте подключение к интернету, возможно требуется подключение VPN
              </Empty>
            ),
          }}
        />
      </ConfigProvider>

      <TablePagination
        current={currentPage}
        total={data?.total || 0}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
    </div>
  );
};
