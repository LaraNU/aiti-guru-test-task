import { useSearch } from './hooks/use-search';
import styles from './search-bar.module.css';
import { SearchInput } from './ui/search-input';

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar = ({ placeholder }: SearchBarProps) => {
  const { query, handleSearch } = useSearch();

  return (
    <div className={styles.searchBar}>
      <SearchInput value={query} onSearch={handleSearch} placeholder={placeholder} />
    </div>
  );
};
