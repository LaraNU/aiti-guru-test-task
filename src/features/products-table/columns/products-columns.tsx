import { ColumnType } from 'antd/es/table';
import { CircleEllipsis, Minus, Plus } from 'lucide-react';

import { Product } from '../model/types/product';
import styles from './products-columns.module.css';

export const productColumns: ColumnType<Product>[] = [
  {
    title: <div className={styles.headerTitle}>Наименование</div>,
    dataIndex: 'title',
    key: 'title',
    render: (title: string, record: Product) => (
      <div className={styles.titleWrapper}>
        <span className={styles.icon}></span>
        <div>
          <div className={styles.title}>{title}</div>
          <span className={styles.category}>{record.category}</span>
        </div>
      </div>
    ),
  },
  {
    title: <div className={styles.headerTitle}>Вендор</div>,
    dataIndex: 'brand',
    key: 'brand',
    render: (brand: string | undefined) => (
      <div className={styles.title}>{brand || <Minus color="#b2b3b9" />}</div>
    ),
    width: '15%',
    align: 'center',
  },
  {
    title: <div className={styles.headerTitle}>Артикул</div>,
    dataIndex: 'sku',
    key: 'sku',
    render: (sku: string) => <div className={styles.sku}>{sku}</div>,
    width: '15%',
    align: 'center',
  },
  {
    title: <div className={styles.headerTitle}>Оценка</div>,
    dataIndex: 'rating',
    key: 'rating',
    width: '15%',
    render: (rating: number) => (
      <span>
        <span className={rating < 3 ? styles.rating : ''}>{rating.toFixed(1)}</span>/5
      </span>
    ),
    sorter: true,
    showSorterTooltip: false,
    align: 'center',
  },
  {
    title: <div className={styles.headerTitle}>Цена ₽</div>,
    dataIndex: 'price',
    key: 'price',
    width: '15%',
    render: (price: number) => `${price.toLocaleString('ru-RU')} ₽`,
    sorter: true,
    showSorterTooltip: false,
    align: 'center',
  },
  {
    title: '',
    key: 'actions',
    width: '10%',
    render: () => (
      <div className={styles.actionsCell}>
        <button className={styles.addBtn} onClick={(e) => e.stopPropagation()}>
          <Plus color="#fff" />
        </button>
        <CircleEllipsis color="#b2b3b9" style={{ cursor: 'pointer' }} />
      </div>
    ),
    fixed: 'end',
  },
];
