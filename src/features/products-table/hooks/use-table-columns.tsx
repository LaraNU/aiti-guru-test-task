import { ColumnsType } from 'antd/es/table';
import { SortOrder } from 'antd/es/table/interface';

import { productColumns } from '../columns/products-columns';
import { Product } from '../model/types/product';
import styles from '../products-table.module.css';
import { SelectionCheckbox } from '../ui/selection-checkbox';

interface TableColumnsProps {
  sortBy: string;
  order: string;
  isAllSelected: boolean;
  selectedRowKeys: number[];
  onToggleAll: () => void;
  onToggleRow: (id: number) => void;
}

export const useTableColumns = ({
  sortBy,
  order,
  isAllSelected,
  selectedRowKeys,
  onToggleAll,
  onToggleRow,
}: TableColumnsProps): ColumnsType<Product> => {
  return [
    {
      title: <SelectionCheckbox isChecked={isAllSelected} onChange={onToggleAll} />,
      key: 'checkbox',
      width: 50,
      fixed: 'start',
      render: (_: unknown, record: Product) => (
        <div
          className={`${styles.checkbox} ${selectedRowKeys.includes(record.id) ? styles.checkboxChecked : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleRow(record.id);
          }}
        />
      ),
    },
    ...productColumns.map((col) => {
      if (col.key === 'rating' || col.key === 'price') {
        let currentSort: SortOrder = null;
        if (sortBy === col.key) {
          currentSort = order === 'asc' ? 'ascend' : 'descend';
        }

        return {
          ...col,
          sortOrder: currentSort,
        };
      }
      return col;
    }),
  ];
};
