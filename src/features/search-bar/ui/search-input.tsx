import { Search } from 'lucide-react';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';

import styles from './search-input.module.css';

interface SearchInputProps {
  value: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceDelay?: number;
}

export const SearchInput = ({
  value,
  onSearch,
  placeholder = 'Найти',
  debounceDelay = 500,
}: SearchInputProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onSearch(localValue);
      }
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [localValue, debounceDelay, onSearch, value]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onSearch(localValue);
    },
    [localValue, onSearch]
  );

  return (
    <form onSubmit={handleSubmit} className={styles.searchInput}>
      <div className={styles.iconWrapper}>
        <Search color="#999999" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </form>
  );
};
