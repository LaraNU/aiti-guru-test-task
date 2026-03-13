import { CirclePlus, RefreshCw } from 'lucide-react';

import { ProductsTable } from '@/components';

import styles from './products-page.module.css';

export const ProductsPage = () => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Все позиции</h3>

        <div className={styles.buttons}>
          <button className={styles.refreshButton}>
            <RefreshCw color="#515161" />
          </button>
          <button className={styles.addButton}>
            <CirclePlus color="#fff" /> Добавить
          </button>
        </div>
      </div>
      <ProductsTable />
    </main>
  );
};
