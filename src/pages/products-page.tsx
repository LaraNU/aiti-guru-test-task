import { ProductsTable } from '@/components';

import styles from './products-page.module.css';

export const ProductsPage = () => {
  return (
    <main className={styles.wrapper}>
      <h1>Все позиции</h1>
      <ProductsTable />
    </main>
  );
};
