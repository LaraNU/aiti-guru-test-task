import { CirclePlus, RefreshCw } from 'lucide-react';

import { ProductsTable } from '@/features/products-table';
import { SearchBar } from '@/features/search-bar';

import styles from './products-page.module.css';

export const ProductsPage = () => {
  return (
    <>
      <header className={styles.pageHeader}>
        <p className={styles.pageTitle}>Товары</p>
        <SearchBar />
      </header>
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
    </>
  );
};
