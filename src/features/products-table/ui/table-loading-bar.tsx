import { Progress } from 'antd';

import styles from '../products-table.module.css';

interface TableLoadingBarProps {
  isFetching: boolean;
}

export const TableLoadingBar = ({ isFetching }: TableLoadingBarProps) => {
  if (!isFetching) return null;

  return (
    <Progress
      percent={95}
      status="active"
      showInfo={false}
      strokeColor="#3c538e"
      className={styles.progressBar}
      size={'small'}
    />
  );
};
