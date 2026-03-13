import { ConfigProvider, Pagination } from 'antd';

import styles from './pagination.module.css';

interface TablePaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export const TablePagination = ({ current, total, pageSize, onChange }: TablePaginationProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemSize: 30,
            itemActiveBg: '#797fea',
            colorPrimary: '#ffffff',
            colorText: '#b2b3b9',
            borderRadius: 4,
            boxShadow: '0 20px 50px 0 rgba(0, 0, 0, 0.12)',
          },
        },
      }}
    >
      <div className={styles.paginationWrapper}>
        <span className={styles.totalText}>
          Показано{' '}
          <span className={styles.totalNumbers}>
            {Math.min((current - 1) * pageSize + 1, total)}-{Math.min(current * pageSize, total)}
          </span>{' '}
          из <span className={styles.totalNumbers}>{total}</span>
        </span>

        <Pagination
          styles={{
            item: {
              border: '1px solid #ececeb',
              borderRadius: 4,
              boxShadow: '0 20px 50px 0 rgba(0, 0, 0, 0.12)',
              color: '#b2b3b9',
            },
          }}
          current={current}
          total={total}
          pageSize={pageSize}
          onChange={onChange}
          showSizeChanger={false}
          className={styles.customPagination}
        />
      </div>
    </ConfigProvider>
  );
};
