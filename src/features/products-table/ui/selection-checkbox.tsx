import styles from '../products-table.module.css';

interface SelectionCheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

export const SelectionCheckbox = ({ isChecked, onChange }: SelectionCheckboxProps) => {
  return (
    <div
      className={`${styles.checkbox} ${isChecked ? styles.checkboxChecked : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
    />
  );
};
