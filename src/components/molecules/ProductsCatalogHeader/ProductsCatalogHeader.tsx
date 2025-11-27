import { useState } from 'react';
import Breadcrumbs from '@molecules/Breadcrumbs';
import PageTitle from '@atoms/PageTitle';
import type { SortOption } from '@molecules/SortingBar';
import SortingBar from '@molecules/SortingBar';
import FiltersBar from '@organisms/FiltersBar';
import FiltersModal from '@organisms/FiltersModal';
import Button from '@atoms/Button';
import Icon from '@atoms/Icon';
import FilterIcon from '@assets/icons/filter-icon.svg';
import { useDevice } from '@/hooks/useDevice';
import type { ProductFilters, FilterOptions } from '@/types/ProductFilters';
import './ProductsCatalogHeader.scss';

type ProductsCatalogHeaderProps = {
  title: string;
  modelsCount: number;
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
  category: string;
  filters: ProductFilters;
  filterOptions: FilterOptions;
  onFiltersChange: (filters: ProductFilters) => void;
  allProducts?: import('@/types/ProductCard').ProductCard[];
};

const ProductsCatalogHeader = ({
  title,
  modelsCount,
  sortValue,
  onSortChange,
  category,
  filters,
  filterOptions,
  onFiltersChange,
  allProducts = [],
}: ProductsCatalogHeaderProps) => {
  const { isDesktop } = useDevice();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  return (
    <div className="catalog-header">
      <Breadcrumbs />

      <PageTitle>{title}</PageTitle>

      <span className="catalog-header__models-count">{modelsCount} models</span>

      {isDesktop && (
        <div className="catalog-header__filters-row">
          <div className="catalog-header__price-sort-column">
            <SortingBar
              sortValue={sortValue}
              onSortChange={onSortChange}
            />
            <FiltersBar
              filters={filters}
              filterOptions={filterOptions}
              category={category}
              onFiltersChange={onFiltersChange}
              allProducts={allProducts}
              showPriceOnly
            />
          </div>
          <FiltersBar
            filters={filters}
            filterOptions={filterOptions}
            category={category}
            onFiltersChange={onFiltersChange}
            allProducts={allProducts}
            showOtherFiltersOnly
          />
        </div>
      )}

      {!isDesktop && (
        <div className="catalog-header__controls">
          <SortingBar
            sortValue={sortValue}
            onSortChange={onSortChange}
          />
          <Button
            variant="icon"
            onClick={() => setIsFiltersModalOpen(true)}
            className="catalog-header__filters-btn"
            aria-label="Open filters"
            icon={<Icon src={FilterIcon} />}
          />
        </div>
      )}

      {!isDesktop && (
        <FiltersModal
          isOpen={isFiltersModalOpen}
          onClose={() => setIsFiltersModalOpen(false)}
          filters={filters}
          filterOptions={filterOptions}
          category={category}
          onFiltersChange={onFiltersChange}
          allProducts={allProducts}
        />
      )}
    </div>
  );
};

export default ProductsCatalogHeader;
