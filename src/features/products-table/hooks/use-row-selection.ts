import { useCallback, useState } from 'react';

export const useRowSelection = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const toggleAll = useCallback(
    (productIds: number[]) => {
      const isAllSelected =
        productIds.length > 0 && productIds.every((id) => selectedRowKeys.includes(id));

      if (isAllSelected) {
        setSelectedRowKeys((prev) => prev.filter((id) => !productIds.includes(id)));
      } else {
        setSelectedRowKeys((prev) => [...new Set([...prev, ...productIds])]);
      }
    },
    [selectedRowKeys]
  );

  const toggleRow = useCallback((id: number) => {
    setSelectedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );
  }, []);

  return {
    selectedRowKeys,
    setSelectedRowKeys,
    toggleAll,
    toggleRow,
  };
};
