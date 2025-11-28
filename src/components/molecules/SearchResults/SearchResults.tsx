import React from 'react';
import type { ProductDetails } from '@/types/ProductDetails';
import classNames from 'classnames';
import './SearchResults.scss';

interface SearchResultsProps {
  results: ProductDetails[];
  loading: boolean;
  onSelect: (p: ProductDetails) => void;
  className?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  loading,
  onSelect,
  className,
}) => {
  return (
    <div className="search-results-wrapper">
      <div className={classNames('search__results', className)}>
        {loading && <div className="search__loading">Searching…</div>}

        {!loading && results.length > 0 && (
          <ul>
            {results.map((p) => (
              <li
                key={p.id}
                className="search__result-item"
                onClick={() => onSelect(p)}
              >
                {p.name}
                <span>{p.priceDiscount} $</span>
              </li>
            ))}
          </ul>
        )}

        {!loading && results.length === 0 && (
          <div className="search__no-results">No results</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
